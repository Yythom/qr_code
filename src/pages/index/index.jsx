/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ReactSwiper from 'reactjs-swiper';
import { message } from 'antd';
// eslint-disable-next-line no-unused-vars
import { getCookie, getAddress, debounce } from '../../utils/utils';
import banner1 from '../../assets/1.png'
import banner2 from '../../assets/2.png'

// eslint-disable-next-line no-unused-vars
import { get_tagApi, get_ShopListApi, bannerListApi } from '../../api/indexApi'
import './index.scss';

const swiperOptions = {
    preloadImages: true,
    autoplay: 4000,
    autoplayDisableOnInteraction: false
};

function _Index(props) {
    const listDOM = useRef();
    const ortherDOM = useRef();
    const wrapDOM = useRef();
    const [listHeight, setListHight] = useState(0);
    const [wrapHeight, setWrapHight] = useState(0);
    const [ortherHeight, setOrtherHight] = useState(0);

    const history = useHistory();

    const [list, setList] = useState(false);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [sort, setSort] = useState(false); // 距离排序
    // const [tagList, setTagList] = useState(false);

    const [banner_list, setBanner_list] = useState([]);


    // 初始化所有数据
    async function initFn(type) {
        type && message.loading({ content: '加载中', duration: 0 });
        let shop_list;
        let banner = await bannerListApi();
        if (props._localtion) shop_list = await get_ShopListApi('', props._localtion.location);
        else shop_list = await get_ShopListApi('');
        if (shop_list && banner) {
            setList(shop_list.list);
            setPage(shop_list.page);
            setTotal(shop_list.total);
            let $banner = [{
                image: banner1,
                name: "",
                title: "",
                url: "",
            }, {
                image: banner2,
                name: "",
                title: "",
                url: "",
            }]
            setBanner_list($banner);
            message.destroy();
        }
    }

    useEffect(() => {
        setListHight(listDOM.current.clientHeight)
    }, [list]);

    useEffect(() => {
        initFn('init');
        setWrapHight(wrapDOM.current.clientHeight);
        setListHight(listDOM.current.clientHeight);
        setOrtherHight(ortherDOM.current.clientHeight);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        // if (!!props._localtion && !list) {
        setTimeout(() => {
            initFn();
        }, 100);
        // }
    }, [props._localtion?.location.lng])
    // 排序
    const sortFn = async () => {
        message.loading({ content: '加载中', duration: 0 });
        const sortStr = 'distance';
        let res;
        if (!sort) res = await get_ShopListApi('', props._localtion?.location, sortStr);
        else res = await get_ShopListApi('', props._localtion?.location);
        if (res) {
            setList(res.list);
            setPage(res.page);
            setTotal(res.total);
            setSort(!sort);
            message.destroy();
        }
    }
    // 滚动到底部的事件
    const scrollFn = debounce(async (h) => {
        console.log(list.length, total, h);
        if (h <= 0) {
            console.log('到底了');
            if (total === list.length) {
                message.warn('到底了');
                return
            }
            if (total > 10 && list.length !== total) {
                message.loading({ content: '加载中', duration: 0 })
                let res = await get_ShopListApi('', props._localtion?.location, '', page + 1);
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


    return (
        <div className='index_box' ref={wrapDOM} onScroll={(e) => {
            scrollFn(ortherHeight + listHeight - e.target.scrollTop - wrapHeight + 11)
        }}>
            <div className='orther_wrap' ref={ortherDOM}>
                <div className='address_wrap' onClick={() => history.push('/integral/map')}>
                    <svg t="1609922469507" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14860" width="16" height="16"><path d="M512 64c194.56 0 351.744 157.696 351.744 352.256 0 86.016-31.232 168.96-88.064 232.96l-218.112 286.72c-24.576 31.744-64 31.744-88.576 0l-216.576-282.112c-131.584-143.36-121.856-366.08 20.992-497.152C338.944 97.28 423.936 64 512 64z m0 64c-159.232 0-288.256 129.024-288.256 287.744 0 72.192 27.136 141.824 75.776 195.072l3.584 4.096 209.92 273.408 211.456-278.016 3.072-3.584c105.472-119.296 94.208-301.056-25.088-406.528C650.24 153.6 582.144 128 512 128z m0 96.256c105.984 0 192 86.016 192 192s-86.016 192-192 192S320 522.24 320 416.256 406.016 224.256 512 224.256z m0 64c-70.656 0-128 57.344-128 128s57.344 128 128 128 128-57.344 128-128-57.344-128-128-128z" p-id="14861" fill="#cdcdcd"></path></svg>
                    <span> {props._localtion ? props._localtion.address : '请选择地址'}</span>
                    <svg t="1609922611984" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15092" width="16" height="16"><path d="M890.336 330.912c-12.576-12.416-32.8-12.352-45.248 0.192L517.248 661.952 184.832 332.512c-12.576-12.448-32.8-12.352-45.28 0.192-12.448 12.576-12.352 32.832 0.192 45.28l353.312 350.112c0.544 0.544 1.248 0.672 1.792 1.184 0.128 0.128 0.16 0.288 0.288 0.416 6.24 6.176 14.4 9.28 22.528 9.28 8.224 0 16.48-3.168 22.72-9.472l350.112-353.312C902.976 363.616 902.88 343.36 890.336 330.912z" p-id="15093" fill="#cdcdcd"></path></svg>
                </div>
                <div className="home-searchview">
                    <div className="home-searchv" onClick={() => history.push('/integral/search')}>
                        <svg t="1609917692314" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14674" width="16" height="16"><path d="M998.4 968.704l-260.096-256c68.096-73.728 110.08-172.032 110.08-279.552 0-230.4-189.952-417.28-423.936-417.28C190.464 16.384 0.512 203.264 0.512 433.664s189.952 416.768 423.936 416.768c101.376 0 194.048-34.816 266.752-93.184l261.12 257.024c12.8 12.288 33.28 12.288 46.08 0 12.288-12.288 12.8-32.256 0.512-44.544 0-0.512-0.512-0.512-0.512-1.024zM424.448 786.432c-198.144 0-358.4-158.208-358.4-352.768s160.256-352.768 358.4-352.768 358.4 158.208 358.4 352.768-160.256 352.768-358.4 352.768z" p-id="14675" fill="#C8CDD1"></path></svg>
                        <div className="home-search">输入菜品名称</div>
                    </div>
                </div>

                <div className="banner">
                    <ReactSwiper
                        swiperOptions={swiperOptions}
                        showPagination items={banner_list}
                        className="banner_list"
                    />
                </div>
                {/* <div className="tag_wrap">
                <ul>
                    {
                        tagList && tagList.map((e, i) => {
                            return (
                                <li key={e.tag_id}>
                                    <img src={e.tag_logo} alt="error" />
                                    <div>{e.tag_name}</div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div> */}
            </div>

            <div className="shop_list" ref={listDOM}>
                <div className="title">
                    <span>营业餐厅</span>
                    <div className='sort_wrap'>
                        <span className="sort-span" onClick={() => { sortFn() }}>
                            {sort ? '按距离排序' : '默认排序'}
                        </span>
                        {
                            sort
                                ? <svg t="1609999581186" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2089" width="16" height="16"><path d="M887.328 617.152 533.952 267.008c-0.512-0.512-1.216-0.672-1.76-1.152-0.128-0.128-0.16-0.32-0.288-0.448-12.576-12.416-32.832-12.352-45.28 0.192L136.512 618.944c-12.448 12.576-12.352 32.8 0.192 45.248 6.24 6.176 14.4 9.28 22.528 9.28 8.224 0 16.48-3.168 22.72-9.472l327.84-330.816 332.48 329.408c6.24 6.176 14.368 9.28 22.528 9.28 8.256 0 16.48-3.168 22.72-9.472C899.968 649.856 899.872 629.6 887.328 617.152z" p-id="2090" fill="#cdcdcd"></path></svg>
                                : <svg t="1609999606119" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2325" width="16" height="16"><path d="M890.336 330.912c-12.576-12.416-32.8-12.352-45.248 0.192L517.248 661.952 184.832 332.512c-12.576-12.448-32.8-12.352-45.28 0.192-12.448 12.576-12.352 32.832 0.192 45.28l353.312 350.112c0.544 0.544 1.248 0.672 1.792 1.184 0.128 0.128 0.16 0.288 0.288 0.416 6.24 6.176 14.4 9.28 22.528 9.28 8.224 0 16.48-3.168 22.72-9.472l350.112-353.312C902.976 363.616 902.88 343.36 890.336 330.912z" p-id="2326" fill="#cdcdcd"></path></svg>
                        }
                    </div>
                </div>
                {
                    list && list.map((e, i) => {
                        return (
                            <div className="item" key={e.shop_id} onClick={() => history.push(`/integral/home?s=${e.short}`)}>
                                <div className="img_box">
                                    <img src={e.logo} alt="error" />
                                </div>

                                <div className='content'>
                                    <div className='shop_name' >
                                        <span>{e.shop_name}</span>
                                        {e.distance && <span>
                                            <svg t="1609922469507" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14860" width="16" height="16"><path d="M512 64c194.56 0 351.744 157.696 351.744 352.256 0 86.016-31.232 168.96-88.064 232.96l-218.112 286.72c-24.576 31.744-64 31.744-88.576 0l-216.576-282.112c-131.584-143.36-121.856-366.08 20.992-497.152C338.944 97.28 423.936 64 512 64z m0 64c-159.232 0-288.256 129.024-288.256 287.744 0 72.192 27.136 141.824 75.776 195.072l3.584 4.096 209.92 273.408 211.456-278.016 3.072-3.584c105.472-119.296 94.208-301.056-25.088-406.528C650.24 153.6 582.144 128 512 128z m0 96.256c105.984 0 192 86.016 192 192s-86.016 192-192 192S320 522.24 320 416.256 406.016 224.256 512 224.256z m0 64c-70.656 0-128 57.344-128 128s57.344 128 128 128 128-57.344 128-128-57.344-128-128-128z" p-id="14861" fill="#cdcdcd"></path></svg>
                                            {Math.floor(e.distance) / 1000 > 1 ? (Math.floor(e.distance) / 1000).toFixed(1) + ' km' : Math.floor(e.distance) + ' m'}
                                        </span>}
                                    </div>
                                    <div className='address'>
                                        {e.address}
                                    </div>
                                </div>
                                <div className='btn'>
                                    <a onClick={(e) => e.stopPropagation()} href={`tel:${e.contact}`} className='call' style={{ color: ' color: rgba(9, 44, 76, 1)' }}>
                                        <span >联系商家</span>
                                    </a>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(_Index)