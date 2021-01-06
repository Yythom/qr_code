import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { message } from 'antd';
import { getCookie, getAddress } from '../../utils/utils';
import { useHistory } from 'react-router-dom';
import { get_tagApi, get_ShopListApi } from '../../api/indexApi'
import './index.scss';


function _Index(props) {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState(false);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);

    const [tagList, setTagList] = useState(false);


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
        let tag_list = await get_tagApi();
        let shop_list = await get_ShopListApi('', props._localtion._localtion);
        if (tag_list && shop_list) {
            setTagList(tag_list);
            setList(shop_list.list);
            setPage(shop_list.page);
            setTotal(shop_list.total);
            message.destroy();
        }
    }

    useEffect(() => {
        message.loading({ content: '加载中...', duration: 0 })
        // eslint-disable-next-line 
    }, [])
    useEffect(() => {
        if (!!props._localtion && !tagList && !list) {
            console.log('初始化');
            initFn();
        }
    })


    console.log(total, 'total');

    return (
        <div className='index_box' >
            <div className='address_wrap' onClick={() => history.push('/integral/map')}>
                <svg t="1609922469507" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14860" width="16" height="16"><path d="M512 64c194.56 0 351.744 157.696 351.744 352.256 0 86.016-31.232 168.96-88.064 232.96l-218.112 286.72c-24.576 31.744-64 31.744-88.576 0l-216.576-282.112c-131.584-143.36-121.856-366.08 20.992-497.152C338.944 97.28 423.936 64 512 64z m0 64c-159.232 0-288.256 129.024-288.256 287.744 0 72.192 27.136 141.824 75.776 195.072l3.584 4.096 209.92 273.408 211.456-278.016 3.072-3.584c105.472-119.296 94.208-301.056-25.088-406.528C650.24 153.6 582.144 128 512 128z m0 96.256c105.984 0 192 86.016 192 192s-86.016 192-192 192S320 522.24 320 416.256 406.016 224.256 512 224.256z m0 64c-70.656 0-128 57.344-128 128s57.344 128 128 128 128-57.344 128-128-57.344-128-128-128z" p-id="14861" fill="#cdcdcd"></path></svg>
                <span> {props._localtion ? props._localtion.address : '获取定位中...'}</span>
                <svg t="1609922611984" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15092" width="16" height="16"><path d="M890.336 330.912c-12.576-12.416-32.8-12.352-45.248 0.192L517.248 661.952 184.832 332.512c-12.576-12.448-32.8-12.352-45.28 0.192-12.448 12.576-12.352 32.832 0.192 45.28l353.312 350.112c0.544 0.544 1.248 0.672 1.792 1.184 0.128 0.128 0.16 0.288 0.288 0.416 6.24 6.176 14.4 9.28 22.528 9.28 8.224 0 16.48-3.168 22.72-9.472l350.112-353.312C902.976 363.616 902.88 343.36 890.336 330.912z" p-id="15093" fill="#cdcdcd"></path></svg>
            </div>
            <div className="home-searchview">
                <div className="home-searchv" onClick={() => history.push('/integral/search')}>
                    <svg t="1609917692314" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14674" width="16" height="16"><path d="M998.4 968.704l-260.096-256c68.096-73.728 110.08-172.032 110.08-279.552 0-230.4-189.952-417.28-423.936-417.28C190.464 16.384 0.512 203.264 0.512 433.664s189.952 416.768 423.936 416.768c101.376 0 194.048-34.816 266.752-93.184l261.12 257.024c12.8 12.288 33.28 12.288 46.08 0 12.288-12.288 12.8-32.256 0.512-44.544 0-0.512-0.512-0.512-0.512-1.024zM424.448 786.432c-198.144 0-358.4-158.208-358.4-352.768s160.256-352.768 358.4-352.768 358.4 158.208 358.4 352.768-160.256 352.768-358.4 352.768z" p-id="14675" fill="#C8CDD1"></path></svg>
                    <div className="home-search">输入菜品名称</div>
                </div>
            </div>

        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(_Index)