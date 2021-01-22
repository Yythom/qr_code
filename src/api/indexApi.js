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
export const get_ShopListApi = async (search, location, sort, page = 1, pageSize = 10) => {
    console.log(location);

    const result = await request({
        method: 'post',
        url: '/shop/v1/common/shop/list',
        data: { search, location, page, sort, pageSize }
    })
    return result;
}


//banner
// export const bannerListApi = async (shop_id) => {
//     const result = await request({
//         method: 'get',
//         url: '/shop/v1/common/banner/list',
//         params: {
//             shop_id: 333
//         }
//     })
//     return result;
// }

