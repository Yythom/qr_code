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
import { getCookie } from '../../utils/utils';

function _Layout(props) {
    const history = useHistory();

    useEffect(() => {
        const p = new URLSearchParams(window.location.search);
        console.log(localStorage.getItem('s'), p.get('s'));
        if (p.get('s')) {
            if (localStorage.getItem('s') !== p.get('s')) {
                props.clearCart();
            }
        }

        if (getCookie('token')) {
            if (window.location.pathname === '/') {
                history.push('/home');
            }
        } else {
            history.replace('/login');
        }
        // getLocation();
        if (navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) {
            props.setBrowser('wx');
        } else if (navigator.userAgent.toLowerCase().indexOf('alipayclient') !== -1) {
            props.setBrowser('zfb');
        } else {
            props.setBrowser('other');
        }
        if (getCookie('token')) {
            props.setUserInfo();
        }
    }, [])


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
        console.log('获取定位start');
        message.loading({
            content: '获取定位中....', duration: 0,
        })
        // 获取当前经纬度坐标
        getPosition().then(result => {
            // 返回结果示例：
            // {latitude: 30.318030999999998, longitude: 120.05561639999999}
            // 一般小数点后只取六位，所以用以下代码搞定
            let queryData = {
                longtitude: String(result.longitude).match(/\d+\.\d{0,8}/)[0],
                latitude: String(result.latitude).match(/\d+\.\d{0,8}/)[0],
            }
            message.destroy();
            props.setLocaltion(queryData)
            message.success({
                content: '获取定位成功',
                duration: 1,
            });
            // 以下放置获取坐标后你要执行的代码:
            // ...
        }).catch(err => {
            message.destroy();
            message.error(err);
            console.log(err);
        })
    }

    return (
        <div className='layout animate__fadeIn animate__animated'>
            {
                history.location.pathname !== '/order' && history.location.pathname !== '/center' ? <Header /> : null
            }
            {/* <button onClick={() => {
                window.open(locationHref)
            }}>
                支付宝
            </button> */}
            { // 路由组件
                Object.values(router).map(e => {
                    return (
                        <Route path={e.url} exact={e.desc !== '主页'} component={e.page} key={e.url} />
                    )
                })
            }
            <TabBar />
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(_Layout)