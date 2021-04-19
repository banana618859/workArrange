<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2021-04-19 16:02:57
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-04-19 16:37:59
-->
<template>
  <div>
    <div v-for="(item,index) in allRight" :key="item.name+index" class="sonMenu textL mg-t20">
      
      <!-- 一个菜单 -->
      <p class="title pd-t2-l10">
        <el-checkbox v-model="item.check">{{item.name}}</el-checkbox>
      </p>
      <div style="border:1px solid #ccc;overflow: auto; height: 200px;">
        <content-box v-if="item.data" :data="item.data"></content-box>
        <list-box v-else :data="item.children"></list-box>
      </div>

    </div>
  </div>
</template>

<script>


import contentBox from './content-box';
import listBox from './list-box'
export default{
  components:{
    contentBox,
    listBox
  },
  props:{
    allRight:{
      type: Array,
      default:()=>[]
    }
  },
  data(){
    return{
      
    }
  }
}
</script>


<style scoped>

</style>