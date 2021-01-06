import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
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
        <div className='search_box' >

        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(_Login)