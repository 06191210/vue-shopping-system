//配置路由的地方
import Vue from 'vue';
import routes from './routes'
import VueRouter from 'vue-router'; 
import store from '@/store'

//使用插件
Vue.use(VueRouter);
//引入路由组件

//重写push方法，先把VueRouter的原型对象的push，先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,()=>{},()=>{});
    }
}

VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        originReplace.call(this,location,resolve,reject);
    }else{
        originReplace.call(this,location,()=>{},()=>{});
    }
}
//配置路由
let router =  new VueRouter({
    //配置路由
    routes,
    //让点击进去的页面滚动条在最上方
    scrollBehavior () {
        return {y : 0};
    }
})
//配置全局守卫：前置守卫(在发生路由跳转前，进行判断)
router.beforeEach(async(to, from, next)=>{
    //to:可以获取到你要跳到哪个路由信息
    //from: 可以获取到你从哪个路由信息来的
    //next: 放行函数 (1) next(); (2) next('/login)
    let token = store.state.user.token;
    //用户的信息
    let name = store.state.user.userInfo.name;
    if(token){ 
        //用户登录之后就不能去登录页面了
        if(to.path=='/login'){
            //回到首页
            next('/');
        }else{
            //登录了但不是去登录页面
           if(name){
            //有用户名了
            next();
           }else{
            try {
                //没有用户信息，派发action让仓库存储用户信息再跳转
                await store.dispatch('getUserInfo');
                next();
            } catch (error) {
                //token失效了
                //清除token
                await store.dispatch('userLogout');
                next('/login');
            }

           }
        }
    }else{
        //未登录不能去交易、支付、支付成功页面,不能去个人中心
        let toPath = to.path;
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1 ){
            //把未登录的时候想去而没有去成的信息，存储于地址栏中[路由]
            next('/login?redirect='+toPath);
            //decodeURIComponent() 解析query参数的path
        }else{
            //去的是home|search|shopCart
            next();
        }
        
    }
});
export default router