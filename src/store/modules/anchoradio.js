
import { axiosRq } from "../../config"


export default {
    state: {
        djcatelist:[], //电台分类
        programrecommend: [], //推荐节目
        privatecontent: [], //独家放送
        djrecommendtype: [], //电台分类推荐
    },
    mutations: {
        GETDJCATELIST (state, res) {
            state.djcatelist = res;
        },
        GETPROGRAMRECOMMEND(state, res){
            state.programrecommend = res
        },
        GETPRIVATECONTENT(state, res) {
            state.privatecontent = res
        },
        GETDJRECOMMENDTYPE(state, res){
            state.djrecommendtype = res
        }
    },
    actions: {
        //电台分类
        async getDJCatelistData ({commit}) {
            let res = await axiosRq('GET', 'dj/catelist')
            if(res) {
                commit('GETDJCATELIST',res);
            }
        },
        //推荐节目
        async getProgramRecommendData({commit}){
            let res =  await axiosRq('GET', 'program/recommend')
            if(res) {
                commit('GETPROGRAMRECOMMEND',res);
            }
        },
        //独家放送
        async getPrivatecontent({commit}){
            let res =  await axiosRq('GET', 'personalized/privatecontent')
            if(res) {
                commit('GETPRIVATECONTENT',res);
            }
        },
        //电台分类
        /***
         * 1 明星做主播
         * 2 音乐故事
         * 3 情感调频
         * 4 娱乐/影视
         * 5 脱口秀
         * 6 美文读物
         * 7 广播剧
         * 8 相声曲艺
         * 11 人文历史 
         * 12 旅途|城市
         * 13 外语世界
         * 14 亲子宝贝
         */
        async getDJRecommendType({commit},{type}){
            let res =  await axiosRq('GET', 'dj/recommend/type',{
                'type': type
            })
            if(res) {
                commit('GETDJRECOMMENDTYPE',res);
            }
        },
    }
}