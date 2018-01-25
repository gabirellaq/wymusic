<template>
    <div id="AlbumComponent">
        <ul class="searchsingerList albumList" v-if="albumData" >
            <li v-for="(itemx,idx) in albumData" :key="idx">
                <router-link :to="`/albumDetail?id=${itemx.id}`">
                    <img :src="itemx.picUrl | filterImg"  />   
                    <span class="msk"></span>         
                    <span>{{itemx.name}}</span>
                    <span class="artistName">{{itemx.artist.name}}</span>                
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name:"AlbumComponent",
        props:['albumData'],
        data () {
            return {
                
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
#AlbumComponent{
    .albumList {
        .msk {
            margin:0;
            padding:0;
        }
        span {
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-top: 5px;
            font-size: $font-size - 2;
        }
    }
}
</style>
