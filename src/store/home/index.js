import {reqCategoryList,reqGetBannerList,reqFloorList} from '@/api/index'
//home模块的小仓库
const state = {
    categoryList:[],
    //轮播图数据
    bannerList:[],
    //floor数据
    floorList:[],
};
const mutations ={
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList.slice(0,16);
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList;
    },
    REQFLOORLIST(state,floorList){
        state.floorList = floorList;
    },
};
const actions ={
    async categoryList(context){
        //执行请求数据函数
        let result = await reqCategoryList();
        if(result.code==200){
            context.commit("CATEGORYLIST",result.data);
        }
    },
    //获取首页轮播图数据
    async getBannerList(context){
        let result = await reqGetBannerList();
        if(result.code == 200){
                context.commit('GETBANNERLIST',result.data);
        }
    },
    //获取floor数据
    async reqFloorList(context){
        let result = await reqFloorList();
        if(result.code == 200){
                context.commit('REQFLOORLIST',result.data);
        }
    }
};
const getters = {};
export default{
    state,
    mutations,
    actions,
    getters
}