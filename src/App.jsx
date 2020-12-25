import React from 'react'
import { mapStateToProps, mapDispatchToProps } from './redux/actionCreator'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'


//路由
// import router from './router/router'

//布局组件
import BaseLayout from './component/layout/BaseLayout'
import Login from './pages/login/Login'
import { useEffect } from 'react'
import { getCheckShopApi } from './api/shopApi'
import { setCookie } from './utils/utils'
import { useState } from 'react'
import { message } from 'antd'

function _App(props) {
    const [flag, setFlag] = useState(false);
    const [loading, setLoading] = useState(true);
    let wxAppId = '';
    let aliAppId = '';
    function IsPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag; // true:pc  false:mobile
    }
    useEffect(() => {
        const wxAppId = 'wxaf9e884cd4ab31b0';
        const aliAppId = '2021002101634074';
        const local = window.location.href;
        const p = new URLSearchParams(window.location.search);
        const code = p.get('code') || p.get('auth_code');
        const s = p.get('s') || localStorage.getItem('s');
        if (/MicroMessenger/.test(window.navigator.userAgent)) { // 微信
            if (s && code) {
                console.log(s, code);
                props.setCode(code)
            }
            if (!code) {
                window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wxAppId}&redirect_uri=${local}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`;
            }
        } else if (/AlipayClient/.test(window.navigator.userAgent)) { // 支付宝
            if (s && code) {
                props.setCode(code)
                console.log(s, code);
            }
            if (!code) {
                window.location.href = `https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=${aliAppId}&scope=auth_base&redirect_uri=${encodeURIComponent(local)}`;
            }
        } else {
            props.setCode('');
            // alert('请使用微信或支付宝扫码');
            message.error('请使用微信或支付宝扫码');
        }
    }, []);

    function init() {
        if (window.location.pathname !== '/integral') {
            props.setShop(JSON.parse(localStorage.getItem('shop')));
            setFlag(true);
            return
        }
        const p = new URLSearchParams(window.location.search);
        if (localStorage.getItem('s') || p.get('s')) {
            message.loading({ content: '加载中', duration: 0 });
            let s = p.get('s') || localStorage.getItem('s'); // 优先拿code s
            localStorage.setItem('s', s); // 更新s
            getCheckShopApi(s).then(result => {
                if (result) {
                    message.destroy();
                    message.success({ content: '获取成功', duration: 1 });
                    localStorage.setItem('shop', JSON.stringify(result)); // shop
                    props.setShop(result);
                    localStorage.setItem('shop_id', result.shop_id); // shop_id
                    setTimeout(() => {
                        setFlag(true);
                        setLoading(false);
                    }, 100);
                } else {
                    setLoading(false);
                }
            })
        } else {
            setLoading(false);
            message.error('url不正确');
        }
    }

    useEffect(() => {
        init();
        // if (!IsPC()) {
        //     // new VConsole()
        //     // console.clear()
        // }
    }, [])

    return (
        <>
            {flag && localStorage.getItem('shop') ?
                <Router>
                    <Switch>
                        <Route path='/login' component={Login}></Route>
                        <Route path='/integral' component={BaseLayout} ></Route>
                        <Route path='/404' exact component={() => <h2>404</h2>}></Route>
                        <Redirect to="/404" />
                    </Switch>
                </Router> : (!loading && <div style={{ fontSize: '2rem', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                    商户不存在
                </div>)
            }
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(_App)
