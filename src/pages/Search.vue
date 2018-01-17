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
                    <ul class="searchsingerList">
                        <li v-if="item.searchResult !== ''" v-for="(itemx,idx) in item.searchResult" :key="idx">
                            <router-link to="/artist">
                                <img v-if="itemx.picUrl !== null" :src="itemx.picUrl" />
                                <img v-else src="http://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg">  
                            </router-link>
                            <router-link to="/artist">
                                <p>{{itemx.name}}</p>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div v-if="item.type == 10">
                    <!--专辑-->
                    <ul class="searchsingerList albumList">
                        <li v-if="item.searchResult !== ''" v-for="(itemx,idx) in item.searchResult" :key="idx">
                            
                                <img :src="itemx.picUrl|filterImg"  />   
                                <span class="msk"></span>  
                                           
                            <p>{{itemx.name}}</p>
                            <p>{{itemx.artist.name}}</p>                            
                        </li>
                    </ul>
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
                    <ul class="searchList songsList">
                        <li v-if="item.searchResult !== ''" v-for="(itemx,idx) in item.searchResult" :key="idx">
                            <img :src="itemx.coverImgUrl">
                            <span class="name">{{itemx.name}}</span>
                            <span>{{itemx.trackCount}}首</span>
                            <span>by {{itemx.creator.nickname}}</span>
                            <span>收藏: {{itemx.bookCount | transformNumber}}</span>
                            <span>收听: {{itemx.playCount | transformNumber}}</span>
                        </li>
                    </ul>
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
                            <span><el-button icon="el-icon-plus">加关注</el-button></span>
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
    export default {
        name:"Search",        
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
        filters: {
            transformDate(value) {
                if(!value) return ''
                let date = new Date(value)
                let time
                if(date.getHours() ===0 ){
                    time= date.getMinutes() + ":" + date.getSeconds()
                }else{
                    time = date.getHours() +":"+ date.getMinutes() + ":" + date.getSeconds()
                }
                return time
            },
            transformNumber (value) {
                if(!value) return '0'
                const Billion = 100000000, Million = 10000;
                var num = +value;
                if (num >= Billion) {
                    return ((num - num % Billion) / Billion) + '亿';
                } else if (num >= Million) {
                    return ((num - num % Million) / Million) + '万';
                } else if (num >= 0) {
                    return num;
                } else {
                    return '';
                }
            },
            filterImg(value){
                if(value.startsWith('http://p3')) return `${value.replace('p3','p1')}`;
                else if (value.startsWith('http://p4')) return `${value.replace('p4','p1')}`;
                else return value;
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
$grey:#eee;
$font-detail-color:#999;
$font-color:#666;
$red:#c20c0c;
$font-size:14px;
#Search{
    margin:20px 5%;
    color:$font-color;
    font-size:$font-size - 2;
    .snote {
        color:$font-detail-color;        
        .red {
            color:$red;
        }
    }
    .searchList{
        margin:10px 0;        
        li{
            display: flex;
            padding:10px 20px;
            align-items: center;
            &:nth-child(even) {
                background:$grey;
            }
            span {
                &.name {
                    flex:2;
                    i {
                        font-style:normal;
                        display:block;
                        line-height:20px;
                        &.des{
                            color:$font-detail-color;
                        }
                    }
                }
                flex: 1;
                text-align:left;
                &:last-child {
                    flex:.5;
                    text-align:right;
                }
            }
        }
    }
    .searchsingerList {
        display:flex;
        flex-wrap:wrap;
        li {
            width:130px;
            display:block;
            margin:10px;
            a {
                display:block;
                color:$font-color;
            }
            img {
                width:130px;
                height:130px;
                border:1px solid $grey;
            }
            p {
                text-overflow:ellipsis;
                overflow:hidden;
                white-space: nowrap;
                margin-top:5px;
            }
        }
    }
    .albumList {        
        li {
            position:relative;
            width:153px;
            .msk {
                background:url('~@/assets/images/coverall.png') no-repeat 0 -845px;
                position:absolute;
                width:100%;
                height:130px;
                left:0px;
                top:0px;
            }
        }
    }
    .mvList {
        li {
            width:160px;
            .mvcover {
                position:relative;
                width:100%;
                height:90px;
                display:block;
                img{
                    width:100%;
                    height:90px;
                }
                .duration,
                .playcount{
                    position:absolute;
                }
                .duration{                    
                    left:5px;
                    bottom:5px;                    
                }
                .playcount {
                    right: 5px;
                    top: 5px;
                    &:before {
                        background:url('~@/assets/images/icon2.png') no-repeat -60px -310px;
                        content:'';
                        width: 15px;
                        height: 10px;
                        position: absolute;
                        left: -18px;
                        top: 3px;
                    }
                }
            }
        }
    }
    .lyricList {
        margin:10px 0;
        .lyricDes {
            display:flex;
            padding:10px;
            border:1px solid transparent;
            background:$grey;
            border-color:darken($grey,5%);
            > span {
                flex:auto;
                &:first-child {
                    position:relative;
                    padding-left:25px;
                    &:before {
                        content:'';
                        background:url('~@/assets/images/table.png') no-repeat 0 -103px;
                        width:17px;
                        height:17px;
                        position:absolute;
                        left:0px;
                    }
                }
                &:last-child {
                    text-align:right;
                }
            }
        }
        .lyrics {
            padding:10px;
            display:block;
            margin-left:50px;
            > span {
                display:block;
            }
            .lyricstext {
                &.collapse {
                   max-height:85px;
                   overflow:hidden;
                }
                p {
                    line-height:20px;
                }
            }
            .crl {
                margin-top:10px;
                cursor:pointer;
            }
        }
    }
    .songsList {
        li {
            align-items: center;
            img {
                width:50px;
                height:50px;
                margin-right:10px;
            }
        }
    }
    .audioList {
        img {
            width:150px;
            height:150px;
        }
        img,p {
            display:block;
        }
    }
    .userList {
        img {
            width:50px;
            height:50px;
            margin-right:10px;
        }
    }
}
</style>