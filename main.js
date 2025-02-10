import Vue from 'vue'
import App from './App'
import http from './http/index.js'
import api from 'http/api.js'
Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$api = api
Vue.prototype.$http = http
Vue.prototype.$imgDomain = 'https://www.ceshi.com/'

const app = new Vue({
    ...App
})
app.$mount()
