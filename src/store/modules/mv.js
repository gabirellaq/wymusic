
import { axiosRq } from "../../config"


export default {
    state: {
        mvdetail:[], //mv详情
        mvcomment:[], //mv评价
        simimv:[], //相似mv
        personalizedmv: [], //推荐mv
    },
    mutations: {
        GETMVDETAIL (state, res) {
            state.mvdetail = res;
        },
        GETMVCOMMENT(state, res) {
            state.mvcomment = res
        },
        GETSIMIMV(state, res){
            state.simimv = res
        },
        GETPERSONALIZEDMV(state, res){
            state.personalizedmv = res
        }
    },
    actions: {
        //mv详情
        async getMVDetailData ({commit}, {id}) {
            let params = {
                'mvid': id
            }
            let res = await axiosRq('GET', 'mv', params)
            commit('GETMVDETAIL',res);
            return res;
        },
        //mv评价
        async getMVCommentData ({commit}, {id}) {
            let params = {
                'id': id
            }
            let res = await axiosRq('GET', 'comment/mv', params)
            commit('GETMVCOMMENT',res);
            return res;
        },
        //相似mv
        async getSimiMvData ({commit}, {id}) {
            let params = {
                'mvid': id
            }
            let res = await axiosRq('GET', 'simi/mv', params)
            commit('GETSIMIMV',res);
            return res;
        },
        //推荐mv
        async getpersonlizedMvData ({commit}) {
            let res = await axiosRq('GET', 'personalized/mv')
            commit('GETPERSONALIZEDMV',res);
            return res;
        },
    }
}