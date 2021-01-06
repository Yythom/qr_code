import { request } from './request'



export const get_tagApi = async () => {
    const result = await request({
        method: 'post',
        url: '/shop/v1/common/shop/tag/list',
    })
    return result;
}
