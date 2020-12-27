import React, { useEffect, useState } from 'react'
import { mapStateToProps, mapDispatchToProps } from '../../../redux/actionCreator'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import P_list from '../../../component/child_list/O_list'
import np from 'number-precision'
import './order_detail.scss'
import { message, Button } from 'antd'
import { orderDetailApi, doneApi } from '../../../api/shopApi'
import { createOrderApi, payApi } from '../../../api/api';

function Order_detail(props) {
    const [loading, setLoading] = useState(true);
    const [more, setMore] = useState(false);
    const [order_id, setOrder_id] = useState('');
    const [order, setOrder] = useState(null);

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
        message.loading({ content: '加载中', duration: 0 });
        if (history.location.search) {
            let str = history.location.search.split('?order_id=');
            setOrder_id(str[1]); // query order_id
            let res = await orderDetailApi(str[1], props.shop.shop_id);
            if (res) setOrder(res); message.destroy()

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

    const done = async () => {
        message.loading({ content: '加载中', duration: 0 });
        let res = await doneApi(order.order.order_id, props.shop.shop_id);
        if (res) init()
    }

    /**
  * @param  {*} e 付款方式
  */
    async function againPay(coin) {
        setLoading(true);
        message.loading({ content: '付款中...', duration: 0 });
        let paytype;
        if (!coin) {
            if (props.isBrowser === 'wx') {
                paytype = 5
            } else if (props.isBrowser === 'zfb') {
                paytype = 6
            } else {
                message.destroy();
                message.error('请使用微信支付宝打开');
            }
            // handleClickPay(6);
        } else {
            paytype = 7;
            let pay = await payApi(paytype, order.order.order_id);
            message.destroy();
            if (pay) {
                message.info(pay.status_message);
                setTimeout(() => {
                    init();
                }, 200);
            }
        }
        setLoading(false);
    }



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
                            {
                                order.order.distribution_mode_message === '到店自提'
                                    ? <span style={{ marginLeft: '0.4rem' }}><span style={{ marginRight: '1rem' }}>到店自提</span>{order.order.sequence}号</span>
                                    : <span style={{ marginLeft: '0.4rem' }}>{order.order.status_message}</span>
                            }

                            {
                                (order.order.status === 6 || order.order.status === 3) && <Button onClick={done} className='done'>已收货</Button>
                            }
                            {
                                (order.order.status === 2) ? <div>
                                    <Button onClick={() => againPay(1)} className='againPay done'>代币付款</Button>
                                    <Button onClick={() => againPay()} className='againPay done'>
                                        {props.isBrowser === 'wx' ? '微信付款' : null}
                                        {props.isBrowser === 'zfb' ? '支付宝付款' : null}
                                        {props.isBrowser === 'other' ? '现金付款' : null}
                                    </Button>
                                </div> : null
                            }

                        </div>
                        <div className='list'>
                            <P_list isOrderDetails more={more} setMore={setMore} list={order.product.product} order_detail={order} />
                        </div>
                        <div className='address_wrap'>
                            <div className='title'>配送信息</div>
                            <i />
                            <div className='content'>
                                <span>配送服务</span>
                                <span>{order.order.distribution_mode_message}</span>
                            </div>
                            {
                                order.order.distribution_mode_message !== '到店自提' ? <>
                                    <div className='content'>
                                        <span>收货人</span>
                                        <span>{order.address.name}</span>
                                    </div>
                                    <div className='content'>
                                        <span>联系方式</span>
                                        <span>{order.address.mobile}</span>
                                    </div>
                                    <div className='content'>
                                        <span>收货地址</span>
                                        <span>{order.address.address}</span>
                                    </div>
                                </> : null
                            }

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
                                <span>{order.order.create_at}</span>
                            </div>
                            {
                                order.order.status !== 2 ? <div className='content'>
                                    <span>支付方式</span>
                                    <span>{order.pay_order.pay_method_message}</span>
                                </div> : null
                            }

                        </div>
                    </> : null
            }
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Order_detail)