
import { axiosRq } from "../../config"


export default {
    state: {
        song:[], //歌手单曲
        ablum:[], //歌手专辑
        mv:[], //歌手MV
        singerdes:[], //歌手描述
        hotsingers:[], //热门歌手
    },
    mutations: {
        GETSINGERSONG (state, res) {
            state.song = res;
        },
        GETSINGERALBUM (state, res) {
            state.ablum = res
        },
        GETSINGERMV (state, res) {
            state.mv = res 
        },
        GETSINGERDES (state, res) {
            state.singerdes = res;
        },
        GRTHOTSINGERS (state, res) {
            state.hotsingers = res;
        }
    },
    actions: {
        //one singer song
        async getSingerSongData ({commit}, {id}) {
            let parmas = {
                'id':id
            }
            let res = await axiosRq('GET', 'artists', parmas)
            if(res.data) {
                commit('GETSINGERSONG',res.data);
            }
            return res
        },
        //one simger album
        async getSingerAlbumData ({commit}, {id,limit}) {
            let parmas = {
                'id':id,
                'limit': limit || 50
            }
            let res = await axiosRq('GET', 'artist/album', parmas)
            if(res.data) {
                commit('GETSINGERALBUM',res.data);
            }
            return res
        },
        //one singer mv
        async getSingerMVData ({commit}, {id}) {
            let parmas = {
                'id':id
            }
            let res = await axiosRq('GET', 'artist/mv', parmas)
            if(res.data) {
                commit('GETSINGERMV',res.data);
            }
            return res
        },
        //one singer description
        async getSingerDesData ({commit}, {id}) {
            let parmas = {
                'id':id
            }
            let res = await axiosRq('GET', 'artist/desc', parmas)
            if(res.data) {
                commit('GETSINGERDES',res.data);
            }
            return res
        },
        //hot singers
        async getHotSingersData ({commit}, {offset, limit}) {
            let params= {                
                'offset':offset || 0, //偏移数量 , 用于分页 , 如 :( 页数 -1)*limit
                'limit':limit || 50,
            }
            let res = await axiosRq('GET', 'top/artists', params)
            if(res.data) {
                commit('GRTHOTSINGERS',res.data);
            }
            return res
        }
    }
}