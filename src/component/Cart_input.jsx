import React from 'react'
import { mapStateToProps, mapDispatchToProps } from '../redux/actionCreator'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import np from 'number-precision'
import cartIcon from '../assets/icon/addCart.png'
import './Cart_input.scss'
import { message } from 'antd'

function Input(props) {
    const [num, setNum] = useState(0)
    let {
        food_item,
        addCart,
        isShowIcon,
        isCashier,
    } = props;

    function cartFn(food, shop_id, current) {
        if (isCashier) {
            if (props.cartSummary.num === 1 && current === 'del') {
                message.info('已经是最后一件了～')
                return
            }
        }
        if (num === 0 && current === 'del') { // 如果数量为0 并且执行减操作的时候 不执行
            return
        }
        addCart(food, shop_id, current);
        foodNum(food);
    }
    // useEffect(() => {
    //     if (props.shop_id) foodNum(food_item);
    //     // eslint-disable-next-line
    // }, []) // 同步更新cartBar

    useEffect(() => {
        foodNum(food_item);
        // eslint-disable-next-line
    }, [props.cartSummary?.num]) // 同步更新cartBar

    const foodNum = (food) => {
        let flag = false;
        let allNumber = 0;
        let allPrice = 0;
        let coin = 0;
        let productList = []
        let allCartComputer = {
            num: 0,
            coin: 0,
            allPrice: 0,
            productList: [],
        };
        if (props.cart) { // 取出购物车数据进行汇总
            if (Object.keys(props.cart)[0]) {
                props.cart[props.shop_id] && props.cart[props.shop_id].list.forEach(e => { // 购物车中的分类列表
                    e.product.forEach(el => { // 每个分类对象下的菜品列表

                        allNumber += el.number; // 购物车总数量
                        allPrice += np.times(el.number, el.sell_price); // 总现金价格
                        coin += np.times(el.number, el.coin_price); // 总代币价格
                        productList.push(el); // 购物车商品列表

                        if (el.product_id === food.product_id) {
                            flag = true;
                            if (el.number) { // 设置input当前商品的数量
                                setNum(el.number)
                            } else {
                                setNum(0)
                            }
                        }
                    })
                });
            } else {
                setNum(0)
            }
            if (!flag) { // 如果找不到该商品 默认0
                setNum(0)
            }

            // 执行清空会默认复制 allCartComputer
            allCartComputer.num = allNumber; // 菜品总数量
            allCartComputer.allPrice = allPrice; // 总价
            allCartComputer.productList = productList; // 菜品列表
            allCartComputer.coin = coin; // 代币价
            props.setAllNum({ ...allCartComputer }); // 全局购物车汇总数据
            localStorage.setItem('summary', JSON.stringify({ ...allCartComputer })); // 本地维护
        }
    }

    return (
        <div className='cart_input_wrap' onClick={() => { !num && cartFn(food_item, props.shop_id, 'add') }} >
            {
                num
                    ? <>
                        <i className="btn btn-minus" onClick={() => { cartFn(food_item, props.shop_id, 'del') }}></i>
                        <span>{num}</span>
                        <i className="btn btn-plus" onClick={() => { cartFn(food_item, props.shop_id, 'add') }}></i>
                    </>
                    : !isShowIcon
                        ? <>
                            <i className="btn btn-minus" onClick={() => { cartFn(food_item, props.shop_id, 'del') }}></i>
                            <span>{num}</span>
                            <i className="btn btn-plus" onClick={() => { cartFn(food_item, props.shop_id, 'add') }}></i>
                        </>
                        : <>
                            <img src={cartIcon} alt='a' />
                        </>
            }

        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Input)