import {reqGetSearchInfo} from '@/api'
//search模块的小仓库
const state = {
    //仓库的初始状态
    searchList:{},
};
const mutations ={
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList;
    }
};
const actions ={
    //获取search模块数据
    async getSearchList(context,params={}){
        //params形参：是当用户派发action的时候，第二个参数传递过来的
       let result = await reqGetSearchInfo(params);
       if(result.code == 200){
        context.commit('GETSEARCHLIST',result.data);
       }
    }
};
//项目当中getter主要作用是：简化仓库中的数据
const getters = {
    //当前state是当前仓库的state
    goodsList(state){
        return state.searchList.goodsList||[];
    },
    trademarkList(state){
        return state.searchList.trademarkList;
    },
    attrsList(state){
        return state.searchList.attrsList;
    }
};
export default{
    state,
    mutations,
    actions,
    getters
}