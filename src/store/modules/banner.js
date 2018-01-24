
import { axiosRq } from "../../config"


export default {
    state: {
        banner:[]
    },
    mutations: {
        GETBANNER (state, res) {
            state.banner = res;
        }
    },
    actions: {
        async getBannerData ({commit}) {
            let res = await axiosRq('GET', `banner`)
            if(res) {
                commit('GETBANNER',res);
            }
        }
    }
}