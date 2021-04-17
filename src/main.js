/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2021-04-17 18:35:51
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-04-17 21:33:52
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './main.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
