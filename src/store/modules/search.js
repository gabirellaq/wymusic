
import { axiosRq } from "../../config"


export default {
    state: {
        search:[]
    },
    mutations: {
        GETSEARCH (state, res) {
            state.search = res;
        }
    },
    actions: {
        async getSearchData ({commit}, {keywords, type, limit}) {
            let params = {
                'keywords': keywords,
                'type': type || 1,
                'limit': limit || 30
            }
            let res = await axiosRq('GET', 'search', params)
            commit('GETSEARCH',res);
            return res;
        }
    }
}