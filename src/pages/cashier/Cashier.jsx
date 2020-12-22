import React, { useEffect, useState } from 'react'
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Tabs, Button } from 'antd';
import np from 'number-precision'
import call from '../../assets/icon/call.png'
import self from '../../assets/icon/self.png'
import address from '../../assets/icon/address.png'
import phone from '../../assets/icon/phone.png'
import Input from '../../component/Cart_input';
import P_list from '../../component/child_list/P_List'
import './cashier.scss'

const { TabPane } = Tabs;


function Cashier(props) {
    const [loading1, setLoading1] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [way, setWay] = useState(1);  // 1配送 2 自提
    const [more, setMore] = useState(false)

    // 1 取消 2 待支付 3 成功 4 失败 5 退款
    // is_business 
    const history = useHistory();

    function hideLoading(status, type) {
        setTimeout(() => {
            type == 1 ? setLoading1(status) : setLoading2(status)
        }, 400);
    }


    function init(e) {
        console.log(e);

    }
    /**
     * 
     * @param  {*} e 付款方式
     */
    function pay(e) {
        hideLoading(true, e)
        console.log(e);
        // hideLoading(false, e)
    }

    useEffect(() => {
        init();
        // eslint-disable-next-line
    }, [])

    return (
        <div className="cashier_wrap">
            <div className='cashier_title'>
                <Tabs defaultActiveKey="1" onChange={(e) => { e && setWay(Number(e)) }} className='way'>
                    <TabPane tab="商家配送" key="1" />
                    <TabPane tab="到店自提" key="2" />
                </Tabs>
            </div>
            <div className='address_wrap'>
                <ul>
                    <li>
                        <img src={address} alt="a" />
                        <span>天府三节xxx</span>
                    </li>
                    <li>
                        <img src={call} alt="a" />
                        <span>13145217692</span>
                    </li>
                    <li>
                        <img src={self} alt="a" />
                        <span>是个人</span>
                    </li>
                </ul>
                <aside>
                    {way === 1 ? '修改' : '13号'}
                </aside>
            </div>
            {props.cartSummary?.productList && < P_list order_detail={props.cartSummary} isCashier list={props.cartSummary?.productList} more={more} setMore={setMore} />}


            <div className="pay_wrap">
                <Button type="primary" disabled={!!loading1 || !!loading2} loading={loading1} onClick={() => { pay(1) }}>现金付款</Button>
                <Button type="primary" disabled={!!loading1 || !!loading2} loading={loading2} onClick={() => { pay(2) }}>代币付款</Button>
            </div>
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Cashier)