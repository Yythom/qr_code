import React from 'react'
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator'
import { connect } from 'react-redux'
import { useState } from 'react'
import './carbar.scss'
import cartimg from '../../assets/icon/cart.png'
import Input from '../Cart_input'
import { useHistory } from 'react-router-dom'
import { makeOrder } from '../../api/api'
import np from 'number-precision'
function Carbar(props) {
    const [show, setShow] = useState(false);
    const history = useHistory();
    let { cart, cartSummary, shop_id } = props;
    // let shop_id = props.scan.shop_id;


    function list() {

    }

    async function back() {
        // if (cart[shop_id] && cart[shop_id].list[0]) {
        // let lists = list();
        // await makeOrder(shop_id, lists, localStorage.getItem('table_id')); // 
        setTimeout(() => {
            // props.clearCart()
            history.push('/cashier');
        }, 200);
        // }
    }
    // console.log(props);
    return (
        <div className='carbar'>
            {/* 每一项商品高度 */}
            <ul className={!show ? 'none_ul float_ul' : 'float_ul'} style={{ height: `${30 + 1 * Array.length}rem` }}>

                <div className='title'>
                    <p>已选商品 ({cartSummary?.num} {'测试'} )</p>
                    <p onClick={props.clearCart} >清空</p>
                </div>
                <ul className={'produce_ul'}>
                    {cartSummary?.productList && cartSummary.productList.map(e => {
                        return (
                            <li key={e.product_id}>
                                <div className='desc_wrap'>
                                    <div className='e_img'>
                                        <img src={e.picture} alt="" />
                                    </div>
                                    <div className='e_desc'>
                                        <p>{e.product_name}</p>
                                        <div><Input food_item={e} /></div>
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
                            </li>
                        )
                    })}
                </ul>

            </ul>
            <div className='cart_img footer' >
                <img src={cartimg} alt="0" onClick={() => { setShow(!show) }} />
                <li>{cartSummary?.num}</li>
            </div>
            <div className='normal'>

                <div className='all_price' onClick={() => { setShow(!show) }} >
                    {
                        // profit_name
                        //     ? <>
                        //         <p className='new'>¥{cartSummary?.memberPrice}</p>
                        //         <p className='old'>¥{cartSummary?.oldPrice}</p>
                        //     </>

                        //     : 
                        <p className='new'>¥{cartSummary?.allPrice}  <span>{cartSummary?.coin}币</span></p>

                    }
                </div>
                <div className='submit' onClick={() => { back() }}>
                    提交订单
                </div>
            </div>

            {show && <div className='mask_s' onClick={() => setShow(false)} />}
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Carbar)