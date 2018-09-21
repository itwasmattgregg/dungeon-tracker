// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import firebase from 'firebase'
import VueMoment from 'vue-moment'
import VueFirestore from 'vue-firestore'
import store from './store'

import 'vuetify/dist/vuetify.min.css'

import './firebaseInit'

/**
 * Register Vue Plugins in the global scope
 */
Vue.use(Vuetify)
Vue.use(VueMoment)
Vue.use(VueFirestore)

Vue.config.productionTip = false

firebase.auth()
  .onAuthStateChanged((user) => {
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App, this.user),
      data: () => {
        return {
          user: null
        }
      },
      created () {
        if (user) {
          this.$store.dispatch('autoSignIn', user)
        }
      }
    })
  })
