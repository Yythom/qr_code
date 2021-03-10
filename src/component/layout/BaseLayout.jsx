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


    useEffect(() => {
        console.log('layout loading');
        if (navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1) {
            props.setBrowser('other');

            // props.setBrowser('wx');
        } else if (navigator.userAgent.toLowerCase().indexOf('alipayclient') !== -1) {
            // props.setBrowser('zfb');
            props.setBrowser('other');
        } else {
            props.setBrowser('other');
        }
        // let index = props.location.pathname === '/integral' || props.location.pathname === '/integral/';
        // if (!index) {
        //     if (!localStorage.getItem('info') && !props.userStore) history.push('/integral')
        // }
        // getLocation();

    }, [])




    return (
        <div className='layout animate__fadeIn animate__animated'>
            {
                history.location.pathname !== '/integral'
                    && history.location.pathname !== '/integral/'
                    && history.location.pathname !== '/integral/order'
                    && history.location.pathname !== '/integral/order/'
                    && history.location.pathname !== '/integral/center'
                    && history.location.pathname !== '/integral/center/'
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
                            && history.location.pathname.indexOf('/orderdetail') === -1
                            && (history.location.pathname.split('center')[1] === '/' || history.location.pathname.indexOf('/center/') === -1)
                            // && history.location.pathname.indexOf('/orderdetail') === -1
                            ? <TabBar />
                            : null
                    )
                    : (!props.cartSummary.num ? <TabBar /> : null)
            }

        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(_Layout)