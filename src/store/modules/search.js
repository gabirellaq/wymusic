
import { axiosRq } from "../../config"


export default {
    state: {
        search_songs: [], //1
        search_artists: [], //100
        search_albums: [], //10
        search_mvs: [], //1004
        search_lyric: [], //1006
        search_playlist: [], //1000
        search_radio:[], //1009
        search_user:[], //1002
    },
    mutations: {
        GETSEARCH (state, playload) {
            switch(playload.type) {
                case 1: //单曲
                    state.search_songs = playload.res;          
                    break;
                case 100: //歌手
                    state.search_artists = playload.res;   
                    break;
                case 10: //专辑
                    state.search_albums = playload.res;  
                    break;
                case 1004: //视频
                    state.search_mvs = playload.res;  
                    break;
                case 1006: //歌词
                    state.search_lyric = playload.res;
                    break;
                case 1000: //歌单
                    state.search_playlist = playload.res;
                    break;
                case 1009: //主播电台
                    state.search_radio = playload.res;
                    break;
                case 1002: //用户
                    state.search_user = playload.res;
                    break;
            }
        }
    },
    actions: {
        async getSearchData ({commit}, {keywords, type, limit}) {
            let params = {
                'keywords': keywords,
                'type': type || 1,
                'limit': limit || 30
            }
            let res = await axiosRq('GET', 'search', params);
            commit('GETSEARCH', {
                type: type,
                res: res.result
            })
        }
    }
}