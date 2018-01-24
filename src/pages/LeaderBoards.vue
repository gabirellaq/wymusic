<template>
    <div id="LeaderBoards" class="area container">
        <div class="containerLeft">
            <h4>{{specialTitle}}</h4>
            <div class="boardbox">
                <div class="menulist" :class="{active: isActive === item.type}" v-for="(item,idx) in specialBoardData" :key="idx" @click="boardTabClick(item.type)">
                    <img :src="item.pic">
                    <span>{{item.label}}</span>
                </div>
            </div>
            <h4>{{globalTitle}}</h4>
            <div class="boardbox">
                <div class="menulist" :class="{active: isActive === item.type}" v-for="(item,idx) in globalBoardData" :key="idx" @click="boardTabClick(item.type)">
                    <img :src="item.pic">
                    <span>{{item.label}}</span>
                </div>                
            </div>
        </div>
        <div class="containerRight" v-if="boardRightData.playlist">
            <div class="boardrightTitle">
                <img :src="boardRightData.playlist.coverImgUrl | filterImg">
                <div class="boardrightTitleTxt">
                    <p class="name">{{boardRightData.playlist.name}}</p>
                    <p class="description">{{boardRightData.playlist.description}}</p>
                    <div class="btn">
                        <el-button type="primary" size="small" plain icon="el-icon-caret-right">播放<i class="el-icon-plus el-icon--right"></i></el-button>
                    </div>
                </div>
            </div>
            <div class="boardrightContent">
                <div class="boardrightContentTitle">
                    <h3>歌曲列表</h3>
                    <span>{{boardRightData.playlist.trackCount}}首歌</span>
                    <p>播放：<span class="red">{{boardRightData.playlist.playCount}}</span> 次</p>
                </div>
                <ul class="searchList">
                    <li v-for="(i,idxs) in boardRightData.playlist.tracks" :key="idxs">
                        <router-link :to="`/songDetail?id=${i.id}`">
                            <span class="number">{{idxs + 1}}</span>
                            <span class="name"><img :src="i.al.picUrl" class="pic">{{i.name}}</span>
                            <span>{{i.dt | transformTime}}</span>
                            <span>{{i.ar[0].name}}</span>
                        </router-link>
                    </li>
                </ul>
                <div class="commentbox">
                    <CommentComponent :commentData="commentPlaylist.hotComments" name="精彩评论"></CommentComponent>
                    <CommentComponent :commentData="commentPlaylist.comments" name="评论"></CommentComponent>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState, mapMutations, mapActions } from 'vuex'
    import CommentComponent from '@/components/CommentComponent'
    import filter from '../filter.js'
    export default {
        name:"LeaderBoards",
        components:{
            CommentComponent
        },
        data () {
            return {
                pagename: '排行榜',
                id:'', //每个歌单的id,用于获取评论
                isActive: 3, //当前显示的menu
                specialTitle:'云音乐特色榜',
                specialBoardData:[
                    {
                        'type':3,
                        'label':'云音乐飙升榜',
                        'pic':'http://p1.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg?param=40y40'
                    },{
                        'type':0,
                        'label':'云音乐新歌榜',
                        'pic':'http://p1.music.126.net/N2HO5xfYEqyQ8q6oxCw8IQ==/18713687906568048.jpg?param=40y40'
                    },{
                        'type':2,
                        'label':'网易原创歌曲榜',
                        'pic':'http://p1.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg?param=40y40'
                    },{
                        'type':1,
                        'label':'云音乐热歌榜',
                        'pic':'http://p1.music.126.net/GhhuF6Ep5Tq9IEvLsyCN7w==/18708190348409091.jpg?param=40y40'
                    }
                ],
                globalTitle:'全球媒体榜',
                globalBoardData:[
                    {
                        'type':4,
                        'label':'云音乐电音榜',
                        'pic':'http://p1.music.126.net/5tgOCD4jiPKBGt7znJl-2g==/18822539557941307.jpg?param=40y40'
                    },{
                        'type':23,
                        'label':'云音乐嘻哈榜',
                        'pic':'http://p1.music.126.net/RChr5NydlXafIV1GVEHJdg==/19073228207465342.jpg?param=40y40'
                    },{
                        'type':11,
                        'label':'韩国Melon排行榜周榜',
                        'pic':'http://p1.music.126.net/9YSGHPRdVazKSiNGl3uwpg==/5920870115713082.jpg?param=40y40'
                    },{
                        'type':12,
                        'label':'韩国Mnet排行榜周榜',
                        'pic':'http://p1.music.126.net/tSl2BF3dZi4cLMD70_fYLw==/5739450697092147.jpg?param=40y40'
                    },{
                        'type':13,
                        'label':'韩国Melon原声周榜',
                        'pic':'http://p1.music.126.net/v_cgiZ305WeM4GJiGIOu7Q==/7815328650414104.jpg?param=40y40'
                    },{
                        'type':17,
                        'label':'华语金曲榜',
                        'pic':'http://p1.music.126.net/N2whh2Prf0l8QHmCpShrcQ==/19140298416347251.jpg?param=40y40'
                    },{
                        'type':22,
                        'label':'云音乐ACG音乐榜',
                        'pic':'http://p1.music.126.net/vttjtRjL75Q4DEnjRsO8-A==/18752170813539664.jpg?param=40y40'
                    },{
                        'type':5,
                        'label':'UK排行榜周榜',
                        'pic':'http://p1.music.126.net/VQOMRRix9_omZbg4t-pVpw==/18930291695438269.jpg?param=40y40'
                    },{
                        'type':6,
                        'label':'美国Billboard周榜',
                        'pic':'http://p1.music.126.net/EBRqPmY8k8qyVHyF8AyjdQ==/18641120139148117.jpg?param=40y40'
                    },{
                        'type':21,
                        'label':'Beatport全球电子舞曲榜',
                        'pic':'http://p1.music.126.net/A61n94BjWAb-ql4xpwpYcg==/18613632348448741.jpg?param=40y40'
                    },{
                        'type':19,
                        'label':'法国 NRJ EuroHot 30周榜',
                        'pic':'http://p1.music.126.net/6O0ZEnO-I_RADBylVypprg==/109951162873641556.jpg?param=40y40'
                    },{
                        'type':7,
                        'label':'KTV嗨榜',
                        'pic':'http://p1.music.126.net/H4Y7jxd_zwygcAmPMfwJnQ==/19174383276805159.jpg?param=40y40'
                    },{
                        'type':8,
                        'label':'iTunes榜',
                        'pic':'http://p1.music.126.net/83pU_bx5Cz0NlcTq-P3R3g==/18588343581028558.jpg?param=40y40'
                    },{
                        'type':10,
                        'label':'日本Oricon周榜',
                        'pic':'http://p1.music.126.net/Rgqbqsf4b3gNOzZKxOMxuw==/19029247741938160.jpg?param=40y40'
                    },{
                        'type':9,
                        'label':'Hit FM Top榜',
                        'pic':'http://p1.music.126.net/54vZEZ-fCudWZm6GH7I55w==/19187577416338508.jpg?param=40y40'
                    },{
                        'type':20,
                        'label':'台湾Hito排行榜',
                        'pic':'http://p1.music.126.net/wqi4TF4ILiTUUL5T7zhwsQ==/18646617697286899.jpg?param=40y40'
                    },{
                        'type':14,
                        'label':'中国TOP排行榜(港台榜)',
                        'pic':'http://p1.music.126.net/JPh-zekmt0sW2Z3TZMsGzA==/18967675090783713.jpg?param=40y40'
                    },{
                        'type':15,
                        'label':'中国TOP排行榜(内地榜)',
                        'pic':'http://p1.music.126.net/2klOtThpDQ0CMhOy5AOzSg==/18878614648932971.jpg?param=40y40'
                    },{
                        'type':16,
                        'label':'香港电台中文歌曲龙虎榜',
                        'pic':'http://p1.music.126.net/YQsr07nkdkOyZrlAkf0SHA==/18976471183805915.jpg?param=40y40'
                    },{
                        'type':18,
                        'label':'中国嘻哈榜',
                        'pic':'http://p1.music.126.net/_nwkQTFtOdAjFvOI8Wg7Tg==/18922595114302109.jpg?param=40y40'
                    }
                ],
            }
        },
        methods: {
            ...mapActions([
                'getLeaderboardsData',
                'getCommentPlaylistData'
            ]),
            //tab click
            boardTabClick(type) {
                this.isActive = type;
                this.getLeaderboardsData({'idx':type});
                this.id = this.$store.state.songlist.leaderboards.playlist.id;
                this.getCommentPlaylistData({'id':this.id});
            },
        },
        computed: {
            ...mapState({
                'boardRightData': state => state.songlist.leaderboards, //排行榜具体歌曲数据
                'commentPlaylist': state => state.songlist.commentplaylist ////歌单评论数据
            })
        },
        mounted() {
            //排行榜
            this.getLeaderboardsData({'idx':3}).then(r=>{
                this.id = this.$store.state.songlist.leaderboards.playlist.id;
                this.getCommentPlaylistData({'id':this.id});
            });
            
        }
    }
</script>
<style lang="scss">
@import "../assets/css/variables.scss";
#LeaderBoards {
    display: flex;
    .containerLeft {
        width:240px;
    }
    .containerRight {
        flex:1;
        padding:40px;
        .boardrightTitle {
            display: flex;
            img {
                width: 150px;
                height:150px;
                padding:4px;
                border:1px solid $grey;
            }
            .boardrightTitleTxt {
                padding:10px 20px;
                .name {
                    font-size: $font-size * 2;
                    line-height: $font-size * 3;
                }
                .description{
                    color:$font-detail-color;
                }
                .btn{
                    margin-top:20px;
                }
            }
        }
        .boardrightContentTitle {
            display: flex;
            border-bottom:2px solid $red;
            padding:20px 0 10px 0;
            font-size: $font-size - 2;
            align-items: center;
            h3 {
                font-weight: normal;
                margin-right: 20px;
                font-size:$font-size + 4;
            }
            span {
                flex:1;
            }
        }
    }
}
</style>