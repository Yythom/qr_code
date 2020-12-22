import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator'
import { connect } from 'react-redux';
import Header from '../header/header';
import './BaseLayout.scss';
import 'animate.css';
//路由
import router from '../../router/router';
import TabBar from './tabBar/TabBar';
import { useEffect } from 'react';
function _Layout(props) {
    const history = useHistory();
    useEffect(() => {
        if (props.userStore) {
            if (localStorage.getItem('info') && Object.keys(props.userStore)[0]) {
            } else {
                history.replace('/login')
            }
        }
    })
    return (
        <div className='layout animate__fadeIn animate__animated'>
            {
                history.location.pathname !== '/order' && history.location.pathname !== '/center' ? <Header /> : null
            }
            { // 路由组件
                Object.values(router).map(e => {
                    return (
                        <Route path={e.url} exact={e.desc !== '主页'} component={e.page} key={e.url} />
                    )
                })
            }
            <TabBar />
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(_Layout)