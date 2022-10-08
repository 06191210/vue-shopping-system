<template>
    <div>
        <!-- 三级联动全局组件，因此不需要再引入了 -->
        <AllGoods />
        <ListContainer />
        <TodayRecommend />
        <GoodsRank />
        <YouLike />
        <GoodsFloor v-for="(floor) in floorList" :key="floor.id"  :list="floor" />

    </div>
</template>

<script>
import ListContainer from '@/pages/Home/List/ListContainer';
import TodayRecommend from '@/pages/Home/Recommend/TodayRecommend.vue'
import GoodsRank from '@/pages/Home/Rank/GoodsRank.vue'
import YouLike from '@/pages/Home/Like/YouLike.vue'
import GoodsFloor from '@/pages/Home/Floor/GoodsFloor.vue'
import { mapState } from 'vuex';
export default {
    name: 'HomeRouter',
    components: {
        ListContainer,
        TodayRecommend,
        GoodsRank,
        YouLike,
        GoodsFloor,
    },
    mounted() {
        //派发action,获取floor组件的数据
        this.$store.dispatch("reqFloorList");
        //获取用户信息放在首页
        this.$store.dispatch("getUserInfo");
    },
    computed: {
        ...mapState({
            floorList: state => state.home.floorList
        })
    }
}
</script>

<style lang="scss" scoped>
</style>