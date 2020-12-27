import { request } from './request'

export const getCheckShopApi = async (s) => {
    const result = await request({
        method: 'post',
        url: '/shop/v1/login/check-shop',
        data: { s },
    })
    return result;
}



export const getCategoryListApi = async (shop_id) => {
    const result = await request({
        method: 'post',
        url: '/shop/v1/product/category',
        data: { shop_id },
    })
    return result;
}


export const getPriductListApi = async (category_id) => {
    const result = await request({
        method: 'post',
        url: '/shop/v1/product/list',
        data: { category_id },
    })
    return result;
}


export const orderListApi = async (status, page, pageSize = 10) => {
    const result = await request({
        method: 'post',
        url: 'shop/v1/order/list',
        data: { status, page, pageSize },
    })
    return result;
}

export const orderDetailApi = async (order_id, shop_id) => {
    const result = await request({
        method: 'post',
        url: '/shop/v1/order/detail',
        data: { order_id, shop_id },
    })
    return result;
}

export const doneApi = async (order_id, shop_id) => {
    const result = await request({
        method: 'post',
        url: '/shop/v1/order/receipt',
        data: { order_id, shop_id },
    })
    return result;
}

