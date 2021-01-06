import { request } from './request'


// 分类列表
export const get_tagApi = async () => {
    const result = await request({
        method: 'post',
        url: '/shop/v1/common/shop/tag/list',
    })
    return result;
}

// 商铺列表
export const get_ShopListApi = async (search, location, page = 1, pageSize = 10) => {
    const result = await request({
        method: 'post',
        url: '/shop/v1/common/shop/list',
        data: { search, location }
    })
    return result;
}

