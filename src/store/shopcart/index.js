import { reqCartList,reqDeleteCartById,reqUpdateCheckedByid } from "@/api";

const state = {
    cartList:[],
};
const mutations = {
    GETCARTLIST(state,cartList){
        state.cartList = cartList;
    }
};
const actions = {
    //获取购物车列表数据
    async getCartList(context){
        let result = await reqCartList();
        if(result.code == 200){
            context.commit("GETCARTLIST",result.data);
        }
    },
    //删除购物车的商品
    async deleteCartListBySkuId(context,skuId){
        let result =  await reqDeleteCartById(skuId);
        if(result.code == 200) {
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    //修改购物车某一个产品的选中状态
    async updateCheckedById(context,{skuId,isChecked}){
        let result =  await reqUpdateCheckedByid(skuId,isChecked);
        if(result.code == 200) {
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
    deleteAllCheckedCart({dispatch,getters}){
        let PromiseAll = [];
        //获取购物车所有商品(是一共数组)
        getters.cartList.cartInfoList.forEach(item=>{
            let promise = item.isChecked==1?dispatch('deleteCartListBySkuId',item.skuId):'';
            //将每一次返回的Promise添加到数组当中
            PromiseAll.push(promise);
        });
    return Promise.all(PromiseAll);
   },
   //修改全部从产品的状态
    UpdateAllIsChecked({dispatch,state},isChecked){
        let promiseAll =[];
        state.cartList[0].cartInfoList.forEach((item)=>{
            let promise= dispatch('updateCheckedById',{skuId:item.skuId,isChecked});
            promiseAll.push(promise);
        });
        return Promise.all(promiseAll);
    }
};
const getters = {
    cartList(state){
        return state.cartList[0]||{};
    },
    //计算出购物车的数据
    
};
export default{
    state,
    mutations,
    actions,
    getters
}