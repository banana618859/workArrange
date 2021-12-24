<!--
 * @Descripttion:
 * @Author: yizheng.yuan
 * @Date: 2021-06-15 11:25:12
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-06-16 11:21:43
-->
<template>
  <div>
    <embed :src="url" type="application/pdf" width=800 height=800>

    <!-- <pdf src="../assets/relativity.pdf"></pdf> -->
    <!-- <iframe src="http://localhost:8080/index.html" style="width: 100%; height: 100%"></iframe> -->
    <!-- <iframe src="http://localhost:7000/getpdf" style="width: 100%; height: 100%"></iframe> -->
    <!-- <iframe src="http://localhost:7000/getdoc" style="width: 100%; height: 100%"></iframe> -->

    <!-- a标签的方式查看pdf -->
    <!-- <a href="http://localhost:7000/getpdf">Download PDF</a> -->

    <!-- embed标签查看 -->
    <!-- <el-dialog width="1000px" :visible.sync="showDialog" :before-close="handleClose">
      <div style="width: 100%;overflow: auto; border:1px solid red;">
        <embed :src="url" type="application/pdf" width=800 height=800>
      </div>
    </el-dialog> -->

    <!-- object标签查看 -->
    <!-- <object :data="url" type="application/pdf" width=800 height=500 style="border:1px solid red">
      This browser does not support PDFs. Please download the PDF to view it:
      <a href="unix test.pdf">Download PDF</a>
    </object> -->

    <!-- 作者：六小白Maker
    链接：https://www.jianshu.com/p/61065b749ff8
    -->

    <!-- 通过jquery插件查看 -->
    <!-- <a class="media" :href="url">wqarweqer</a>  -->
  </div>
</template>

<script type="text/javascript" src="../assets/jquery.media.js"></script>

<script>
// import pdf from 'vue-pdf'

export default {
  props:{
    showDialog:{
      type: Boolean,
      default: false
    },
    url:{
      type: String,
      default: ''
    }
  },
  data(){
    return{
    }
  },
  methods:{
    handleClose(){
      this.$emit('closeBox')
    }
  }
}
</script>
