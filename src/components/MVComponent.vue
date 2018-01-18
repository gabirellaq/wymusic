<template>
    <div id="MVComponent">
        <ul class="searchsingerList mvsList" v-if="mvData" >
            <li v-for="(itemx,idx) in mvData" :key="idx">
                <div class="mvv">
                    <img :src="itemx.imgurl | filterImg"  />   
                    <span class="iconplay"></span>   
                </div>
                <p>{{itemx.name}}</p>
                <p class="artistName">{{itemx.artist.name}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
    import filter from '../filter.js'
    export default {
        name:"MVComponent",
        props:['mvData'],
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
