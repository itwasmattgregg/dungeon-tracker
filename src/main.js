// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import firebase from 'firebase'
import 'vuetify/dist/vuetify.min.css'

import './firebaseInit'

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
const unsubscribe = firebase.auth()
.onAuthStateChanged((firebaseUser) => {
  new Vue({
    el: '#app',
    router,
    render: h => h(App, this.user),
    data: () => {
      return {
        user: null
      }
    },
    created () {
      if (firebaseUser) {
        this.user = firebaseUser
        router.push('/home')
      }
    }
  })
  unsubscribe()
})
