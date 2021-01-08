import React, { useRef } from 'react';
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { get_tagApi, get_ShopListApi } from '../../api/indexApi'
import { Input, message } from 'antd';
import { useHistory } from 'react-router-dom';
import './search.scss';
import { debounce } from '../../utils/utils';

function _Search(props) {
    const listDOM = useRef();
    const wrapDOM = useRef();
    const [listHeight, setListHight] = useState(0);
    const [wrapHeight, setWrapHight] = useState(0);
    const history = useHistory();
    const [list, setList] = useState(false);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [v, setV] = useState('');
    const [loading, setLoading] = useState(false);

    const [log, setLog] = useState([]); // 历史
    /**
     * @param {loding状态} status 
     */
    function isLoadingFn(status) {
        setTimeout(() => {
            setLoading(status);
        }, 400);
    }

    const searchFn = async (text) => {
        if (!text) {
            message.info('请输入搜索的内容');
            return;
        }
        let shop_list;
        if (!log.includes(text)) { // 并且 历史不存在当前 输入框的值
            const $log = [...log, text];
            console.log($log);
            localStorage.setItem('search_log', JSON.stringify($log)); // 添加新的历史
            setLog($log);
        }

        if (props._localtion) shop_list = await get_ShopListApi(text, props._localtion.location);
        else shop_list = await get_ShopListApi(text);
        console.log(shop_list);

        if (shop_list) {
            if (shop_list.list[0]) {
                setList(shop_list.list);
                setPage(shop_list.page);
                setTotal(shop_list.total);
            } else {
                setTimeout(() => {
                    message.info('暂无数据，换个关键词搜索')
                }, 100);
            }

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
                let res = await get_ShopListApi(v, props._localtion?.location, '', page + 1);
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

    // 初始化所有数据
    async function initFn() {
        if (localStorage.getItem('search_log')) {
            setLog(JSON.parse(localStorage.getItem('search_log')))
        }
    }

    useEffect(() => {
        initFn();
        // eslint-disable-next-line 
    }, [])

    useEffect(() => {
        if (wrapDOM.current && listDOM.current) {
            setWrapHight(wrapDOM.current.clientHeight);
            setListHight(listDOM.current.clientHeight);
        }
    }, [list]);

    useEffect(() => {
        if (wrapDOM.current && listDOM.current) {
            setWrapHight(wrapDOM.current.clientHeight);
            setListHight(listDOM.current.clientHeight);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const clear = () => {
        setLog([]);
        setList([]);
        localStorage.removeItem('search_log');
    }
    return (
        <div className='search_box' >
            <div className="home-searchview">
                <div className="home-searchv">
                    <svg t="1609917692314" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14674" width="16" height="16"><path d="M998.4 968.704l-260.096-256c68.096-73.728 110.08-172.032 110.08-279.552 0-230.4-189.952-417.28-423.936-417.28C190.464 16.384 0.512 203.264 0.512 433.664s189.952 416.768 423.936 416.768c101.376 0 194.048-34.816 266.752-93.184l261.12 257.024c12.8 12.288 33.28 12.288 46.08 0 12.288-12.288 12.8-32.256 0.512-44.544 0-0.512-0.512-0.512-0.512-1.024zM424.448 786.432c-198.144 0-358.4-158.208-358.4-352.768s160.256-352.768 358.4-352.768 358.4 158.208 358.4 352.768-160.256 352.768-358.4 352.768z" p-id="14675" fill="#C8CDD1"></path></svg>
                    <Input className="home-search" value={v} onBlur={(e) => { if (e.target.value.length !== 0) searchFn(v) }} placeholder="输入菜品名称" onChange={(e) => { if (e.target.value.length === 0) { setList([]) }; setV(e.target.value) }} />
                </div>
            </div>
            {
                v && list ? <div className='list_wrap' ref={wrapDOM} onScroll={(e) => {
                    scrollFn(listHeight - wrapHeight - e.target.scrollTop)
                }}>
                    <div ref={listDOM} >
                        {
                            list.map((e, i) => {
                                return (
                                    <div className="item" key={e.shop_id} onClick={() => history.push(`/integral/home?s=${e.short}`)}>
                                        <div className="img_box">
                                            <img src={e.logo} alt="error" />
                                        </div>

                                        <div className='content'>
                                            <div className='shop_name' >
                                                <span>{e.shop_name}</span>
                                                {
                                                    e.distance
                                                    && <span>
                                                        <svg t="1609922469507" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14860" width="16" height="16"><path d="M512 64c194.56 0 351.744 157.696 351.744 352.256 0 86.016-31.232 168.96-88.064 232.96l-218.112 286.72c-24.576 31.744-64 31.744-88.576 0l-216.576-282.112c-131.584-143.36-121.856-366.08 20.992-497.152C338.944 97.28 423.936 64 512 64z m0 64c-159.232 0-288.256 129.024-288.256 287.744 0 72.192 27.136 141.824 75.776 195.072l3.584 4.096 209.92 273.408 211.456-278.016 3.072-3.584c105.472-119.296 94.208-301.056-25.088-406.528C650.24 153.6 582.144 128 512 128z m0 96.256c105.984 0 192 86.016 192 192s-86.016 192-192 192S320 522.24 320 416.256 406.016 224.256 512 224.256z m0 64c-70.656 0-128 57.344-128 128s57.344 128 128 128 128-57.344 128-128-57.344-128-128-128z" p-id="14861" fill="#cdcdcd"></path></svg>
                                                        {Math.floor(e.distance) / 1000 > 1 ? (Math.floor(e.distance) / 1000).toFixed(1) + ' km' : Math.floor(e.distance) + ' m'}
                                                    </span>
                                                }
                                            </div>
                                            <div className='address'>
                                                {e.address}
                                            </div>
                                        </div>
                                        <div className='btn'>
                                            <a href={`tel:${e.contact}`} className='call' style={{ color: ' color: rgba(9, 44, 76, 1)' }}>
                                                <span >联系商家</span>
                                            </a>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                    : <div className='history_wrap'>
                        <div className='title'>历史记录</div>
                        <div className='clear' onClick={clear}>清除</div>
                        <div className='items'>
                            {
                                log[0]
                                    ? log.map((e, i) => {
                                        return <span key={e} className='item' onClick={() => {
                                            setV(e)
                                            searchFn(e)
                                        }}>{e}
                                        </span>
                                    })
                                    : <span className='item'>暂无搜索历史</span>
                            }
                        </div>

                    </div>

            }


        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(_Search)