<template>
    <div id="Recommend">
        <BannerComponent :toBanner="bannerJson"></BannerComponent>
        <div class="area">
        </div>
    </div>
</template>
<script>
    import { mapMutations, mapActions } from 'vuex'
    import BannerComponent from '@/components/BannerComponent'
    export default {
        name:"Recommend",
        components:{
            BannerComponent
        },
        data () {
            return {
                title: '推荐歌单',
                bannerJson:[]
            }
        },
        methods: {
            ...mapActions([
                'getBannerData'
            ]),
            get_Banner() {
                this.getBannerData()
                    .then(res => {
                        if(res){
                            this.bannerJson = res.banners;
                        }
                    }).catch(err => {
                        console.log("get_banner", err)
                    })
            },
            init() {
                this.get_Banner()
            }
        },
        mounted() {
            this.init()
        }
    }
</script>