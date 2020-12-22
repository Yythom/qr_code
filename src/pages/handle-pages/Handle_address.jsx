import React, { useEffect } from 'react'
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator'
import { connect } from 'react-redux'

import './style/handle.scss'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

function Handle_address(props) {
    const history = useHistory();
    const [list, setList] = useState([
        {
            address_id: 101,
            is_default: 1,
            address: '青青草原',
            name: '阿三',
            phone: 131429997779
        }, {
            address_id: 102,
            is_default: 0,
            name: '阿2',
            address: '青青草原',
            phone: 131429997779
        }, {
            address_id: 103,
            is_default: 0,
            name: '阿3',
            address: '青青草原',
            phone: 131429997779
        }, {
            address_id: 104,
            is_default: 0,
            name: '阿1',
            address: '青青草原',
            phone: 131429997779
        }, {
            address_id: 105,
            is_default: 0,
            name: '阿a',
            address: '青青草原',
            phone: 131429997779
        }
    ])

    return (
        <div className='handle_address animate__fadeIn animate__animated'>
            <div className='title animate__fadeIn animate__animated'>{'收货地址'}</div>
            {
                list ? <>
                    {
                        list.map((e, i) => {
                            return (
                                <div key={e.address_id} className={`item_box ${e.is_default ? 'default' : 'other'}`} onClick={() => history.push(`/change-address?address_id=${e.address_id}`)}>
                                    <li>
                                        <span>{i > 1 ? null : (e.is_default ? '默认收货地址' : '其他收货地址')}</span>
                                        <div className='desc'>
                                            <div>
                                                <span >{e.name}  {e.phone}</span>
                                                <span >青青草原</span>
                                            </div>
                                            <svg style={{ marginLeft: '0.4rem' }} t="1608621663428" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10354" width="14" height="14"><path d="M267.354606 72.005964c-13.515828 12.812817-13.515828 33.603329 0 46.417169l414.889265 393.579937-414.889265 393.565611c-13.515828 12.821003-13.515828 33.604352 0 46.425356 13.508665 12.81998 35.418674 12.81998 48.927339 0l432.159604-410.009118c0 0 18.33867-16.991999 18.33867-29.981848 0-11.971659-18.33867-29.989011-18.33867-29.989011L316.282968 72.005964C302.77328 59.184961 280.863271 59.184961 267.354606 72.005964z" fill="#9D9E9D" p-id="10355"></path></svg>
                                        </div>
                                    </li>
                                    {!e.is_default && <i />}
                                </div>
                            )
                        })
                    }

                </> : null
            }
            <div className='btn_wrap animate__fadeIn animate__animated'>
                <span onClick={() => { history.push('/add-address') }}>新增收获地址</span>
            </div>
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Handle_address)