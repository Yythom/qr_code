import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Statistic, message } from 'antd';
import { mapStateToProps, mapDispatchToProps } from '../../../redux/actionCreator';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { isMobile, setCookie, getCookie, clearCookie } from '../../../utils/utils'
import { useEffect } from 'react';
import { getPhoneCodeApi, loginApi } from '../../../api/api'
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
    const [type, setType] = useState('');

    const onFinish = async (values) => {
        if (!values.phone) {
            message.error('请输入手机号');
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

        let result = await loginApi(values.verify, phone, values.password);
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
    };

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

    const getCode = async () => {
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
    }
    useEffect(() => {
        const p = new URLSearchParams(window.location.search);
        if (!p.get('overdueToken')) {
            if (getCookie('token') && localStorage.getItem('info')) history.push('/integral');
        } else {
            message.destroy();
            message.error('登入过期')
        }
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
                    className={type === 'phone' && 'active-wrap'}
                >
                    <Input bordered placeholder='输入您的手机号' maxLength={11} onChange={(e) => setPhone(e.target.value)} onClick={() => setType('phone')} onBlur={() => setType('')} />
                </Form.Item>

                {
                    verify ? <Form.Item
                        label={<img className='icon_lable' src={password_icon} alt="" />}
                        name="verify"
                        className={type === 'verify' && 'active-wrap'}
                    >
                        <Input placeholder={'请输入六位验证码'} maxLength={6} bordered onClick={() => setType('verify')} onBlur={() => setType('')} />
                    </Form.Item>
                        : <Form.Item
                            label={<img className='icon_lable' src={password_icon} alt="" />}
                            name="password"
                            className={type === 'verify' && 'active-wrap'}
                        >
                            <Input placeholder={'请输入您的密码'} maxLength={6} bordered onClick={() => setType('verify')} onBlur={() => setType('')} />
                        </Form.Item>
                }



                <Form.Item style={{ margin: '0' }}>
                    <Button type="primary" htmlType="submit" loading={props.loading} className='sbbtn' >
                        <span>登入</span>
                    </Button>
                    {/* <div> 浏览首页 <svg t="1608450482186" className="icon" viewBox="0 0 1000 1000" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5562" width="16" height="16"><path d="M623.27 857.645l292.96875-292.96874999c22.880625-22.880625 22.880625-59.97093751 0-82.85250001l-292.96875-292.96875c-22.880625-22.880625-59.97093751-22.880625-82.85250001 1e-8-22.880625 22.880625-22.880625 59.97093751 1e-8 82.85249999l192.9496875 192.9496875-561.6796875 0c-32.37281249 0-58.59375 26.22093751-58.59375 58.59375001s26.22093751 58.59375 58.59374999 58.59374999l561.67968751 0-192.94968751 192.9496875c-11.42625 11.4553125-17.16843749 26.42625-17.16843749 41.42625s5.7140625 30 17.16843751 41.42625c22.880625 22.880625 59.97093751 22.880625 82.85249999 0z" p-id="5563" fill="#000"></path></svg></div> */}
                </Form.Item>

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