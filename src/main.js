import Vue from 'vue'
import App from './App.vue'
import './index.css'
import './assets/tailwind.css'
import Modal from './components/Utils/Modal'
import Spinner from './components/Utils/Spinner'

Vue.component('Modal', Modal)
Vue.component('Spinner', Spinner)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
