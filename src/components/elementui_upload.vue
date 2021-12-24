<!--
 * @Descripttion: unTitle
 * @Author: yizheng.yuan
 * @Date: 2021-12-24 13:57:14
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-12-24 15:00:40
-->
<template>
  <div>
    <h3 style="padding:10px;">文件上传: <el-button @click="upload" type="primary">点击上传文件</el-button></h3>
    <hr />
    <div style="border: 1px solid red; padding: 20px">
      <el-upload
        ref="uploadRef"
        action="#"
        list-type="picture-card"
        :auto-upload="false"
        :on-change="on_change"
      >
        <i slot="default" class="el-icon-plus"></i>
      </el-upload>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      fileList: [],
    };
  },
  methods: {
    upload() {
      if (!this.fileList.length) {
        this.$message.warning('请先选择文件！');
        return;
      }
      console.log('this.fileList', this.fileList);
      let url = 'http://localhost:7070/fileUpload';
      let data = new FormData();
      data.append('name', 'tom');
      let allFile=[];
      for (let i = 0; i < this.fileList.length; i++) {
        data.append(`file${i}`, this.fileList[i].raw);
      }
      this.$axios
        .post(url, data)
        .then((res) => {
          console.error('success：', res);
          this.$message.success('上传成功！');
          // 清空列表
          this.$refs.uploadRef.clearFiles();
        })
        .catch((err) => {
          console.error('err:', err);
        });
    },
    on_change(file, list) {
      console.error('on_change:', file, list);
      this.fileList = list;
    },
    handleRemove(file) {
      console.error('删除：', file);
    },
    handlePictureCardPreview(file) {
      console.error('图片放大预览：', file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.error('图片下载：', file);
      console.log(file);
    },
  },
};
</script>

<style>
</style>
