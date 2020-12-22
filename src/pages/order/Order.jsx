import React, { useEffect, useState, useRef } from 'react'
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Tabs, Button } from 'antd';
import np from 'number-precision';
import { debounce } from '../../utils/utils'
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
    const [total, setTotal] = useState('');
    // 1 取消 2 待支付 3 成功 4 失败 5 退款
    // is_business 
    const history = useHistory();
    const [list, setList] = useState([
        {
            shop_name: '假装的店（c）',
            picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608539176261&di=dba4e4541912221eb1ca5abebc384605&imgtype=0&src=http%3A%2F%2Fpic125.huitu.com%2Fres%2F20190706%2F2202557_20190706171411523020_1.jpg',
            address: '青青草原',
            time: '2020-8-8 9:00',
            price: '888',
            status: 1,
            order_id: '101',
            orderType: 1,
        }, {
            shop_name: '假装的店（c）',
            picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608539176261&di=dba4e4541912221eb1ca5abebc384605&imgtype=0&src=http%3A%2F%2Fpic125.huitu.com%2Fres%2F20190706%2F2202557_20190706171411523020_1.jpg',
            address: '青青草原',
            time: '2020-8-8 9:00',
            price: '888',
            status: 2,
            order_id: '102',
            orderType: 2,
        }, {
            shop_name: '假装的店（c）',
            picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608539176261&di=dba4e4541912221eb1ca5abebc384605&imgtype=0&src=http%3A%2F%2Fpic125.huitu.com%2Fres%2F20190706%2F2202557_20190706171411523020_1.jpg',
            address: '青青草原',
            time: '2020-8-8 9:00',
            price: '888',
            status: 1,
            order_id: '103',
            orderType: 1,
        }, {
            shop_name: '假装的店（c）',
            picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608539176261&di=dba4e4541912221eb1ca5abebc384605&imgtype=0&src=http%3A%2F%2Fpic125.huitu.com%2Fres%2F20190706%2F2202557_20190706171411523020_1.jpg',
            address: '青青草原',
            time: '2020-8-8 9:00',
            price: '888',
            status: 2,
            order_id: '104',
            orderType: 2,
        },
    ]);




    function hideLoading(status) {
        setTimeout(() => {
            setLoading(status)
        }, 400);
    }

    function init() {

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
        if (h < 10) {
            console.log('到底了');


        }
    }, 200)

    function statusFn(e) {
        if (e.status === 1) return <span style={{ color: '#F97B50' }}>备货中</span>
    }

    function jump(order_id) {
        console.log('订单详情' + order_id);
        history.push(`/orderdetail?order_id=${order_id}`)
    }

    useEffect(() => {
        init();
        console.log(wrapDOM.current.clientHeight, listDOM.current.clientHeight);
        setWrapHight(wrapDOM.current.clientHeight);
        setListHight(listDOM.current.clientHeight);
        // eslint-disable-next-line
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
                                        <img src={e.picture} alt="a" />
                                    </div>
                                    <div className='content'>
                                        <div className='shop_name'>
                                            {e.shop_name}
                                        </div>
                                        {
                                            e.orderType === 1
                                                ? <>
                                                    <div className='address'><span>配送至：</span>{e.address}</div>
                                                    <div className='time'><span>配送时间：</span>{e.time}</div>
                                                </> : <div className='ziti'><span>自提处：</span>{e.address}</div>
                                        }
                                        <div className={e.orderType === 1 ? 'price' : 'tprice'}><span>总计：</span>¥{e.price}</div>
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