
import { axiosRq } from "../../config"


export default {
    state: {
        songs:[]
    },
    mutations: {
        GETSONGS (state, res) {
            state.songs = res;
        }
    },
    actions: {
        async getSongsData ({commit}, orders) {
            let res = await axiosRq('GET', 'top/playlist', {order:orders})
            if(res.data) {
                commit('GETSONGS',response.data);
            }
            return res
        }
    }
}