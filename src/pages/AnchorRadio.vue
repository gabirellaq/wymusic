<template>
    <div id="AnchorRadio" class="area">
        <div class="catelistbox">
            <ul>
                <li v-for="(i,index) in djcatelistJson.categories" :key="index">
                    <router-link to="/anchorRadio">
                        <span class="pic" :style="{background: 'url('+i.picWebUrl+')'}"></span>
                        <span class="name">{{i.name}}</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="programbox">
            <div class="pl">
                <div class="plTitle">推荐节目</div>
                <div class="plist">
                    <ProgramReComponent :programReData="programrecommendJson.programs"></ProgramReComponent>
                </div>
            </div>
            <div class="pl">
                <div class="plTitle">独家放送</div>
                <div class="plist">
                    <ul class="searchList programReList" v-if="privatecontentJson" >
                        <li v-for="(itemx,idx) in privatecontentJson.result" :key="idx">
                            <a>
                                <img class="pic" :src="itemx.picUrl | filterImg"  />      
                                <span class="name">
                                    <i>{{itemx.name}}</i>
                                    <i class="des">{{itemx.copywriter}}</i>
                                </span>
                                <span class="category"><i>{{itemx.alg}}</i></span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="anchorbox" v-if="djrecommendtypeJson.djRadios">
            <div class="containerTitle">{{djrecommendtypeJson.djRadios[0].category}}·电台</div>
            <div class="anchorlist">
                <ul>
                    <li v-for="(x,idx) in djrecommendtypeJson.djRadios" :key="idx">
                        <img :src="x.picUrl | filterImg" alt="">
                        <span class="namebox">
                            <i class="name">{{x.name}}</i>
                            <i class="des">{{x.rcmdtext}}</i>
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState,mapMutations, mapActions } from 'vuex'
    import filter from '../filter'
    import ProgramReComponent from '@/components/ProgramReComponent'
    export default {
        name:"AnchorRadio",
        components:{
            ProgramReComponent
        },
        data () {
            return {
                title: '主播电台',
                djrecommendtypeArray:[], //存储电台分类数据
            }
        },
        methods: {
            ...mapActions([
                'getDJCatelistData',
                'getProgramRecommendData',
                'getPrivatecontent',
                'getDJRecommendType'
            ]),
            //电台分类推荐
            get_djrecommendtype(type){
                this.getDJRecommendType({'type':type});
            },
        },
        computed:{
            ...mapState({
                'djcatelistJson': state => state.anchoradio.djcatelist,
                'programrecommendJson': state => state.anchoradio.programrecommend,
                'privatecontentJson': state => state.anchoradio.privatecontent,
                'djrecommendtypeJson': state => state.anchoradio.djrecommendtype
            })
        },
        mounted() {
            //电台分类
            this.getDJCatelistData();
            //推荐节目
            this.getProgramRecommendData();
            //独家放送
            this.getPrivatecontent();
            //电台分类推荐
            this.get_djrecommendtype(2); //音乐故事电台
            this.get_djrecommendtype(6); //美文读物
            this.get_djrecommendtype(5); //脱口秀
            this.get_djrecommendtype(3); //情感调频
            this.get_djrecommendtype(11); //人文历史
        }
    }
</script>

<style lang="scss">
@import "../assets/css/variables.scss";
.catelistbox {
    ul{
        display: flex;
        flex-wrap: wrap;
        li{
            width: 97px;
            text-align: center;
            display: block;
            a {
                display: block;
                padding:10px;
            }
            .pic {
                width:48px;
                height:48px;
                overflow: hidden;
                margin:0 auto;
                display: block;
            }
            .name {
                display: block;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                font-size:$font-size - 2;
                color:$font-detail-color;
            }
            &.active {
                .pic {
                    background-position: -48px 0;
                }
            }
        }
    }

}
.programbox {
    display: flex;
    padding:23px;
    .pl {
        flex:1;
        padding-left: 23px;
        overflow: hidden;      
        &:first-child {
            padding-left: 0;
            padding-right: 23px;
        }
        .plTitle {
            padding:10px 0;
            font-size: $font-size + ($font-size / 2);
        }
        .plist {
            border-style: solid;
            border-width: 2px 1px 1px 1px;
            border-color:$red $grey $grey $grey;
            .searchList{
                padding:0;
            }
        }
    }
    
}
.anchorbox {
    padding:23px;
    .anchorlist {
        ul {
            display: table;
            li{
                float: left;
                padding:20px 0;
                border-bottom:1px solid $grey;
                box-sizing: padding-box;
                width:50%;
                display: flex;
                flex-wrap: wrap;
                img {
                    width:120px;
                    height:120px;
                }
                .namebox {
                    flex:1;
                    margin-left: 20px;
                    i{
                        font-style: normal;
                        display: block;
                        &.name {
                            font-size: $font-size + ($font-size / 2);
                            margin-bottom:10px;
                            color:$font-title-color;
                        }
                    }
                }
            }
        }
    }
}
</style>