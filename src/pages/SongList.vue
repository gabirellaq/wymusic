<template>
    <div id="SongList" class="area">
        <div class="songTitle">
            <span>全部</span>
            <span class="choose">
                <el-button size="small">选择分类<i class="el-icon-arrow-down el-icon--right"></i></el-button>
            </span>
            <span>
                <el-button-group>
                    <el-button size="small" @click="get_Songs('hot')">热门</el-button>
                    <el-button size="small" @click="get_Songs('new')">最新</el-button>                    
                </el-button-group>
            </span>
        </div>
        <songsComponent :songsData="songsJson" class="songlistcomponent"></songsComponent>
    </div>
</template>
<script>
    import { mapMutations, mapActions } from 'vuex'
    import songsComponent from '@/components/SongsComponent'
    export default {
        name:"SongList",
        components:{
            songsComponent
        },
        data () {
            return {
                title: '歌单',
                songsJson:[]
            }
        },
        methods: {
            ...mapActions([
                'getSongsData'
            ]),
            get_Songs(order) {
                this.getSongsData(order)
                    .then(res => {
                        if(res){
                            this.songsJson = res.playlists;
                        }
                    }).catch(err => {
                        console.log("get_songs", err)
                    })
            },
            init() {
                this.get_Songs('hot')
            }
        },
        mounted() {
            this.init()
        }
    }
</script>
<style lang="scss">
$grey:#eee;
$font-detail-color:#999;
$font-size:14px;
$red:#c20c0c;
.songTitle{
    margin: 0 27px;
    padding: 15px 0;
    border-bottom:2px solid $red;
    display: flex;
    align-items: center;
    .choose {
        flex:auto;
        margin:0 10px;
    }
}
.songlistcomponent {
    ul {
        display: flex;
        flex-wrap: wrap;
        li {
            display:block;
            padding:0;
            margin:10px 27px;
            width:140px;
            > * {
                display:block;
                line-height:20px;
            }
            &:nth-child(even) {
                background:none;
            }
            .pic {
                width:100%;
                height:140px;
                border:1px solid $grey;
                margin-bottom:5px;
            }
            .name {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .nickname {
                font-size:$font-size - 2;
                color:$font-detail-color;
            }
            .count,
            .bookcount,
            .playcount {
                display:none;
            }
        }
    }
}
</style>