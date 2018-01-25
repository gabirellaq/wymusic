<template>
    <div id="BannerComponent">
        <swiper :options="swiperOption">
            <swiper-slide v-for="(item,index) in toBanner" :key="index">
                <img :src="item.pic | filterImg">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
    </div>
</template>
<script>
    export default {
        name:"BannerComponent",
        props:['toBanner'],
        data () {
            return {
                swiperOption: {
                    slidesPerView: 1,
                    spaceBetween: 30,
                    autoplay:true,
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                }
            }
        },
        computed:{
    
        },
        methods: {
            
        }
    }
</script>
<style lang="scss">
$banner_height: 336px;
#BannerComponent{
    width: 100%;
    height: $banner_height;
    background-color: #e8e8e8;
    .swiper-container{
        width: 100%;
        height: 100%;
        .swiper-slide{
            text-align:center;
            img{
                width: auto;
                height: auto
            }
        }
        .swiper-pagination{
            width: 100%;
            left: 0;
            bottom: 0.2666rem;
            .swiper-pagination-bullet{
                background: #fff;
            }
        }
    }
}
</style>
