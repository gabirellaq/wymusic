import Vue from "vue"
import Vuex from 'vuex'

import banner from './modules/banner'
import songlist from './modules/songlist'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        banner,
        songlist
    }
})