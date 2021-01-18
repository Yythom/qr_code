import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { getList } from '../../api/api';
import Food from './child/food';
import { useHistory } from 'react-router-dom';
import empty from '../../assets/icon/images/empty.svg'
import { baseURL } from '../../api/config';
import Carbar from '../../component/carBar/CarBar'
import './home.scss';
import { getCategoryListApi, getPriductListApi, getCheckShopApi } from '../../api/shopApi';
import { message } from 'antd';


function _Home({ shop, setShopID, shop_id, activeTab, cartSummary, setShop }) {

    const [loading, setLoading] = useState(false);
    const [flag, setFlag] = useState(false);
    const [p_list, setP_list] = useState([]);
    const history = useHistory();
    const [tab, setTab] = useState('');
    const [category_list, setCategory_list] = useState([])
    const [headerText, setHeaderText] = useState('首页');

    const getProduct = async (category_id) => {
        let res = await getPriductListApi(category_id, shop_id);
        if (res) {
            setFlag(true);
            setLoading(false);
            setP_list(res.product);
            message.destroy();
            message.success({ content: '获取成功', duration: 1 });
        }
    }
    // 初始化店铺所有数据
    function init() {
        const p = new URLSearchParams(window.location.search);
        if (p.get('isOrderDetail')) setHeaderText('返回');

        if (localStorage.getItem('s') || p.get('s')) {
            message.loading({ content: '加载中', duration: 0 });
            let s = p.get('s') || localStorage.getItem('s');
            localStorage.setItem('s', s); // 更新s

            getCheckShopApi(s).then(result => {
                if (result) {
                    localStorage.setItem('shop', JSON.stringify(result)); // shop
                    setShop(result);
                    setShopID(result.shop_id);
                    localStorage.setItem('shop_id', result.shop_id); // shop_id
                    setTimeout(async () => {
                        let c_res = await getCategoryListApi(result.shop_id);
                        if (c_res) {
                            setCategory_list(c_res.category);
                            getProduct('', result.shop_id);
                        }
                    }, 100);
                } else {
                    setLoading(false);
                }
            })
        } else {
            message.destroy();
            setLoading(false);
            message.error('url不正确');
        }
    }



    useEffect(() => {
        activeTab('')
        init();

        // eslint-disable-next-line 
    }, [])
    const tabFn = (current) => {
        message.loading({ content: '加载中', duration: 0 });
        getProduct(current)
        setTab(current);
    }


    return (
        <div className='home_wrap' >
            <div className='header_title'>
                <svg t="1608535595375" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5139" width="16" height="16"><path d="M383.88508444 512.27989333l332.40746667-332.41315555c13.96963556-13.96053333 13.96963556-36.62051556 0-50.58218667-13.96053333-13.96963556-36.62051556-13.96963556-50.58218667 0l-357.70254222 357.70481778c-13.97304889 13.96053333-13.97304889 36.62051556 0 50.58218667l357.70368 357.70368c6.98254221 6.98595556 16.13710222 10.48007111 25.29052445 10.48007111s18.30912-3.49411556 25.29052444-10.48007111c13.97304889-13.96053333 13.97304889-36.62051556 0-50.58218667l-332.40974222-332.41429333z" p-id="5140"></path></svg>
                <span style={{ color: 'rgb(9,44,76)' }} onClick={() => {
                    if (headerText === '返回') history.goBack();
                    else history.replace('/integral');
                }}>{headerText}</span>
            </div>
            {
                shop && <>
                    <div className='title-bg'>
                        <img src={shop.cover} alt="a" />
                        <div className="content">
                            <h2>{shop.shop_name}</h2>
                            <div className="address">
                                <span>{shop.address}</span> <svg t="1608519398172" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10744" width="16" height="16"><path d="M871.96254815 405.84786173c0-216.99697778-157.52912592-374.40474075-374.40474074-374.40474075-206.4384 0-374.40474075 167.96634075-374.40474074 374.40474075 0 152.43188148 207.04521482 410.5709037 318.33505185 549.28877037l8.25268148 10.19448888c11.65084445 14.56355555 29.12711111 22.9376 47.93837037 22.9376 18.6898963 0 36.16616297-8.37404445 47.93837038-22.9376l8.25268147-10.19448888c111.04711111-138.71786667 318.09232592-396.85688889 318.09232593-549.28877037z m-376.34654815 108.49848888c-76.3373037 0-138.35377778-62.01647408-138.35377778-138.35377778s62.01647408-138.35377778 138.35377778-138.35377777 138.35377778 62.01647408 138.35377778 138.35377777-62.01647408 138.35377778-138.35377778 138.35377778z" fill="#00A0E9" p-id="10745"></path><path d="M497.55780741-1.20351605c-224.40011852 0-407.05137778 182.5298963-407.05137778 407.05137778 0 163.84 211.77837037 427.80444445 325.49546667 569.67774814l8.13131852 10.19448889c17.96171852 22.33078518 44.66157037 35.19525925 73.30322963 35.19525927s55.34151111-12.86447408 73.30322963-35.19525927l8.25268147-10.19448889C692.83081482 833.65230617 904.48782222 569.68786173 904.48782222 405.84786173c0-235.80823703-171.12177778-407.05137778-406.93001481-407.05137778z m0 989.47223703c-18.6898963 0-36.16616297-8.37404445-47.93837038-22.9376l-8.25268148-10.19448888c-111.28983703-138.71786667-318.33505185-396.85688889-318.33505185-549.28877037 0-206.4384 167.96634075-374.40474075 374.40474075-374.40474075 216.99697778 0 374.40474075 157.52912592 374.40474073 374.40474075 0 152.43188148-207.04521482 410.5709037-318.33505185 549.28877037l-8.25268148 10.19448888c-11.52948148 14.56355555-29.00574815 22.9376-47.69564444 22.9376z" fill="#ffffff" p-id="10746"></path><path d="M495.616 375.99257283m-105.8285037 0a105.8285037 105.8285037 0 1 0 211.6570074 0 105.8285037 105.8285037 0 1 0-211.6570074 0Z" fill="#FFFFFF" p-id="10747"></path><path d="M633.96977778 375.99257283c0-76.3373037-62.01647408-138.35377778-138.35377778-138.35377777s-138.35377778 62.01647408-138.35377778 138.35377777 62.01647408 138.35377778 138.35377778 138.35377778 138.35377778-62.01647408 138.35377778-138.35377778z m-244.18228148 0c0-58.37558518 47.45291852-105.8285037 105.8285037-105.82850369s105.8285037 47.45291852 105.8285037 105.82850369-47.45291852 105.8285037-105.8285037 105.8285037-105.8285037-47.45291852-105.8285037-105.8285037z" fill="#ffffff" p-id="10748"></path></svg>
                            </div>
                        </div>
                    </div>
                    <div className='tab'>
                        <ul>
                            <li onClick={() => { tabFn('') }} style={tab == '' ? { fontWeight: '500' } : {}}>
                                全部分类
                     </li>
                            {category_list && category_list.map((cate) => {
                                return (
                                    <li onClick={() => { tabFn(cate.category_id) }} key={cate.category_id + cate.category_name} style={tab == cate.category_id ? { fontWeight: '500' } : {}}>
                                        {cate.category_name}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    {
                        <div className='food_wrap animate__fadeIn animate__animated'>
                            {
                                p_list[0] ? p_list.map((food_item) => {
                                    return (
                                        <div className='food' key={food_item.product_id}>
                                            <Food
                                                food={food_item}
                                                shop_id={shop.shop_id}
                                            />
                                        </div>
                                    )
                                }) : null
                            }

                        </div>
                    }
                    {!p_list[0] && <div className='empty'>
                        <img src={empty} alt='a' />
                        <p>这里空空如也...</p>
                    </div>}
                    {cartSummary.num ? <Carbar shop_id={shop.shop_id} /> : null}
                </>
            }
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(_Home)