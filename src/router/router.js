import home from '../assets/icon/images/home.png'
import sHome from '../assets/icon/images/s-home.png'
import order_ed from '../assets/icon/images/order_ed.png'
import order_no from '../assets/icon/images/order.png'
import me from '../assets/icon/images/me.png'
import me_ed from '../assets/icon/images/me_ed.png'

// 主包
import Home from '../pages/home/Home'
import Index from '../pages/index/index'
import Order from '../pages/order/Order'
import Center from '../pages/userCenter/Center'

//副包
import Shop_detail from '../pages/shop_detail/Shop_detail'
import Order_detail from '../pages/order/order_detail/Order_detail'
import Cashier from '../pages/cashier/Cashier'
import MapComponent from '../pages/mapSelect/map'

// 个人中心操作页面
import Handle_phone from '../pages/handle-pages/Handle_phone'
import Handle_address from '../pages/handle-pages/Handle_address'
import Handle_booked from '../pages/handle-pages/Handle_booked'
import Change_address from '../pages/handle-pages/Change_address'
import Add_address from '../pages/handle-pages/Add_address'
let integral = '/integral'

let router = () => {
    return {
        index: {
            url: integral,
            icon: home,
            activeIcon: sHome,
            desc: '主页',
            page: Index
        },
        table: {
            url: integral + '/order',
            icon: order_no,
            activeIcon: order_ed,
            desc: '订单',
            page: Order
        },
        center: {
            url: integral + '/center',
            icon: me,
            activeIcon: me_ed,
            desc: '个人',
            page: Center,
        },

        // 副包 （不在tabbar显示）
        shopDetail: {
            url: integral + '/shopdetail',
            page: Shop_detail,
            isShow: true, // 不现实tab
        },
        orderDetail: {
            url: integral + '/orderdetail',
            page: Order_detail,
            isShow: true,
        },
        cashier: {
            url: integral + '/cashier',
            page: Cashier,
            isShow: true,
        },
        home: {
            url: integral + '/home',
            page: Home,
            isShow: true,
        },
        map: {
            url: integral + '/map',
            page: MapComponent,
            isShow: true,
        },

        // 个人中心操作页面
        phone: {
            url: integral + '/phone',
            page: Handle_phone,
            isShow: true,
        },
        booked: {
            url: integral + '/booked',
            page: Handle_booked,
            isShow: true,
        },
        address: {
            url: integral + '/address',
            page: Handle_address,
            isShow: true,
        },
        changeaddress: {
            url: integral + '/change-address',
            page: Change_address,
            isShow: true,
        },
        addaddress: {
            url: integral + '/add-address',
            page: Add_address,
            isShow: true,
        }

    }
}
export default router();