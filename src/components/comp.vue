<!--
 * @Descripttion:
 * @Author: yizheng.yuan
 * @Date: 2021-05-25 12:01:07
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-05-27 19:31:45
-->
<template>
  <div>
    <div>
      <p style="margin: 15px;">分页组件:</p>
      <pagination :count="allCount"></pagination>
    </div>
  </div>
</template>

<script>

import pagination from './pagination';

export default {
  components: {
    pagination,
  },
  data() {
    return {
      allCount: 50,
    };
  },
};
</script>

<style>

</style>
