<!--
 * @Descripttion: unTitle
 * @Author: yizheng.yuan
 * @Date: 2021-07-13 10:17:44
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-07-13 10:30:31
-->
<template>
    <div>
        这是子组件的内容-来自父组件:{{fromParentMsg}}
    </div>
</template>
<script>
export default {
  name: 'child2',
  // props 接受父组件传递的值
  props: ['fromParentMsg'],
  data() {
    return {
      child_msg: '这是child的msg',
    };
  },
  methods: {
    child_fun() {
      console.error('name:', this.$options.name);
      return 'ccc';
    },
  },
};
// 原文链接：https://blog.csdn.net/qq_31173561/article/details/89498942
</script>
<style scoped>
</style>
