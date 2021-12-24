/*
 * @Descripttion:
 * @Author: yizheng.yuan
 * @Date: 2021-04-17 18:35:51
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-07-23 14:18:44
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// 样式
import './my-reset.css';
import './pd-mg.css';
import './main.css';

// 引入全局组件
import './components/allComp/index.js';

// 混入
import mixin from './mixin';

// 国际化
import i18n from './i18n';

// 去除谷歌警告提醒
import 'default-passive-events';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// https://www.cnblogs.com/fangshidaima/p/10175417.html

import axios from 'axios';

// import Vue from 'vue'
import BaiduMap from 'vue-baidu-map';

Vue.mixin(mixin);
// import BaiduMap from 'vue-baidu-map-v3'
Vue.use(BaiduMap, {
  /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
  ak: 'NmfCIrNZD29GgyaKXBR5awpIm15XVAGP',
});
// mockjs
require('../mock'); // 去除touchstart谷歌提示

// 系统错误捕获
const errorHandler = (error, vm) => {
  console.error(';抛出全局异常');
  console.error(vm);
  console.error(error);
  ElementUI.MessageBox({
    title: '错误',
    message: error,
  });
};
Vue.config.errorHandler = errorHandler;
Vue.prototype.$throw = (error) => errorHandler(error, this);
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
