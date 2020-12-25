import { request } from './request'



export const getList = async (shop_id, cate_id = '', is_takeaway = 1) => {
    const result = await request({
        method: 'post',
        url: '/client/v1/product/list',
        data: { shop_id, cate_id, is_takeaway: 1 },
    })
    return result;
}

// 用户相关
export const getPhoneCodeApi = async (mobile) => { // 获取验证码
    const result = await request({
        method: 'post',
        url: '/shop/v1/login/send',
        data: { mobile },
    })
    return result;
}
export const loginApi = async (code, mobile) => { // 登入
    const result = await request({
        method: 'post',
        url: '/shop/v1/login',
        data: { code, mobile },
    })
    return result;
}
export const getInfoApi = async () => { // 用户信息
    const result = await request({
        method: 'post',
        url: '/shop/v1/user/detail',
    })
    return result;
}

export const changePhoneCodeApi = async (mobile) => { // 修改手机 的验证码
    const result = await request({
        method: 'post',
        url: '/shop/v1/user/send',
        data: { mobile },
    })
    return result;
}
export const changePhoneApi = async (code, mobile) => { // 确定修改手机号
    const result = await request({
        method: 'post',
        url: '/shop/v1/user/change-mobile',
        data: { code, mobile },
    })
    return result;
}

// 收货地址列表
export const addressListApi = async (page, pageSize = 6) => { // 列表
    const result = await request({
        method: 'post',
        url: '/shop/v1/user/address/list',
        data: { page, pageSize },
    })
    return result;
}

// 新增地址
export const addAddressApi = async (mobile, nickname, address, is_default, city, longitude, latitude, name, address_detail) => { // 列表
    const result = await request({
        method: 'post',
        url: '/shop/v1/user/address/make',
        data: {
            mobile,
            nickname,
            address,
            is_default,
            city,
            longitude,
            latitude,
            name,
            address_detail,
        },
    })
    return result;
}
// 编辑地址
export const editAddressApi = async (mobile, nickname, address, is_default, city, longitude, latitude, name, address_detail, address_id) => {
    const result = await request({
        method: 'post',
        url: '/shop/v1/user/address/edit',
        data: {
            mobile,
            nickname,
            address,
            is_default,
            city,
            longitude,
            latitude,
            name,
            address_detail,
            address_id,
        },
    })
    return result;
}
// 地址详情
export const getAadressDetailApi = async (address_id) => {
    const result = await request({
        method: 'post',
        url: '/shop/v1/user/address/detail',
        data: { address_id },
    })
    return result;
}

// 删除地址
export const delAadressApi = async (address_id) => {
    const result = await request({
        method: 'post',
        url: '/shop/v1/user/address/delete',
        data: { address_id },
    })
    return result;
}



// 创建订单
/**
 * 
 * @param {*} list 
 * @param {*} method 支付方式，5微信公众号支付，6支付宝公总号支付，7代币支付
 * @param {*} address_id 地址id
 * @param {*} type 类型--1商家配送，2到店自取
 */
export const createOrderApi = async (list, method, address_id, type) => {
    const result = await request({
        method: 'post',
        url: '/shop/v1/order/create',
        data: { list, method, address_id, type },
    })
    return result;
}
/**
 * 
 * @param {*} method 支付方式，5微信公众号支付，6支付宝公总号支付，7代币支付
 * @param {*} order_id order_id
 */
export const payApi = async (method, order_id, code) => {
    console.log(code);

    let data = {};
    if (method == 7) {
        data = { method, order_id, }
    } else {
        data = { method, order_id, code }
    }

    const result = await request({
        method: 'post',
        url: '/shop/v1/order/pay',
        data,
    })
    return result;
}



// search订单
export const upOrderApi = async (pay_order_id) => {
    // const result = await request({
    //     method: 'post',
    //     url: '/shop/v1/order/search',
    //     data: {pay_order_id },
    // })
    // return result;
}

// 入账订单
export const coinLogApi = async () => {
    const result = await request({
        method: 'post',
        url: '/shop/v1/user/coin-log',
        // data: { price, method },
    });
    return result;
}
