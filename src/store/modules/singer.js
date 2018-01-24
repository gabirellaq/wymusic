
import { axiosRq } from "../../config"


export default {
    state: {
        song:[], //歌手单曲
        ablum:[], //歌手专辑
        mv:[], //歌手MV
        singerdes:[], //歌手描述
        hotsingers:[], //热门歌手
        samesingers:[], //相似歌手
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
        },
        GRTSAMESINGERS(state, res) {
            state.samesingers = res
        }
    },
    actions: {
        //one singer song
        async getSingerSongData ({commit}, {id}) {
            let parmas = {
                'id':id
            }
            let res = await axiosRq('GET', 'artists', parmas)
            if(res) {
                commit('GETSINGERSONG',res);
            }
        },
        //one simger album
        async getSingerAlbumData ({commit}, {id,limit}) {
            let parmas = {
                'id':id,
                'limit': limit || 50
            }
            let res = await axiosRq('GET', 'artist/album', parmas)
            if(res) {
                commit('GETSINGERALBUM',res);
            }
        },
        //one singer mv
        async getSingerMVData ({commit}, {id}) {
            let parmas = {
                'id':id
            }
            let res = await axiosRq('GET', 'artist/mv', parmas)
            if(res) {
                commit('GETSINGERMV',res);
            }
        },
        //one singer description
        async getSingerDesData ({commit}, {id}) {
            let parmas = {
                'id':id
            }
            let res = await axiosRq('GET', 'artist/desc', parmas)
            if(res) {
                commit('GETSINGERDES',res);
            }
        },
        //hot singers
        async getHotSingersData ({commit}, {offset, limit}) {
            let params= {                
                'offset':offset || 0, //偏移数量 , 用于分页 , 如 :( 页数 -1)*limit
                'limit':limit || 50,
            }
            let res = await axiosRq('GET', 'top/artists', params)
            if(res) {
                commit('GRTHOTSINGERS',res);
            }
        },
        // 相似歌手
        async getSameSingersData ({commit}, {id, limit}) {
            let params= {                
                'id': id,
                'limit':limit || 50,
            }
            let res = await axiosRq('GET', 'simi/artist', params)
            if(res) {
                commit('GRTSAMESINGERS',res);
            }
        },
    }
}