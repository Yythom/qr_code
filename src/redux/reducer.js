let initState = {
    tabStatus: 1,
    cart: getLocal('cart') || {},
    userStore: getLocal('info') || {},
    shop_id: '1',
    cartSummary: getLocal('summary') || {
        num: 0,
        allPrice: 0,
        coin: 0,
        productList: [],
    },
    defaultAddress: null,
    useAddress: null,
}
function getLocal(key) {
    if (localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key))
    } else return false
}

export const reducer = (state = initState, action) => {
    let states = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case "TAB":
            states.tabStatus = action.index
            return states;
        case "INFO": // 用户信息
            states.userStore = action.info
            return states;
        case "SHOPID": // 用户信息
            states.shop_id = action.id
            return states;
        case "USEADDRESS": // 当前使用位置
            states.defaultAddress = action.data
            return states;
        case "DEFAULT": // 用户默认位置
            states.useAddress = action.data
            return states;
        case 'ADDCART':
            states.cart = cart(action.food, action.shop_id, action.current, state.cart);
            localStorage.setItem('cart', JSON.stringify(states.cart))
            console.log(states.cart, 'cart');
            return states;
        case 'SETNUM':
            states.cartSummary = action.allSummary; // 购物车渲染数据
            return states;
        case 'CLEAR':
            states.cart = {};
            states.cartSummary = initState.cartSummary;
            return states;
        default:
            return states;
    }
}



function cart(food, shop_id, current, cart, againNumber) {
    let item = JSON.parse(JSON.stringify(food)); // 菜品item
    if (!item.number) {
        item.number = 1; // 初始化菜品数量
    }
    let setFlag = false; // 删除店铺的开关
    let list = []; //  如果不存在店铺list 初始化空list
    if (cart[shop_id]) { // 如果存在店铺list 则赋值 在原有的list做操作
        let tempList1 = [...cart[shop_id].list];
        list = tempList1;
    }

    // 第一层分类操作
    if (!list[0]) { // 如果分类为空 直接创建该分类
        list.push({ category_id: item.cate_id, product: [] });
    } else {
        let flag = false; // 获取该商品分类对象是否已经存在 ⬇
        list.forEach((el) => {
            if (el.category_id === item.cate_id) {
                flag = true;
            }
        });
        if (!flag) { // 没有该分类 创建分类
            list.push({ category_id: item.cate_id, product: [] });
        }
    }


    // 将商品插入对应分类
    list.forEach((el, index) => { // el ->>> 每个分类
        let e = item;
        if (item.cate_id === el.category_id) { // 找到--->当前商品分类对象 商品id===分类id
            if (!el.product[0]) { // 如果该分类没有商品  直接插入 不走判断
                list[index].product.push(e);
            } else { // 购物车已有商品  根据 传入current执行加减
                let flag = false; // 判断是否含有该商品 true->存在 false->不存在 存在则根据currentType来执行加减操作
                el.product.forEach((el2, i) => { // 遍历该分类下的商品
                    if (el2.product_id === item.product_id) {
                        flag = true;            // 如果该分类对象 存在该商品根据currentType来执行加减操作
                        if (current === 'add' && !againNumber) {
                            list[index].product[i].number += 1;
                        } else if (current === 'del') {
                            list[index].product[i].number -= 1;
                            if (list[index].product[i].number === 0) { // 如果该商品数量为0  删除商品
                                list[index].product[i].number = 0
                                list[index].product.splice(i, 1);
                                if (!el.product[0]) { // 如果该分类商品为空 删除分类
                                    list.splice(index, 1);
                                }
                                if (!list[0]) { // 如果该店铺list为空 del
                                    console.log('删除店铺购物车对象');
                                    setFlag = true;
                                }
                            }
                        }
                        // if (againNumber) { // 直接修改商品 number （再来一单使用）
                        //     list[index].product[i].number = againNumber;
                        // }
                    }
                });
                if (!flag) { // 如果当前分类不存在该商品 push一个数量为1的初始化商品
                    list[index].product.push(e);
                }
            }
            // if (list[index]) {
            //     list[index].user_coupon_id = ''; // 分类优惠券预留
            // }
        }
    });

    if (cart[shop_id]) { // 如果店铺存在 只改变list
        cart[shop_id] = { ...cart[shop_id], list };
    } else {
        const shopObj = {
            shop_id, // 店铺id
            list, // list-> { 分类对象 } -> { product-list }
            // user_coupon_id: '', // 全场优惠卷
            // table_id: '',
            // member_id: '',
            // couponNum: null,
        };
        cart[shop_id] = shopObj;
    }
    if (setFlag) { // 如果list为空 删除该店铺购物车对象
        delete cart[shop_id];
    }
    return cart
}