import React, { useEffect } from 'react'
import { mapStateToProps, mapDispatchToProps } from '../../../redux/actionCreator'
import { connect } from 'react-redux'
import InputCart from '../../../component/Cart_input'
import './food.scss'
import { useState } from 'react'

function Food(props) {
    const [like, setLike] = useState('');
    const {
        food, // 单项商品
        shop_id,
    } = props
    useEffect(() => {
        setLike(food.isLike);
    }, [])
    const changeLike = async () => {
        console.log(like);
        if (like === 1) {
            setLike(2);
        } else {
            setLike(1);
        }
    }
    return (
        <div className='food_item'>

            {
                food ?
                    <>
                        <div className='img_wrap'>
                            <img src={food.picture} alt="error" />
                        </div>
                        <div className='content'>
                            <p>{food.product_name}</p>
                            <div className='price_wrap'>
                                <div>

                                    <span className='new'>¥{food.sell_price}</span>
                                    <span className='coin'>{food.coin_price}币</span>
                                </div>
                                <InputCart isShowIcon food_item={food} />
                            </div>
                        </div>
                        {/* <div className='like' onClick={() => changeLike(food)}>
                            {
                                like === 1 ? <svg t="1608530589970" className="icon" viewBox="0 0 1169 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1955" width="16" height="16"><path d="M1066.410652 101.014547a351.657376 351.657376 0 0 0-481.963823-10.588365 351.657376 351.657376 0 0 0-481.963822 10.588365 344.199148 344.199148 0 0 0 0 490.001706L506.232046 991.171431a109.632085 109.632085 0 0 0 156.390923 0l403.787683-399.884672a344.199148 344.199148 0 0 0 0-490.388143z m-52.246238 438.489697L610.37673 939.620779a36.55691 36.55691 0 0 1-51.898445 0L154.342809 539.504244a271.858202 271.858202 0 0 1 0-386.977688 277.345603 277.345603 0 0 1 380.408264-6.22163l49.695756 42.739896 49.347964-42.739896a277.345603 277.345603 0 0 1 380.408264 8.037883 271.858202 271.858202 0 0 1 0 385.161435z" fill="#FF3636" p-id="1956"></path><path d="M337.784299 182.861835a155.3089 155.3089 0 0 0-155.3089 155.308901 18.278455 18.278455 0 0 0 36.556909 0 118.751991 118.751991 0 0 1 118.751991-118.751991 18.278455 18.278455 0 1 0 0-36.55691z" fill="#FF3636" p-id="1957"></path></svg>
                                    : <svg t="1608530810135" className="icon" viewBox="0 0 1171 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3709" width="18" height="18"><path d="M 1014.7 147.91 s 0 -3.25079 0 0 C 894.425 27.632 705.879 24.381 582.349 134.908 C 458.819 24.381 270.273 27.632 153.243 144.66 C 32.9653 264.94 29.7143 459.987 149.993 580.267 l 3.25079 3.25079 l 360.838 357.587 c 39.0095 39.0095 100.775 39.0095 139.784 0 l 360.838 -357.587 C 1134.98 463.238 1134.98 268.19 1014.7 147.91 Z M 897.676 401.473 c -9.75238 0 -16.254 -6.50159 -16.254 -16.254 c 0 -58.5143 -48.7619 -107.276 -107.276 -107.276 c -9.75238 0 -16.254 -6.50159 -16.254 -16.254 s 6.50159 -16.254 16.254 -16.254 c 78.0191 0 139.784 61.7651 139.784 139.784 c 0 9.75238 -6.50159 16.254 -16.254 16.254 Z" fill="#fe2c55" p-id="3710"></path></svg>
                            }
                        </div> */}
                    </>
                    : null
            }
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Food)