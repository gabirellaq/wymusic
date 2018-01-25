<template>
    <div id="SongDetail" class="area">
        <div class="container">
            <div class="containerRight">
                <div class="songarea">
                    <div class="sl" v-if="songdetailJson">
                        <div class="u-cover">
                            <img :src="songdetailJson[0].al.picUrl | filterImg" alt="">
                            <div class="msk"></div>
                        </div>
                    </div>
                    <div class="sr">
                        <div class="songdetail" v-if="songdetailJson">
                            <h3>{{songdetailJson[0].name}}</h3>
                            <p>歌手:{{songdetailJson[0].ar[0].name}}</p>
                            <p>所属专辑：{{songdetailJson[0].al.name}}</p>
                        </div>
                        <LyricComponent :lyricData="lyricJson.lrc" name="ep"></LyricComponent>
                    </div>
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
                        <div class="smallTitle">相似歌曲</div>
                        <ul v-if="simisongJson">
                            <li v-for="(i,index) in simisongJson" :key="index">
                                <router-link :to="`/songDetail?id=${i.id}`">
                                    <span class="songname">{{i.name}}</span>
                                    <span class="name">{{i.artists[0].name}}</span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
    import { mapState, mapMutations, mapActions } from 'vuex'
    import CommentComponent from '@/components/CommentComponent'
    import LyricComponent from '@/components/LyricComponent'
    export default {
        name:"SongDetail",
        components:{
            CommentComponent,
            LyricComponent
        },
        data () {
            return {
                pagename: '歌曲详情',
            }
        },
        methods: {
            ...mapActions([
                'getCommentMusicData',
                'getlyricData',
                'getSongDetailData',
                'getSimiSongData',
                'getMusicUrlData'
            ])
        },
        computed: {
            ...mapState({
                'commentPlaylist': state => state.songlist.commentmusic, //歌曲评论
                'lyricJson': state => state.songlist.lyric, //歌词
                'songdetailJson': state => state.songlist.songdetail.songs, //歌曲详情
                'simisongJson': state => state.songlist.simisong.songs, //相似歌曲
                'musicurlJson': state => state.songlist.musicurl.data, //音乐url
            })
        },
        mounted(){
            let id = this.$route.query.id;
            //歌曲详情
            this.getSongDetailData({id});
            //歌曲评论
            this.getCommentMusicData({id, 'limit':1});
            //歌词
            this.getlyricData({id});  
            //相似歌曲
            this.getSimiSongData({id});    
            this.getMusicUrlData({id}); //音乐url     
        }
    }
</script>
<style lang="scss">
@import "../assets/css/variables.scss";
#SongDetail{
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
    .lyrics {
        margin-left: 0;
    }
    .lyricstext.collapse{
        max-height:280px;
    }
    .songdetail {
        p {
            line-height: 25px;
            font-size: $font-size - 2;
        }
    }
    .u-cover {
        position: relative;
        margin-top: 30px;
        img {
            width: 130px;
            height: 130px;
            margin: 34px;
        }
        .msk {
            position: absolute;
            width: 206px;
            height: 205px;
            top: -4px;
            left: -4px;
            background:url('../assets/images/coverall.png') no-repeat -140px -580px;
        }
    }
    .simisongbox {
        li {
            padding: 5px 0;
            border-bottom:1px dashed darken($grey,5%);
            span {
                display: block;
                line-height:20px;
            }
            .name {
                color:$font-detail-color;
            }
        }
    }
}
</style>