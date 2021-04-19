<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2021-04-17 18:35:51
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-04-18 15:02:35
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
        tempUrl: ''

      }
    },
    created(){
      let keyWork = this.text+this.word
      this.url=this.baseUrl + keyWork;
      console.log('this.url',this.url);
    },
    watch:{
      word(n,o){
        let keyWork = this.text+this.word
        this.tempUrl=this.baseUrl + keyWork;
        console.log(this.url);
      }
    },
    methods:{
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