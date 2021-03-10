/* eslint-disable no-undef */
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
    function ready() {
        console.log(window.__wxjs_environment === 'miniprogram') // true
    }
    useEffect(() => {
        if (!window.WeixinJSBridge || !WeixinJSBridge.invoke) {
            document.addEventListener('WeixinJSBridgeReady', ready, false)
        } else {
            ready()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    useEffect(() => {

    }, [])

    return (
        <div>
            ...
            <button onClick={() => {
                wx.miniProgram.navigateBack({ delta: 1 })
                Wx.miniProgram.getEnv(function (res) {
                    console.log(res);
                    if (res.miniprogram) {

                        //如果当前是小程序环境
                        Wx.miniProgram.postMessage({
                            data: {
                                name: 'name',
                                age: 12
                            }
                        })
                    }
                })

            }}>向小程序post ——m</button>
            <button onClick={() => {
                wx.miniProgram.switchTab({ url: '/pages/test/index' })
            }}>跳转</button>

        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(_App)
