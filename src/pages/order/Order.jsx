import React, { useEffect, useState, useRef } from 'react'
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Tabs, Button, message } from 'antd';
import np from 'number-precision';
import { debounce } from '../../utils/utils'
import { orderListApi } from '../../api/shopApi'
import './order.scss';

const { TabPane } = Tabs;
function Table(props) {
    const listDOM = useRef();
    const wrapDOM = useRef();
    const [loading, setLoading] = useState(false);
    const [itemLoading, setItemLoading] = useState(null);
    const [listHeight, setListHight] = useState(0);
    const [wrapHeight, setWrapHight] = useState(0);

    const [type, setType] = useState('');
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);


    const history = useHistory();
    const [list, setList] = useState([]);


    async function init() {
        let res = await orderListApi(type, 1);
        if (res) {
            setTotal(res.total);
            setList(res.list)
        }
    }

    const upOrderItemFn = async (e) => {
        setItemLoading({
            loading: true,
            order_id: e.order_id,
        });
        console.log('更新订单：' + e.order_id);

        setTimeout(() => {
            setItemLoading(null);
        }, 500);
    }
    // 滚动到底部的事件
    const scrollFn = debounce(async (h) => {
        if (h === 0) {
            console.log('到底了');
            if (total === list.length) {
                message.warn('到底了');
                return
            }
            if (total > 10 && list.length !== total) {
                message.loading({ content: '加载中', duration: 0 })
                let res = await orderListApi(type, page + 1);
                if (res) {
                    setList([...list, ...res.list]);
                    setPage(page + 1);
                    setTotal(res.total);
                    message.destroy();
                    message.success('加载成功');
                }
            }
        }
    }, 200);

    function statusFn(e) {
        // 1 取消 2 待支付 3 成功 4 失败 5 退款 6 已收获 7申请退款 8完成
        if (e.status === 1) return <span style={{ color: '#F97B50' }}>备货中</span>
    }

    function jump(order_id) {
        console.log('订单详情' + order_id);
        history.push(`/orderdetail?order_id=${order_id}`)
    }

    useEffect(() => { setListHight(listDOM.current.clientHeight) }, [list]);

    useEffect(() => {
        setWrapHight(wrapDOM.current.clientHeight);
        setListHight(listDOM.current.clientHeight);
        init();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <div className="order_wrap animate__fadeIn animate__animated" >
            <Tabs defaultActiveKey="1" onChange={(e) => { e && setType(e) }} className='order_tabs'>
                <TabPane tab="待支付" key="1" />
                <TabPane tab="备货中" key="2" />
                <TabPane tab="送货中" key="3" />
                <TabPane tab="已完成" key="4" />
            </Tabs>
            <div className="list_wrap" ref={wrapDOM} onScroll={(e) => {
                scrollFn(listHeight - wrapHeight + 12 - e.target.scrollTop)
            }}>
                <div ref={listDOM}>
                    {
                        list && list.map((e, i) => {
                            return (
                                <div className='order_item' key={e.order_id} onClick={() => { jump(e.order_id) }}>
                                    <div className='img_box'>
                                        <img src={e.shop.logo} alt="a" />
                                    </div>
                                    <div className='content'>
                                        <div className='shop_name'>
                                            {e.shop.shop_name}
                                        </div>
                                        {
                                            e.distribution_mode === 1
                                                ? <>
                                                    <div className='address'><span>配送至：</span>{e.address.address}</div>
                                                    <div className='time'><span>配送时间：</span>{e.delivery_time || ''}</div>
                                                </> : <div className='ziti'><span>自提处：</span>{e.shop.address}</div>
                                        }
                                        <div className={e.distribution_mode === 1 ? 'price' : 'tprice'}>
                                            <span>总计：</span>¥{e.price}
                                        </div>
                                    </div>
                                    <div className='status'>
                                        {statusFn(e)}
                                    </div>
                                    <Button className='upBtn' loading={itemLoading ? (itemLoading.order_id === e.order_id ? itemLoading.loading : false) : false}
                                        onClick={(event) => { event.stopPropagation(); upOrderItemFn(e) }}
                                    >
                                        更新订单
                               </Button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Table)