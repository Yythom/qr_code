import React, { useState } from 'react'
import { mapStateToProps, mapDispatchToProps } from './redux/actionCreator'
import { connect } from 'react-redux'

//布局组件
import { useEffect } from 'react'
// import { setCookie } from './utils/utils'
import { message } from 'antd'
import configState from './utils/state'

function _App(props) {
    const [getCode, setCode] = useState('')

    useEffect(() => {
        // console.clear();
        message.loading({ content: '获取code中', duration: 0 })
        const wxAppId = 'wxaf9e884cd4ab31b0';
        const aliAppId = '2021002101634074';
        const local = window.location.href;
        console.log(local, message);

        const p = new URLSearchParams(window.location.search);
        console.log(window.location.href, window.location.search, 'url');

        const code = p.get('code') || p.get('auth_code');
        if (/MicroMessenger/.test(window.navigator.userAgent)) { // 微信
            if (code) {
                setCode(code);
                window.location.href = `https://shop.integral.haimeiyx.com/integral?code=${code}`
                console.log(code, 'wx---pay-----code');
            }
            if (!code) {
                window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wxAppId}&redirect_uri=${local}&response_type=code&scope=snsapi_base&state=${configState}#wechat_redirect`;
            }
        }
        else if (/AlipayClient/.test(window.navigator.userAgent)) { // 支付宝
            if (code) {
                setCode(code);
                window.location.href = `https://shop.integral.haimeiyx.com/integral?code=${code}`
                console.log(code, 'zfb----pay-----code');
            }
            if (!code) {
                window.location.href = `https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=${aliAppId}&scope=auth_base&state=${configState}&redirect_uri=${encodeURIComponent(local)}`;
            }
        }
        else {
            props.setCode('');
            // alert('请使用微信或支付宝扫码');
            console.log('请使用微信或支付宝扫码');

            message.error('请使用微信或支付宝扫码');
        }
        // message.destroy();
    }, []);



    useEffect(() => {

    }, [])

    return (
        <div>

        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(_App)
