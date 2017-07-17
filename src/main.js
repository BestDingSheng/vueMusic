// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'common/css/rest.css'
import 'common/css/public.css'
import 'assets/font/iconfont.css'
import 'animate.css'
import store from './store'

import museUi from 'muse-ui';
import 'muse-ui/dist/muse-ui.css'
Vue.use(museUi);


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
