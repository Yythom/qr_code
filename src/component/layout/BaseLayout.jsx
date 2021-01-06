/* eslint-disable no-undef */
import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator'
import { connect } from 'react-redux';
import Header from '../header/header';
import './BaseLayout.scss';
import 'animate.css';
import { getInfoApi } from '../../api/api'
//路由
import router from '../../router/router';
import TabBar from './tabBar/TabBar';
import { useEffect } from 'react';
import { message } from 'antd';
import { getCookie, getAddress } from '../../utils/utils';

function _Layout(props) {
    const history = useHistory();
    function getPosition() {
        let flag = false;
        return new Promise((resolve, reject) => {
            if (window.location.href.indexOf('https') === -1) { // 当用户为https时候
                if (window.location.href.indexOf('localhost') !== -1) {
                    flag = true;
                } else {
                    reject('请使用https访问获取定位');
                    return
                }
            } else {
                flag = true
            }
            if (!flag) return
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    let latitude = position.coords.latitude
                    let longitude = position.coords.longitude
                    let data = {
                        latitude: latitude,
                        longitude: longitude
                    }
                    resolve(data)
                }, function () {
                    reject(arguments)
                })
            } else {
                reject('你的浏览器不支持当前地理位置信息获取');
            }
        })
    }
    function getLocation() {
        // 获取当前经纬度坐标
        getPosition().then(result => {
            // 返回结果示例：
            // {latitude: 30.318030999999998, longitude: 120.05561639999999}
            // 一般小数点后只取六位，所以用以下代码搞定
            let queryData = {
                latitude: String(result.latitude).match(/\d+\.\d{0,6}/)[0],
                longtitude: String(result.longitude).match(/\d+\.\d{0,6}/)[0],
            }

            getAddress(Number(queryData.latitude), Number(queryData.longtitude)).then(res => {
                console.log(res);
                message.destroy();
                props.setLocaltion(res);
            })

            // 以下放置获取坐标后你要执行的代码:
            // ...
        }).catch(err => {
            message.destroy();
            message.error(err);
        })
    }

    useEffect(() => {
        getLocation();
        if (navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) {
            props.setBrowser('wx');
        } else if (navigator.userAgent.toLowerCase().indexOf('alipayclient') !== -1) {
            props.setBrowser('zfb');
        } else {
            props.setBrowser('other');
        }
    }, [])




    return (
        <div className='layout animate__fadeIn animate__animated'>
            {
                history.location.pathname !== '/integral'
                    && history.location.pathname !== '/integral/'
                    && history.location.pathname !== '/integral/order'
                    && history.location.pathname !== '/integral/center'
                    && history.location.pathname.indexOf('/integral/home') === -1
                    ? <Header /> : null
            }
            { // 路由组件
                Object.values(router).map(e => {
                    return (
                        <Route path={e.url} exact component={e.page} key={'/integral' + e.url} />
                    )
                })
            }
            {
                history.location.pathname.indexOf('home') === -1
                    ? (
                        history.location.pathname.indexOf('cashier') === -1
                            && history.location.pathname.indexOf('map') === -1
                            && history.location.pathname.indexOf('/search') === -1
                            ? <TabBar /> : null)
                    : (!props.cartSummary.num ? <TabBar /> : null)
            }

        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(_Layout)