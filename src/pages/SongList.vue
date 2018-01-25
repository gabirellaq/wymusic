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
        <songsComponent :songsData="songsJson.playlists" class="songlistcomponent margin"></songsComponent>
    </div>
</template>
<script>
    import { mapState, mapMutations, mapActions } from 'vuex'
    import songsComponent from '@/components/SongsComponent'
    export default {
        name:"SongList",
        components:{
            songsComponent
        },
        data () {
            return {
                title: '歌单',
            }
        },
        methods: {
            ...mapActions([
                'getSongsData'
            ]),
            get_Songs(order) {
                this.getSongsData(order);
            },
        },
        computed: {
            ...mapState({
                'songsJson': state => state.songlist.songs,
            })
        },
        mounted() {
            this.get_Songs('hot');
        }
    }
</script>
<style lang="scss">
@import "../assets/css/variables.scss";
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
#SongList {
    a {
        padding:0;
        .name,
        .nickname {
            display: block;
        }
    }
}
</style>