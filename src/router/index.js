import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/pages/Recommend'
import LeaderBoards from '@/pages/LeaderBoards'
import SongList from '@/pages/SongList'
import AnchorRadio from '@/pages/AnchorRadio'
import Singer from '@/pages/Singer'
import NewAlbum from '@/pages/NewAlbum'
import Search from '@/pages/Search'
import Artist from '@/pages/Artist'
import SongDetail from '@/pages/SongDetail'
import SongListDetail from '@/pages/SongListDetail'
import AlbumDetail from '@/pages/AlbumDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: Recommend
    },
    {
      path: '/leaderboards',
      name: 'leaderboards',
      component: LeaderBoards
    },
    {
      path: '/songlist',
      name: 'songlist',
      component: SongList
    },
    {
      path: '/anchorRadio',
      name: 'anchorRadio',
      component: AnchorRadio
    },
    {
      path: '/singer',
      name: 'singer',
      component: Singer
    },
    {
      path: '/newAlbum',
      name: 'newAlbum',
      component: NewAlbum
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/artist',
      name: 'artist',
      component: Artist
    },{
      path:'/songDetail',
      name:'songDetail',
      component:SongDetail
    },{
      path:'/songlistDetail',
      name:'songlistDetail',
      component:SongListDetail
    },{
      path:'/albumDetail',
      name:'albumDetail',
      component:AlbumDetail
    }
  ]
})
