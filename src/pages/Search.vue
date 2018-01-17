<template>
    <div id="Search">
        <el-tabs v-model="SearchModel" type="border-card" @tab-click="handleClick">
            <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.label" :name="item.name" :type="item.type">
                <p class="snote">搜索“{{queryStr}}”，找到 <span class="red">{{item.searchResultCount}}</span> 首 {{item.label}}</p>
                <div v-if="item.type == 1">   
                    <!--单曲-->                                  
                    <ul class="searchList">
                        <li v-if="item.searchResult !== ''" v-for="(itemx,idx) in item.searchResult" :key="idx">
                            <span class="name">{{itemx.name}}</span>
                            <span>{{itemx.artists[0].name}}</span>
                            <span>{{itemx.album.name}}</span>
                            <span>{{itemx.duration | transformDate}}</span>
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
                    <ul class="searchsingerList mvList">
                        <li v-if="item.searchResult !== ''" v-for="(itemx,idx) in item.searchResult" :key="idx">
                            <span class="mvcover">
                                <img :src="itemx.cover|filterImg" />
                                <span class="playcount">{{itemx.playCount | transformNumber}}</span>  
                                <span class="duration">{{itemx.duration | transformDate}}</span>    
                            </span>       
                            <p>{{itemx.name}}</p>
                            <p>{{itemx.artistName}}</p>                            
                        </li>
                    </ul>
                </div>
                <div v-if="item.type == 1006">
                    <!--歌词-->
                    <ul class="lyricList">
                        <li v-if="item.searchResult !== ''" v-for="(itemx,idx) in item.searchResult" :key="idx">
                            <span class="lyricDes">
                                <span>{{itemx.name}}</span>
                                <span>{{itemx.artists[0].name}}</span>
                                <span>《{{itemx.album.name}}》</span>
                                <span>{{itemx.duration | transformDate}}</span>
                            </span>
                            <span class="lyrics">
                                <span :class="{collapse:isCollapse}" class="lyricstext">
                                    <p v-for="(text,idxs) in  (itemx.lyrics.txt).split('\n')" :key="idxs">{{text}}</p>
                                </span>
                                <span class="crl" @click="collapse()">
                                    <span v-if="isCollapse">展开<i class="el-icon-arrow-down"></i></span>
                                    <span v-else>收缩<i class="el-icon-arrow-up"></i></span>
                                </span>
                            </span>
                        </li>
                    </ul>
                </div>
                <div v-if="item.type == 1000">
                    <!--歌单-->
                    <SongsComponent :songsData="item.searchResult"></SongsComponent>
                </div>
                <div v-if="item.type == 1009">
                    <!--电台-->
                    <ul class="searchsingerList audioList">
                        <li v-if="item.searchResult !== ''" v-for="(itemx,idx) in item.searchResult" :key="idx">
                            <img :src="itemx.dj.avatarUrl">
                            <p>{{itemx.name}}</p>
                            <p>by {{itemx.dj.nickname}}</p>
                        </li>
                    </ul>
                </div>
                <div v-if="item.type == 1002">
                    <!--用户-->
                    <ul class="searchList userList">
                        <li v-if="item.searchResult !== ''" v-for="(itemx,idx) in item.searchResult" :key="idx">
                            <img :src="itemx.avatarUrl">
                            <span class="name">
                                <i>{{itemx.nickname}}</i>
                                <i class="des">{{itemx.signature}}</i>
                            </span>
                            <span><el-button size="small" icon="el-icon-plus">加关注</el-button></span>
                            <span>歌单: {{itemx.authority | transformNumber}}</span>
                            <span>粉丝: {{itemx.followed | transformNumber}}</span>
                        </li>
                    </ul>
                </div>
            </el-tab-pane>
        </el-tabs>        
    </div>
</template>
<script>
    import axios from 'axios';
    import SingersComponent from '@/components/SingersComponent'
    import AlbumComponent from '@/components/AlbumComponent'
    import SongsComponent from '@/components/SongsComponent'    
    import filter from '../filter.js'
    export default {
        name:"Search",
        components:{
            SingersComponent,
            AlbumComponent,
            SongsComponent
        },        
        data () {
            return {
                title: '搜索',
                SearchModel:'single',
                isCollapse:true,
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
            query(q, type) {
                axios.get('http://localhost:3000/search?keywords='+q+'&type='+type)
                    .then(request=>{
                        this.searchResult = ''
                        this.searchResultCount = ''
                        if(type === 1){//单曲 
                            this.tabList[0].searchResult = request.data.result.songs
                            this.tabList[0].searchResultCount = request.data.result.songCount
                        }else if(type === 100){//歌手
                            this.tabList[1].searchResult = request.data.result.artists
                            this.tabList[1].searchResultCount = request.data.result.artistCount
                        }else if(type === 10){//专辑
                            this.tabList[2].searchResult = request.data.result.albums
                            this.tabList[2].searchResultCount = request.data.result.albumCount
                        }else if(type===1004){//视频
                            this.tabList[3].searchResult = request.data.result.mvs
                            this.tabList[3].searchResultCount = request.data.result.mvCount
                        }else if(type===1006){//歌词
                            this.tabList[4].searchResult = request.data.result.songs
                            this.tabList[4].searchResultCount = request.data.result.songCount
                        }else if(type===1000) {//歌单
                            this.tabList[5].searchResult = request.data.result.playlists
                            this.tabList[5].searchResultCount = request.data.result.playlistCount
                        }else if(type===1009){//主播电台
                            this.tabList[6].searchResult = request.data.result.djRadios
                            this.tabList[6].searchResultCount = request.data.result.djRadiosCount
                        }else if(type===1002){//用户
                            this.tabList[7].searchResult = request.data.result.userprofiles
                            this.tabList[7].searchResultCount = request.data.result.userprofileCount
                        }
                    }).catch(err=>{
                        console.log(err)
                    })
            },
            handleClick (tab, event) {
                this.type = tab.$attrs.type
                this.query(this.queryStr, this.type);
            },
            collapse() {
                this.isCollapse = !this.isCollapse
            }
        },
        computed: {
            queryStr(){
                let q = this.$route.query.q
                if(q!==""){
                   this.query(q, this.type);
                }
                return q;           
            },
            
        },
    }
</script>

<style lang="scss">
</style>