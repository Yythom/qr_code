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
        <>
            {
                props.userStore && <div className="center_wrap animate__fadeIn animate__animated">
                    <div className='info_wrap'>
                        <h3>个人中心</h3>
                        <div className='avatar_wrap'>
                            <div className='avatar'>
                                {
                                    props.userStore.avatar
                                        ? <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3028333849,2986765516&fm=26&gp=0.jpg" alt="x" />
                                        : <svg t="1608795001756" className="icon img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2982" width="16" height="16"><path d="M96.5 844.9c15.9-1.1 32.7-1.9 50.3-2.5v-15.7h-41.3v-12.4c2.7-3.8 7.4-11.3 14-22.3H98.2v-11.6h28.1c3.8-7.1 7.4-14 10.7-20.6l13.2 4.1c-2.2 5.5-5 11-8.3 16.5h52V792h-58.6c-6.6 11-11.3 18.4-14 22.3h25.6v-14.9h13.2v14.9h32.2v12.4h-32.2v14.9c3.3 0 8.5-0.3 15.7-0.8 7.1 0 12.4-0.3 15.7-0.8 0 4.4-0.3 8.5-0.8 12.4-3.3 0-8.3 0.3-14.9 0.8-7.2 0-12.4 0.3-15.7 0.8v15.7h-13.2v-14.9c-9.9 1.1-23.7 2.2-41.3 3.3h-7.4l-1.7-13.2z m30.6 29.7h137v82.5h-14v-8.3h-109v8.3h-14v-82.5z m14 12.4v19H250v-19H141.1z m0 31.3v18.2H250v-18.2H141.1z m64.4-141.1c23.6 0 50.1-2.2 79.2-6.6l4.1 12.4c-24.8 3.3-48.1 5.2-70.1 5.8v25.6H293v12.4h-29v42.1h-14v-42.1h-32.2c-1.6 14.9-8 30-19 45.4-6.6-6-10.5-9.3-11.6-9.9 13.2-14.3 19.2-34.7 18.2-61.1v-24h0.1zM325.9 778h162.6v14h-75.1c-0.6 18.2-2.2 34.1-5 47.9h94.9v14.9h-77.6v64.4c-0.6 11.6 4.7 17 15.7 16.5h28.1c11 0.5 16.8-3.6 17.3-12.4 0-2.2 0.3-5.2 0.8-9.1 0.5-7.1 1.1-13.2 1.7-18.2 1.6 0.6 4.4 1.4 8.3 2.5 3.3 1.7 5.8 2.8 7.4 3.3-0.6 11-1.7 20.1-3.3 27.2-1.1 15.4-11.6 22.5-31.4 21.5h-32.2c-19.3 0.5-28.6-9.1-28.1-28.9v-66.8h-5c-9.4 43.5-38 78.4-85.8 104.8-2.8-5-6.6-9.9-11.6-14.9 44.6-21.5 71.5-51.4 80.9-89.9h-77.6v-14.9h80.9c3.3-13.7 5-29.7 5-47.9h-71v-14h0.1zM529.7 770.6h175.8v186.5h-14.9v-9.9h-146v9.9h-14.9V770.6z m14.9 14V934h146V784.6h-146z m6.6 48.7c19.2-14.3 34.4-29.7 45.4-46.2l13.2 5.8c-2.2 3.9-5 7.4-8.3 10.7h70.1V816c-10.5 12.7-22.3 23.1-35.5 31.4 14.9 6.1 31.6 9.9 50.3 11.6-1.1 2.8-2.8 6.6-5 11.6 0.5-1.1 0 0-1.7 3.3-23.1-4.4-42.4-10.4-57.8-18.2-17.1 8.8-39.6 16.2-67.7 22.3-1.1-3.8-3.3-8.5-6.6-14 21.5-3.3 41.3-8.8 59.4-16.5-10.5-7.7-19-15.1-25.6-22.3-6.6 7.2-13.5 13.2-20.6 18.2-5.2-5.7-8.5-9-9.6-10.1z m14.8 76.8l4.1-13.2c4.4 0.6 12.1 1.7 23.1 3.3 38 5.5 62.2 9.6 72.6 12.4l-5 14.9c-26.8-6.7-58.4-12.5-94.8-17.4z m20.7-25.6l4.1-14c2.2 0.6 5.8 1.1 10.7 1.7 25.3 4.4 42.4 7.4 51.2 9.1l-5 14c-20.9-4.5-41.2-8.1-61-10.8z m66-67.7h-60.2c8.3 9.4 18.2 17.1 29.7 23.1 12.6-7.1 22.8-14.8 30.5-23.1zM857.3 763.2H873V821h54.5v14.9H783.9V849c0 8.3-0.3 15.7-0.8 22.3h98.2v85.8h-15.7v-71h-83.3c-2.2 27.5-13.2 51.4-33 71.8-1.7-1.6-3.9-4.1-6.6-7.4-3.3-3.3-5.2-5.5-5.8-6.6 22.5-20.3 33-51.7 31.4-94.1v-82.5H784v53.6h73.4v-57.7h-0.1zM166.9 152.4v391c0 36.5 7.2 43.4 42.4 43.4h480.2c34.9 0 42.4-6.7 42.4-43.4v-391c0-35.7-6.6-43.4-42.4-43.4H209.3c-35.1 0-42.4 6.1-42.4 43.4z m498.4 333H233.7c47.2-70.5 131-188.1 152.4-188.1 20.6 0 90.6 95 122.3 128.4 0 0 40.7-55.8 62-55.8 21.7 0.2 94.2 115 94.9 115.5zM538.5 239.3c0-29.6 23.3-53.4 52.1-53.4s52.1 23.9 52.1 53.4-23.3 53.4-52.1 53.4-52.1-23.8-52.1-53.4zM431.8 82.8l-82.6-16.1c-27.4-5.4-38.3-3.4-45 16.1h127.6zM821 158.5l-64.6-12.6v398c0 18.2-1.2 38.9-15.3 53-13.7 13.8-33.5 14.9-51 14.9h-39L734 628c34.2 6.7 42.8 1.5 49.5-34.6l71.1-384.2c6.6-35 1.5-43.9-33.6-50.7z" fill="#bfbfbf" p-id="2983"></path></svg>
                                }
                            </div>
                            <div className='info'>
                                <span>{props.userStore.nickname}</span>
                                <span>{props.userStore.mobile ? props.userStore.mobile.replace(/(.{3}).*(.{4})/, '$1****$2') : '暂无绑定手机号'}</span>
                            </div>
                        </div>
                        <div className="a_count">
                            <div className='count_box'>
                                <span> {props.userStore.coin}</span>
                                <span>当前代币余额</span>
                            </div>
                            <div className='count_box'>
                                <span>{props.userStore.total_coin}</span>
                                <span>入账次数</span>
                            </div>
                            <div className='count_box'>
                                <span>{props.userStore.total_coin_number}</span>
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
            }
        </>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(User_center)