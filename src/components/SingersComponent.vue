<template>
    <div id="SingersComponent">
        <ul class="searchsingerList">
            <li v-if="singersData !== ''" v-for="(itemx,idx) in singersData" :key="idx">
                <router-link :to="`/artist?id=${itemx.id}`">
                    <img v-if="itemx.picUrl !== null" :src="itemx.picUrl" />
                    <img v-else src="http://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg">  
                </router-link>
                <router-link :to="`/artist?id=${itemx.id}`">
                    <p>{{itemx.name}}</p>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    import filter from '../filter.js'
    export default {
        name:"SingersComponent",
        props:['singersData'],
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
