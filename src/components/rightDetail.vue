<!--
 * @Descripttion:
 * @Author: yizheng.yuan
 * @Date: 2021-04-19 16:02:57
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-06-21 17:15:05
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
        <span class="fr">
          <el-checkbox
          v-model="item.allCheck"
          @change="topClickAll(item.name)"
          >全选</el-checkbox>
        </span>
        <el-checkbox
          v-model="item.check"
          @change="topClick(item.name)"
          >{{ item.name }}</el-checkbox>
      </p>
      <div style="border: 1px solid #ccc; overflow: auto; height: 210px">
        <list-boxa
          v-if="item.children && item.children[0].children"
          :data="item.children"
          :faName="item.name"
          @clickOne="sonTitleClick"
          @titleClick="titleClickFun">
        </list-boxa>
        <content-box v-else :data="item.children" :faName="item.name" @clickOne="sonTitleClick"></content-box>
      </div>
    </div>
  </div>
</template>

<script>
import contentBox from './content-box';
import listBoxa from './list-boxa';

export default {
  components: {
    contentBox,
    listBoxa,
  },
  props: {
    allRight: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isCheckAll: false,
      theRight: [],
    };
  },
  methods: {
    // 情况1：操作最顶级时，以下所有级都受影响（父亲选中，儿子都选中）
    topClick() {
      this.$emit('topClick', ...arguments);
    },
    titleClickFun() {
      this.$emit('titleClickFun', ...arguments);
    },
    sonTitleClick() {
      this.$emit('oneClick', ...arguments);
    },
    topClickAll() {
      this.$emit('topClickAll', ...arguments);
    },
  },
};
</script>

<style scoped>
</style>
