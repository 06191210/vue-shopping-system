//当前这个模块：对API进行统一的管理
import requests from './request';
import mockRequests from './mockAjax';

//三级联动数据接口
//api/product/getBaseCategoryList get

//axios发请求
export const reqCategoryList = ()=> requests({url:'/product/getBaseCategoryList',method:'get'});
//获取banner(Home首页轮播图接口)
export const reqGetBannerList = ()=>mockRequests.get('/banner');

//获取floor数据
export const reqFloorList = ()=>mockRequests.get('/floor');

//获取Search模块数据 /api/list post 需要带参
//当前这个接口，参数至少为一个空对象
export const reqGetSearchInfo = (params)=>requests({url:"/list",method:"post",data:params})

//获取产品的详细信息
export const reqGoodsInfo = (skuId)=>requests({url:`/item/${skuId}`,method:'get'});

//将产品添加到购物车中 /api/cart/addToCart/{ skuId }/{ skuNum } POST
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${ skuId }/${ skuNum }`,method:"post"});

//获取购物车列表信息 /api/cart/cartList
export const reqCartList = ()=>requests({url:'/cart/cartList',method:'get'});

//删除购物产品的接口
export const reqDeleteCartById = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'});

//修改商品选中的状态
export const reqUpdateCheckedByid = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'});

//获取验证码
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'});

//注册  /api/user/passport/register
export const reqUserRegister = (data)=>requests({url:'/user/passport/register',data,method:'post'});

//登录
export const reqUserLogin = (data)=>requests({url:'/user/passport/login',data,method:'post'});

//用户点击登陆成功后获取用户信息
export const reqUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'});

//退出登录
export const reqLogout = ()=>requests({url:'/user/passport/logout',method:'get'});

//获取用户地址信息
export const reqAddressInfo = ()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'});

//获取商品清单
export const reqOrderInfo= ()=>requests({url:'/order/auth/trade',method:'get'});

//提交订单的接口
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'});

//获取支付信息
export const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'});

//获取支付订单状态
export const reqPayStatus = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'});

//获取个人中心的数据
export const reqMyOrderList = (page,limit) =>requests({url:`/order/auth/${page}/${limit}`,method:'get'});