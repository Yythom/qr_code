import React, { useEffect, useState } from 'react'
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import np from 'number-precision'

import './shopdetail.scss'
function Shop_detail(props) {
    const [loading, setLoading] = useState(true);
    // 1 取消 2 待支付 3 成功 4 失败 5 退款
    // is_business 
    const history = useHistory();

    function hideLoading(status) {
        setTimeout(() => {
            setLoading(status)
        }, 400);
    }

    function init() {
        hideLoading(true);

        hideLoading(false);
    }




    useEffect(() => {
        init();
        // eslint-disable-next-line
    }, [])

    return (
        <div >
            {loading && <div className='loading animate__fadeIn animate__animated' >

                <h2>loading......</h2>
            </div>}
            {
                !loading
                && <>
                    {
                        <>
                            餐厅详情
                        </>
                    }
                </>
            }
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Shop_detail)