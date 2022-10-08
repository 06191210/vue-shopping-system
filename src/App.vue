<template>
    <div>
        <Header></Header>
        <!-- 路由组件出口的地方 -->
        <router-view></router-view>
        <!-- Footer在Home、Search显示的，在登录、注册隐藏 -->
        <Footer v-show="$route.meta.show"></Footer>
    </div>
</template>

<script>
//引入
import Header from './components/Header/HeaderItem'
import Footer from './components/Footer/FooterItem'
export default {
    name:'App',
    data(){
        return{
            msg:'abc'
        }
    },
    components:{
        Header,
        Footer
    },
    mounted(){
        //派发一个action，使得数据只请求一次
        this.$store.dispatch('categoryList');
    }

    
}
</script>

<style scoped>

</style>