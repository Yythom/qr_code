import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { getList } from '../../api/api';
import Food from './child/food';
import { useHistory } from 'react-router-dom';

import { baseURL } from '../../api/config';
import Carbar from '../../component/carBar/CarBar'
import './home.scss';


function _Home(props) {

    const [loading, setLoading] = useState(false);
    const [p_list, setP_list] = useState([
        {
            product_name: '测试1',
            picture: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=389218322,3896386774&fm=26&gp=0.jpg',
            price: '999',
            coin: '30',
            isLike: 1,
            product_id: '101',
            cate_id: '2'
        },
        {
            product_name: '测试2',
            picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608539176261&di=dba4e4541912221eb1ca5abebc384605&imgtype=0&src=http%3A%2F%2Fpic125.huitu.com%2Fres%2F20190706%2F2202557_20190706171411523020_1.jpg',
            price: '30',
            coin: '88',
            isLike: 2,
            product_id: '102',
            cate_id: '2'
        }, {
            product_name: '测试3',
            picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1608539176261&di=dba4e4541912221eb1ca5abebc384605&imgtype=0&src=http%3A%2F%2Fpic125.huitu.com%2Fres%2F20190706%2F2202557_20190706171411523020_1.jpg',
            price: '3',
            coin: '8',
            isLike: 1,
            product_id: '103',
            cate_id: '1'
        }
    ]);
    const history = useHistory();
    const [tab, setTab] = useState('');
    const [category_list, setCategory_list] = useState([
        {
            category_id: 1,
            category_name: '分类1'
        },
        {
            category_id: 2,
            category_name: '分类2'
        }, {
            category_id: 3,
            category_name: '分类3'
        }, {
            category_id: 4,
            category_name: '分类4'
        }, {
            category_id: 5,
            category_name: '分类5'
        }, {
            category_id: 6,
            category_name: '分类6'
        }, {
            category_id: 7,
            category_name: '分类7'
        }
    ])
    /**
     * @param {loding状态} status 
     */
    function isLoadingFn(status) {
        setTimeout(() => {
            setLoading(status);
        }, 400);
    }
    // 初始化所有数据
    async function initFn() {
        // isLoadingFn(true)

    }

    useEffect(() => {
        initFn();
        // eslint-disable-next-line 
    }, [])
    const tabFn = (current) => {
        console.log(current);
        setTab(current);
    }


    return (
        <div className='home_wrap' >
            {/* {loading && <div className='loading animate__fadeIn animate__animated'>
                <img src={loadingImg} alt="" />
                <h2>loading.....</h2>
            </div>} */}
            <div className='title-bg'>
                <img src='https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1603365312,3218205429&fm=26&gp=0.jpg' alt="" />
                <div className="content">
                    <h2>天干吐糟（天府三街店）</h2>
                    <div className="address">
                        <span> 天府三街道花样年华广场</span> <svg t="1608519398172" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10744" width="16" height="16"><path d="M871.96254815 405.84786173c0-216.99697778-157.52912592-374.40474075-374.40474074-374.40474075-206.4384 0-374.40474075 167.96634075-374.40474074 374.40474075 0 152.43188148 207.04521482 410.5709037 318.33505185 549.28877037l8.25268148 10.19448888c11.65084445 14.56355555 29.12711111 22.9376 47.93837037 22.9376 18.6898963 0 36.16616297-8.37404445 47.93837038-22.9376l8.25268147-10.19448888c111.04711111-138.71786667 318.09232592-396.85688889 318.09232593-549.28877037z m-376.34654815 108.49848888c-76.3373037 0-138.35377778-62.01647408-138.35377778-138.35377778s62.01647408-138.35377778 138.35377778-138.35377777 138.35377778 62.01647408 138.35377778 138.35377777-62.01647408 138.35377778-138.35377778 138.35377778z" fill="#00A0E9" p-id="10745"></path><path d="M497.55780741-1.20351605c-224.40011852 0-407.05137778 182.5298963-407.05137778 407.05137778 0 163.84 211.77837037 427.80444445 325.49546667 569.67774814l8.13131852 10.19448889c17.96171852 22.33078518 44.66157037 35.19525925 73.30322963 35.19525927s55.34151111-12.86447408 73.30322963-35.19525927l8.25268147-10.19448889C692.83081482 833.65230617 904.48782222 569.68786173 904.48782222 405.84786173c0-235.80823703-171.12177778-407.05137778-406.93001481-407.05137778z m0 989.47223703c-18.6898963 0-36.16616297-8.37404445-47.93837038-22.9376l-8.25268148-10.19448888c-111.28983703-138.71786667-318.33505185-396.85688889-318.33505185-549.28877037 0-206.4384 167.96634075-374.40474075 374.40474075-374.40474075 216.99697778 0 374.40474075 157.52912592 374.40474073 374.40474075 0 152.43188148-207.04521482 410.5709037-318.33505185 549.28877037l-8.25268148 10.19448888c-11.52948148 14.56355555-29.00574815 22.9376-47.69564444 22.9376z" fill="#ffffff" p-id="10746"></path><path d="M495.616 375.99257283m-105.8285037 0a105.8285037 105.8285037 0 1 0 211.6570074 0 105.8285037 105.8285037 0 1 0-211.6570074 0Z" fill="#FFFFFF" p-id="10747"></path><path d="M633.96977778 375.99257283c0-76.3373037-62.01647408-138.35377778-138.35377778-138.35377777s-138.35377778 62.01647408-138.35377778 138.35377777 62.01647408 138.35377778 138.35377778 138.35377778 138.35377778-62.01647408 138.35377778-138.35377778z m-244.18228148 0c0-58.37558518 47.45291852-105.8285037 105.8285037-105.82850369s105.8285037 47.45291852 105.8285037 105.82850369-47.45291852 105.8285037-105.8285037 105.8285037-105.8285037-47.45291852-105.8285037-105.8285037z" fill="#ffffff" p-id="10748"></path></svg>
                    </div>
                </div>
            </div>
            <div className='tab'>
                <ul>
                    <li onClick={() => { tabFn(0) }} style={tab == 0 ? { fontWeight: '500' } : {}}>
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
                        p_list[0] && p_list.map((food_item) => {
                            return (
                                <div className='food' key={food_item.product_id}>
                                    <Food
                                        food={food_item}
                                        shop_id={1}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            }
            <Carbar shop_id={1} />
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(_Home)