<template>
    <div id="SongListComponent" v-if="songlistData">
        <div class="songlistTitle">
            <h3>歌曲列表</h3>
            <span>{{songlistData.trackCount}}首歌</span>
            <p>播放：<span class="red">{{songlistData.playCount}}</span> 次</p>
        </div>
        <ul class="searchList">
            <li v-for="(i,idxs) in songlistData.tracks" :key="idxs">
                <router-link :to="`/songDetail?id=${i.id}`">
                    <span class="number">{{idxs + 1}}</span>
                    <span class="name"><img :src="i.al.picUrl" class="pic">{{i.name}}</span>
                    <span>{{i.dt | transformTime}}</span>
                    <span>{{i.ar[0].name}}</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name:"SongListComponent",
        props:['songlistData'],
        data () {
            return {
                pagename:'歌曲列表'
            }
        },
        computed:{
    
        },
        methods: {
            
        }
    }
</script>
<style lang="scss">
@import "../assets/css/variables.scss";
    .songlistTitle {
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
</style>
