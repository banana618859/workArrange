<!--
 * @Descripttion:
 * @Author: yizheng.yuan
 * @Date: 2021-04-19 11:54:03
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-06-21 14:33:25
-->
<template>
  <div>
    <div v-for="(item,index) in data" :key="item.name+index" class="sonMenu" style="padding:5px; margin-top:10px; margin-bottom:10px;" >
      <p style="background-color: #d5dfdc;" class="pd-t2-l10">
        <el-checkbox v-model="item.check" @change="titleClick(faName+'_'+item.name,item.check)">{{item.name}}_{{index}}</el-checkbox>
      </p>
      <list-boxa v-if="item.children && item.children[0].children" :data="item.children" :faName="faName+'_'+item.name"></list-boxa>
      <content-box v-else :data="item.children" :faName="faName+'_'+item.name" @clickOne="clickOne"></content-box>

    </div>
  </div>
</template>

<script>

import contentBox from './content-box';

export default {
  name: 'list-boxa',
  components: {
    contentBox,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    faName: {
      type: String,
      default: '',
    },
  },
  methods: {
    titleClick() {
      this.$emit('titleClick', ...arguments);
    },
    clickOne(a) {
      this.$emit('clickOne', ...arguments);
    },
  },
  data() {
    return {

    };
  },
};
</script>
