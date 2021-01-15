
import { getInfoApi } from "../api/api"
import { message } from "antd"
import { getCookie } from "../utils/utils"


export const mapStateToProps = (state, ownProps) => {
    return {
        tabStatus: state.tabStatus,//tab路由状态
        cart: state.cart,
        cartSummary: state.cartSummary,
        userStore: state.userStore,
        shop_id: state.shop_id,


        useAddress: state.useAddress,
        _localtion: state._localtion,
        isBrowser: state.isBrowser,
        shop: state.shop,
        code: state.code,
    }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        activeTab: (index) => {  //tab路由状态
            dispatch({ type: 'TAB', index: index })
        },
        setUserInfo: async () => {
            if (getCookie('token')) {
                let res = await getInfoApi();
                if (res) {
                    localStorage.setItem('info', JSON.stringify(res))
                    dispatch({ type: 'INFO', info: res });
                    return res
                } else {
                    message.error('获取用户信息失败');
                    return false;
                }
            } else {
                return false;
            }
        },
        setShopID: (id) => {
            dispatch({ type: 'SHOPID', id })
        },
        setAddress: (address_id) => {
            dispatch({ type: 'USEADDRESS', data: address_id })
        },
        setLocaltion: (_localtion) => {
            dispatch({ type: 'LOCAL', _localtion })
        },
        setBrowser: (text) => {
            dispatch({ type: 'BROWSER', text })
        },
        setShop: (shop) => {
            dispatch({ type: 'SHOP', shop })
        },
        setCode: (code) => dispatch({ type: 'CODE', code }),

        addCart: (food, shop_id, current) => {
            dispatch({ type: 'ADDCART', food, shop_id, current })
        },
        setAllNum: (allSummary) => {
            dispatch({ type: 'SETNUM', allSummary })
        },
        clearCart: () => {
            localStorage.removeItem('cart');
            localStorage.removeItem('summary');
            dispatch({ type: 'CLEAR' })
        },
    }
}
