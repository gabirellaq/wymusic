<template>
    <div id="HeaderComponent" class="m-subnav">
        <div class="wrap">
            <ul>
                <li v-for="item in items" :key="item.id">
                    <router-link :to="`/${item.id}`"><em>{{item.name}}</em></router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        name:"HeaderComponent",
        data () {
            return {
                items: [
                    {
                        id:'recommend',
                        name:'推荐'
                    },
                    {
                        id:'leaderboards',
                        name:'排行榜'
                    },
                    {
                        id:'songlist',
                        name:'歌单'
                    },
                    {
                        id:'anchorRadio',
                        name:'主播电台'
                    },
                    {
                        id:'singer',
                        name:'歌手'
                    },
                    {
                        id:'newAlbum',
                        name:'新碟上架'
                    }
                ]
            }
        },
        computed:{
    
        },
        methods: {
            
        }
    }
</script>
<style lang="scss">
$red:#C20C0C;
$white:#fff;
.m-subnav {
    z-index: 90;
    box-sizing: border-box;
    background-color: $red;
    border-bottom: 1px solid daken($red,5%);
    .wrap {
        width: 100%;
        margin: 0 auto;
        ul {
            display: flex;
            align-items: center;
            justify-content: center;
            li {          
                a {
                    color:$white;
                    padding:10px 20px;                    
                    display: inline-block;
                    em {                        
                        padding: 3px 10px;
                        border-radius: 11px;
                    }
                    &.router-link-active {
                        em {
                            background: darken($red,10%);
                        }
                    }
                }
                
            }
        }
    }
}
</style>
