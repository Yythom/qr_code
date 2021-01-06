import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import './search.scss';
import { Input } from 'antd';


function _Search(props) {

    const [loading, setLoading] = useState(false);


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

    }

    useEffect(() => {
        initFn();
        // eslint-disable-next-line 
    }, [])



    return (
        <div className='search_box' >
            <div className="home-searchview">
                <div className="home-searchv">
                    <svg t="1609917692314" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14674" width="16" height="16"><path d="M998.4 968.704l-260.096-256c68.096-73.728 110.08-172.032 110.08-279.552 0-230.4-189.952-417.28-423.936-417.28C190.464 16.384 0.512 203.264 0.512 433.664s189.952 416.768 423.936 416.768c101.376 0 194.048-34.816 266.752-93.184l261.12 257.024c12.8 12.288 33.28 12.288 46.08 0 12.288-12.288 12.8-32.256 0.512-44.544 0-0.512-0.512-0.512-0.512-1.024zM424.448 786.432c-198.144 0-358.4-158.208-358.4-352.768s160.256-352.768 358.4-352.768 358.4 158.208 358.4 352.768-160.256 352.768-358.4 352.768z" p-id="14675" fill="#C8CDD1"></path></svg>
                    <Input className="home-search" placeholder="输入菜品名称" />
                </div>
            </div>

        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(_Search)