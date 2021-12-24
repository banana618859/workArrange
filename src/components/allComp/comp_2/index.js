/*
 * @Descripttion:
 * @Author: yizheng.yuan
 * @Date: 2021-06-30 11:48:03
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-06-30 12:10:35
 */

// import Vue from 'vue';
// console.error('Vue',Vue);
import main from './main';

console.error('main:', main);

// 用vue注册全局组件
// Vue.component('onec',main)
export default {
  install(Vue) {
    Vue.component(main.name, main);
  },
};
