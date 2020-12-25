import React, { useEffect } from 'react'
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator'
import { connect } from 'react-redux'

import './style/handle.scss'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useRef } from 'react'
import { debounce } from '../../utils/utils'
import { message } from 'antd'
import { addressListApi } from '../../api/api'

function Handle_address(props) {
    const history = useHistory();
    const listDOM = useRef();
    const wrapDOM = useRef();
    const [listHeight, setListHight] = useState(0);
    const [wrapHeight, setWrapHight] = useState(0);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(1);
    const [list, setList] = useState([])


    // 滚动到底部的事件
    const scrollFn = debounce(async (h) => {
        if (h === 0) {
            console.log('到底了');
            if (total === list.length) {
                message.warn('到底了');
                return
            }
            if (total > 6 && list.length !== total) {
                message.loading({ content: '加载中', duration: 0 })
                let res = await addressListApi(page + 1);
                if (res) {
                    setList([...list, ...res.list]);
                    setPage(page + 1);
                    setTotal(res.total);
                    message.destroy();
                    message.success('加载成功');
                }
            }
        }
    }, 200);

    useEffect(() => { setListHight(listDOM.current.clientHeight) }, [list])
    useEffect(() => {
        setWrapHight(wrapDOM.current.clientHeight);
        addressListApi().then(res => {
            console.log(res);
            if (res) {
                setTotal(res.total);
                setList(res.list);
                setListHight(listDOM.current.clientHeight);
            }
        })
    }, [])

    return (
        <div className='handle_address animate__fadeIn animate__animated'>
            <div className='title animate__fadeIn animate__animated'>{'收货地址'}</div>
            {
                list ? <div className='list_wrap' ref={wrapDOM} onScroll={(e) => {
                    scrollFn(listHeight - wrapHeight - e.target.scrollTop)
                }}>
                    <div ref={listDOM}>
                        {
                            list.map((e, i) => {
                                return (
                                    <div key={e.address_id} className={`item_box ${e.is_default !== 1 ? 'default' : 'other'}`} onClick={() => history.push(`/integral/change-address?address_id=${e.address_id}`)}>
                                        <li>
                                            {i > 1 ? null : <span>{e.is_default !== 1 ? '默认收货地址' : '其他收货地址'}</span>}
                                            {
                                                props.useAddress === e.address_id ? <span style={{ color: '#704916' }}>当前使用地址</span> : <span></span>
                                            }
                                            <div className='desc'>
                                                <div>
                                                    <span >{e.name}  {e.mobile}</span>
                                                    <span >{e.address}</span>
                                                </div>
                                                <svg style={{ marginLeft: '0.4rem' }} t="1608621663428" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10354" width="14" height="14"><path d="M267.354606 72.005964c-13.515828 12.812817-13.515828 33.603329 0 46.417169l414.889265 393.579937-414.889265 393.565611c-13.515828 12.821003-13.515828 33.604352 0 46.425356 13.508665 12.81998 35.418674 12.81998 48.927339 0l432.159604-410.009118c0 0 18.33867-16.991999 18.33867-29.981848 0-11.971659-18.33867-29.989011-18.33867-29.989011L316.282968 72.005964C302.77328 59.184961 280.863271 59.184961 267.354606 72.005964z" fill="#9D9E9D" p-id="10355"></path></svg>
                                            </div>
                                        </li>
                                        {!e.is_default !== 1 && <i />}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div> : null
            }
            <div className='btn_wrap animate__fadeIn animate__animated'>
                <span onClick={() => { history.push('/integral/add-address') }}>新增收获地址</span>
            </div>
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Handle_address)