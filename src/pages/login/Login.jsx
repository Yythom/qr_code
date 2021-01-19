import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { getList } from '../../api/api';
import From from './child/LoginForm'
import './login.scss';
import bg from '../../assets/icon/images/loginbg.png'
import logo from '../../assets/icon/logo.svg'
import welcome from '../../assets/icon/images/welcome.png'

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
        <div className='_login' >
            {/* <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2003719257,1069607366&fm=26&gp=0.jpg" /> */}
            {/* {loading && <div className='loading animate__fadeIn animate__animated'>
                <h2>loading.....</h2>
            </div>} */}


            <div className="login-title">
                <img className="welcome" mode="aspectFit" src={welcome} />
                <img className="logo" mode="aspectFit" src={logo} />
            </div>
            <div className='login_wrap animate__fadeIn animate__animated'>
                <div className='title-form'>登入</div>
                <From loading={loading} setLoading={isLoadingFn} />
            </div>
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(_Login)