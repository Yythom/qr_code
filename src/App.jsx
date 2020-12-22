import React from 'react'
import { mapStateToProps, mapDispatchToProps } from './redux/actionCreator'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'


//路由
// import router from './router/router'

//布局组件
import BaseLayout from './component/layout/BaseLayout'
import Login from './pages/login/Login'
import { useEffect } from 'react'
// import VConsole from 'vconsole';

function _App(props) {
    function IsPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag; // true:pc  false:mobile
    }


    useEffect(() => {

        if (!IsPC()) {
            // new VConsole()
            // console.clear()
        }
    }, [])

    return (
        <>
            <Router>
                <Switch>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/' component={BaseLayout} ></Route>
                    <Route path='/404' exact component={() => <h1>404</h1>}></Route>
                    <Redirect to="/404" />
                </Switch>
            </Router>
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(_App)
