import axios from 'axios'
import { baseURL, timeout } from './config'

let pending = []; //声明一个数组用于存储每个请求的取消函数和axios标识
// let cancelToken = axios.CancelToken;
let removePending = (config) => {
    // console.log(config);
    for (let i in pending) {
        if (pending[i].url === axios.defaults.baseURL + config.url) { //在当前请求在数组中存在时执行取消函数
            console.log('取消————————————————————-')
            pending[i].f(); //执行取消操作
            //pending.splice(i, 1); 根据具体情况决定是否在这里就把pending去掉
            console.log(pending[i].url);
        }
    }
}

export function request(config) {
    const instance = axios.create({
        baseURL,
        timeout,
        headers: {
            'Content-Type': 'application/json',
            'token': '888'
        }
    })

    //! 数据过滤
    instance.interceptors.response.use(res => {
        return res.data
    })

    //请求拦截
    instance.interceptors.request.use(function (res) {
        removePending(config); //在一个axios发送前执行一下判定操作，在removePending中执行取消操作
        /**
         * @addToken
         */
        return res
    }, function (error) {

        return Promise.reject(error)
    })

    // 此处封装一层捕捉错误
    return new Promise((resolve, reject) => {
        instance(config).then(res => {
            if (res.code !== '0') {
                reject(res.msg)
            } else {
                resolve(res)
            }
        }).catch(err => {
            /**
             * @err
             */
            if (err.response) {


            }
        })
    })
}
export default request;
