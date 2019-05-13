import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import '@fortawesome/fontawesome-free/css/all.css'

const theme = {
  headerColor: '#ffb347',
  calendarColor: '#85e3ff',
  inputColor: '#9933ff',
  buttonColor: '#9933ff',
  loaderColor: '#ffb347',
  toolbarColor: '#000',
  info: '#fff',
}
Vue.use(Vuetify, { theme })

Vue.config.productionTip = false

new Vue({
  iconfont: 'fa',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
