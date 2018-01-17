<template>
    <div id="AlbumComponent">
        <ul class="searchsingerList albumList">
            <li v-if="albumData !== ''" v-for="(itemx,idx) in albumData" :key="idx">
                <img :src="itemx.picUrl | filterImg"  />   
                <span class="msk"></span>         
                <p>{{itemx.name}}</p>
                <p>{{itemx.artist.name}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
    import filter from '../filter.js'
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
</style>
