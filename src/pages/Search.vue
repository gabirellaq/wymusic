<template>
    <div id="Search">
        <el-tabs v-model="SearchModel" type="border-card" @tab-click="handleClick">
            <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.label" :name="item.name" :type="item.type">
                <p class="snote">搜索“{{keywords}}”，找到 <span class="red">{{item.searchResultCount}}</span> 首 {{item.label}}</p>
                <div v-if="item.type == 1">   
                    <!--单曲-->                                  
                    <ul class="searchList" v-if="item.searchResult.length > 0">
                        <li v-for="(itemx,idx) in item.searchResult" :key="idx">
                            <router-link :to="`/songDetail?id=${itemx.id}`">
                                <span class="name">{{itemx.name}}</span>
                                <span>{{itemx.artists[0].name}}</span>
                                <span>{{itemx.album.name}}</span>
                                <span>{{itemx.duration | transformTime}}</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div v-if="item.type == 100">
                    <!--歌手-->
                    <SingersComponent :singersData="item.searchResult"></SingersComponent>
                </div>
                <div v-if="item.type == 10">
                    <!--专辑-->
                    <AlbumComponent :albumData="item.searchResult"></AlbumComponent>
                </div>
                <div v-if="item.type == 1004">
                    <!--视频-->
                    <ul class="searchsingerList mvList" v-if="item.searchResult.length > 0">
                        <li v-for="(itemx,idx) in item.searchResult" :key="idx">
                            <span class="mvcover">
                                <img :src="itemx.cover|filterImg" />
                                <span class="playcount">{{itemx.playCount | transformNumber}}</span>  
                                <span class="duration">{{itemx.duration | transformTime}}</span>    
                            </span>       
                            <p>{{itemx.name}}</p>
                            <p>{{itemx.artistName}}</p>                            
                        </li>
                    </ul>
                </div>
                <div v-if="item.type == 1006">
                    <!--歌词-->
                    <LyricComponent :lyricData="item.searchResult" name="search"></LyricComponent>
                </div>
                <div v-if="item.type == 1000">
                    <!--歌单-->
                    <SongsComponent :songsData="item.searchResult"></SongsComponent>
                </div>
                <div v-if="item.type == 1009">
                    <!--电台-->
                    <ul class="searchsingerList audioList" v-if="item.searchResult.length > 0" >
                        <li v-for="(itemx,idx) in item.searchResult" :key="idx">
                            <img :src="itemx.dj.avatarUrl">
                            <p>{{itemx.name}}</p>
                            <p>by {{itemx.dj.nickname}}</p>
                        </li>
                    </ul>
                </div>
                <div v-if="item.type == 1002">
                    <!--用户-->
                    <ul class="searchList userList" v-if="item.searchResult.length > 0" >
                        <li v-for="(itemx,idx) in item.searchResult" :key="idx">
                            <a>
                                <img :src="itemx.avatarUrl">
                                <span class="name">
                                    <i>{{itemx.nickname}}</i>
                                    <i class="des">{{itemx.signature}}</i>
                                </span>
                                <span><el-button size="small" icon="el-icon-plus">加关注</el-button></span>
                                <span>歌单: {{itemx.authority | transformNumber}}</span>
                                <span>粉丝: {{itemx.followed | transformNumber}}</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </el-tab-pane>
        </el-tabs>        
    </div>
</template>
<script>
    import { mapState,mapMutations, mapActions } from 'vuex';
    import SingersComponent from '@/components/SingersComponent'
    import AlbumComponent from '@/components/AlbumComponent'
    import SongsComponent from '@/components/SongsComponent'
    import LyricComponent from '@/components/LyricComponent'    
    import filter from '../filter.js'
    export default {
        name:"Search",
        components:{
            SingersComponent,
            AlbumComponent,
            SongsComponent,
            LyricComponent
        },        
        data () {
            return {
                title: '搜索',
                SearchModel:'single',
                keywords:'',
                type:1, // type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲 10: 专辑 100: 歌手 1000: 歌单 1002: 用户 1004: MV 1006: 歌词 1009: 电台
                tabList: [
                    {
                        label:'单曲',
                        name:'single',
                        type:1,
                        searchResult:'',
                        searchResultCount:''
                    },{
                        label:'歌手',
                        name:'singer',
                        type:100,
                        searchResult:'',
                        searchResultCount:''
                    },{
                        label:'专辑',
                        name:'album',
                        type:10,
                        searchResult:'',
                        searchResultCount:''
                    },{
                        label:'视频',
                        name:'video',
                        type: 1004,
                        searchResult:'',
                        searchResultCount:''
                    },{
                        label:'歌词',
                        name:'lyrics',
                        type:1006,
                        searchResult:'',
                        searchResultCount:'' 
                    },{
                        label:'歌单',
                        name:'songs',
                        type:1000,
                        searchResult:'',
                        searchResultCount:'' 
                    },{
                        label:'主播电台',
                        name:'audio',
                        type:1009,
                        searchResult:'',
                        searchResultCount:''
                    },{
                        label:'用户',
                        name:'user',
                        type:1002,
                        searchResult:'',
                        searchResultCount:'' 
                    }
                ]
            }
        },
        methods: {
            ...mapActions([
                'getSearchData'
            ]),
            query(keywords, type, limit) {
                this.getSearchData({'keywords':keywords, 'type':type, 'limit':limit})
                    .then(request => {
                        switch(type) {
                            case 1: //单曲
                                this.tabList[0].searchResult = request.result.songs;
                                this.tabList[0].searchResultCount = request.result.songCount;
                                break;
                            case 100: //歌手
                                this.tabList[1].searchResult = request.result.artists;
                                this.tabList[1].searchResultCount = request.result.artistCount;
                                break;
                            case 10: //专辑
                                this.tabList[2].searchResult = request.result.albums;
                                this.tabList[2].searchResultCount = request.result.albumCount;
                                break;
                            case 1004: //视频
                                this.tabList[3].searchResult = request.result.mvs;
                                this.tabList[3].searchResultCount = request.result.mvCount;
                                break;
                            case 1006: //歌词
                                this.tabList[4].searchResult = request.result.songs;
                                this.tabList[4].searchResultCount = request.result.songCount;
                                break;
                            case 1000: //歌单
                                this.tabList[5].searchResult = request.result.playlists;
                                this.tabList[5].searchResultCount = request.result.playlistCount;
                                break;
                            case 1009: //主播电台
                                this.tabList[6].searchResult = request.result.djRadios;
                                this.tabList[6].searchResultCount = request.result.djRadiosCount;
                                break;
                            case 1002: //用户
                                this.tabList[7].searchResult = request.result.userprofiles;
                                this.tabList[7].searchResultCount = request.result.userprofileCount;
                                break;
                        }   
                    }).catch(err => {
                        console.log("query:", err)
                    })
            },
            handleClick (tab, event) {
                this.type = tab.$attrs.type;
                this.query(this.keywords, this.type);
            },
            init() {
                this.keywords = this.$route.query.q;
                if(this.keywords!==""){
                   this.query(this.keywords, this.type);
                }
            }
        },
        mounted() {
            this.init();
        }
    }
</script>

<style lang="scss">
</style>