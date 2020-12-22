

import React, { useEffect } from 'react'
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator'
import { connect } from 'react-redux'
import Input from '../Cart_input'
import np from 'number-precision'
import { useState } from 'react'
import phone from '../../assets/icon/phone.png'
import './p.scss'

function P_list(props) {
    const [like, setLike] = useState('');
    const {
        list,
        more,
        setMore,
        order_detail,
        isCashier, // 是否收银台使用
        isOrderDetails, // 是否订单详情
        shop_detail,
    } = props


    return (

        <div className='product_list'>
            <div className='shop_wrap'>
                <svg t="1608545168713" className="icon img" viewBox="0 0 1203 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7354" width="40" height="40"><path d="M1186.551078 17.019508a57.974017 57.974017 0 0 0-41.017857-17.019508H57.995133a58.069039 58.069039 0 0 0-58.005691 58.069039v907.861922a58.069039 58.069039 0 0 0 58.005691 58.069039H1145.543779a58.069039 58.069039 0 0 0 58.005691-58.069039V58.132388a58.142946 58.142946 0 0 0-16.998392-41.11288zM1110.702355 598.533427L991.713614 436.900895c-90.102033-103.46847-153.281148-73.103642-201.826865 5.374026-41.176228 66.515445-94.378026 162.593311-94.726441 163.226791-56.791521 94.46249-94.747556 166.974883-217.030395 94.46249 0 0-100.058234-61.521508-158.581268-100.966223-71.625521-48.260651-136.388337 84.675218-200.021446 157.219285l-26.764548 29.942508V93.037159H1110.702355v505.549058z m-740.887038-147.706521a139.756341 139.756341 0 1 0-139.555738-139.745783A139.650761 139.650761 0 0 0 369.846991 450.826906z" fill="#C9CCD2" p-id="7355"></path></svg>
                <div className='text'>
                    <span>天干吐糟（cnm店）</span>
                    <aside>
                        <svg t="1608537715980" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6843" width="8" height="8"><path d="M1009.562 454.103c-72.264 88.023-200.049 233.339-200.049 233.339s20.9 159.55 32.614 268.534c5.09 55.51-34.928 79.513-80.25 57.876-86.242-43.325-217.478-110.448-247-125.573-30.044 14.97-162.6 80.988-249.733 124.211-45.844 21.586-86.343-2.416-81.193-57.825 11.869-108.82 32.983-268.216 32.983-268.216S87.685 541.44 14.582 453.529c-25.836-31.928-9.247-77.311 41.697-85.657 103.885-19.64 264.909-50.944 264.909-50.944s88.074-162.335 143.8-261.755C495.657-5.325 516.874 1.66 520.5 3.441c9.452 3.256 24.371 15.022 43.848 51.783 55.091 99.574 142.172 262.124 142.172 262.124s159.13 31.304 261.806 50.995c50.33 8.397 66.765 53.832 41.237 85.76z" fill="#ff9200" p-id="6844"></path></svg>
                        <span>营业中</span>
                    </aside>
                </div>
            </div>


            <div className='food_list'>
                {
                    list[0] && list.map((e, i) => {
                        return (
                            more || i < 2 ? <li key={e.product_id} className='cashier_foot_item'>
                                <div className='desc_wrap'>
                                    <div className='e_img'>
                                        <img src={e.picture} alt="" />
                                    </div>
                                    <div className='e_desc'>
                                        {
                                            !isOrderDetails ? <>
                                                <p>{e.product_name}</p>
                                                <div><Input isCashier food_item={e} /></div>
                                            </> : <>
                                                    <p>{e.product_name}</p>
                                                    <div style={{ textAlign: 'left' }}>{e.number} 件</div>
                                                </>
                                        }
                                    </div>
                                </div>
                                <div className='e_price'>
                                    {
                                        <p className='new'>
                                            <span >{np.times(e.coin, e.number)}币</span>
                                                ¥{np.times(e.price, e.number)}
                                        </p> // 
                                    }
                                </div>
                            </li> : (
                                    more && <li key={e.product_id} className='cashier_foot_item'>
                                        <div className='desc_wrap'>
                                            <div className='e_img'>
                                                <img src={e.picture} alt="" />
                                            </div>
                                            <div className='e_desc'>
                                                {
                                                    !isOrderDetails ? <>
                                                        <p>{e.product_name}</p>
                                                        <div><Input isCashier food_item={e} /></div>
                                                    </> : <>
                                                            <p>{e.product_name}</p>
                                                            <div style={{ textAlign: 'left' }}>{e.number} 件</div>
                                                        </>
                                                }
                                            </div>
                                        </div>
                                        <div className='e_price'>
                                            {
                                                <p className='new'>
                                                    <span >
                                                        {np.times(e.coin, e.number)}币
                                                            </span>
                                                        ¥{np.times(e.price, e.number)}
                                                </p> // 
                                            }
                                        </div>
                                    </li>
                                )
                        )
                    })

                }

            </div>






            {
                !more ?
                    <div className='cashier_footer'>
                        {list.length}件
                 <span onClick={() => setMore(true)}>
                            查看更多
                 </span>
                    </div> :
                    <div className='cashier_footer'>
                        {list.length}件
                    <span onClick={() => setMore(false)}>
                            收起
              </span>
                    </div>
            }
            <div className="call_footer">
                <a href="tel:13764567708" className='call' style={{ color: ' color: rgba(9, 44, 76, 1)' }}>
                    <img src={phone} alt="" />
                    <span >联系商家</span>
                </a>
                <div className='price_box'>
                    <div className='coin_box'>
                        <p>
                            代币价
                            {isCashier ? <span>{order_detail.coin}</span> : <span>{order_detail.pay.coin}</span>}

                        </p>
                    </div>
                    <div className='money'>
                        <p>
                            合计
                        <span>¥{isCashier ? order_detail.allPrice : order_detail.pay.price}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default connect(mapStateToProps, mapDispatchToProps)(P_list)


