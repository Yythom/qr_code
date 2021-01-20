import React, { useEffect } from 'react'
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator'
import { connect } from 'react-redux'

import './style/handle.scss'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import default_png from '../../assets/icon/default_address.png'
import { editAddressApi, getAadressDetailApi, delAadressApi } from '../../api/api'
import { message, Popconfirm } from 'antd'
import { getLal, isMobile, debounce } from '../../utils/utils'

function Change_address(props) {
    const history = useHistory();
    const [address_id, setAddress_id] = useState('');

    const [isDefault, setIsDefault] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [ads, setAds] = useState('');

    const onOk = debounce(async () => { // 保存修改的地址
        if (!name || !phone || !ads) { message.error('内容不能为空'); return; }
        if (!isMobile(phone)) {
            message.error('请输入正确的手机号');
            return
        }
        message.loading({ content: '保存中', duration: 0 });
        let adResult = await getLal(ads); // 腾讯地图获取经纬度
        if (adResult) {
            let city = '';
            let longitude = adResult.location.lng;
            let latitude = adResult.location.lat;
            let res = await editAddressApi(phone, name, ads, Number(isDefault), city, longitude, latitude, name, ads, address_id); // 保存接口
            if (res) {
                message.destroy();
                message.success('保存成功');
                props.setAddress(address_id); // 全局保存并使用当前地址
                localStorage.setItem('use_address', address_id) // 本地维护地址
                console.log(res);
                console.log('ok');
                history.goBack();
            }
        }
    }, 300, true)

    function changeDefaultFn() {
        if (isDefault == 1) {
            setIsDefault(2);
        } else {
            setIsDefault(1);
        }
    }

    // 地址id获取详情
    const addressDetail = async (id) => {
        let res = await getAadressDetailApi(id);
        if (res) {
            console.log(res);
            setName(res.name);
            setPhone(res.mobile);
            setAds(res.address);
            setIsDefault(res.is_default);
        } else {
            history.goBack();
        }
    }

    useEffect(() => {
        if (history.location.search) {
            setAddress_id(history.location.search.split('?address_id=')[1]); // 设置当前修改的地址id
            addressDetail(history.location.search.split('?address_id=')[1]); // 默认填写当前信息
        }
    }, [])

    async function confirm(e) {
        message.loading({ content: '删除中...', duration: 0 })
        let res = await delAadressApi(address_id);
        if (res) {
            message.destroy();
            message.success('删除成功');
            history.goBack();
        }
    }


    return (
        <div className='change_address animate__fadeIn animate__animated'>
            <div className='title animate__fadeIn animate__animated'>{'收货地'}</div>
            {
                address_id && <>
                    <div className='useAddress' style={{ backgroundColor: '#E29836', color: '#fff' }}
                        onClick={() => {
                            props.setAddress(address_id);
                            localStorage.setItem('use_address', address_id);
                            history.goBack();
                        }}>
                        <span>使用该地址</span>
                    </div>
                    <div className='default' onClick={() => changeDefaultFn()}>
                        <div className='img'>{isDefault !== 1 && <img src={default_png} alt="a" />}</div> <span>设为默认地址</span>
                    </div>
                    <Popconfirm
                        title="删除地址?"
                        onConfirm={confirm}
                        onCancel={Function.prototype}
                        okText="Yes"
                        cancelText="No"
                        className="del"
                    >
                        <span>删除地址</span>
                    </Popconfirm>,
                    <div className={`item_box`}>
                        <li>
                            <span>联系人</span>
                            <div className='desc'>
                                <input type="text" onChange={(e) => { setName(e.target.value) }} maxLength={10} value={name} />
                                <svg style={{ marginLeft: '0.4rem' }} t="1608621663428" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10354" width="14" height="14"><path d="M267.354606 72.005964c-13.515828 12.812817-13.515828 33.603329 0 46.417169l414.889265 393.579937-414.889265 393.565611c-13.515828 12.821003-13.515828 33.604352 0 46.425356 13.508665 12.81998 35.418674 12.81998 48.927339 0l432.159604-410.009118c0 0 18.33867-16.991999 18.33867-29.981848 0-11.971659-18.33867-29.989011-18.33867-29.989011L316.282968 72.005964C302.77328 59.184961 280.863271 59.184961 267.354606 72.005964z" fill="#9D9E9D" p-id="10355"></path></svg>
                            </div>
                        </li>
                    </div>
                    <div className={`item_box`}>
                        <li>
                            <span>联系方式</span>
                            <div className='desc'>
                                <input type="text" maxLength={11} onChange={(e) => { setPhone(e.target.value) }} value={phone} />
                                <svg style={{ marginLeft: '0.4rem' }} t="1608621663428" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10354" width="14" height="14"><path d="M267.354606 72.005964c-13.515828 12.812817-13.515828 33.603329 0 46.417169l414.889265 393.579937-414.889265 393.565611c-13.515828 12.821003-13.515828 33.604352 0 46.425356 13.508665 12.81998 35.418674 12.81998 48.927339 0l432.159604-410.009118c0 0 18.33867-16.991999 18.33867-29.981848 0-11.971659-18.33867-29.989011-18.33867-29.989011L316.282968 72.005964C302.77328 59.184961 280.863271 59.184961 267.354606 72.005964z" fill="#9D9E9D" p-id="10355"></path></svg>
                            </div>
                        </li>
                    </div>
                    <div className={`item_box`}>
                        <li>
                            <span>收货地址</span>
                            <div className='desc'>
                                <textarea maxLength={24} onChange={(e) => { setAds(e.target.value) }} value={ads} type="text" placeholder={'双流区金运路366号嘉年华青年城8-2-1305'} />
                                <svg style={{ marginLeft: '0.4rem' }} t="1608621663428" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10354" width="14" height="14"><path d="M267.354606 72.005964c-13.515828 12.812817-13.515828 33.603329 0 46.417169l414.889265 393.579937-414.889265 393.565611c-13.515828 12.821003-13.515828 33.604352 0 46.425356 13.508665 12.81998 35.418674 12.81998 48.927339 0l432.159604-410.009118c0 0 18.33867-16.991999 18.33867-29.981848 0-11.971659-18.33867-29.989011-18.33867-29.989011L316.282968 72.005964C302.77328 59.184961 280.863271 59.184961 267.354606 72.005964z" fill="#9D9E9D" p-id="10355"></path></svg>
                            </div>
                        </li>
                    </div>

                    <div className='btn_wrap animate__fadeIn animate__animated'>
                        <span onClick={() => history.goBack()}>取消</span>
                        <span onClick={() => { onOk() }}>确认</span>
                    </div>
                </>
            }
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Change_address)