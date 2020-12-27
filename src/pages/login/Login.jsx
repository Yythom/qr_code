import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { getList } from '../../api/api';
import From from './child/LoginForm'
import './login.scss';


function _Login(props) {

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
        <div className='login' >
            <div className='title'>欢迎使用鱼付通</div>
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2003719257,1069607366&fm=26&gp=0.jpg" />
            {/* {loading && <div className='loading animate__fadeIn animate__animated'>
                <h2>loading.....</h2>
            </div>} */}
            <div className='login_wrap animate__fadeIn animate__animated'>
                <From loading={loading} setLoading={isLoadingFn} />
            </div>

        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(_Login)