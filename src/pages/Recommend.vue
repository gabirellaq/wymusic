<template>
    <div id="Recommend">
        <BannerComponent></BannerComponent>
    </div>
</template>
<script>
    import BannerComponent from '@/components/BannerComponent'
    export default {
        name:"Recommend",
        components:{
            BannerComponent
        },
        data () {
            return {
                title: '推荐歌单'
            }
        },
        methods: {
            
        }
    }
</script>