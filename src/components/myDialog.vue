<!--
 * @Descripttion:
 * @Author: yizheng.yuan
 * @Date: 2021-06-16 10:56:06
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-06-16 11:40:03
-->
<template>
  <el-dialog
      class="mydialog"
      :title="titleName ? titleName : $t('common.add')"
      :top="dialog_topStr"
      :visible.sync="showDialog"
      :close-on-click-modal="false"
      :width="dialogWidth"
      :before-close="handleClose">
      <div
        class="grap-box"
        style="overflow: auto"
        :style="{ maxHeight: dialog_maxH + 'px' }"
      >
        <slot name="container"></slot>
      </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    titleName: {
      type: String,
      default: '标题',
    },
    showDialog: {
      type: Boolean,
      default: false,
    },
    dialogWidth: {
      type: String,
      default: '90%',
    },
  },
  computed: {
    ...mapState(['dialog_maxH', 'dialog_topStr']),
  },
  mounted() {
    // 获取页面的高度
    const bodyH = document.documentElement.clientHeight;
    const titleTop = 50;
    this.$store.commit('save_dialog_maxH', bodyH - titleTop);
    console.log('bodyH', bodyH, this.dialog_topStr);
  },
  methods: {
    handleClose() {
      console.error('被关闭了');
      this.$emit('closeDialog');
    },
  },
};
</script>

<style>

</style>
