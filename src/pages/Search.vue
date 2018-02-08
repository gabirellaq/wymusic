<template>
    <div id="Search">
        <el-tabs v-model="SearchModel" type="border-card" @tab-click="handleClick">
            <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.label" :name="item.name" :type="item.type">
                <div v-if="item.type == 1 && searchSongs">   
                    <p class="snote">搜索“{{keywords}}”，找到 <span class="red">{{searchSongs.songCount}}</span> 首 {{item.label}}</p>
                    <!--单曲-->                                  
                    <ul class="searchList">
                        <li v-for="(itemx,idx) in searchSongs.songs" :key="idx">
                            <router-link :to="`/songDetail?id=${itemx.id}`">
                                <span class="name">{{itemx.name}}</span>
                                <span>{{itemx.artists[0].name}}</span>
                                <span>{{itemx.album.name}}</span>
                                <span>{{itemx.duration | transformTime}}</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div v-if="item.type == 100 && searchArtists">
                    <!--歌手-->
                    <p class="snote">搜索“{{keywords}}”，找到 <span class="red">{{searchArtists.artistCount}}</span> 个 {{item.label}}</p>
                    <SingersComponent :singersData="searchArtists.artists"></SingersComponent>
                </div>
                <div v-if="item.type == 10 && searchAlbums">
                    <!--专辑-->
                    <p class="snote">搜索“{{keywords}}”，找到 <span class="red">{{searchAlbums.albumCount}}</span> 个 {{item.label}}</p>
                    <AlbumComponent :albumData="searchAlbums.albums"></AlbumComponent>
                </div>
                <div v-if="item.type == 1004 && searchMvs">
                    <!--视频-->
                    <p class="snote">搜索“{{keywords}}”，找到 <span class="red">{{searchMvs.mvCount}}</span> 个 {{item.label}}</p>
                    <MVComponent :mvData="searchMvs.mvs" title="search"></MVComponent>
                </div>
                <div v-if="item.type == 1006 && searchLyric">
                    <!--歌词-->
                    <p class="snote">搜索“{{keywords}}”，找到 <span class="red">{{searchLyric.songCount}}</span> 首 {{item.label}}</p>
                    <LyricComponent :lyricData="searchLyric.songs" name="search"></LyricComponent>
                </div>
                <div v-if="item.type == 1000 && searchPlaylist">
                    <!--歌单-->
                    <p class="snote">搜索“{{keywords}}”，找到 <span class="red">{{searchPlaylist.playlistCount}}</span> 个 {{item.label}}</p>
                    <SongsComponent :songsData="searchPlaylist.playlists"></SongsComponent>
                </div>
                <div v-if="item.type == 1009 && searchRadio">
                    <!--电台-->
                    <p class="snote">搜索“{{keywords}}”，找到 <span class="red">{{searchRadio.djRadiosCount}}</span> 个 {{item.label}}</p>
                    <ul class="searchsingerList audioList">
                        <li v-for="(itemx,idx) in searchRadio.djRadios" :key="idx">
                            <img :src="itemx.dj.avatarUrl">
                            <p>{{itemx.name}}</p>
                            <p>by {{itemx.dj.nickname}}</p>
                        </li>
                    </ul>
                </div>
                <div v-if="item.type == 1002 && searchUser">
                    <!--用户-->
                    <p class="snote">搜索“{{keywords}}”，找到 <span class="red">{{searchUser.userprofileCount}}</span> 个 {{item.label}}</p>
                    <ul class="searchList userList">
                        <li v-for="(itemx,idx) in searchUser.userprofiles" :key="idx">
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
    import MVComponent from '@/components/MVComponent'    
    export default {
        name:"Search",
        components:{
            SingersComponent,
            AlbumComponent,
            SongsComponent,
            LyricComponent,
            MVComponent
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
                    },{
                        label:'歌手',
                        name:'singer',
                        type:100,
                    },{
                        label:'专辑',
                        name:'album',
                        type:10,
                    },{
                        label:'视频',
                        name:'video',
                        type: 1004,
                    },{
                        label:'歌词',
                        name:'lyrics',
                        type:1006,
                    },{
                        label:'歌单',
                        name:'songs',
                        type:1000,
                    },{
                        label:'主播电台',
                        name:'audio',
                        type:1009,
                    },{
                        label:'用户',
                        name:'user',
                        type:1002,
                    }
                ]
            }
        },
        methods: {
            ...mapActions([
                'getSearchData'
            ]),
            query(keywords, type, limit) {
                this.getSearchData({'keywords':keywords, 'type':type, 'limit':limit});
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
        computed: {
            ...mapState({
                'searchSongs': state => state.search.search_songs, //单曲
                'searchArtists': state => state.search.search_artists, //歌手
                'searchAlbums': state => state.search.search_albums, //专辑
                'searchMvs': state => state.search.search_mvs, //mv
                'searchLyric': state => state.search.search_lyric, //歌词
                'searchPlaylist': state => state.search.search_playlist, //歌单
                'searchRadio': state => state.search.search_radio, //电台
                'searchUser': state => state.search.search_user, //用户
            })
        },
        mounted() {
            this.init();
        }
    }
</script>

<style lang="scss">
</style>