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
// Custom http plugin
import http from './plugins/http'
{{/http}}
{{#adaptive}}
// Imports for adaptive
import Adaptive from 'vue-adaptive'
import {adaptive as adaptiveConf} from '../config/app.config'
  // Setting adaptive plugin
Vue.use(Adaptive, adaptiveConf)
{{/adaptive}}
{{#http}}
// Setting http plugin
Vue.use(http)
{{/http}}
Vue.config.productionTip = false
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>'
  {{/if_eq}}
})
