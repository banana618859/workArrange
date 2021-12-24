<!--
 * @Descripttion:
 * @Author: yizheng.yuan
 * @Date: 2021-06-21 09:52:19
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-06-21 12:03:20
-->
<template>
  <ul>
    <li v-for="(item,index) in treeData" :key="item.label+index" :style="{paddingLeft: current_pd_left+'px'}">
      <p @click="titleClick(item)" :id="item.id">
        <i v-if="item.children && item.children.length" class="el-icon-setting"></i>
        {{item.label}}
      </p>
      <myTree v-if="item.children" :treeData="item.children" :current_pd_left="current_pd_left+10"></myTree>
    </li>
  </ul>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'myTree',
  props: {
    current_pd_left: {
      type: Number,
      default: 0,
    },
    treeData: {
      type: Array,
      default: () => [],
    },
  },
  created() {
    console.error('$', $('p')[0]);
  },
  methods: {
    titleClick(item) {
      const { id } = item;
      if (!item.hasOwnProperty('show')) {
        item.show = true;
      }

      if (item.show) {
        $(`#${id}`).parent('li').find('ul').slideUp();
      } else {
        $(`#${id}`).parent('li').find('ul').slideDown();
      }
      item.show = !item.show;
      console.error('object', id);
    },
  },
};
</script>

<style>

</style>
