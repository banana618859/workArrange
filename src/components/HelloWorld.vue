<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2021-04-17 18:35:51
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-04-17 22:56:13
-->
<template>
  <div class="hello" style="height: 100vh; text-align:left; display: flex; flex-direction: column;">
    <h1>{{ msg }}</h1>
    <div style="height: 110px;">
      <div style="width:32%; border: 1px solid #ccc; float: left; ">
      <div>人员名单：</div>
      <textarea style="width:100%" v-model="atext"></textarea>
    </div>
    <div style="width:32%; margin-left: 2%; border: 1px solid #ccc; float: left;">
      <div>列车名：</div>
      <textarea style="width:100%" v-model="btext"></textarea>
    </div>
    <div style="width:31%; margin-left: 2%; border: 1px solid #ccc; float: left;">
      <div>列车时间：</div>
      <textarea style="width:100%" v-model="ctext"></textarea>
    </div>
    </div>
    <p>相隔多少<el-input v-model="delay" size="mini" style="width:60px"></el-input>小时 <el-button type="primary" size="mini" @click="start">排班</el-button></p>
    
    <div style="border:1px solid #ccc; flex: 1; overflow:auto;">
      结果：
      <el-table
      :data="finishArr" border size="mini" style="flex: 1;width: 100%;">
      <el-table-column
      type="index"
      width="50"></el-table-column>
      <el-table-column prop="name" label="用户" width="120"></el-table-column>
      <el-table-column prop="carArr" label="服务列车">
        <template slot-scope="scope">
          <p v-for="(item,index) in scope.row.carArr" :key="item.name+index">
            {{item.name}}:{{item.timeText}}<span style="color:red" v-if="item.special">特殊</span>
          </p>
        </template>
      </el-table-column>
    </el-table>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data(){
    return{
      count: 4,
      hour: 1000*60*60,
      delay: 2,
      atext: '用户1,用户2,用户3,用户4,用户5,用户6,用户7,用户8',
      btext: '车1,车2,车3,车4,车5,车6,车7,车8,车9,车10,车11,车12,车13,车14,车15,车16,车17,车18,车19,车20,车21,车22,车23,车24,车25,车26,车27,车28,车29,车30,车31,车32',
      ctext: '2021/4/17 20:54,2021/4/17 21:17,2021/4/17 21:19,2021/4/17 22:12,2021/4/17 22:17,2021/4/17 22:20,2021/4/17 22:37,2021/4/17 22:50,2021/4/17 23:21,2021/4/17 23:24,2021/4/17 23:55,2021/4/18 00:25,2021/4/18 00:25,2021/4/18 00:39,2021/4/18 00:44,2021/4/18 00:53,2021/4/18 00:53,2021/4/18 00:58,2021/4/18 01:10,2021/4/18 02:32,2021/4/18 03:37,2021/4/18 03:57,2021/4/18 04:27',
      allPerson: [],
      allCar:[],
      finishArr: [],
      personIndex: 0,
    }
  },
  methods:{
    async start(){
      console.log('start');
      this.finishArr=[]
      var personArr = this.atext.split(',')
      var carName = this.btext.split(',')
      var carTime = this.ctext.split(',')
      console.log('start',personArr,carName,carTime);
      this.count = parseInt(carTime.length/personArr.length)
      if(carTime.length%personArr.length){
        this.count++
      }
      // this.count++
      var carArr=[]
      for(let i=0;i<carTime.length;i++){
        carArr.push({
          name: carName[i],
          timeText: carTime[i],
          time: Date.parse(new Date(carTime[i]))
        })
      }
      console.log('carArr',carArr);
      // 根据列车匹配人
      for(let i=0;i<carArr.length;i++){
        this.personIndex=0
        await this.pipei(personArr,carArr[i])
        console.log('car:',i+1,carArr[i].name);
      }
      console.log('最后结果',this.count,this.finishArr);
    },
    pipei(personArr,car){
      return new Promise(async (resolve,reject)=>{
        // 未分配
        if(!this.finishArr[0]){
          // 直接分配第一辆车给第一个人
          let obj={
            name: personArr[0],
            carArr: [car]
          }
          this.finishArr.push(obj);
          resolve()
        }
        // 已分配
        else{
          // this.personIndex=0;
          // 先考虑第一个人
          // 先看看他满足4辆车了没，再看上一辆间隔2*3600
          let firstOne = this.finishArr[this.personIndex]
          let carLen = firstOne.carArr.length;
          let lastCarTime = firstOne.carArr[carLen-1].time
          if(firstOne.carArr.length< this.count && !(lastCarTime+this.delay*this.hour > car.time)){
            // 分配车给他
            firstOne.carArr.push(car)
            resolve()
          }
          else{
            // 再考虑第二人
            this.personIndex++
            await this.loopFenPei(personArr,car)
            resolve()
          }
        }
      }) 
    },
    loopFenPei(personArr,car){
      return new Promise(async (resolve,reject)=>{
        if(!this.finishArr[this.personIndex]){
          // 直接分配第一辆车给第一个人
          let obj={
            name: personArr[this.personIndex],
            carArr: [car]
          }
          this.finishArr.push(obj);
          resolve()
        }
        else{
          // 先考虑第一个人
          // 先看看他满足4辆车了没，再看上一辆间隔2*3600
          let firstOne = this.finishArr[this.personIndex]
          let carLen = firstOne.carArr.length;
          let lastCarTime = firstOne.carArr[carLen-1].time
          if(firstOne.carArr.length<this.count && !(lastCarTime+this.delay*this.hour > car.time)){
            // 分配车给他
            firstOne.carArr.push(car)
            resolve()
          }
          else{
            // 再考虑第二人
            this.personIndex++
            // 没人可分配了
            if(!personArr[this.personIndex]){
              var arr = this.finishArr;
              for(let i=0;i<arr.length;i++){
                if(arr[i].carArr.length<this.count){
                  car['special']=true
                  arr[i].carArr.push(car)
                  break;
                  
                }
              }
              resolve()
            }else{
              await this.loopFenPei(personArr,car)
              resolve()
            }
          }
        }
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  box-sizing: border-box;
}
textarea{
  height: 80px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
