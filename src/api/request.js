import axios from "axios";
//引入进度条
import nprogress from "nprogress";
//引入仓库
import store from '@/store'
//引入进度条的样式
import "nprogress/nprogress.css"

//利用axios对象的方法create,去创造一个axios实例
const requests = axios.create({
    //之后路径就不用加上api
    baseURL:"/api",
    //代表请求超时时间
    timeout:5000,
});
//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
    if(store.state.detail.uuid_token){
        //给请求头添加一个字段,给后端带过去数据
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    //需要携带token给服务器
    if(store.state.user.token){
        config.headers.token = store.state.user.token;
    }
    //进度条开始
    nprogress.start();
    return config;
})
//响应拦截器
requests.interceptors.response.use((res)=>{
    //进度条结束
    nprogress.done();
    //成功的回调函数
    return res.data;
},(error)=>{
    //响应失败的回调函数
    console.log(error);
    return Promise.reject(new Error('fail'))
});


//对外暴露
export default requests;