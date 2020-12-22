import React, { useEffect, useState } from 'react'
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import np from 'number-precision'

import './usercenter.scss'
function User_center(props) {
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState(null);
    const history = useHistory();

    function hideLoading(status) {
        setTimeout(() => {
            setLoading(status)
        }, 400);
    }

    function init() {

    }




    useEffect(() => {
        init();

        // eslint-disable-next-line
    }, [])

    return (
        <div className="center_wrap animate__fadeIn animate__animated">
            <div className='info_wrap'>
                <h3>个人中心</h3>
                <div className='avatar_wrap'>
                    <div className='avatar'>
                        <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3028333849,2986765516&fm=26&gp=0.jpg" alt="x" />
                    </div>
                    <div className='info'>
                        <span>小叮当</span>
                        <span>{'13145210000'.replace(/(.{3}).*(.{4})/, '$1****$2')}</span>
                    </div>
                </div>
                <div className="a_count">
                    <div className='count_box'>
                        <span> 67</span>
                        <span>
                            当前代币余额
                        </span>
                    </div>
                    <div className='count_box'>
                        <span> 67</span>
                        <span>入账次数</span>
                    </div>
                    <div className='count_box'>
                        <span>67</span>
                        <span>累计入账 </span>
                    </div>
                </div>
            </div>

            <div className="handle_wrap">
                <div className="item_box" onClick={() => history.push('/phone')}>
                    <li>
                        <span>我的手机号</span>
                        <div>
                            <span style={{ verticalAlign: 'middle' }}>修改</span>
                            <svg style={{ verticalAlign: 'middle' }} t="1608621663428" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10354" width="14" height="14"><path d="M267.354606 72.005964c-13.515828 12.812817-13.515828 33.603329 0 46.417169l414.889265 393.579937-414.889265 393.565611c-13.515828 12.821003-13.515828 33.604352 0 46.425356 13.508665 12.81998 35.418674 12.81998 48.927339 0l432.159604-410.009118c0 0 18.33867-16.991999 18.33867-29.981848 0-11.971659-18.33867-29.989011-18.33867-29.989011L316.282968 72.005964C302.77328 59.184961 280.863271 59.184961 267.354606 72.005964z" fill="#9D9E9D" p-id="10355"></path></svg>
                        </div>
                    </li>
                    <i />
                </div>
                <div className="item_box" onClick={() => history.push('/address')}>
                    <li>
                        <span>收获地址</span>
                        <div>
                            <span style={{ verticalAlign: 'middle' }}>修改</span>
                            <svg style={{ verticalAlign: 'middle' }} t="1608621663428" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10354" width="14" height="14"><path d="M267.354606 72.005964c-13.515828 12.812817-13.515828 33.603329 0 46.417169l414.889265 393.579937-414.889265 393.565611c-13.515828 12.821003-13.515828 33.604352 0 46.425356 13.508665 12.81998 35.418674 12.81998 48.927339 0l432.159604-410.009118c0 0 18.33867-16.991999 18.33867-29.981848 0-11.971659-18.33867-29.989011-18.33867-29.989011L316.282968 72.005964C302.77328 59.184961 280.863271 59.184961 267.354606 72.005964z" fill="#9D9E9D" p-id="10355"></path></svg>
                        </div>
                    </li>
                    <i />
                </div>
                <div className="item_box" onClick={() => history.push('/booked')}>
                    <li>
                        <span>入账订单</span>
                        <div>
                            <span style={{ verticalAlign: 'middle' }}>查看</span>
                            <svg style={{ verticalAlign: 'middle' }} t="1608621663428" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10354" width="14" height="14"><path d="M267.354606 72.005964c-13.515828 12.812817-13.515828 33.603329 0 46.417169l414.889265 393.579937-414.889265 393.565611c-13.515828 12.821003-13.515828 33.604352 0 46.425356 13.508665 12.81998 35.418674 12.81998 48.927339 0l432.159604-410.009118c0 0 18.33867-16.991999 18.33867-29.981848 0-11.971659-18.33867-29.989011-18.33867-29.989011L316.282968 72.005964C302.77328 59.184961 280.863271 59.184961 267.354606 72.005964z" fill="#9D9E9D" p-id="10355"></path></svg>
                        </div>
                    </li>
                    <i />
                </div>
                <div className="item_box" onClick={() => {
                    history.push('/order');
                    props.activeTab(1);
                }}>
                    <li>
                        <span>商城订单</span>
                        <div>
                            <span style={{ verticalAlign: 'middle' }}>查看</span>
                            <svg style={{ verticalAlign: 'middle' }} t="1608621663428" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10354" width="14" height="14"><path d="M267.354606 72.005964c-13.515828 12.812817-13.515828 33.603329 0 46.417169l414.889265 393.579937-414.889265 393.565611c-13.515828 12.821003-13.515828 33.604352 0 46.425356 13.508665 12.81998 35.418674 12.81998 48.927339 0l432.159604-410.009118c0 0 18.33867-16.991999 18.33867-29.981848 0-11.971659-18.33867-29.989011-18.33867-29.989011L316.282968 72.005964C302.77328 59.184961 280.863271 59.184961 267.354606 72.005964z" fill="#9D9E9D" p-id="10355"></path></svg>
                        </div>
                    </li>
                    <i />
                </div>
            </div>
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(User_center)