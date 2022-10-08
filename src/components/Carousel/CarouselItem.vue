<template>
    <div class="swiper-container" ref="cur">
        <div class="swiper-wrapper">
            <!-- 轮播图 -->
            <div class="swiper-slide" v-for="(carousel) in list" :key="carousel.id">
                <img :src="carousel.imgUrl">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from 'swiper';
export default {
    name: 'CarouselItem',
    props: ['list'],
    watch: {
        list: {
            //立即监听
            immediate: true,
            handler() {
                //nextTick:下次DOM更新，循环结束之后，执行延迟回调，
                this.$nextTick(() => {
                    new Swiper(
                        this.$refs.cur,
                        {
                            autoplay: {
                                delay: 2000,
                                stopOnLastSlide: false,
                                disableOnInteraction: true,
                            },
                            loop: true, // 循环模式选项
                            // 如果需要分页器
                            pagination: {
                                el: '.swiper-pagination',
                                clickable: true,
                            },
                            // 如果需要前进后退按钮
                            navigation: {
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            },
                        });
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
</style>