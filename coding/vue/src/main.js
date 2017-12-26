import Vue from 'vue';
import VueRouter from 'vue-router'

import App from './App';

Vue.use(VueRouter)

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
});
