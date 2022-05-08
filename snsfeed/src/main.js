import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import router from '@/router/router'
import VueCookie from 'vue-cookies'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueCookie)

new Vue({
  vuetify,
  render: h => h(App),
  router,
  store,
}).$mount('#app')
