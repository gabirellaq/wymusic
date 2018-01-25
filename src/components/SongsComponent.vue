<template>
    <div id="SongsComponent">
        <ul class="searchList songsList" v-if="songsData" >
            <li v-for="(itemx,idx) in songsData" :key="idx">
                <router-link :to="`/songlistDetail?id=${itemx.id}`">
                    <img :src="itemx.coverImgUrl" class="pic">
                    <span class="name">{{itemx.name}}</span>
                    <span class="count">{{itemx.trackCount}}首</span>
                    <span class="nickname">by {{itemx.creator.nickname}}</span>
                    <span class="bookcount">收藏: {{itemx.bookCount | transformNumber}}</span>
                    <span class="playcount">收听: {{itemx.playCount | transformNumber}}</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name:"SongsComponent",
        props:['songsData'],
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
</style>
