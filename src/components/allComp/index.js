/*
 * @Descripttion:
 * @Author: yizheng.yuan
 * @Date: 2021-06-30 11:57:08
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-06-30 12:13:15
 */

import Vue from 'vue';
// console.error('Vue',Vue);
import main_1 from './comp_1';
import main_2 from './comp_2';

console.error('main_1 : ', main_1);

const all_c = [
  main_1,
  main_2,
];

// 用vue注册全局组件
// Vue.component(one_main.name,one_main)
all_c.forEach((one) => {
  one.install(Vue);
});
