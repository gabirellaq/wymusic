<template>
    <div id="SongListDetail" class="area">
        <div class="container">
            <div class="containerRight">
                <div class="songarea">
                    <div class="sl" v-if="songlistdetailJson">
                        <div class="u-cover">
                            <img :src="songlistdetailJson.coverImgUrl | filterImg" alt="">
                            <div class="msk"></div>
                        </div>
                    </div>
                    <div class="sr">
                        <div class="songdetail" v-if="songlistdetailJson">
                            <h3>{{songlistdetailJson.name}}</h3>
                            <p class="creatorbox">
                                <img :src="songlistdetailJson.creator.avatarUrl">
                                <span>{{songlistdetailJson.creator.nickname}}</span>
                            </p>
                            <p class="tagsbox">标签:
                                <span v-for="(x,y) in songlistdetailJson.tags" :key="y">
                                    {{x}}
                                </span>
                            </p>
                            <p>介绍：{{songlistdetailJson.description}}</p>
                        </div>
                    </div>
                </div>
                <div class="songlistbox">
                    <SongListComponent :songlistData="songlistdetailJson"></SongListComponent>
                </div>
                <div class="commentbox">
                    <CommentComponent :commentData="commentPlaylist.topComments" name="最热评论"></CommentComponent>
                    <CommentComponent :commentData="commentPlaylist.hotComments" name="精彩评论"></CommentComponent>
                    <CommentComponent :commentData="commentPlaylist.comments" name="评论"></CommentComponent>
                </div>
            </div>
            <div class="containerLeft">
                <div class="margin">
                    <div class="simisongbox">
                        <div class="smallTitle">精品歌单</div>
                        <songsComponent :songsData="songlisthighqualityJson.playlists" class="songlistcomponent"></songsComponent>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
    import { mapState, mapMutations, mapActions } from 'vuex'
    import CommentComponent from '@/components/CommentComponent'
    import SongListComponent from '@/components/SongListComponent'
    import songsComponent from '@/components/SongsComponent'
    export default {
        name:"SongListDetail",
        components:{
            CommentComponent,
            SongListComponent,
            songsComponent
        },
        data () {
            return {
                pagename: '歌单详情',
            }
        },
        methods: {
            ...mapActions([
                'getSongListData',
                'getSongListCommentData',
                'getSongListHighqualityData'
            ])
        },
        computed: {
            ...mapState({
                'songlistdetailJson': state => state.songlist.songlistdetail.playlist,
                'commentPlaylist': state => state.songlist.songlistcomment,
                'songlisthighqualityJson': state => state.songlist.songlisthighquality,
            })
        },
        mounted(){
            let id = this.$route.query.id;
            this.getSongListData({id}); //歌单详情
            this.getSongListCommentData({id}); //歌单评论  
            this.getSongListHighqualityData({'limit':10}); //精品歌单    
        }
    }
</script>
<style lang="scss">
@import "../assets/css/variables.scss";
#SongListDetail{
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
    .u-cover {
        position: relative;
        margin-top: 30px;
        img {
            width: 200px;
            height: 200px;
        }
        .msk {
            position: absolute;
            width: 208px;
            height: 208px;
            top: -4px;
            left: -4px;
            background:url('../assets/images/coverall.png') no-repeat 0 -1285px;
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
}
</style>