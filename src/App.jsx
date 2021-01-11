import React from 'react'
import { mapStateToProps, mapDispatchToProps } from './redux/actionCreator'
import { connect } from 'react-redux'
// import { HashRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'


//路由
// import router from './router/router'

//布局组件
import BaseLayout from './component/layout/BaseLayout'
import Login from './pages/login/Login'
import Index from './pages/index/index'
import { useEffect } from 'react'
import { getCheckShopApi } from './api/shopApi'
import { setCookie } from './utils/utils'
import { useState } from 'react'
import { message } from 'antd'

function _App(props) {
    const [flag, setFlag] = useState(false);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        // const wxAppId = 'wxaf9e884cd4ab31b0';
        // const aliAppId = '2021002101634074';
        // const local = window.location.href;
        // const p = new URLSearchParams(window.location.search);
        // const code = p.get('code') || p.get('auth_code');
        // if (/MicroMessenger/.test(window.navigator.userAgent)) { // 微信
        //     if (code) {
        //         console.log(code);
        //         props.setCode(code)
        //     }
        //     if (!code) {
        //         window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wxAppId}&redirect_uri=${local}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`;
        //     }
        // } else if (/AlipayClient/.test(window.navigator.userAgent)) { // 支付宝
        //     if (code) {
        //         props.setCode(code)
        //         console.log(code);
        //     }
        //     if (!code) {
        //         window.location.href = `https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=${aliAppId}&scope=auth_base&redirect_uri=${encodeURIComponent(local)}`;
        //     }
        // } else {
        //     props.setCode('');
        //     // alert('请使用微信或支付宝扫码');
        //     message.error('请使用微信或支付宝扫码');
        // }
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
