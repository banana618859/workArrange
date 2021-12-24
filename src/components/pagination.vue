<!--
 * @Descripttion:
 * @Author: yizheng.yuan
 * @Date: 2021-05-27 19:09:33
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-05-27 19:35:00
-->
<template>
  <div>
    <ul class="one">
      <li>
        <i class="el-icon-d-arrow-left"></i>
      </li>
      <li v-for="(item,index) in allPage" :key="item+index" @click="liClick(item)">
        <span v-if="item=='shenlue'"><i class="el-icon-more"></i></span>
        <span v-else>{{item}}</span>
      </li>
      <li>
        <i class="el-icon-d-arrow-right"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      allPage: [],
    };
  },
  created() {
    this.allPage = [];
    if (this.count > 8) {
      for (let i = 0; i < 4; i++) {
        this.allPage.push(i + 1);
      }
      // 加入省略号
      this.allPage.push('shenlue');

      for (let i = this.count - 4; i < this.count; i++) {
        this.allPage.push(i + 1);
      }
    } else {
      for (let i = 0; i < this.count; i++) {
        this.allPage.push(i + 1);
      }
    }
  },
  methods: {
    liClick(item) {
      console.error('liClick', item);
    },
  },

};
</script>

<style scoped>
  .one li{
    display: inline-block;
    padding: 5px 8px;

    margin-left: 10px;
    text-align: center;
    cursor: pointer;
  }
  .one li:hover{
    background: #ccc;
  }
</style>
