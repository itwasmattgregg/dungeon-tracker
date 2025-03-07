import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import campaign from './modules/campaign'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    auth,
    campaign
  },
  strict: debug,
})

export default store
