import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

var dialog_top =  20;
export default new Vuex.Store({
  state: {
    dialog_topStr: dialog_top+'px',
    dialog_maxH: 819
  },
  mutations: {
    save_dialog_maxH(state,data){
      state.dialog_maxH = data - dialog_top*2;
    }
  },
  actions: {
  },
  modules: {
  },
});
