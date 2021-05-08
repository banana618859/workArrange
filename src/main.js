/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2021-04-17 18:35:51
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-05-08 09:14:41
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './main.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 混入
import mixin from './mixin'
Vue.mixin(mixin)

import axios from 'axios'
Vue.prototype.$axios = axios

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
