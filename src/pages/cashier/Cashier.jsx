import React, { useEffect, useState } from 'react'
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Tabs, Button, message } from 'antd';
import np from 'number-precision'
import call from '../../assets/icon/call.png'
import self from '../../assets/icon/self.png'
import addressImg from '../../assets/icon/address.png'
import phone from '../../assets/icon/phone.png'
import Input from '../../component/Cart_input';
import P_list from '../../component/child_list/P_List'
import './cashier.scss'
import { addressDefaultApi, createOrderApi, payApi, upOrderApi, getAadressDetailApi } from '../../api/api';

const { TabPane } = Tabs;


function Cashier(props) {
    const [loading, setLoading] = useState(false);
    const [way, setWay] = useState(1);  // 1配送 2 自提
    const [more, setMore] = useState(false);
    const [address, setAddress] = useState(null);
    let { cart, cartSummary, shop_id } = props;
    const [mark_id, setMark_id] = useState('');

    // 1 取消 2 待支付 3 成功 4 失败 5 退款
    // is_business 
    const history = useHistory();

    function list() {
        let copy = JSON.parse(JSON.stringify(cart));
        if (copy[shop_id]) { // 删除多余的属性  调用预下单-
            copy[shop_id].list.forEach((e, i) => {
                for (let j = 0; j < copy[shop_id].list[i].product.length; j++) {
                    let el = copy[shop_id].list[i].product[j];
                    delete el.cate_id;
                    delete el.product_name;
                    delete el.picture;
                    delete el.stock;
                    delete el.sell_price;
                    delete el.category_id;
                    delete el.coin_price;
                }
            });
            return copy[shop_id].list
        }
        return ''
    }

    async function init(e) {
        message.loading({ content: '加载中', duration: 0 });
        if (cartSummary.num === 0) {
            history.replace('/integral/home')
            return
        }
        if (props.useAddress) {
            let res = await getAadressDetailApi(props.useAddress); // 通过当前使用的地址id获取地址详情
            setAddress(res);
        } else {
            let res = await addressDefaultApi(2); // 获取用户默认地址
            if (res) {
                if (res.list[0]) {
                    setAddress(res.list[0]); // 设置当前页面使用地址
                    props.setAddress(res.list[0].address_id); // 设置全局使用地址id
                }
            }
            console.log(res, 'default address');

        }

        message.destroy();

    }
    // 代币付款
    async function coinPay(paytype, order_id) {
        let pay = await payApi(paytype, order_id);
        message.destroy();
        if (pay) {
            message.info(pay.status_message);
            props.clearCart();
            setTimeout(() => {
                history.push(`/integral/orderdetail?order_id=${order_id}&shop_id=${props.shop_id}`);
            }, 200);
        }
    }

    /**
     * @param  {*} e 付款方式
     */
    async function pay(coin) {
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
                setLoading(false);
                message.error({ content: '请使用微信支付宝打开', duration: 1 });
                return
            }
            handleClickPay(paytype);
        } else {
            paytype = 7;
            let res;
            if (!mark_id) {
                res = await createOrderApi(list(), 7, props.useAddress, way);
                if (res) {
                    setMark_id(res.order_id);
                    coinPay(paytype, res.order_id);
                }
            }
            if (mark_id) {
                coinPay(paytype, mark_id);
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        if (mark_id) { // 重复下单维护
            setMark_id('');
        }
        // eslint-disable-next-line
    }, [props?.cartSummary?.num]);

    useEffect(() => {
        init();
        // eslint-disable-next-line
    }, [])

    /**
    * 确认支付
    */
    const handleClickPay = async (paytype) => {
        console.log(paytype, 'paytype');
        let isWexinOrAliPay = props.isBrowser;
        let amount = props.cartSummary.allPrice;
        if (amount != null && amount !== '' && !isNaN(Number(amount))) {
            let result;
            let orderId = '';
            // 下单
            if (!mark_id) { // 避免取消付款重复下单
                const mark = await createOrderApi(list(), paytype, props.useAddress, way);
                if (mark) {
                    orderId = mark.order_id;
                    setMark_id(mark.order_id);
                    result = await payApi(paytype, mark.order_id, props.code);
                }
            } else {
                orderId = mark_id;
                result = await payApi(paytype, mark_id, props.code);
            }
            console.log(result, 'pay result');

            if (result && isWexinOrAliPay === 'wx') {
                if (typeof WeixinJSBridge == 'undefined') {
                    if (document.addEventListener) {
                        // eslint-disable-next-line no-undef
                        document.addEventListener('WeixinJSBridgeReady', onBridgeReady(result), false);
                    } else if (document.attachEvent) {
                        // eslint-disable-next-line no-undef
                        document.attachEvent('WeixinJSBridgeReady', onBridgeReady(result));
                        // eslint-disable-next-line no-undef
                        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady(result));
                    }
                } else {
                    // eslint-disable-next-line no-undef
                    onBridgeReady(result.payInfo);
                }
            } else if (result && isWexinOrAliPay === 'zfb') {
                // eslint-disable-next-line no-undef
                console.log(AP, 'zfb');
                // eslint-disable-next-line no-undef
                AP.tradePay({
                    tradeNO: result.payInfo.tradeNO,
                }, (aliPay_res) => {
                    console.log(aliPay_res, 'zfb res');
                    function serch_order() {
                        let id = result.pay_order_id;
                        let i = 30;
                        i--;
                        function go() {
                            setTimeout(async () => {
                                const res = await upOrderApi(id);
                                if (i >= 0 && res.status == 2) { // TODO:递归条件
                                    go();
                                    i--;
                                } else {
                                    props.clearCart();
                                    setTimeout(() => {
                                        history.push(`/integral/orderdetail?order_id=${orderId}&shop_id=${props.shop_id}`);
                                    }, 200);
                                    console.log('结束');
                                }
                            }, 1000);
                        }
                        go();
                    }
                    serch_order();
                });
            } else {
                // setPayLoading(false);
            }
        }
    };
    // weixin
    const onBridgeReady = (payInfo) => {
        // eslint-disable-next-line no-undef
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
            appId: payInfo.appId, // 公众号名称，由商户传入
            timeStamp: payInfo.timeStamp, // 时间戳，自1970年以来的秒数
            nonceStr: payInfo.nonceStr, // 随机串
            package: payInfo.package,
            signType: payInfo.signType, // 微信签名方式：
            paySign: payInfo.paySign, // 微信签名
        },
            (res) => {
                console.log(res, mark_id, 'vx res');
                props.clearCart();
                setTimeout(() => {
                    history.push(`/integral/orderdetail?order_id=${mark_id}&shop_id=${props.shop_id}`);
                }, 200);
                // 支付成功 // 由点金计划待处理
            },
        );
    };
    return (
        <div className="cashier_wrap">
            <div className='cashier_title'>
                <Tabs defaultActiveKey="1" onChange={(e) => { e && setWay(Number(e)) }} className='way'>
                    <TabPane tab="商家配送" key="1" />
                    <TabPane tab="到店自提" key="2" />
                </Tabs>
            </div>
            {address && way == 1 ? <div className='address_wrap'>
                <ul>
                    <li>
                        <img src={addressImg} alt="a" />
                        <span>{address.address}</span>
                    </li>
                    <li>
                        <img src={call} alt="a" />
                        <span>{address.mobile}</span>
                    </li>
                    <li>
                        <img src={self} alt="a" />
                        <span>{address.name}</span>
                    </li>
                </ul>
                <aside onClick={() => {
                    history.push('/integral/center/address')
                }}>
                    修改
                </aside>
            </div>
                : (way == 2 ?
                    <div className='address_wrap'>
                        <ul>
                            <li>
                                <img src={addressImg} alt="a" />
                                <span>{props.shop.address}</span>
                            </li>
                            <li>
                                <img src={call} alt="a" />
                                <span>{props.shop.contact}</span>
                            </li>
                            <li>
                                <img src={self} alt="a" />
                                <span>{props.shop.shop_name}</span>
                            </li>
                        </ul>
                    </div>
                    : <div className='address_wrap' onClick={() => { history.push('/integral/center/address') }}>
                        <ul>
                            <div style={{ fontSize: '1.6rem', padding: '1rem 0' }}>
                                <span style={{ verticalAlign: 'middle' }} >请选择地址</span>
                                <svg style={{ verticalAlign: 'middle' }} t="1608621663428" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10354" width="14" height="14"><path d="M267.354606 72.005964c-13.515828 12.812817-13.515828 33.603329 0 46.417169l414.889265 393.579937-414.889265 393.565611c-13.515828 12.821003-13.515828 33.604352 0 46.425356 13.508665 12.81998 35.418674 12.81998 48.927339 0l432.159604-410.009118c0 0 18.33867-16.991999 18.33867-29.981848 0-11.971659-18.33867-29.989011-18.33867-29.989011L316.282968 72.005964C302.77328 59.184961 280.863271 59.184961 267.354606 72.005964z" fill="#9D9E9D" p-id="10355"></path></svg>
                            </div>
                        </ul>
                    </div>
                )
            }
            {props.cartSummary?.productList && < P_list order_detail={props.cartSummary} isCashier list={props.cartSummary?.productList} more={more} setMore={setMore} />}
            <div className="pay_wrap">
                <Button type="primary" disabled={loading} onClick={() => { pay() }}>
                    {props.isBrowser === 'wx' ? '微信付款' : null}
                    {props.isBrowser === 'zfb' ? '微信付款' : null}
                    {props.isBrowser === 'other' ? '现金付款' : null}
                </Button>
                <Button type="primary" disabled={loading} onClick={() => { pay(1) }}>代币付款</Button>
            </div>
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Cashier)