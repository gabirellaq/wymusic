<template>
    <div id="BannerComponent">
        <swiper :options="swiperOption">
            <swiper-slide>Slide 1</swiper-slide>
            <swiper-slide>Slide 2</swiper-slide>
            <swiper-slide>Slide 3</swiper-slide>
            <swiper-slide>Slide 4</swiper-slide>
            <swiper-slide>Slide 5</swiper-slide>
            <swiper-slide>Slide 6</swiper-slide>
            <swiper-slide>Slide 7</swiper-slide>
            <swiper-slide>Slide 8</swiper-slide>
            <swiper-slide>Slide 9</swiper-slide>
            <swiper-slide>Slide 10</swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>
<script>
    export default {
        name:"BannerComponent",
        data () {
            return {
                swiperOption: {
                    slidesPerView: 1,
                    spaceBetween: 30,
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
    padding: 10px;
    height: $banner_height;
    background-color: #e8e8e8;
    .swiper-container{
        width: 100%;
        height: 100%;
        .swiper-slide{
            img{
                width: 100%;
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
