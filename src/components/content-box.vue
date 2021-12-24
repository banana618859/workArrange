<!--
 * @Descripttion:
 * @Author: yizheng.yuan
 * @Date: 2021-04-19 11:54:03
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-05-06 18:11:09
-->
<template>
  <div style="border:1px solid #eee;" class="pd-t10-b20 pd-lr10">
    <span v-for="(item,index) in data" :key="faName+'_'+item.name+index" style="margin-right:10px;">
      <el-checkbox v-model="item.check" @change="changeFun(faName+'_'+item.name, item.check)">{{item.name}}</el-checkbox>
    </span>
  </div>
</template>

<script>

export default {
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
    changeFun() {
      this.$emit('clickOne', ...arguments);
    },
  },
  data() {
    return {

    };
  },
};
</script>
