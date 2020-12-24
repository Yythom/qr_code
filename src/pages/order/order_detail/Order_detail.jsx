import React, { useEffect, useState } from 'react'
import { mapStateToProps, mapDispatchToProps } from '../../../redux/actionCreator'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import P_list from '../../../component/child_list/P_List'
import np from 'number-precision'
import './order_detail.scss'
import { message } from 'antd'
import { orderDetailApi } from '../../../api/shopApi'

function Order_detail(props) {
    const [loading, setLoading] = useState(true);
    const [more, setMore] = useState(false);
    const [order_id, setOrder_id] = useState('');
    const [order, setOrder] = useState(
        {
            shop_name: '天干吐槽（ccc店）',
            product_list: [
                {
                    product_name: '测试菜品1',
                    picture: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2194993172,462542350&fm=26&gp=0.jpg',
                    address: '青青草原',
                    time: '2020-8-8 9:00',
                    sell_price: '888',
                    status: 1,
                    product_id: '101',
                    coin_price: '30',
                    number: '3',
                    orderType: 1,
                }, {
                    product_name: '测试菜品2',
                    picture: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2165236867,279993731&fm=26&gp=0.jpg',
                    address: '青青草原',
                    time: '2020-8-8 9:00',
                    sell_price: '888',
                    status: 2,
                    product_id: '102',
                    coin_price: '10',
                    number: '2',
                    orderType: 2,
                },
            ],
            is_take: 1,
            status: 1,
            take_out: {
                distribution: '商家配送',
                name: 'cnm',
                phone: '13145210000',
                address: '青青草原我u最酷'
            },
            order: {
                order_id: '2327871872938179179189',
                create_time: '2020-9-13 19:00',
                pay_type: '1'
            },
            pay: {
                price: '320',
                coin: '999',
            }

        }
    );

    // 1 取消 2 待支付 3 成功 4 失败 5 退款
    // is_business 
    const history = useHistory();

    function hideLoading(status) {
        setTimeout(() => {
            setLoading(status)
        }, 400);
    }

    async function init() {
        hideLoading(true);
        if (history.location.search) {
            let str = history.location.search.split('?order_id=');
            setOrder_id(str[1]); // query order_id
            let res = await orderDetailApi(str[1], props.shop.shop_id);
            console.log(res);

        }
        hideLoading(false);
    }

    // 复制文本内容
    const copy = (text) => {
        const copyDOM = document.querySelector('.copyText');
        if (text.length !== 0) {
            var range = document.createRange(); //创建一个range
            window.getSelection().removeAllRanges(); //清楚页面中已有的selection
            range.selectNode(copyDOM); // 选中需要复制的节点
            window.getSelection().addRange(range); // 执行选中元素
            var successful = document.execCommand('copy'); // 执行 copy 操作
            if (successful) {
                message.success('复制成功！');
            } else {
                message.warning('复制失败，请手动复制！');
            }
            // 移除选中的元素
            window.getSelection().removeAllRanges();
        } else {
            message.warning('没有内容');
        }
    };

    useEffect(() => {
        init();
        // eslint-disable-next-line
    }, [])

    return (
        <div className="order_detail">
            {
                order_id ? order
                    && <>
                        <div className="order_status">
                            {order.status === 1 ? '订单已完成' : null}
                            {order.status === 2 ? '配送中' : null}
                            {order.status === 3 ? `到店自提  ${88}号` : null}
                        </div>
                        <div className='list'>
                            <P_list isOrderDetails more={more} setMore={setMore} list={order.product_list} order_detail={order} />
                        </div>
                        <div className='address_wrap'>
                            <div className='title'>配送信息</div>
                            <i />
                            <div className='content'>
                                <span>配送服务</span>
                                <span>{order.take_out.distribution}</span>
                            </div>
                            <div className='content'>
                                <span>收货人</span>
                                <span>{order.take_out.name}</span>
                            </div>
                            <div className='content'>
                                <span>联系方式</span>
                                <span>{order.take_out.phone}</span>
                            </div>
                            <div className='content'>
                                <span>联系方式</span>
                                <span>{order.take_out.address}</span>
                            </div>
                        </div>
                        <div className='order_info'>
                            <div className='title'>订单信息</div>
                            <i />
                            <div className='content'>
                                <span>订单号码</span>
                                <span>
                                    <span className='copyText'>{order.order.order_id}</span>
                                    <div className='copy' onClick={() => { copy(order.order.order_id) }}>
                                        复制
                                </div>
                                </span>
                            </div>
                            <div className='content'>
                                <span>下单时间</span>
                                <span>{order.order.create_time}</span>
                            </div>
                            <div className='content'>
                                <span>支付方式</span>
                                <span>{order.order.pay_type}</span>
                            </div>
                        </div>
                    </> : null
            }
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Order_detail)