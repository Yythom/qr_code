// import { } from '../api/api'


export const mapStateToProps = (state, ownProps) => {
    return {
        tabStatus: state.tabStatus,//tab路由状态
        cart: state.cart,
        cartSummary: state.cartSummary,
        userStore: state.userStore,
        shop_id: state.shop_id,

        defaultAddress: state.defaultAddress,
        useAddress: state.useAddress,
    }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        activeTab: (index) => {  //tab路由状态
            dispatch({ type: 'TAB', index: index })
        },
        setUserInfo: (info) => {
            dispatch({ type: 'INFO', info })
        },
        setShopID: (id) => {
            dispatch({ type: 'SHOPID', id })
        },
        setAddress: (obj) => {
            dispatch({ type: 'USEADDRESS', data: obj })
        },
        setDefaultAddress: (obj) => {
            dispatch({ type: 'DEFAULT', data: obj })
        },


        addCart: (food, shop_id, current) => {
            dispatch({ type: 'ADDCART', food, shop_id, current })
        },
        setAllNum: (allSummary) => {
            dispatch({ type: 'SETNUM', allSummary })
        },
        clearCart: () => {
            console.log(1);

            localStorage.removeItem('cart');
            dispatch({ type: 'CLEAR' })
        },
    }
}
