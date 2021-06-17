/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2021-04-17 18:35:51
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-06-11 16:06:41
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// 样式
import './my-reset.css';
import './pd-mg.css';
import './main.css';

// import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);

// 混入
import mixin from './mixin'
Vue.mixin(mixin)

// mockjs
require('../mock');

// 国际化
import i18n from './i18n';

// 去除谷歌警告提醒
import 'default-passive-events';  //去除touchstart谷歌提示


import axios from 'axios'
Vue.prototype.$axios = axios

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
