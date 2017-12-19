// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './common/style/index.less'
import VueLazyload from 'vue-lazyload'
import axios from './common/js/http'
import fastclick from 'fastclick'
// 为了消除300ms延迟问题，引入fastclick。然后绑定倒body
fastclick.attach(document.body);
// 如果想在全局使用，那么我们就这样
Vue.prototype.$http = axios
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./common/images/lazyload.png'),
  loading: require('./common/images/lazyload.png'),
  attempt: 1
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
