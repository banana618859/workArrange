<!--
 * @Descripttion: unTitle
 * @Author: yizheng.yuan
 * @Date: 2021-10-19 10:10:49
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-12-24 14:35:45
-->
<template>
  <div style="padding:5px;">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">
          <div style="padding: 5px; border:1px solid #ddd; text-align:left;">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="IO_16">
                <ul class="rowUl">
                  <li
                    v-for="(item,index) in form.DiArr"
                    :key="index"
                    @click="switchLed(item.value,index)">
                    <el-tooltip class="item" effect="dark" :content="item.name" placement="top">
                      <div>
                        <div class="circle_6" :class="[item.value?'':'on']"></div>
                        <p>{{index}}</p>
                      </div>
                    </el-tooltip>
                  </li>
                </ul>
              </el-form-item>
              <el-form-item label="DO_5">
                <ul class="rowUl">
                  <li
                    v-for="(item,index) in form.DoArr"
                    :key="index">
                    <el-tooltip class="item" effect="dark" :content="item.name" placement="top">
                      <div>
                        <div class="circle_6" v-if="index===1" :class="[item.value?'':'red']"></div>
                        <div class="circle_6" v-else-if="index===2"
                          :class="[item.value?'':'yellow']"></div>
                        <div class="circle_6" v-else :class="[item.value?'':'on']"></div>
                        <p>{{index}}</p>
                      </div>
                    </el-tooltip>
                  </li>
                </ul>
              </el-form-item>
            </el-form>
          </div>

        </el-tab-pane>
        <el-tab-pane label="插槽" name="second">
          <my-slot :items="itemArr">
            <template v-slot:default="scope">
              {{scope.index}}: {{scope}}
            </template>
          </my-slot>
        </el-tab-pane>
        <el-tab-pane label="饿了么文件上传" name="third">
          <eleUpload></eleUpload>
        </el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
// import aa from './aa.tsv';
import mySlot from './my-slot.vue';
import eleUpload from './elementui_upload.vue';

