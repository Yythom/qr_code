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
import { addressListApi, createOrderApi, payApi, upOrderApi, getAadressDetailApi } from '../../api/api';

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
        if (cartSummary.num === 0) {
            history.replace('/home')
            return
        }
        if (props.useAddress) {
            let res = await getAadressDetailApi(props.useAddress);
            setAddress(res);
        }

        let res = await addressListApi();
        console.log(res);

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
                message.error('请使用微信支付宝打开');
                // return
            }
            handleClickPay(6);
        } else {
            paytype = 7;
            let res;
            if (!mark_id) {
                res = await createOrderApi(list(), 7, props.useAddress, way);
                setMark_id(res.order_id);
                let pay = await payApi(paytype, res.order_id);
                message.destroy();
                if (pay) {
                    message.info(pay.status_message);
                    props.clearCart();
                    setTimeout(() => {
                        history.push('/orderdetail?order_id=' + res.order_id);
                    }, 200);
                }
            }
            if (mark_id) {
                let pay = await payApi(paytype, mark_id);
                message.destroy();
                if (pay) {
                    message.info(pay.status_message);
                    props.clearCart();
                    setTimeout(() => {
                        history.push('/orderdetail?order_id=' + res.order_id);
                    }, 200);
                }
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        // eslint-disable-next-line no-undef
        if (typeof WeixinJSBridge == 'undefined') {
            if (document.addEventListener) {
                // eslint-disable-next-line no-undef

            }
        } else {
            // eslint-disable-next-line no-undef
            console.log(WeixinJSBridge, 'WeixinJSBridge');
        }
        init();
        // eslint-disable-next-line
    }, [])

    /**
    * 确认支付
    */
    const handleClickPay = async (paytype) => {
        let isWexinOrAliPay = props.isBrowser;
        let amount = props.cartSummary.allPrice;
        if (amount != null && amount !== '' && !isNaN(Number(amount))) {
            let result;
            // 下单
            if (!mark_id) {
                const mark = await createOrderApi(list(), paytype, props.useAddress, way);
                if (mark) result = await payApi(paytype, mark.order_id, props.code);
            } else {
                result = await payApi(paytype, mark_id, props.code);
            }
            console.log(result);

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
                console.log(AP);
                // eslint-disable-next-line no-undef
                AP.tradePay({
                    tradeNO: result.payInfo.tradeNO,
                }, (aliPay_res) => {
                    console.log(aliPay_res, 'zfb res');
                    function serch_order() {
                        let i = 30;
                        i--;
                        function start() {
                            setTimeout(async () => {
                                const res = await upOrderApi();
                                if (i > 0) {
                                    start();
                                }
                                message.destroy();
                            }, 1000);
                        }
                    }
                });
            } else {
                // setPayLoading(false);
            }
        }
    };
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
                console.log(res, 'vx res');

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
            {address ? <div className='address_wrap'>
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
                    history.push('/address')
                }}>
                    修改
                </aside>
            </div> : <div className='address_wrap' onClick={() => { history.push('/address') }}>
                    <ul>
                        <div style={{ fontSize: '1.6rem', padding: '1rem 0' }}>
                            <span style={{ verticalAlign: 'middle' }} >请选择地址</span>
                            <svg style={{ verticalAlign: 'middle' }} t="1608621663428" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10354" width="14" height="14"><path d="M267.354606 72.005964c-13.515828 12.812817-13.515828 33.603329 0 46.417169l414.889265 393.579937-414.889265 393.565611c-13.515828 12.821003-13.515828 33.604352 0 46.425356 13.508665 12.81998 35.418674 12.81998 48.927339 0l432.159604-410.009118c0 0 18.33867-16.991999 18.33867-29.981848 0-11.971659-18.33867-29.989011-18.33867-29.989011L316.282968 72.005964C302.77328 59.184961 280.863271 59.184961 267.354606 72.005964z" fill="#9D9E9D" p-id="10355"></path></svg>
                        </div>
                    </ul>
                </div>
            }
            {props.cartSummary?.productList && < P_list order_detail={props.cartSummary} isCashier list={props.cartSummary?.productList} more={more} setMore={setMore} />}
            <div className="pay_wrap">
                <Button type="primary" disabled={loading} onClick={() => { pay() }}>现金付款</Button>
                <Button type="primary" disabled={loading} onClick={() => { pay(1) }}>代币付款</Button>
            </div>
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Cashier)