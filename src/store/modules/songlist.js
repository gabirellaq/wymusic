
import { axiosRq } from "../../config"
export default {
    state: {
        songs:[], //歌单
        recommendsong:[], //推荐歌单
        leaderboards:[], //排行榜
        commentplaylist: [], //歌单排行榜评论
        commentmusic: [], //歌曲评论
        lyric: [], //歌词
        songdetail:[], //歌曲详情
        topalbum:[], //新碟上架
        simisong:[], //相似歌曲
    },
    mutations: {
        GETSONGS (state, res) {
            state.songs = res;
        },
        GETRECOMMENDSONGS(state, res) {
            state.recommendsong = res;
        },
        GETLEADERBOARDS(state, res){
            state.leaderboards = res;
        },
        GETCOMMENTPLAYLIST(state, res){
            state.commentplaylist = res
        },
        GETTOPALBUM(state, res){
            state.topalbum = res
        },
        GETCOMMENTMUSIC(state, res) {
            state.commentmusic = res
        },
        GETLYRIC(state, res) {
            state.lyric =  res
        },
        GETSONGDETAIL(state, res) {
            state.songdetail = res
        },
        GETSIMISONG(state, res) {
            state.simisong = res
        }
    },
    actions: {
        //歌单
        async getSongsData ({commit}, orders) {
            let res = await axiosRq('GET', 'top/playlist', {order:orders})
            if(res) {
                commit('GETSONGS',res);
            }
        },
        // 推荐歌单
        async getRecommendSongsData ({commit} ,{limit}) {
            let res = await axiosRq('GET', 'personalized',{
                'limit': limit || 10
            })
            if(res) {
                commit('GETRECOMMENDSONGS',res);
            }
        },
        //排行榜
        /**
         * "0": 云音乐新歌榜,
            "1": 云音乐热歌榜,
            "2": 网易原创歌曲榜,
            "3": 云音乐飙升榜,
            "4": 云音乐电音榜,
            "5": UK排行榜周榜,
            "6": 美国Billboard周榜
            "7": KTV嗨榜,
            "8": iTunes榜,
            "9": Hit FM Top榜,
            "10": 日本Oricon周榜
            "11": 韩国Melon排行榜周榜,
            "12": 韩国Mnet排行榜周榜,
            "13": 韩国Melon原声周榜,
            "14": 中国TOP排行榜(港台榜),
            "15": 中国TOP排行榜(内地榜)
            "16": 香港电台中文歌曲龙虎榜,
            "17": 华语金曲榜,
            "18": 中国嘻哈榜,
            "19": 法国 NRJ EuroHot 30周榜,
            "20": 台湾Hito排行榜,
            "21": Beatport全球电子舞曲榜,
            "22": 云音乐ACG音乐榜,
            "23": 云音乐嘻哈榜
         */
        async getLeaderboardsData ({commit} ,{idx}) {
            let res = await axiosRq('GET', 'top/list',{
                'idx': idx || 0
            })
            if(res) {
                commit('GETLEADERBOARDS',res);
            }
        },
        //歌单评论
        async getCommentPlaylistData ({commit} ,{id}) {
            let res = await axiosRq('GET', 'comment/playlist',{
                'id': id
            })
            if(res) {
                commit('GETCOMMENTPLAYLIST',res);
            }
        },
        //歌曲评论
        async getCommentMusicData ({commit} ,{id,limit}) {
            let res = await axiosRq('GET', 'comment/music',{
                'id': id,
                'limit': limit || 1
            })
            if(res) {
                commit('GETCOMMENTMUSIC',res);
            }
        },
        //歌词
        async getlyricData ({commit} ,{id}) {
            let res = await axiosRq('GET', 'lyric',{
                'id': id
            })
            if(res) {
                commit('GETLYRIC',res);
            }
        },
        //歌曲详情
        async getSongDetailData ({commit} ,{id}) {
            let res = await axiosRq('GET', 'song/detail',{
                'ids': id
            })
            if(res) {
                commit('GETSONGDETAIL',res);
            }
            return res
        },
        //新碟上架
        async getTopAlbumData ({commit}, {offset,limit}) {
            let res = await axiosRq('GET', 'top/album',{
                'offset':offset || 0,
                'limit':limit || 30
            })
            if(res) {
                commit('GETTOPALBUM',res);
            }
            return res;
        },
        //相似歌曲
        async getSimiSongData ({commit}, {id}) {
            let res = await axiosRq('GET', 'simi/song',{
                'id':id
            })
            if(res) {
                commit('GETSIMISONG',res);
            }
            return res;
        },
    }
}