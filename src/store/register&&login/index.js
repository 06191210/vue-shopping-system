//登录与注册仓库
import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout} from '@/api'
import {setToken, getToken, removeToken} from '@/utils/token'
const state = {
    code:'',
    token:getToken(),
    userInfo:{},
};
const mutations = {
    GETCODE(state,code){
        state.code = code;
    },
    USERLOGIN(state,token){
        state.token = token;
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo;
    },
    CLEAR(state){
        //把仓库
        state.token='';
        state.userInfo = {};
        //本地存储数据清空
        removeToken();
    }
};
const actions = {
    //获取验证码
    async getCode(context,phone){
        let result = await reqGetCode(phone);
        if(result.code == 200){
            context.commit('GETCODE',result.data);
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'));
        }
      
    },
    //用户注册
    async userRegister(context,user){
       let result = await reqUserRegister(user);
       console.log(result);
       if(result.code == 200){
        return 'ok';
       }else{
        return Promise.reject(new Error('faile'));
       }
    },
    //用户登录
    async userLogin(context,data){
        let result = await reqUserLogin(data);
        if(result.code == 200){
            context.commit('USERLOGIN',result.data.token);
            //持久化存储token
            setToken(result.data.token);
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    //获取用户信息
    async getUserInfo(context){
        let result = await reqUserInfo();
        if(result.code == 200){
            context.commit('GETUSERINFO',result.data);
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    //退出登录
    async userLogout(context){
        //只是向服务器发起一次请求，通知服务器清token
        let result = await reqLogout();
        if(result.code == 200){
            context.commit("CLEAR");
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    }
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters

}