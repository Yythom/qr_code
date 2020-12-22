import React, { useEffect } from 'react'
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator'
import { connect } from 'react-redux'

import './style/handle.scss'
import { useState } from 'react'
import { Button, message } from 'antd'
import { isMobile } from '../../utils/utils'
function Handle_phone(props) {
    const [flag, setFlag] = useState(false);
    const [count, setCount] = useState(0);
    const [count_flag, setCount_flag] = useState(0);
    const [phone, setPhone] = useState('');
    const [v, setV] = useState('');


    function countDown() {
        let i = 10;
        setCount_flag(true);
        setCount(i--);
        function go() {
            setTimeout(() => {
                if (i >= 0) {
                    go();
                    setCount(i);
                    i--;
                    console.log(i);
                } else {
                    setCount_flag(false)
                    console.log('结束');
                }
            }, 1000);
        }
        go()
    }
    const getCode = () => {
        if (!isMobile(phone)) {
            message.error('请输入正确的手机号');
            return
        }
        if (!count_flag) {
            // code 逻辑


            countDown();
        } else return
    }
    async function onOk() {

        clear();
    }

    function clear() {
        setCount_flag(false);
        setCount(0);
        setFlag(false);
    }
    return (
        <div className='handle_phone' >
            <div className='title animate__fadeIn animate__animated'>{flag ? '修改手机号' : '手机号'}</div>
            {
                !flag ? <div className='item_box animate__fadeIn animate__animated' onClick={() => setFlag(true)}>
                    <li>
                        <span>联系方式</span>
                        <div>
                            <span style={{ verticalAlign: 'middle', }}>13314231231</span>
                            <svg style={{ verticalAlign: 'middle', marginLeft: '0.4rem' }} t="1608621663428" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10354" width="14" height="14"><path d="M267.354606 72.005964c-13.515828 12.812817-13.515828 33.603329 0 46.417169l414.889265 393.579937-414.889265 393.565611c-13.515828 12.821003-13.515828 33.604352 0 46.425356 13.508665 12.81998 35.418674 12.81998 48.927339 0l432.159604-410.009118c0 0 18.33867-16.991999 18.33867-29.981848 0-11.971659-18.33867-29.989011-18.33867-29.989011L316.282968 72.005964C302.77328 59.184961 280.863271 59.184961 267.354606 72.005964z" fill="#9D9E9D" p-id="10355"></path></svg>
                        </div>
                    </li>
                </div>
                    : <>
                        <div className='item_box animate__fadeIn animate__animated' >
                            <li>
                                <span>手机号</span>
                                <div>
                                    <input maxLength={11} onChange={(e) => { setPhone(e.target.value) }} className='phone_input' placeholder='请输入' />
                                    <span style={!count_flag ? { color: '#704916', marginLeft: '2.4rem' } : { color: '#979797', marginLeft: '2.4rem' }} onClick={() => { getCode() }}>{count_flag && count ? `${count}s后重新获取` : '获取验证码'}</span>
                                </div>
                            </li>
                        </div>
                        <div className='item_box animate__fadeIn animate__animated' >
                            <li>
                                <span>验证码</span>
                                <div>
                                    <input maxLength={6} onChange={(e) => { setV(e.target.value) }} className='phone_input' placeholder='请输入' style={{ verticalAlign: 'middle', }} />
                                </div>
                            </li>
                        </div>
                        <div className='btn_wrap animate__fadeIn animate__animated'>
                            <span onClick={clear}>取消</span>
                            <span onClick={() => { onOk() }}>确认</span>
                        </div>
                    </>
            }
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Handle_phone)