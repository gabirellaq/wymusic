<template>
    <div id="Recommend">
        <BannerComponent :toBanner="bannerJson.banners"></BannerComponent>
        <div class="area container">
            <div class="containerRight">
                <div class="wrap">
                    <div class="containerTitle wrapTitle">
                        <h4>{{recommendSongTitle}}</h4>
                        <span class="more">
                            <router-link to="/songlist">更多 <i class="el-icon-d-arrow-right"></i></router-link>
                        </span>
                    </div>
                    <div class="wrapcontent songlistcomponent" >
                        <ul class="songsList" v-if="recommendSongJson">
                            <li v-for="(itemx,idx) in recommendSongJson.result" :key="idx">
                                <router-link :to="`/songDetail?id=${itemx.id}`">
                                    <img :src="itemx.picUrl" class="pic">
                                    <span>{{itemx.copywriter}}</span>
                                    <span class="name">{{itemx.name}}</span>                            
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="wrap">
                    <div class="containerTitle wrapTitle">
                        <h4>{{topAlbumTitle}}</h4>
                        <span class="more">
                            <router-link to="/newAlbum">更多 <i class="el-icon-d-arrow-right"></i></router-link>
                        </span>
                    </div>
                    <div class="wrapcontent" >
                        <AlbumComponent :albumData="albumDataJson.albums"></AlbumComponent>
                    </div>
                </div>
                <div class="wrap">
                    <div class="containerTitle wrapTitle">
                        <h4>{{topmvTitle}}</h4>
                    </div>
                    <div class="wrapcontent" >
                        <MVComponent :mvData="personalizedmvJson.result" title="personalized"></MVComponent>
                    </div>
                </div>
            </div>
            <div class="containerLeft">
                <div class="smallTitle">{{hotSingersTitle}}</div>
                <SingersComponent :singersData="hotSingersJson.artists"></SingersComponent>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState, mapMutations, mapActions } from 'vuex'
    import BannerComponent from '@/components/BannerComponent'
    import AlbumComponent from '@/components/AlbumComponent'
    import SingersComponent from '@/components/SingersComponent'
    import MVComponent from '@/components/MVComponent'
    export default {
        name:"Recommend",
        components:{
            BannerComponent,
            AlbumComponent,
            SingersComponent,
            MVComponent
        },
        data () {
            return {
                title: '推荐歌单',
                recommendSongTitle: '热门推荐',
                topAlbumTitle: '新碟上架',
                hotSingersTitle: '热门歌手',
                topmvTitle:'推荐mv'
            }
        },
        methods: {
            ...mapActions([
                'getBannerData',
                'getRecommendSongsData',
                'getTopAlbumData',
                'getHotSingersData',
                'getpersonlizedMvData'
            ])
        },        
        computed: {
            ...mapState({
                'bannerJson': state => state.banner.banner,
                'recommendSongJson': state => state.songlist.recommendsong,
                'albumDataJson': state => state.songlist.topalbum,
                'hotSingersJson': state => state.singer.hotsingers,
                'personalizedmvJson': state => state.mv.personalizedmv
            }),
        },
        mounted() {            
            this.getBannerData();//bannner            
            this.getRecommendSongsData({'limit':8});//推荐歌曲            
            this.getTopAlbumData({'offset':0,'limit':8});//新碟上架            
            this.getHotSingersData({'offset':0, 'limit':8});//热门歌手
            this.getpersonlizedMvData(); //推荐mv
        },
    }
</script>

<style lang="scss">
@import "../assets/css/variables.scss";
#Recommend {
    .wrapTitle {
        h4 {
            font-weight:normal;
            flex: 1;
        }
        span {
            font-size: $font-size;
        }
    }
    .wrapcontent{
        padding-bottom: 27px;
    }
    .containerLeft {
        width: 228px;
        background-color: $white;
        padding: 14px;
        .containerTitle {
            font-size:$font-size;
            border-width:1px;
            border-color:darken($grey,10%);
        }
        .searchsingerList {
            display: block;
            li {
                margin-right: 0;
                margin-top: 10px;
                display: flex;
                width: 100%;
                background-color: $grey;
                border:1px solid darken($grey,10%);
                img {
                    width: 60px;
                    height:60px;
                    margin-right: 10px;
                    border:0;
                }
            }
        }
    }
    .songlistcomponent li{
        margin-right: 30px;
    }
    .albumList li {
        margin-right: 17px;
    }
    .songsList li {
        span {
            display: block;
        }
    }
}
</style>