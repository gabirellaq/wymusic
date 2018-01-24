<template>
    <div id="ProgramReComponent">
        <ul class="searchList programReList" v-if="programReData" >
            <li v-for="(itemx,idx) in programReData" :key="idx">
                <a >
                    <img class="pic" :src="itemx.mainSong.album.picUrl | filterImg"  />      
                    <span class="name">
                        <i>{{itemx.mainSong.name}}</i>
                        <i class="des">{{itemx.radio.name}}</i>
                    </span>
                    <span class="category"><i>{{itemx.radio.category}}</i></span>
                </a>
            </li>
        </ul>
    </div>
</template>
<script>
    import filter from '../filter.js'
    export default {
        name:"ProgramReComponent",
        title:'推荐节目',
        props:['programReData'],
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
