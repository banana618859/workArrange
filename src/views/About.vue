<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2021-04-17 18:35:51
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-05-28 17:14:56
-->
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-input v-model="word" @blur="readWord" style="width:400px;"></el-input>
      <!-- <video controls="" ref="myVideo" autoplay="autoplay" name="media">
        <source :src="url" type="audio/mp3">
      </video> -->

      <video ref="myVideo" autoplay="autoplay" :src="url"></video>
<!-- 原文链接：https://blog.csdn.net/qq_40713392/article/details/94782292 -->

    <div style="border: 1px solid red; margin: 15px;">
      <p>mockjs使用</p>
      <el-table
        :data="taData" border size="mini" style="flex: 1;width: 100%;">
        <el-table-column
        type="index"
        width="50"></el-table-column>
        <el-table-column prop="id" label="id" width="400"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="job" label="工作"></el-table-column>
        <el-table-column prop="img" label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.img" />
          </template>
        </el-table-column>
      </el-table>

    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        word: '你好，一正！',
        baseUrl: 'https://api.oick.cn/txt/apiz.php?',
        url: '',
        text: 'text=',
        other: ';spd=1',
        tempUrl: '',
        taData: []

      }
    },
    created(){
      let keyWork = this.text+this.word
      this.url=this.baseUrl + keyWork;
      console.log('this.url',this.url);
      this.getData()
    },
    watch:{
      word(n,o){
        let keyWork = this.text+this.word
        this.tempUrl=this.baseUrl + keyWork;
        console.log(this.url);
      }
    },
    methods:{
      
      getData(){
        this.taData=[]
        this.$axios.get('/parameter/query')
        .then(res => {
          console.log('res',res);
          this.taData = res.data.data.rows
        })
      },
      readWord(){
        this.url = this.tempUrl;
        // var myVideo = document.getElementsByTagName('video')[0];
        // console.log('myVideo',myVideo,myVideo.readyState);
        // setTimeout(()=>{
          

        //   console.log('myVideo',myVideo,myVideo.readyState);
        //   var keys=[]
        //   for(let key in myVideo){
        //     keys.push(key)
        //   }
        //   this.play()
        // },200)

        // let url = `/zzz/apiz.php?text=${this.word}&spd=1`
        // this.$axios.get(url)
        // .then(res=>{
        //   console.log('res',res);
        // })
        // .catch(err=>{
        //   console.log('err',err);
        // })
      }
    }
  }
</script>