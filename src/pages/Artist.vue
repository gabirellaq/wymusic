<template>
    <div id="Artist" class="area">
        <div class="artistbox">
            <div class="colleft">
                <h1 class="name">{{singer.name}}</h1>
                <div class="singerAvator">
                    <img :src="singer.avator" alt="">
                </div>
                <el-tabs v-model="singerModelTab" type="border-card" @tab-click="singerTabClick">
                    <el-tab-pane v-for="(item,index) in singer.menu" :key="index" :label="item.label" :name="item.name">
                        <div v-if="item.name==='songs'" class="songs">
                            <ul class="searchList">
                                <li v-for="(i,idx) in songsJson.hotSongs" :key="idx">
                                    <span class="name">{{i.name}}<b v-if="i.alia.length>0">-{{i.alia[0]}}</b></span>
                                    <span>{{i.dt | transformDate}}</span>
                                    <span>{{i.al.name}}</span>
                                </li>
                            </ul>
                        </div>
                        <div v-if="item.name==='album'" class="album">
                            <AlbumComponent :albumData="singerAlbum.hotAlbums"></AlbumComponent>
                        </div>
                        <div v-if="item.name==='mv'" class="mvs">
                            <MVComponent :mvData="singerMV.mvs"></MVComponent>
                        </div>
                        <div v-if="item.name==='description'" class="description">
                            <h3>{{singer.name}}简介</h3>
                            <p>{{singerdesJson.briefDesc}}</p>
                            <div v-for="(i,idx) in singerdesJson.introduction" :key="idx">
                                <h4>{{i.ti}}</h4>
                                <p>{{i.txt}}</p>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <div class="colright">
                <div class="artTitle">{{hotSingersTitle}}</div>
                <div class="hotsingersbox">
                    <ul>
                        <li v-for="(item,index) in hotSingersJson.artists" :key="index">
                            <img :src="item.picUrl | filterImg" alt="">
                            <p>{{item.name}}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapMutations, mapActions } from 'vuex'
    import {filter} from '../filter.js'
    import AlbumComponent from '@/components/AlbumComponent'
    import MVComponent from '@/components/MVComponent'
    export default {
        name:"Artist",
        components:{
            AlbumComponent,
            MVComponent
        },
        data () {
            return {
                title: '歌手单页',
                singer:{
                    'name':'',
                    'avator':'',
                    'id':'',
                    'menu': [
                        {
                            'label':'热门50单曲',
                            'name':'songs'
                        },{
                            'label':'所有专辑',
                            'name':'album'
                        },{
                            'label':'相关MV',
                            'name':'mv'
                        },{
                            'label':'歌手介绍',
                            'name':'description'
                        }
                    ]
                },
                singerModelTab:'songs',
                hotSingersTitle:'热门歌手',
                songsJson:[], //歌手单曲
                singerAlbum:[], //歌手专辑,
                singerMV:[], //歌手MV
                singerdesJson: [], //歌手描述
                hotSingersJson:[], //热门歌手

            }
        },
        methods: {
            ...mapActions([
                'getSingerDesData',
                'getHotSingersData',
                'getSingerSongData',
                'getSingerAlbumData',
                'getSingerMVData'
            ]),
            //歌手单曲
            get_singersong(id, limit){
                this.getSingerSongData({'id':id, 'limit':limit})
                    .then(res=> {
                        if(res){
                            this.songsJson = res
                        }
                    }).catch(err=> {
                        console.log("singer song:",err)
                    })
            },
            //歌手专辑
            get_singeralbum(id, limit){
                this.getSingerAlbumData({'id':id,'limit':limit})
                    .then(res=>{
                        this.singerAlbum = res;
                    }).catch(err=>{
                        console.log("singer ablum:", err)
                    })
            },
            //歌手MV
            get_singermv(id){
                this.getSingerMVData({'id':id})
                    .then(res=>{
                        this.singerMV = res;
                    }).catch(err=>{
                        console.log("singer mv:", err)
                    })
            },
            //歌手描述
            get_singerdes(id){
                this.getSingerDesData({'id':id})
                    .then(res=> {
                        if(res){
                            this.singerdesJson = res
                        }
                    }).catch(err=>{
                        console.log("get_singerdes", err)
                    })
            },
            //get hot singers
            get_hotsingers(offset, limit){
                this.getHotSingersData({'offset':offset, 'limit':limit})
                    .then(res=>{
                        this.hotSingersJson = res;
                    }).catch(err=>{
                        console.log("hot singers:",err);
                    })
            },
            singerTabClick(tab, event){
                switch(tab.name) {
                    case "songs":
                        this.get_singersong(this.singer.id); 
                        break;
                    case 'album':
                        this.get_singeralbum(this.singer.id);
                        break;
                    case 'mv':
                        this.get_singermv(this.singer.id);
                        break;
                    case 'description':
                        this.get_singerdes(this.singer.id);
                        break;
                }
            },
            init(){
                this.singer.id = this.$route.query.id;
                this.singer.avator = this.$route.query.avator;
                this.singer.name = this.$route.query.name;
                this.get_singersong(this.singer.id ); //热门单曲
                this.get_hotsingers(0, 6); //热门歌手
            }
        },
        mounted(){
            this.init();
        }
    }
</script>
<style lang="scss">
$grey:#eee;
$red:#c20c0c;
$font-size:14px;
.artistbox {
    display: flex;
    .colright{
        width:270px;
        padding: 20px 40px 40px 30px;
    }
    .colleft {
        flex:1;
        border-right:1px solid $grey;
        padding: 15px 30px 40px 39px;
    }
    .artTitle {
        padding-bottom:10px;
        border-bottom:1px solid $grey;
    }
    .hotsingersbox {
        padding:9px;
        ul {
            display: flex;
            flex-wrap: wrap;
            li {
                width:50px;
                margin:5px;
                img{
                    width:100%;
                    height:50px;
                    margin-bottom:5px;
                }
                p{
                    font-size:$font-size - 2;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
        }
    }
    .name {
        margin-bottom: 10px;
        font-weight: normal;
    }
    .singerAvator {
        img{
            width: 640px;
        }
    }
    .album,
    .mvs {
        .artistName {
            display: none;
        }
    }    
    .description {
        h3 {
            border-left:2px solid $red;
            padding-left: 10px;
        }
        p {
            text-indent: 24px;
            line-height: 25px;
        }
        p,
        h4 {
            margin-top:10px;
        }
    }
}
</style>