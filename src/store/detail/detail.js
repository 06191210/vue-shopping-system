import { reqGoodsInfo ,reqAddOrUpdateShopCart } from "@/api";
//封装临时游客身份uuid
import {getUUID} from '@/utils/uuid_token';
const state = {
    goodInfo:{},
    //游客临时身份
    uuid_token:getUUID(),
};
const mutations ={
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo;
    },
};
const actions = {
    //获取产品信息的action
   async getGoodInfo(context,skuId){
       let result =  await reqGoodsInfo(skuId);
       if(result.code == 200){
            context.commit('GETGOODINFO',result.data);
       }
    },
    //将产品添加到购物车中
    async addOrUpdateShopCart(context,{skuId,skuNum}){
       let result =  await reqAddOrUpdateShopCart(skuId,skuNum);
       if(result.code == 200){
            return "ok"
       }else{
            //代表加入购物车失败
            return Promise.reject(new Error('faile'));
       }
    }
};
//简化数据而生
const getters = {
    categoryView(state){
        //如果数据没回来时，返回一个空对象
        return state.goodInfo.categoryView || {};
    },
    //简化产品信息
    skuInfo(state){
        return state.goodInfo.skuInfo || {};
    },
    //产品的售卖属性
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList ||[]
    }
};
export default {
    state,
    actions,
    mutations,
    getters

}