/*
 * @Descripttion:
 * @Author: yizheng.yuan
 * @Date: 2021-04-17 18:35:51
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-06-30 10:20:26
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
console.error('new Vuex.Store', new Vuex.Store());
const dialog_top = 20;
export default new Vuex.Store({
  strict: true,
  state: {
    dialog_topStr: `${dialog_top}px`,
    dialog_maxH: 810,
  },
  mutations: {
    save_dialog_maxH(state, data) {
      const dialogH = data - dialog_top * 2;
      console.error('弹出框高度:', dialogH);
      state.dialog_maxH = dialogH;
    },
  },
  actions: {
  },
  modules: {
  },
});
