import Vue from 'vue'
import App from './App.vue'
//三级联动组件---全局组件
import AllGoods from '@/components/TypeNav/AllGoods';
import Carousel from '@/components/Carousel/CarouselItem.vue'
import PageItem from '@/components/Pagination/PageItem'
import 'element-ui/lib/theme-chalk/index.css';
//第一个参数：全局组件名字，第二个参数：组件
Vue.component('AllGoods',AllGoods);
Vue.component('CarouselItem',Carousel);
Vue.component('PageItem',PageItem);
import{ MessageBox } from 'element-ui';
//注册element插件
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//引入路由
import router from '@/router';
//引入vuex仓库
import store from '@/store';
//引入MockServe.js
import '@/mock/mockServe'
//引入swiper样式
import "swiper/css/swiper.css"
//统一接口api文件夹里面的全部请求函数
//统一引入
import * as API from '@/api'
import load from '@/assets/loading.gif'
//引入懒加载插件
import VueLazyload from 'vue-lazyload'
//注册插件
Vue.use(VueLazyload,{
  //懒加载默认的图片
  loading:load
});
//引入自定义插件
import myPlugins from '@/plugins/myPlugins';
Vue.use(myPlugins,{
  name:'upper'
});
//引入表单校验插件
import '@/plugins/validate';
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  //配置全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  //注册路由：底下的写法KV一致省略V
  router,
  //注册仓库：组件的实例尚会多一个属性$store
  store,
}).$mount('#app')
