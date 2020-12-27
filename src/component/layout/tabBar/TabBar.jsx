// eslint-disable-next-line 
import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom'
import router from '../../../router/router'
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../../../redux/actionCreator'
import './tabbar.scss'

function TabBar(props) {
    let { tabStatus } = props
    // console.log(tabStatus);
    useEffect(() => {
        let home = props.location.pathname.indexOf('home');
        let order_page = props.location.pathname.indexOf('order');
        let center = props.location.pathname.indexOf('center');
        if (home !== -1) props.activeTab(0)
        if (order_page !== -1) props.activeTab(1)
        if (center !== -1) props.activeTab(2)
        // eslint-disable-next-line 
    }, [])
    return (
        <div className="tabBox">
            <ul
            // style={localStorage.getItem('token') ? { visibility: 'visible' } : { visibility: 'hidden' }}
            >
                {
                    Object.values(router).map((e, i) => {
                        return (
                            !e.isShow && <Link onClick={() => { props.activeTab(i) }} to={e.url} key={e.desc}>
                                <li >
                                    <p className={tabStatus === i ? 'iconBox activeIcon' : 'iconBox'}> {<img src={tabStatus === i ? e.activeIcon : e.icon} alt="a" />}</p>
                                    {/* <p style={tabStatus === i ? { color: 'red' } : { color: 'rgb(110, 110, 110)' }}>{e.desc}</p> */}
                                </li>
                            </Link>
                        )
                    })
                }
            </ul>
        </div>
    );
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TabBar));
