<!--
 * @Descripttion: unTitle
 * @Author: yizheng.yuan
 * @Date: 2021-10-21 17:30:41
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-10-21 18:20:35
-->
<template>
  <div>
    提示：
    <ul>
      <li v-for="(item,index) in items" :key="item.name+index">
        <slot :row="item" :index="index"></slot>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    console.log('myslot--:', this.msg);
  },
};
</script>

<style>

</style>
