import { request } from './request'

// 商铺是否开启（存在）
export const getCheckShopApi = async (s) => {
    const result = await request({
        method: 'post',
        url: '/shop/v1/login/check-shop',
        data: { s },
    })
    return result;
}

// 分类列表
export const getCategoryListApi = async (shop_id) => {
    const result = await request({
        method: 'post',
        url: '/shop/v1/common/product/category',
        data: { shop_id },
    })
    return result;
}

// 商品列表
export const getPriductListApi = async (category_id, shop_id) => {
    const result = await request({
        method: 'post',
        url: '/shop/v1/common/product/list',
        data: { category_id, shop_id },
    })
    return result;
}

// 订单列表
export const orderListApi = async (status, page, pageSize = 10) => {
    const result = await request({
        method: 'post',
        url: 'shop/v1/order/list',
        data: { status, page, pageSize },
    })
    return result;
}

// 订单详情
export const orderDetailApi = async (order_id, shop_id) => {
    const result = await request({
        method: 'post',
        url: '/shop/v1/order/detail',
        data: { order_id, shop_id },
    })
    return result;
}

// 确认收货
export const doneApi = async (order_id, shop_id) => {
    const result = await request({
        method: 'post',
        url: '/shop/v1/order/receipt',
        data: { order_id, shop_id },
    })
    return result;
}

