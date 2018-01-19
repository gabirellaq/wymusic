<template>
    <div id="Recommend">
        <BannerComponent :toBanner="bannerJson"></BannerComponent>
        <div class="area">
            <div class="wrap">
                <div class="wrapTitle">
                    <h1>{{recommendSongTitle}}</h1>
                    <span class="more">
                        <router-link to="/songlist">更多 <i class="el-icon-d-arrow-right"></i></router-link>
                    </span>
                </div>
                <div class="wrapcontent songlistcomponent" >
                    <ul class="songsList" v-if="recommendSongJson.length > 0">
                        <li v-for="(itemx,idx) in recommendSongJson" :key="idx">
                            <img :src="itemx.picUrl" class="pic">
                            <span>{{itemx.copywriter}}</span>
                            <span class="name">{{itemx.name}}</span>                            
                        </li>
                    </ul>
                </div>
            </div>
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
                recommendSongTitle: '热门推荐',
                bannerJson:[],
                recommendSongJson:[], //热门推荐
            }
        },
        methods: {
            ...mapActions([
                'getBannerData',
                'getRecommendSongsData'
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
            get_recommendsong(limit){
                this.getRecommendSongsData({'limit':limit})
                    .then(res=>{
                        this.recommendSongJson = res.result
                    }).catch(err => {
                        console.log("get_recommendsong", err)
                    })
            },
            init() {
                this.get_Banner();
                this.get_recommendsong();
            }
        },
        mounted() {
            this.init()
        }
    }
</script>

<style lang="scss">
@import "../assets/css/variables.scss";
.wrapTitle {
    padding:10px;
    margin: 0 23px;
    border-bottom: 2px solid $red;;
    padding: 20px 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    h1 {
        font-weight:normal;
        flex: 1;
    }
}
</style>