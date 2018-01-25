<template>
    <div id="CommentComponent" class="comments" v-if="commentData">
        <div class="commentTitle">{{name}}<span>{{commentData.length}}条</span></div>
        <ul>
            <li v-for="(i,index) in commentData" :key="index">
                <img :src=" i.user.avatarUrl  | fiterAvator | filterImg">
                <div class="b">
                    <span class="name">{{i.user.nickname}}:</span>
                    <span class="c">{{i.content}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name:"CommentComponent",
        pagename:"精彩评论",
        props:['commentData','name'],
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
@import "../assets/css/variables.scss";
.comments {
    font-size: $font-size - 2;
    margin-top: 20px;
    .commentTitle {
        padding:5px 0;
        border-bottom: 1px solid $grey;
        font-size: $font-size + 2;
        span {
            font-size: $font-size;
            color:$red;
            margin-left: 2px;
        }
    }
    ul {
        li {
            display: flex;
            padding:20px 0;
            border-bottom:1px dashed darken($grey,15%);
            img {
                width:50px;
                height:50px;
                margin-right: 10px;
            }
            .b {
                flex:1;
                .name {
                    color:$blue;
                }
            }
        }
    }
}
</style>
