import { request } from './request'



export const getList = async (shop_id, cate_id = '', is_takeaway = 1) => {
    const result = await request({
        method: 'post',
        url: '/client/v1/product/list',
        data: { shop_id, cate_id, is_takeaway: 1 },
    })
    return result;
}

