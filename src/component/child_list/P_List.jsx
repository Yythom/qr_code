

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
        shop,
    } = props


    return (

        <div className='product_list'>
            <div className='shop_wrap'>
                {shop.logo
                    ? <img className='img' src={shop.logo} alt="a" />
                    : <svg t="1608795001756" className="icon img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2982" width="16" height="16"><path d="M96.5 844.9c15.9-1.1 32.7-1.9 50.3-2.5v-15.7h-41.3v-12.4c2.7-3.8 7.4-11.3 14-22.3H98.2v-11.6h28.1c3.8-7.1 7.4-14 10.7-20.6l13.2 4.1c-2.2 5.5-5 11-8.3 16.5h52V792h-58.6c-6.6 11-11.3 18.4-14 22.3h25.6v-14.9h13.2v14.9h32.2v12.4h-32.2v14.9c3.3 0 8.5-0.3 15.7-0.8 7.1 0 12.4-0.3 15.7-0.8 0 4.4-0.3 8.5-0.8 12.4-3.3 0-8.3 0.3-14.9 0.8-7.2 0-12.4 0.3-15.7 0.8v15.7h-13.2v-14.9c-9.9 1.1-23.7 2.2-41.3 3.3h-7.4l-1.7-13.2z m30.6 29.7h137v82.5h-14v-8.3h-109v8.3h-14v-82.5z m14 12.4v19H250v-19H141.1z m0 31.3v18.2H250v-18.2H141.1z m64.4-141.1c23.6 0 50.1-2.2 79.2-6.6l4.1 12.4c-24.8 3.3-48.1 5.2-70.1 5.8v25.6H293v12.4h-29v42.1h-14v-42.1h-32.2c-1.6 14.9-8 30-19 45.4-6.6-6-10.5-9.3-11.6-9.9 13.2-14.3 19.2-34.7 18.2-61.1v-24h0.1zM325.9 778h162.6v14h-75.1c-0.6 18.2-2.2 34.1-5 47.9h94.9v14.9h-77.6v64.4c-0.6 11.6 4.7 17 15.7 16.5h28.1c11 0.5 16.8-3.6 17.3-12.4 0-2.2 0.3-5.2 0.8-9.1 0.5-7.1 1.1-13.2 1.7-18.2 1.6 0.6 4.4 1.4 8.3 2.5 3.3 1.7 5.8 2.8 7.4 3.3-0.6 11-1.7 20.1-3.3 27.2-1.1 15.4-11.6 22.5-31.4 21.5h-32.2c-19.3 0.5-28.6-9.1-28.1-28.9v-66.8h-5c-9.4 43.5-38 78.4-85.8 104.8-2.8-5-6.6-9.9-11.6-14.9 44.6-21.5 71.5-51.4 80.9-89.9h-77.6v-14.9h80.9c3.3-13.7 5-29.7 5-47.9h-71v-14h0.1zM529.7 770.6h175.8v186.5h-14.9v-9.9h-146v9.9h-14.9V770.6z m14.9 14V934h146V784.6h-146z m6.6 48.7c19.2-14.3 34.4-29.7 45.4-46.2l13.2 5.8c-2.2 3.9-5 7.4-8.3 10.7h70.1V816c-10.5 12.7-22.3 23.1-35.5 31.4 14.9 6.1 31.6 9.9 50.3 11.6-1.1 2.8-2.8 6.6-5 11.6 0.5-1.1 0 0-1.7 3.3-23.1-4.4-42.4-10.4-57.8-18.2-17.1 8.8-39.6 16.2-67.7 22.3-1.1-3.8-3.3-8.5-6.6-14 21.5-3.3 41.3-8.8 59.4-16.5-10.5-7.7-19-15.1-25.6-22.3-6.6 7.2-13.5 13.2-20.6 18.2-5.2-5.7-8.5-9-9.6-10.1z m14.8 76.8l4.1-13.2c4.4 0.6 12.1 1.7 23.1 3.3 38 5.5 62.2 9.6 72.6 12.4l-5 14.9c-26.8-6.7-58.4-12.5-94.8-17.4z m20.7-25.6l4.1-14c2.2 0.6 5.8 1.1 10.7 1.7 25.3 4.4 42.4 7.4 51.2 9.1l-5 14c-20.9-4.5-41.2-8.1-61-10.8z m66-67.7h-60.2c8.3 9.4 18.2 17.1 29.7 23.1 12.6-7.1 22.8-14.8 30.5-23.1zM857.3 763.2H873V821h54.5v14.9H783.9V849c0 8.3-0.3 15.7-0.8 22.3h98.2v85.8h-15.7v-71h-83.3c-2.2 27.5-13.2 51.4-33 71.8-1.7-1.6-3.9-4.1-6.6-7.4-3.3-3.3-5.2-5.5-5.8-6.6 22.5-20.3 33-51.7 31.4-94.1v-82.5H784v53.6h73.4v-57.7h-0.1zM166.9 152.4v391c0 36.5 7.2 43.4 42.4 43.4h480.2c34.9 0 42.4-6.7 42.4-43.4v-391c0-35.7-6.6-43.4-42.4-43.4H209.3c-35.1 0-42.4 6.1-42.4 43.4z m498.4 333H233.7c47.2-70.5 131-188.1 152.4-188.1 20.6 0 90.6 95 122.3 128.4 0 0 40.7-55.8 62-55.8 21.7 0.2 94.2 115 94.9 115.5zM538.5 239.3c0-29.6 23.3-53.4 52.1-53.4s52.1 23.9 52.1 53.4-23.3 53.4-52.1 53.4-52.1-23.8-52.1-53.4zM431.8 82.8l-82.6-16.1c-27.4-5.4-38.3-3.4-45 16.1h127.6zM821 158.5l-64.6-12.6v398c0 18.2-1.2 38.9-15.3 53-13.7 13.8-33.5 14.9-51 14.9h-39L734 628c34.2 6.7 42.8 1.5 49.5-34.6l71.1-384.2c6.6-35 1.5-43.9-33.6-50.7z" fill="#bfbfbf" p-id="2983"></path></svg>
                }
                <div className='text'>
                    <span>{shop.shop_name}</span>
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
                                            <span >{np.times(e.coin_price, e.number)}币</span>
                                                ¥{np.times(e.sell_price, e.number)}
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
                                                        {np.times(e.coin_price, e.number)}币
                                                            </span>
                                                        ¥{np.times(e.sell_price, e.number)}
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
                        {list.length <= 2 ? <span >没有更多了</span> : <span onClick={() => setMore(true)}>查看更多</span>}

                    </div> :
                    <div className='cashier_footer'>
                        {list.length}件
                    <span onClick={() => setMore(false)}>收起</span>
                    </div>
            }
            <div className="call_footer">
                <a href={`tel:${props.shop.contact}`} className='call' style={{ color: ' color: rgba(9, 44, 76, 1)' }}>
                    <img src={phone} alt="" />
                    <span >联系商家</span>
                </a>
                <div className='price_box'>
                    <div className='coin_box'>
                        <p>
                            代币价：
                            {isCashier ? <span>{order_detail.coin}</span> : <span>{order_detail.pay.coin}</span>}币
                        </p>
                    </div>
                    <div className='money'>
                        <p>
                            合计：
                        <span>¥{isCashier ? order_detail.allPrice : order_detail.pay.price}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default connect(mapStateToProps, mapDispatchToProps)(P_list)


