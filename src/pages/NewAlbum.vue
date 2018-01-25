<template>
    <div id="NewAlbum" class="area">
        <div class="containerTitle">{{title}}</div>
        <AlbumComponent :albumData="albumDataJson.albums"></AlbumComponent>
    </div>
</template>
<script>
    import { mapState,mapMutations, mapActions } from 'vuex'
    import AlbumComponent from '@/components/AlbumComponent'
    export default {
        name:"NewAlbum",
        components:{
            AlbumComponent
        },
        data () {
            return {
                title: '新碟上架',
            }
        },
        methods: {
            ...mapActions([
                'getTopAlbumData'
            ]),
            get_topalbum(offset, limit){
                this.getTopAlbumData({'offset':offset,'limit':limit})
            },
        },
        computed: {
            ...mapState({
                'albumDataJson' : state => state.songlist.topalbum,
            })
        },
        mounted() {
            this.get_topalbum();
        }
    }
</script>
<style lang="scss">
@import "../assets/css/variables.scss";
#NewAlbum{
    padding:30px;
}
</style>