import React, { useState } from 'react'
import { mapStateToProps, mapDispatchToProps } from './redux/actionCreator'
import { connect } from 'react-redux'

// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'


//路由
// import router from './router/router'

//布局组件
import BaseLayout from './component/layout/BaseLayout'
import Login from './pages/login/Login'
import { useEffect } from 'react'
// import { setCookie } from './utils/utils'
import { message } from 'antd'
import configState from './utils/state'
import { getOpen_idApi } from './api/indexApi'

function _App(props) {
    useEffect(() => {
        // console.clear();
        const wxAppId = 'wxbc32865e2a127f25';
        // const aliAppId = '2021002101634074';
        const local = window.location.href;
        const p = new URLSearchParams(window.location.search);
        console.log(window.location.href, window.location.search, 'url');

        const code = p.get('code') || p.get('auth_code');
        if (/MicroMessenger/.test(window.navigator.userAgent)) { // 微信
            console.log('微信open');

            if (code) {
                getOpen_idApi(code).then(res => {
                    console.log(res.open_id, 'open_id');
                    props.setCode(res.open_id);
                })

            }
            if (!code) {
                window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wxAppId}&redirect_uri=${local}&response_type=code&scope=snsapi_base&state=${configState}#wechat_redirect`;
            }
        }
        //  else if (/AlipayClient/.test(window.navigator.userAgent)) { // 支付宝
        //     if (code) {
        //         props.setCode(code)
        //         console.log(code);
        //     }
        //     if (!code) {
        //         window.location.href = `https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=${aliAppId}&scope=auth_base&state=${configState}&redirect_uri=${encodeURIComponent(local)}`;
        //     }
        // } 
        else {
            props.setCode('');
            // alert('请使用微信或支付宝扫码');
            console.log('请使用微信或支付宝扫码');

            message.error('请使用微信或支付宝扫码');
        }

    }, []);



    useEffect(() => {

    }, [])

    return (
        <>
            <Router>
                <Switch>
                    <Route path='/integral/login' exact component={Login}></Route>
                    <Route path='/integral' component={BaseLayout} ></Route>
                    <Route path='/404' exact component={() => <h2>404</h2>}></Route>
                    <Redirect to="/404" />
                </Switch>
            </Router>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(_App)
