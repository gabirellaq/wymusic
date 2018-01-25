<template>
    <div id="MVComponent">
        <ul class="searchsingerList mvsList" v-if="mvData && title === 'singer'" >
            <li v-for="(itemx,idx) in mvData" :key="idx">
                <router-link :to="`/mvDetail?id=${itemx.id}`">
                    <span class="mvv">
                        <img :src="itemx.imgurl | filterImg"  />   
                        <span class="iconplay"></span>   
                    </span>
                    <span class="mvcontent">
                        <span>{{itemx.name}}</span>
                        <span class="artistName">{{itemx.artist.name}}</span>
                    </span>
                </router-link>
            </li>
        </ul>

        <ul class="searchsingerList mvList" v-if="mvData && title === 'search'">
            <li v-for="(itemx,idx) in mvData" :key="idx">
                <router-link :to="`/mvDetail?id=${itemx.id}`">
                    <span class="mvcover">
                        <img :src="itemx.cover|filterImg" />
                        <span class="playcount">{{itemx.playCount | transformNumber}}</span>  
                        <span class="duration">{{itemx.duration | transformTime}}</span>  
                        <span class="iconplay"></span>  
                    </span>
                    <span class="mvcontent">
                        <span>{{itemx.name}}</span>
                        <span>{{itemx.artistName}}</span>                            
                    </span>                       
                </router-link>
            </li>
        </ul>

        <ul class="searchsingerList mvList" v-if="mvData && title === 'personalized'">
            <li v-for="(itemx,idx) in mvData" :key="idx">
                <router-link :to="`/mvDetail?id=${itemx.id}`">
                    <span class="mvcover">
                        <img :src="itemx.picUrl | filterImg" />
                        <span class="playcount">{{itemx.playCount | transformNumber}}</span>  
                        <span class="duration">{{itemx.duration | transformTime}}</span>  
                        <span class="iconplay"></span> 
                    </span>
                    <span class="mvcontent">
                        <span>{{itemx.name}}</span>
                        <span>{{itemx.artistName}}</span>                            
                    </span>                       
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name:"MVComponent",
        props:['mvData','title'],
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
