import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { mapStateToProps, mapDispatchToProps } from '../../../redux/actionCreator';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { isMobile, setCookie, getCookie, debounce } from '../../../utils/utils'
import { useEffect } from 'react';
import { getPhoneCodeApi, loginApi, password_loginApi } from '../../../api/api'
import mobile_icon from '../../../assets/icon/mobile.png'
import password_icon from '../../../assets/icon/password.png'

// const layout = {
//     labelCol: { span: 8 },
//     wrapperCol: { span: 16 },
// };

const SubForm = (props) => {
    const [form] = Form.useForm();
    const history = useHistory();
    const [verify, setVerify] = useState(true); // true验证码登入
    const [phone, setPhone] = useState('');
    const [flag, setFlag] = useState('');
    const [count, setCount] = useState('');
    const [eyesShow, setEyesShow] = useState(true);

    const onFinish = debounce(async (values) => {
        if (!values.phone) {
            message.error('请输入手机号');
            return;
        }
        if (!values.verify && verify) {
            message.error('验证码不能为空');
            return
        }
        if (values?.verify?.length !== 6 && verify) {
            message.error('验证码长度错误');
            return
        }
        if (!isMobile(values.phone)) {
            message.error('请输入正确的手机号');
            return
        }

        props.setLoading(true);

        let result;
        if (verify) {
            result = await loginApi(values.verify, phone, values.password);
        } else {
            result = await password_loginApi(phone, values.password);
        }

        if (result) {
            setCookie('token', result.token, 20);
            setTimeout(async () => {
                let info_result = await props.setUserInfo();
                props.activeTab(0);
                if (info_result) {
                    setFlag(false);
                    props.setLoading(false);
                    setTimeout(() => {
                        if (localStorage.getItem('router')) {

                            setTimeout(() => {
                                if (localStorage.getItem('router') !== '/integral/order' && localStorage.getItem('router') !== '/integral/center') {
                                    localStorage.setItem('goback', -2);
                                }
                                localStorage.removeItem('router');
                            }, 100);


                            history.replace(localStorage.getItem('router'));

                        } else {
                            history.push('/integral')
                        }
                    }, 200);
                }
            }, 100);
        } else {
            setFlag(false);
            props.setLoading(false);
        }
    }, 300, true);

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    function countDown() {
        let i = 60;
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

    const getCode = debounce(async () => {
        console.log('获取验证码');
        if (phone.length === 0) {
            message.error('请先输入手机号');
            return
        }
        countDown();
        let res = await getPhoneCodeApi(phone);
        if (!res) {
            message.error('登入失败');
        }
    }, 300, true);
    useEffect(() => {
        const p = new URLSearchParams(window.location.search);
        if (!p.get('overdueToken')) {
            if (getCookie('token') && localStorage.getItem('info')) history.push('/integral');
        } else {
            message.destroy();
            message.error('登入过期')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='login-form animate__fadeIn animate__animated' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className='login_type' onClick={() => { setVerify(!verify); form.resetFields(); }} style={{ color: '#999' }}>{verify ? <><span>密码登入 <svg t="1611050700584" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7470" width="16" height="16"><path d="M33.983285559835394 554.6210328441152L844.3269608823044 554.6210328441152 637.3996785040327 753.8238916582716c-5.296905397201645 5.298286238024694-5.296905397201645 13.885735316543212 4.905732080279064e-15 19.185402395390945l41.56330877366258 41.564689614485566a13.569522768065841 13.569522768065841 0 0 0 19.186783236213994-9.811464160558128e-15l260.49009790419734-250.77312103242812c0.2996424586008229-0.2526938706172841 0.5965232355555554-0.5136727861728396 0.879595604279835-0.7953643140740744l1.3918875496296288-1.39188754962963 40.174182905679-38.67320893102883a13.530859225020574 13.530859225020574 0 0 0 3.9381580273250956-10.328689356378598 13.523955020905348 13.523955020905348 0 0 0-3.935396345679019-10.353544491193414l-41.56607045530864-40.06509648065842c-0.2692639604938272-0.26374059720164594-0.5495746475720168-0.5109111045267488-0.8312661754732514-0.7511774077366251l-260.53980817382717-250.8159270979422a13.56676108641975 13.56676108641975 0 0 0-19.186783236213994 9.811464160558128e-15l-41.56607045530862 41.56607045530865c-5.296905397201645 5.296905397201647-5.296905397201645 13.885735316543212 9.811464160558128e-15 19.186783236213994L842.3854986851029 468.71202103835367l-808.3994514436214 3.139668531378601e-13c-7.492442305843622 2.452866040139532e-15-13.565380245596698 6.072937939753094-13.565380245596698 13.56399940477367l2.4528660401395314e-14 58.783774677860066c4.292515570244181e-15 7.489680624197531 6.072937939753094 13.565380245596698 13.565380245596714 13.565380245596698l-0.002761681646090537-0.004142522469135801z" p-id="7471" fill="#999999"></path></svg></span><span>忘记密码？</span></> : <span>验证码登入</span>} </div>
            <Form
                // {...layout}
                form={form}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label={<img className='icon_lable' src={mobile_icon} alt="" />}
                    name="phone"
                >
                    <Input bordered placeholder={verify ? '输入您的手机号' : '输入您的账号'} maxLength={11} onChange={(e) => setPhone(e.target.value)} />
                </Form.Item>

                {
                    verify ? <Form.Item
                        label={<img className='icon_lable' src={password_icon} alt="" />}
                        name="verify"
                    >
                        <Input placeholder={'请输入六位验证码'} maxLength={6} bordered />
                    </Form.Item>
                        : <Form.Item
                            label={<img className='icon_lable' src={password_icon} alt="" />}
                            name="password"
                        >
                            <Input type={!eyesShow ? 'string' : 'password'} placeholder={'请输入您的密码'} maxLength={18} bordered />
                        </Form.Item>
                }

                <Form.Item style={{ margin: '0' }}>
                    <Button type="primary" htmlType="submit" loading={props.loading} className='sbbtn' >
                        <span>登入</span>
                    </Button>
                </Form.Item>
                {
                    !verify
                    && <div className="eyes" onClick={() => setEyesShow(!eyesShow)}>
                        {
                            eyesShow
                                ? <svg t="1611492695195" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6080" width="20" height="20"><path d="M941.677 391.71c9.338-14.006 6.225-32.681-6.225-43.575-14.006-10.894-32.681-7.781-43.575 6.225-1.557 1.556-174.3 205.426-379.728 205.426-199.2 0-379.727-205.426-381.283-206.982-10.895-12.45-31.125-14.006-43.576-3.113-12.45 10.894-14.006 31.125-3.113 43.576 3.113 4.668 40.463 46.687 99.6 93.375l-79.37 82.482c-12.45 12.45-10.893 32.681 1.557 43.575 3.113 6.225 10.894 9.338 18.676 9.338 7.78 0 15.562-3.113 21.787-9.338l85.594-88.706c40.463 28.013 88.707 54.47 141.62 73.144l-32.682 110.495c-4.668 17.118 4.67 34.237 21.788 38.906h9.337c14.006 0 26.457-9.338 29.569-23.344l32.681-110.495c24.9 4.669 51.357 7.782 77.813 7.782s52.913-3.113 77.814-7.782l32.68 108.939c3.114 14.006 17.12 23.343 29.57 23.343 3.113 0 6.225 0 7.782-1.556 17.118-4.67 26.456-21.787 21.788-38.906L649.099 595.58c52.914-18.676 101.157-45.132 141.62-73.144l84.038 87.15c6.225 6.225 14.006 9.338 21.787 9.338 7.781 0 15.563-3.113 21.787-9.337 12.45-12.451 12.45-31.125 1.557-43.576l-79.37-82.481c63.808-46.689 101.16-91.82 101.16-91.82z" p-id="6081" fill="#8a8a8a"></path></svg>
                                : <svg t="1611492989600" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6745" width="20" height="20"><path d="M514.048 252.695273c169.425455 0 315.298909 99.374545 383.534545 242.827636h66.56c-72.145455-177.896727-246.318545-303.522909-450.094545-303.522909s-377.949091 125.626182-450.048 303.522909h66.513455c68.235636-143.453091 214.109091-242.827636 383.534545-242.827636z m0 485.655272c-169.425455 0-315.298909-99.374545-383.534545-242.827636H64c72.098909 177.943273 246.272 303.569455 450.048 303.569455s377.949091-125.626182 450.094545-303.569455h-66.56c-68.235636 143.453091-214.109091 242.827636-383.534545 242.827636z m-161.885091-242.827636a161.885091 161.885091 0 1 0 323.770182 0 161.885091 161.885091 0 0 0-323.770182 0z m263.074909 0a101.189818 101.189818 0 1 1-202.379636 0 101.189818 101.189818 0 0 1 202.379636 0z" fill="#8a8a8a" p-id="6746"></path></svg>
                        }
                    </div>
                }
                {
                    verify ? <span className='getcodebtn' onClick={getCode}>
                        {flag && count ? '重新获取 ( ' + count + 's )' : '获取验证码'}
                    </span> : null
                }

            </Form>
        </div>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(SubForm)