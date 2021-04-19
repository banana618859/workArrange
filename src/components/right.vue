<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2021-04-19 11:30:56
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-04-19 16:48:30
-->
<template>
  <div>
    <p class="textL pageTitle">权限管理：<el-button @click="addRole" size="mini" type="primary">增加角色</el-button></p>
    <el-dialog
      :title="isAdd? '新增角色': '修改角色'"
      class="myDialog blueHead textL"
      :visible.sync="showRight"
      :close-on-click-modal="false"
      width="1200px">
      <div style="padding: 0 15px; margin-top:5px;">
        <p v-if="isAdd" style="background-color:#eee; padding:5px;">
          角色名称：
          <el-input style="width: 250px;" size="mini" @blur="blurFun(currentRole.name)" v-model="currentRole.name"></el-input>
        </p>
        <p v-else>当前角色：{{currentRole.name}}</p>
        <div style="max-height: 560px; overflow: auto; margin-top:5px;">
          <rightBox 
            :allRight="currentRole.allRight"
            @pageSelect="pageSelectFun"
            >
          </rightBox>
        </div>
        <p style="text-align: right; margin-bottom: 15px; margin-top: 10px;">
          <el-button @click="showRight = false" size="mini">取 消</el-button>
          <el-button v-if="isAdd" size="mini" type="primary" @click="saveRole(currentRole)">确 定</el-button>
          <el-button v-else size="mini" type="primary" @click="updateRole(currentRole)">修 改</el-button>
        </p>
      </div> 
    </el-dialog>

  </div>
</template>

<script>
import rightBox from './rightBox';
import contentBox from './content-box';
import listBox from './list-box'
export default{
  components:{
    rightBox,
    listBox,
    contentBox
  },
  data(){
    return{
      isAdd: true,
      showRight: false,
      currentRole:{
        name:"",
        allRight:[],
      },
      baseRight:[
        {
          name: '用户权限管理',
          check: true,
          children:[
            {
              name: '用户管理',
              check: true,
              data: [
                {
                  name: '增',
                  action: 'add'
                },
                {
                  name: '删',
                  check: true,
                  action: 'delete'
                },
                {
                  name: '查',
                  action: 'read'
                },
                {
                  name: '改',
                  check: true,
                  action: 'update'
                }
              ]
            },
            {
              name: '角色管理',
              data: [
                {
                  name: '增',
                  action: 'add'
                },
                {
                  name: '删',
                  action: 'delete'
                }
              ]
            }
          ]
        },
        {
          name: '库存管理',
          children:[
            {
              name: '入库管理',
              data: [
                {
                  name: '增',
                  action: 'add'
                },
                {
                  name: '删',
                  action: 'delete'
                }
              ]
            },
            {
              name: '出库管理',
              data: [
                {
                  name: '增',
                  action: 'add'
                },
                {
                  name: '删',
                  action: 'delete'
                }
              ]
            },
            {
              name: '盘点管理',
              data: [
                {
                  name: '增',
                  action: 'add'
                },
                {
                  name: '删',
                  action: 'delete'
                }
              ]
            }
          ]
        },
        {
          name: '分类管理',
          children:[
            {
              name: '物料管理',
              data: [
                {
                  name: '增',
                  action: 'add'
                },
                {
                  name: '删',
                  action: 'delete'
                }
              ]
            },
            {
              name: '分类管理',
              data: [
                {
                  name: '增',
                  action: 'add'
                },
                {
                  name: '删',
                  action: 'delete'
                }
              ]
            }
          ]
        },
        {
          name: '其他管理',
          check: true,
          children:[
            {
              name: '其他管理1',
              check: true,
              data: [
                {
                  name: '增',
                  check: true,
                  action: 'add'
                },
                {
                  name: '删',
                  action: 'delete'
                }
              ]
            },
            {
              name: '其他管理2',
              data: [
                {
                  name: '增',
                  action: 'add'
                },
                {
                  name: '删',
                  action: 'delete'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  created(){
    
  },
  methods:{
    pageSelectFun(a,b){
      console.log('pageSelectFun',a,b);
    },
    blurFun(){
      console.log('blurFun');
    },
    saveRole(){
      console.log('saveRole');
    },
    updateRole(){
      console.log('updateRole');
    },
    addRole(){
      console.log('addRole');
      this.showRight=true;
      this.isAdd=true;
      this.currentRole.allRight = JSON.parse(JSON.stringify(this.baseRight))
    }
  }
}
</script>


<style scoped>
.pageTitle{
  background: #91ccb1;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
}

</style>