// import Home from '@/pages/Home/HomeRouter'
// import Search from '@/pages/Search/SearchItem.vue'
// import Login from '@/pages/Login/LoginRouter'
// import Register from '@/pages/Register/RegisterRouter'
// import Detail from '@/pages/Detail/DetailItem'
// import AddCartSuccess from'@/pages/AddCartSuccess/CartSuccess';
// import ShopCart from '@/pages/ShopCart/ShopCart'
// import Trade from '@/pages/Trade/TradeItem'
// import Pay from '@/pages/Pay/PayItem'
// import PaySuccess from '@/pages/PaySuccess/PaySuccess'
// import Center from '@/pages/Center/CenterItem'
//引入二级路由
// import MyOrder from '@/pages/Center/myOrder/MyOrder'
// import GroupOrder from '@/pages/Center/groupOrder/GroupOrder'


export default[
    {
        path:"/center",
        component:()=>import('@/pages/Center/CenterItem'),
        //显示center组件
        meta:{show:true},
        //二级路由
        children:[
            {
                path:'myorder',
                component:()=>import('@/pages/Center/myOrder/MyOrder'),
            },
            {
                path:'grouporder',
                component:()=>import('@/pages/Center/groupOrder/GroupOrder'),
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]
    },
    {
        path:"/paysuccess",
        component:()=>import('@/pages/PaySuccess/PaySuccess'),
        //显示paysuccess组件
        meta:{show:true}
    },
    {
        path:"/pay",
        component:()=>import('@/pages/Pay/PayItem'),
        //显示pay组件
        meta:{show:true},
        beforeEnter: (to, from, next) => {
            if(from.path =='/trade'){
                next();
            }else{
                next(false);
            }
        }
    },
    {
        path:"/trade",
        component:()=>import('@/pages/Trade/TradeItem'),
        //显示trade组件
        meta:{show:true},
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            if(from.path=='/shopcart'){
                next();
            }else{
                //停留在当前的路由
                next(false);
            }
        }
    },
    {
        path:"/shopcart",
        component:()=>import('@/pages/ShopCart/ShopCart'),
        //显示shopcart组件
        meta:{show:true}
    },
    {
        path:"/addcartsuccess",
        component:()=>import('@/pages/AddCartSuccess/CartSuccess'),
        name:'addcartsuccess',
        //显示添加购物车组件
        meta:{show:true}
    },
    {
        path:"/detail/:skuid",
        component:()=>import('@/pages/Detail/DetailItem'),
        meta:{show:true}
    },
    {
        path:"/home",
        component:()=>import("@/pages/Home/HomeRouter"),
        meta:{show:true}
    },
    {
        path:"/search/:keyword?",
        component:()=>import('@/pages/Search/SearchItem'),
        meta:{show:true},
        name:"search",
        //props布尔值写法,若布尔值为真，则将路由组件收到的所有params参数传递给该组件
        // props:true
        //props对象写法
        // props:{a:1,b:2},
        //函数写法
        // props:($route)=>{
        //     return {keyword:$route.params.keyword,k:$route.query.k}
        // }
    },
    {
        path:"/login",
        component:()=>import('@/pages/Login/LoginRouter'),
        meta:{show:false}
    },
    {
        path:"/register",
        component:()=>import('@/pages/Register/RegisterRouter'),
        meta:{show:false}
    },
    //重定向,在项目跑起来的时候,访问/,立马让他定向到首页
    {
        path:'*',
        redirect:"/home"
    }

]