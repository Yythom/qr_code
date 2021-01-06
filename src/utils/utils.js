/* eslint-disable no-undef */

import { message } from "antd";

/**
 * @param {jsx绑定函数} func 
 * @param {延迟} threshold 
 * @param {是否直接执行} immediate
 */
export function debounce(func, threshold = 500, immediate = false) {
    if (typeof func !== 'function') {
        throw new Error('First argument of debounce function should be a function');
    }
    let timer = null;
    return function debounced(...args) {
        const context = this;
        const callNow = immediate && !timer;
        const later = () => {
            timer = null;
            if (!immediate) func.apply(context, args);
        };
        ////console.log('please wait');
        clearTimeout(timer);
        timer = setTimeout(later, threshold);
        if (callNow) func.apply(context, args);
        // console.log(func);

    };
}


export const formDateMonth = (date, type) => {
    // new Date((1597307920.273 * 1000) - 86400000 *2).toLocaleString()

    date = new Date(date * 1000)
    // let current = (new Date().getTime()) - (86400000 * 1);//当前时间的前24小时
    let current = new Date(new Date().toLocaleDateString()).getTime();//当天的0点
    // console.log(new Date(current))
    let month = (date.getMonth() + 1 + '').length === 1 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;//月
    let day = (date.getDate() + '').length === 1 ? '0' + date.getDate() : date.getDate();//日
    let hour = (date.getHours() + '').length === 1 ? '0' + date.getHours() : date.getHours();//时
    let minute = (date.getMinutes() + '').length === 1 ? '0' + date.getMinutes() : date.getMinutes();//分

    if (date.getTime() < current) {//今天0点之前的消息
        if (date.getTime() > (current - 86400000)) {//昨天
            if (type === 'showTime') {
                return `昨天 ${hour}:${minute}`
            }
            return `昨天`
        }
        return `${month}-${day}`
        // return `${month}-${day} ${hour}:${minute}`
    } else {
        return `${hour}:${minute}`
    }
}

export const isMobile = (s) => /^1[3-9][0-9]{9}$/.test(s);


export const systemScreen = () => {
    //（浏览器窗口上边界内容高度）
    function getDocumentTop() {
        var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
        if (document.body) {
            bodyScrollTop = document.body.scrollTop;
        }
        if (document.documentElement) {
            documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
        // console.log("scrollTop:" + scrollTop);
        return scrollTop;
    }

    //可视窗口高度（屏幕可以看见的高度）
    function getWindowHeight() {
        var windowHeight = 0;
        if (document.compatMode === "CSS1Compat") {
            windowHeight = document.documentElement.clientHeight;
        } else {
            windowHeight = document.body.clientHeight;
        }
        // console.log("windowHeight:" + windowHeight);
        return windowHeight;
    }

    //滚动条滚动高度（即整个网页的高度）
    function getScrollHeight() {
        var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
        if (document.body) {
            bodyScrollHeight = document.body.scrollHeight;
        }
        if (document.documentElement) {
            documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
        // console.log("scrollHeight:" + scrollHeight);
        return scrollHeight;
    }
    let obj = {
        getDocumentTop: getDocumentTop(),
        getWindowHeight: getWindowHeight(),
        getScrollHeight: getScrollHeight(),
    }
    return obj
}

export function setCookie(name, value, n) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + n);
    document.cookie = name + "=" + value + ";expires=" + oDate;
}

export function getCookie(name) {
    var str = document.cookie;
    var arr = str.split("; ");
    for (var i = 0; i < arr.length; i++) {
        //console.log(arr[i]);
        var newArr = arr[i].split("=");
        if (newArr[0] == name) {
            return newArr[1];
        }
    }
}
export async function getLal(address) {
    //对指定地址进行解析
    geocoder.getLocation(address);
    return new Promise((resolve, reject) => {
        geocoder.setError((err) => {
            message.destroy();
            setTimeout(() => {
                message.error('地址输入错误');
            }, 200);
            resolve(false)
            // console.log(address + '地址输入错误', err)
        })
        //设置服务请求成功的回调函数
        geocoder.setComplete((res) => {
            resolve(res.detail)
        })
    });
}
export async function getAddress(lat, lng) {
    let coord = new qq.maps.LatLng(lat, lng);

    //对指定地址进行解析
    geocoder.getAddress(coord);
    return new Promise((resolve, reject) => {
        geocoder.setError((err) => {
            message.destroy();
            setTimeout(() => {
                message.error('地址输入错误');
            }, 200);
            resolve(false)
            // console.log(address + '地址输入错误', err)
        })
        //设置服务请求成功的回调函数
        geocoder.setComplete((res) => {
            resolve(res.detail)
        })
    });
}