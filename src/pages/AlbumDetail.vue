<template>
    <div id="AlbumDetail" class="area">
        <div class="container">
            <div class="containerRight">
                <div class="songarea">
                    <div class="sl" v-if="albumdetailJson">
                        <div class="u-cover">
                            <img :src="albumdetailJson.album.picUrl | filterImg" alt="">
                            <div class="msk"></div>
                        </div>
                    </div>
                    <div class="sr">
                        <div class="songdetail" v-if="albumdetailJson">
                            <h3>{{albumdetailJson.album.name}}</h3>
                            <p>歌手:{{albumdetailJson.album.artist.name}}</p>
                            <p>发行公司：{{albumdetailJson.album.company}}</p>
                            <p class="description" :class="{collapse:isCollapse}">
                                介绍：{{albumdetailJson.album.description}}
                            </p>
                            <p class="collapseBtn" @click="collapse()">
                                <span v-if="isCollapse">展开<i class="el-icon-arrow-down"></i></span>
                                <span v-else>收缩<i class="el-icon-arrow-up"></i></span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="songlistbox">
                    <div class="songlistTitle">
                        <h3>歌曲列表</h3>
                    </div>
                    <ul class="searchList">
                        <li v-for="(i,key) in albumdetailJson.songs" :key="key">
                            <router-link :to="`/songDetail?id=${i.id}`">
                                <span class="number">{{key + 1}}</span>
                                <span class="name">{{i.name}}</span>
                                <span>{{i.ar[0].name}}</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="commentbox">
                    <CommentComponent :commentData="albumcommentJson.topComments" name="最热评论"></CommentComponent>
                    <CommentComponent :commentData="albumcommentJson.hotComments" name="精彩评论"></CommentComponent>
                    <CommentComponent :commentData="albumcommentJson.comments" name="评论"></CommentComponent>
                </div>
            </div>
            <div class="containerLeft">
                <div class="margin">
                    <div class="simisongbox">
                        
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
    import { mapState, mapMutations, mapActions } from 'vuex'
    import {filter} from '../filter.js'
    import CommentComponent from '@/components/CommentComponent'
    export default {
        name:"AlbumDetail",
        components:{
            CommentComponent,
        },
        data () {
            return {
                pagename: '专辑详情',
                isCollapse: true,
            }
        },
        methods: {
            ...mapActions([
                'getAlbumDetailData',
                'getAlbumCommentData'
            ]),
            collapse(){
                this.isCollapse = !this.isCollapse;
            }
        },
        computed: {
            ...mapState({
                'albumdetailJson': state => state.songlist.albumdetail,
                'albumcommentJson': state => state.songlist.albumcomment,
            })
        },
        mounted(){
            let id = this.$route.query.id;
            this.getAlbumDetailData({id});
            this.getAlbumCommentData({id});
        }
    }
</script>
<style lang="scss">
@import "../assets/css/variables.scss";
#AlbumDetail{
    .songarea {
        display: flex;
        .sl{
            width:230px;
        }
        .sr{
            flex:1;
            overflow: hidden;
        }
    }
    .creatorbox {
        display: flex;
        align-items: center;
        img {
            width: 50px;
            height:50px;
            border:1px solid $grey;
            margin-right: 10px;
        }
    }
    .tagsbox {
        span{
            border:1px solid $grey;
            border-radius: 14px;
            margin-right: 7px;
            padding: 1px 9px;
        }
    }
    .songdetail {
        margin-top: 30px;
        p {
            line-height: 25px;
            font-size: $font-size - 2;
            margin-top: 5px;
        }
    }
    .songlistbox {
        margin-top: 20px;
        ul {
            border:1px solid $grey;
            margin-top: 10px;
            padding:0;
        }
    }
    .u-cover {
        position: relative;
        margin-top: 30px;
        img {
            width: 177px;
            height: 177px;
        }
        .msk {
            position: absolute;
            width: 209px;
            height: 177px;
            top: 0;
            left: 0;
            background:url('../assets/images/coverall.png') no-repeat 0 -986px;
        }
    }
    .simisongbox {
        li {
            margin-right:5px;
            width: 102px;
            margin-top: 10px;
            a {
                padding:0;
            }
            span {
                display: block;
                line-height:20px;
            }
            .name {
                color:$font-detail-color;
            }
            .pic {
                height:102px;
                margin-right: 0;
            }
            .count,
            .bookcount,
            .playcount {
                display: none;
            }
        }
    }
    .description {
        &.collapse {
            max-height: 200px;
            overflow: hidden;
        }
    }
    .collapseBtn {
        text-align: right;
        span {
            cursor: pointer;
        }
    }
}
</style>