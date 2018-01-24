<template>
    <div id="Singer" class="area">
        <div class="container">
            <div class="containerLeft">
                <h4>推荐</h4>
                <div class="boardbox">
                    <div class="menulist">
                        <span>{{hotSingersTitle}}</span>
                    </div>
                </div>
            </div>
            <div class="containerRight">
                <div class="containerTitle">{{hotSingersTitle}}</div>
                <SingersComponent :singersData="hotSingersJson.artists"></SingersComponent>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState,mapMutations, mapActions } from 'vuex'
    import {filter} from '../filter.js'
    import SingersComponent from '@/components/SingersComponent'
    export default {
        name:"Singer",
        components:{
            SingersComponent
        },
        data () {
            return {
                title: '歌手',
                hotSingersTitle:'热门歌手',
            }
        },
        methods: {
            ...mapActions([
                'getHotSingersData'
            ]),
            //get hot singers
            get_hotsingers(offset, limit){
                this.getHotSingersData({'offset':offset, 'limit':limit});
            },
        },
        computed: {
            ...mapState({
                'hotSingersJson': state => state.singer.hotsingers,
            })
        },
        mounted() {
            this.get_hotsingers();//热门歌手
        }
    }
</script>
<style lang="scss">
#Singer{
    .containerLeft {
        width:240px;
    }
}
</style>