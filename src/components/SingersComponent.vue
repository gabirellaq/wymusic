<template>
    <div id="SingersComponent">
        <ul class="searchsingerList" v-if="singersData">
            <li v-for="(itemx,idx) in singersData" :key="idx">
                <router-link :to="`/artist?id=${itemx.id}&avator=${itemx.picUrl}&name=${itemx.name}`">
                    <img :src="itemx.picUrl | fiterAvator | filterImg" />
                </router-link>
                <router-link :to="`/artist?id=${itemx.id}&avator=${itemx.picUrl}&name=${itemx.name}`">
                    <p>{{itemx.name}}</p>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
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
