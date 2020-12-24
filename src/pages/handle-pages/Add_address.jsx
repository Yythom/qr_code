import React, { useEffect } from 'react'
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator'
import { connect } from 'react-redux'

import './style/handle.scss'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import default_png from '../../assets/icon/default_address.png'
import { addAddressApi } from '../../api/api'
import { getLal } from '../../utils/utils'
import { message } from 'antd'

function Add_address(props) {
    const history = useHistory();
    const [isDefault, setIsDefault] = useState(2);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [ads, setAds] = useState('');

    async function onOk() {
        message.loading({ content: '保存中', duration: 0 });
        let adResult = await getLal(ads);
        if (adResult) {
            let city = '';
            let longitude = adResult.location.lng;
            let latitude = adResult.location.lat;
            let res = await addAddressApi(phone, name, ads, Number(isDefault), city, longitude, latitude, name, ads);
            if (res) {
                message.destroy();
                message.success('保存成功');
                console.log(res);
                console.log('ok');
                history.goBack();
            }
        }
    }
    function changeDefaultFn() {
        if (isDefault === 1) {
            setIsDefault(2);
        } else {
            setIsDefault(1);
        }
    }

    return (
        <div className='change_address animate__fadeIn animate__animated'>
            <div className='title animate__fadeIn animate__animated'>{'新增收货地'}</div>

            <div className='default' onClick={() => changeDefaultFn()}><div className='img'>{isDefault !== 1 && <img src={default_png} alt="a" />}</div> <span>设为默认地址</span></div>
            <div className={`item_box`}>
                <li>
                    <span>联系人</span>
                    <div className='desc'>
                        <input type="text" onChange={(e) => { setName(e.target.value) }} placeholder='请输入' />
                        <svg style={{ marginLeft: '0.4rem' }} t="1608621663428" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10354" width="14" height="14"><path d="M267.354606 72.005964c-13.515828 12.812817-13.515828 33.603329 0 46.417169l414.889265 393.579937-414.889265 393.565611c-13.515828 12.821003-13.515828 33.604352 0 46.425356 13.508665 12.81998 35.418674 12.81998 48.927339 0l432.159604-410.009118c0 0 18.33867-16.991999 18.33867-29.981848 0-11.971659-18.33867-29.989011-18.33867-29.989011L316.282968 72.005964C302.77328 59.184961 280.863271 59.184961 267.354606 72.005964z" fill="#9D9E9D" p-id="10355"></path></svg>
                    </div>
                </li>
            </div>
            <div className={`item_box`}>
                <li>
                    <span>联系方式</span>
                    <div className='desc'>
                        <input onChange={(e) => { setPhone(e.target.value) }} type="text" placeholder='请输入联系方式' />
                        <svg style={{ marginLeft: '0.4rem' }} t="1608621663428" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10354" width="14" height="14"><path d="M267.354606 72.005964c-13.515828 12.812817-13.515828 33.603329 0 46.417169l414.889265 393.579937-414.889265 393.565611c-13.515828 12.821003-13.515828 33.604352 0 46.425356 13.508665 12.81998 35.418674 12.81998 48.927339 0l432.159604-410.009118c0 0 18.33867-16.991999 18.33867-29.981848 0-11.971659-18.33867-29.989011-18.33867-29.989011L316.282968 72.005964C302.77328 59.184961 280.863271 59.184961 267.354606 72.005964z" fill="#9D9E9D" p-id="10355"></path></svg>
                    </div>
                </li>
            </div>
            <div className={`item_box`}>
                <li>
                    <span>收货地址</span>
                    <div className='desc'>
                        <textarea onChange={(e) => { setAds(e.target.value) }} maxLength={24} type="text" placeholder='请输入地址' />
                        <svg style={{ marginLeft: '0.4rem' }} t="1608621663428" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10354" width="14" height="14"><path d="M267.354606 72.005964c-13.515828 12.812817-13.515828 33.603329 0 46.417169l414.889265 393.579937-414.889265 393.565611c-13.515828 12.821003-13.515828 33.604352 0 46.425356 13.508665 12.81998 35.418674 12.81998 48.927339 0l432.159604-410.009118c0 0 18.33867-16.991999 18.33867-29.981848 0-11.971659-18.33867-29.989011-18.33867-29.989011L316.282968 72.005964C302.77328 59.184961 280.863271 59.184961 267.354606 72.005964z" fill="#9D9E9D" p-id="10355"></path></svg>
                    </div>
                </li>
            </div>

            <div className='btn_wrap animate__fadeIn animate__animated'>
                <span onClick={() => history.goBack()}>取消</span>
                <span onClick={() => { onOk() }}>确认</span>
            </div>
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Add_address)