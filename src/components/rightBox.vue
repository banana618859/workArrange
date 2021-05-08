<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2021-04-19 16:02:57
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-05-06 17:12:50
-->
<template>
  <div>
    <div
      v-for="(item, index) in allRight"
      :key="item.name + index"
      class="sonMenu textL mg-t20"
    >
      <!-- 权限类型 -->
      <p class="title pd-t2-l10">
        <el-checkbox
          v-model="item.check"
          @change="topClick(item.name, item.check)"
          >{{ item.name }}</el-checkbox>
      </p>
      <div style="border: 1px solid #ccc; overflow: auto; height: 210px">
        <list-box 
          v-if="item.children && item.children[0].children" 
          :data="item.children" 
          :faName="item.name" 
          @clickOne="sonTitleClick" 
          @titleClick="sonTitleClick">
        </list-box>
        <content-box v-else :data="item.children" :faName="item.name" ></content-box>
      </div>
    </div>
  </div>
</template>

<script>
import contentBox from "./content-box";
import listBox from "./list-box";
export default {
  components: {
    contentBox,
    listBox,
  },
  props: {
    allRight: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      theRight: [],
    };
  },
  methods: {
    // 情况1：操作最顶级时，以下所有级都受影响（父亲选中，儿子都选中）
    topClick(){
      this.$emit('topClick',...arguments)
    },
    sonTitleClick(){
      this.$emit('sonTitleClick',...arguments)
    }
  },
};
</script>


<style scoped>
</style>