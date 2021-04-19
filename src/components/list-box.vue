<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2021-04-19 11:54:03
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-04-19 16:21:55
-->
<template>
  <div>
    <div v-for="(item,index) in data" :key="item.name+index" class="sonMenu" style="padding:5px; margin-top:10px; margin-bottom:10px;" >
      <p style="background-color: #ccc;" class="pd-t2-l10">
        <el-checkbox v-model="item.check">{{item.name}}</el-checkbox>
      </p>
      <content-box v-if="item.data" :data="item.data"></content-box>
      <list-box v-else :data="item.children"></list-box>
    </div>
  </div>
</template>

<script>

import contentBox from './content-box';
export default {
  name: 'list-box',
  components:{
    contentBox
  },
  props:{
    data:{
      type: Array,
      default: ()=>[]
    }
  },
  data() {
    return{
      
    }
  },
}
</script>

