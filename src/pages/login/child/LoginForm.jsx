import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Statistic, message } from 'antd';
import { mapStateToProps, mapDispatchToProps } from '../../../redux/actionCreator';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { isMobile, setCookie, getCookie } from '../../../utils/utils'
import { useEffect } from 'react';
import { getPhoneCodeApi, loginApi } from '../../../api/api'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const SubForm = (props) => {
    const history = useHistory();
    const [verifyCode, setVerifyCode] = useState('');
    const [phone, setPhone] = useState('');
    const [flag, setFlag] = useState('');
    const [count, setCount] = useState('');
    const [type, setType] = useState('');

    const onFinish = async (values) => {
        if (!values.phone) {
            message.error('请输入手机号');
        }
        if (!values.verify) {
            message.error('验证码不能为空');
            return
        }
        if (values.verify.length !== 6) {
            message.error('验证码长度错误');
            return
        }
        if (!isMobile(values.phone)) {
            message.error('请输入正确的手机号');
            return
        }

        props.setLoading(true);
        props.setUserInfo(values);
        let result = await loginApi(values.verify, phone);
        if (result) {
            setCookie('token', result.token, 20);
            setTimeout(() => {
                history.push('/home');

            }, 300);
        }
        setFlag(false);
        props.setLoading(false);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    function countDown() {
        let i = 30;
        setFlag(true);
        setCount(i--);
        function go() {
            setTimeout(() => {
                if (i >= 0) {
                    go();
                    setCount(i);
                    i--;
                } else {
                    setFlag(false)
                    console.log('结束');
                }
            }, 1000);
        }
        go();
    }

    const getCode = async () => {
        console.log('获取验证码');
        if (phone.length === 0) {
            message.error('请先输入手机号');
            return
        }
        countDown();
        let res = await getPhoneCodeApi(phone);
        if (!res) {
            message.error('登入失败')
        }
    }
    useEffect(() => {
        if (getCookie('token')) history.push('/home');
    }, [])

    return (
        <div className='login-form' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Form
                // {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="手机号"
                    name="phone"
                    className={type === 'phone' && 'active-wrap'}
                >
                    <Input bordered placeholder='请输入' maxLength={11} onChange={(e) => setPhone(e.target.value)} onClick={() => setType('phone')} onBlur={() => setType('')} />
                </Form.Item>
                <Form.Item
                    label="验证码"
                    name="verify"
                    className={type === 'verify' && 'active-wrap'}
                >
                    <Input placeholder={'六位验证码'} maxLength={6} bordered onClick={() => setType('verify')} onBlur={() => setType('')} />
                </Form.Item>

                {
                    <Form.Item style={{ margin: '0' }}>
                        <Button type="primary" htmlType="submit" loading={props.loading} className='sbbtn' >
                            <span>登入</span> <svg t="1608450482186" className="icon" viewBox="0 0 1000 1000" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5562" width="16" height="16"><path d="M623.27 857.645l292.96875-292.96874999c22.880625-22.880625 22.880625-59.97093751 0-82.85250001l-292.96875-292.96875c-22.880625-22.880625-59.97093751-22.880625-82.85250001 1e-8-22.880625 22.880625-22.880625 59.97093751 1e-8 82.85249999l192.9496875 192.9496875-561.6796875 0c-32.37281249 0-58.59375 26.22093751-58.59375 58.59375001s26.22093751 58.59375 58.59374999 58.59374999l561.67968751 0-192.94968751 192.9496875c-11.42625 11.4553125-17.16843749 26.42625-17.16843749 41.42625s5.7140625 30 17.16843751 41.42625c22.880625 22.880625 59.97093751 22.880625 82.85249999 0z" p-id="5563" fill="#ffffff"></path></svg>
                        </Button>
                    </Form.Item>
                }
                <Button htmlType="button" className='getcodebtn' disabled={flag} loading={flag} onClick={getCode}>
                    {flag && count ? count + 's' : '获取验证码'}
                </Button>
            </Form>
        </div>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(SubForm)