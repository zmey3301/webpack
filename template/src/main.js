{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
{{#router}}
import router from './router'
{{/router}}
{{#http}}
import http from './plugins/http'
{{/http}}
{{#adaptive}}
import Adaptive from 'vue-adaptive'
import {adaptive as adaptiveConf} from '../config/app.config'
{{/adaptive}}
{{#vuex}}
import Vuex from 'vuex'
import Store from './store'
{{/vuex}}
{{#adaptive}}
// Setting adaptive plugin
Vue.use(Adaptive, adaptiveConf)
{{/adaptive}}
{{#http}}
// Setting http plugin
Vue.use(http)
{{/http}}
{{#vuex}}
// Setting store
Vue.use(Vuex)
const store = new Vuex.Store(Store)
{{/vuex}}
Vue.config.productionTip = false
export default new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  {{#vuex}}
  store,
  {{/vuex}}
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>'
  {{/if_eq}}
})
