import React, { useEffect } from 'react'
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator'
import { connect } from 'react-redux'

import './style/handle.scss'
import { useState } from 'react'
import { Button, message } from 'antd'
import { isMobile, debounce } from '../../utils/utils'
import { changePhoneCodeApi, changePassword } from '../../api/api'
import { useHistory } from 'react-router-dom'

function Handle_password(props) {
    const [flag, setFlag] = useState(false);
    const [count, setCount] = useState(0);
    const [count_flag, setCount_flag] = useState(0);
    const [phone, setPhone] = useState(''); // 手机号
    const [v, setV] = useState(''); // 验证码
    const [password1, setPassword1] = useState(''); // 密码1
    const [password2, setPassword2] = useState(''); // 确认密码
    const history = useHistory();
    function countDown() {
        let i = 60;
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
        go();
    }
    const getCode = async () => {
        if (!isMobile(phone)) {
            message.error('请输入正确的手机号');
            return
        }
        if (!count_flag) {
            // code 逻辑
            countDown();
            message.loading({ content: '获取中...', duration: 0 })
            let res = await changePhoneCodeApi()
            if (res) {
                message.destroy();
                message.success('验证码获取成功')
            }
        } else return
    }
    const onOk = debounce(async () => {
        if (!phone) {
            message.error('请输入手机号');
        }
        if (!v) {
            message.error('验证码不能为空');
            return
        }
        if (!password1) {
            message.error('密码不能为空');
            return
        }
        if (!password2) {
            message.error('密码不能为空');
            return
        }
        if (!isMobile(phone)) {
            message.error('请输入正确的手机号');
            return
        }
        if (password1 !== password2) {
            message.error('两次密码输入不一致');
        }
        if (v.length !== 6) {
            message.error('验证码长度错误');
            return
        }
        message.loading({ content: '修改中...', duration: 0 })
        let result = await changePassword(phone, v, password1, password2);
        if (result) {
            message.destroy();
            message.success('修改成功');
            props.setUserInfo();
            setTimeout(() => {
                clear();
            }, 200);
        }
    }, 300, true)

    const clear = debounce(() => {
        setCount_flag(false);
        setCount(0);
        history.goBack();
    }, 300, true);

    return (
        <div className='handle_phone' >
            <div className='title animate__fadeIn animate__animated'>密码重置</div>
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
            <div style={{ marginTop: '0.5rem', }} className='item_box animate__fadeIn animate__animated' >
                <li>
                    <span>新密码</span>
                    <div>
                        <input maxLength={16} onChange={(e) => { setPassword1(e.target.value) }} className='phone_input' placeholder='请输入' />
                        {/* <svg t="1611051757134" className="icon eyes" viewBox="0 0 2433 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8381" width="16" height="16"><path d="M2176.548336 490.630032a58.623408 58.623408 0 0 1-1.394352 83.418624 59.654016 59.654016 0 0 1-84.024864-1.394352L1925.807472 403.1496a57.471552 57.471552 0 0 1-14.913504-31.766976 1180.167408 1180.167408 0 0 1-271.231776 180.05328l99.059616 213.942096a58.80528 58.80528 0 0 1-29.160144 78.265584 59.71464 59.71464 0 0 1-78.871824-28.978272l-99.241488-214.427088c-0.545616-1.151856-0.424368-2.485584-0.90936-3.698064a1175.014368 1175.014368 0 0 1-368.957664 69.353856c0 0.363744 0.181872 0.60624 0.181872 0.969984v242.496a60.624 60.624 0 0 1-121.248 0v-242.496c0-1.333728 0.666864-2.485584 0.727488-3.819312-113.185008-8.547984-221.095728-34.798176-323.065296-73.05192l-97.60464 212.365872a60.624 60.624 0 0 1-110.153808-50.62104l96.513408-210.06216a1197.324 1197.324 0 0 1-273.171744-189.086256 59.229648 59.229648 0 0 1-14.125392 26.795808L151.039872 553.678992A60.624 60.624 0 0 1 63.86256 469.351008l168.655968-174.294a58.320288 58.320288 0 0 1 27.038304-15.156 1149.976656 1149.976656 0 0 1-100.93896-125.49168l0.363744-0.363744a60.01776 60.01776 0 0 1-16.125984-40.375584 60.624 60.624 0 0 1 60.624-60.624 60.01776 60.01776 0 0 1 40.436208 16.06536l1.879344-1.879344C435.48768 355.074768 760.856688 545.616 1131.4512 545.616c367.68456 0 690.749856-187.691904 881.109216-471.897216l2.12184 1.81872a59.41152 59.41152 0 0 1 47.347344-24.370848 60.624 60.624 0 0 1 60.624 60.563376 59.957136 59.957136 0 0 1-19.460304 44.013024c-36.859392 53.34912-78.447456 103.0608-123.309216 149.559408a58.017168 58.017168 0 0 1 31.342608 15.76224l165.321648 169.565328z" p-id="8382" fill="#999999"></path></svg> */}
                    </div>
                </li>
            </div>
            <div className='item_box animate__fadeIn animate__animated' >
                <li>
                    <span>再次输入新密码</span>
                    <div>
                        <input maxLength={16} onChange={(e) => { setPassword2(e.target.value) }} className='phone_input' placeholder='请输入' />
                    </div>
                </li>
            </div>
            <div className='btn_wrap animate__fadeIn animate__animated'>
                <span onClick={clear}>取消</span>
                <span onClick={() => { onOk() }}>确认</span>
            </div>
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Handle_password)