export default {
  data() {
    return {
      itemArr: [{
        name: 'tom',
        age: 10,
      },
      {
        name: 'tom2',
        age: 11,
      },
      {
        name: 'tom3',
        age: 12,
      },
      ],
      siId: '',
      msg: '父页面',
      oldRelStr: '',
      ledCount: 65535,
      activeName: 'first',
      form: {
        DiArr: [],
        DoArr: [],
      },
    };
  },
  components: {
    mySlot,
    eleUpload,
  },
  mounted() {
    // 初始化Do 5位
    const doNameArr = ['蜂鸣', '红灯', '黄灯', '绿灯', '抱闸'];
    for (let i = 0; i < doNameArr.length; i += 1) {
      this.form.DoArr.push({
        name: doNameArr[i],
        value: 1,
      });
    }

    this.siId = window.setInterval(() => {
      // 16个Di分别代表
      const nameArr = [
        {
          name: '急停信号',
          level: 3,
        },
        {
          name: '复位信号',
          level: 1,
        },
        {
          name: '小车锁定信号',
          level: 1,
        },
        {
          name: '小车解锁信号',
          level: 1,
        },
        {
          name: '左电机原位信号',
          level: 1,
        },
        {
          name: '左电机到位信号',
          level: 1,
        },
        {
          name: '右电机原位信号',
          level: 1,
        },
        {
          name: '右电机到位信号',
          level: 1,
        },
        {
          name: '左侧上门开关信号',
          level: 2,
        },
        {
          name: '左侧下门开关信号',
          level: 2,
        },
        {
          name: '电柜上门开关信号',
          level: 2,
        },
        {
          name: '电柜下门开关信号',
          level: 2,
        },
        {
          name: '右侧上门开关信号',
          level: 2,
        },
        {
          name: '右侧下门开关信号',
          level: 2,
        },
        {
          name: '小车到位开关信号',
          level: 1,
        },
        {
          name: '空',
          level: 1,
        },
      ];
      const rel = this.num2Binary(this.ledCount, 16);
      const relStr = rel.toString();
      if (this.oldRelStr === relStr) {
        return;
      }
      const one = [
        '急停信号',
        '复位信号', '小车锁定信号', '小车解锁信号',
        '左电机原位信号', '左电机到位信号', '右电机原位信号', '右电机到位信号',
        '左侧上门开关信号', '左侧下门开关信号', '电柜上门开关信号',
        '电柜下门开关信号', '右侧上门开关信号', '右侧下门开关信号',
        '小车到位开关信号', '空',
      ];

      console.log('有改变arr', rel);
      const newArr = [];
      // 如果有改变，要找出所有改变的，然后根据优先级只取一个生效
      if (this.oldRelStr) {
        const changeArr = [];
        const oldArr = this.oldRelStr.split(',');
        for (let i = 0; i < rel.length; i += 1) {
          if (nameArr[i].level > 1 && !rel[i]) {
            const newObj = { ...nameArr[i] };
            newObj.index = i;
            newObj.value = rel[i];
            changeArr.push(newObj);
            break;
          }
          if ((rel[i] !== (oldArr[i] - 0))) {
            const newObj = { ...nameArr[i] };
            newObj.index = i;
            newObj.value = rel[i];
            changeArr.push(newObj);
          }
        }
        console.log('changeArr', changeArr);
        // 触发灯函数
        if (changeArr.length > 0) {
          this.rightFun(changeArr[0], rel);
        }
      }
      for (let i = 0; i < rel.length; i += 1) {
        nameArr[i].value = rel[i];
        newArr.push(nameArr[i]);
      }
      this.oldRelStr = relStr;
      this.form.DiArr = newArr;
    }, 2000);
  },
  methods: {
    closeAllRight() {
      for (let i = 0; i < this.form.DoArr.length; i += 1) {
        if (!this.form.DoArr[i].value) {
          this.form.DoArr[i].value = 1;
        }
      }
      console.log('关所有灯--');
    },
    closeAllFlashRight() {
      console.log('关所有闪灯--');
    },
    switchRight(index, value) {
      console.log('object2', index, value);
      this.form.DoArr[index].value = value;
    },
    rightFun(item, rel) {
      // 红黄绿 123 0/1开关
      // 0 蜂鸣
      console.log('item', item);
      const { index, value, level } = item;
      if (!value) {
        // 亮灯之前，关掉所有灯，和关掉闪灯
        this.closeAllRight();
        this.closeAllFlashRight();
      }
      if (index === 0) {
        if (!value) {
          // 开蜂鸣
          this.switchRight(0, 0);
          // 0.5s后关蜂鸣
          setTimeout(() => {
            this.switchRight(0, 1);
          }, 500);
        }
        this.switchRight(1, value);
      } else if (level > 1) {
        // 开门了
        this.switchRight(1, value);
      } else if (index === 2) {
        // 锁定
        if (value) {
          this.switchRight(3, value);
          // 小车没锁定，但小车到位了
          if (!rel[14]) {
            // 小车到位 亮黄灯
            this.switchRight(2, rel[14]);
          }
        } else if (!value && !rel[14]) {
          // 小车锁定时，判断小车是否到位
          this.switchRight(3, value);
        }
      } else if (index === 14) {
        // 小车到位 亮黄灯
        this.switchRight(2, value);
      }
    },
    switchLed(item, index) {
      console.log(item, index);
      const base = 2;
      if (!item) {
        this.ledCount += base ** index;
      } else {
        this.ledCount -= base ** index;
      }
    },
    handleClick(tab, event) {
      // console.log(tab, event);
      console.log('切换--');
    },
    num2Binary(number, numLen) {
      let num = number;
      let rel = [];
      for (let i = 0; i < numLen; i += 1) {
        rel.push(0);
      }
      if (num > 0) {
        let loopNum = -1;
        for (let i = 0; loopNum < 0; i += 1) {
          if (num < Math.pow(2, i)) {
            loopNum = i - 1;
            break;
          }
        }

        // 从大取到小
        for (let i = loopNum; i > -1; i -= 1) {
          const nowOne = Math.pow(2, i);
          // console.log('i',i,nowOne)
          const lastIndex = rel.length - (i + 1);
          if (num < nowOne) {
            rel.splice(lastIndex, 1, 0);
          } else {
            num -= nowOne;
            rel.splice(lastIndex, 1, 1);
          }
        }
      }
      rel = rel.reverse();
      return JSON.parse(JSON.stringify(rel));
    },
  },
};
</script>

<style scoped>
  /deep/ .el-form-item__label{
    background-color: #eee;
  }
  /deep/ .el-form-item__content{
    padding-left: 5px;
    line-height: normal;
  }
  .rowUl li{float: left;text-align: center; margin-right: 5px;}
  .rowUl li .circle_6{
    width: 20px;
    height: 20px;
    line-height: 20px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 50%;
  }
  .rowUl li .on{background-color: #80b135;}
  .rowUl li .red{background-color:red;}
  .rowUl li .yellow{background-color: rgb(241, 239, 70);}
</style>
