<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2021-04-19 11:30:56
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-05-08 23:13:06
-->
<template>
  <div>
    <p class="pageTitle" style="margin-bottom: 10px">权限管理模块</p>
    
    <p class="textL" style="margin-bottom: 10px;padding: 0 20px;">
      角色列表：<el-button @click="addRole" size="mini" type="primary"
        >增加角色</el-button
      >
    </p>

  <div style="margin:20px;">
      <el-table :data="allRole" border size="mini">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="name" label="角色名" width="200"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="editRow(scope.row)"
              >编辑</el-button
            >
            <el-button type="danger" size="mini" @click="delRow(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
  </div>


    <el-dialog
      :title="isAdd ? '新增角色' : '修改角色'"
      class="myDialog blueHead textL"
      :visible.sync="showRight"
      :close-on-click-modal="false"
      width="1200px"
    >
      <div style="padding: 0 15px; margin-top: 5px">
        <p v-if="isAdd" style="background-color: #eee; padding: 5px">
          角色名称：
          <el-input
            style="width: 250px"
            size="mini"
            @blur="blurFun(currentRole.name)"
            v-model="currentRole.name"
          ></el-input>
        </p>
        <p v-else>当前角色：{{ currentRole.name }}</p>
        <div style="max-height: 560px; overflow: auto; margin-top: 5px">
          <rightBox
            ref="rightBoxRef"
            :allRight="currentRole.allRight"
            @topClick="topClick"
            @sonTitleClick="sonTitleClick"
          >
          </rightBox>
        </div>
        <p style="text-align: right; margin-bottom: 15px; margin-top: 10px">
          <el-button @click="showRight = false" size="mini">取 消</el-button>
          <el-button
            v-if="isAdd"
            size="mini"
            type="primary"
            @click="saveRole(currentRole)"
            >确 定</el-button
          >
          <el-button
            v-else
            size="mini"
            type="primary"
            @click="updateRole(currentRole)"
            >修 改</el-button
          >
        </p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import rightBox from "./rightBox";
import contentBox from "./content-box";
import listBox from "./list-box";
export default {
  components: {
    rightBox,
    listBox,
    contentBox,
  },
  data() {
    return {
      isAdd: true,
      showRight: false,
      baseRole: {
        name: "经理",
        allRight: [
          {
            name: "用户权限管理",
            check: true,
            children: [
              {
                name: "用户管理",
                check: true,
                children: [
                  {
                    name: "增",
                    action: "add",
                    check: true
                  },
                  {
                    name: "删",
                    action: "delete",
                    check: true
                  },
                  {
                    name: "查",
                    action: "read",
                    check: true
                  },
                  {
                    name: "改",
                    action: "update",
                    check: true
                  },
                ],
              },
              {
                name: "角色管理",
                check: true,
                children: [
                  {
                    name: "增",
                    action: "add",
                    check: true
                  },
                  {
                    name: "删",
                    action: "delete",
                    check: true
                  },
                ],
              },
            ],
          },
          {
            name: "库存管理",
            check: true,
            children: [
              {
                name: "入库管理",
                check: true,
                children: [
                  {
                    name: "增",
                    action: "add",
                    check: true
                  },
                  {
                    name: "删",
                    action: "delete",
                    check: true
                  },
                ],
              },
              {
                name: "出库管理",
                check: true,
                children: [
                  {
                    name: "增",
                    action: "add",
                    check: true
                  },
                  {
                    name: "删",
                    action: "delete",
                    check: true
                  },
                ],
              },
              {
                name: "盘点管理",
                check: true,
                children: [
                  {
                    name: "增",
                    action: "add",
                    check: true
                  },
                  {
                    name: "删",
                    action: "delete",
                    check: true
                  },
                ],
              },
            ],
          },
          {
            name: "分类管理",
            check: true,
            children: [
              {
                name: "物料管理",
                check: true,
                children: [
                  {
                    name: "增",
                    action: "add",
                    check: true
                  },
                  {
                    name: "删",
                    action: "delete",
                    check: true
                  },
                ],
              },
              {
                name: "分类管理",
                check: true,
                children: [
                  {
                    name: "增",
                    action: "add",
                    check: true
                  },
                  {
                    name: "删",
                    action: "delete",
                    check: true
                  },
                ],
              },
            ],
          },
          {
            name: "其他管理",
            check: true,
            children: [
              {
                name: "其他管理1",
                check: true,
                children: [
                  {
                    name: "增",
                    action: "add",
                    check: true
                  },
                  {
                    name: "删",
                    action: "delete",
                    check: true
                  },
                ],
              },
              {
                name: "其他管理2",
                check: true,
                children: [
                  {
                    name: "增",
                    action: "add",
                    check: true
                  },
                  {
                    name: "删",
                    action: "delete",
                    check: true
                  },
                ],
              },
            ],
          },
        ],
      },
      currentRole: {
        name: "",
        allRight: [],
      },
      allRole: [],
    };
  },
  created() {},
  methods: {
    // 情况1：操作最顶级时，以下所有级都受影响（父亲选中，儿子都选中）
    topClick(name, status) {
      let theRight = this.currentRole.allRight
      console.error("rb-title:", name, status, theRight);  
      for (let i = 0; i < theRight.length; i++) {
        if (theRight[i].name == name) {
          if (!theRight[i].hasOwnProperty("check")) {
            this.$set(theRight[i], "check", status);
          } else {
            theRight[i].check = status;
          }
          if (theRight[i].children) {
            this.loopCheck(theRight[i].children, status);
          } else if (theRight[i].data) {
            this.loopCheck(theRight[i].data, status);
          }
        }
      }
      // console.error('最后结果：',theRight);
    },
    loopCheck(arr, status) {
      for (let i = 0; i < arr.length; i++) {
        if (!arr[i].hasOwnProperty("check")) {
          this.$set(arr[i], "check", status);
        } else {
          arr[i].check = status;
        }

        if (arr[i].children) {
          this.loopCheck(arr[i].children, status);
        } else if (arr[i].data) {
          this.loopCheck(arr[i].data, status);
        }
      }
    },
    // 情况2：不是操作最顶级时，区别对待（规则：有一个儿子选中，父亲就选中；所有儿子都不选中，父亲才不选中）
    sonTitleClick() {
      let rootArr = arguments[0].split("_");
      let status = arguments[1];
      console.error("rb-sonTitleClick:", rootArr, status);
      let allFa = [];
      let arr = this.currentRole.allRight;
      let one = rootArr.shift();
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].name == one) {
          if (!status) {
            // 情况2-1：取消时 false
            if (rootArr.length) {
              // 取消勾选--收集父级（因为考虑到可能父级会受到其他子类影响，因此先将父级收集起来）
              allFa.push(arr[i]);
              this.loopFindSon(arr[i].children, rootArr,status, allFa);
            }
          } else {
            // 情况2-2：选中时 true（因为如果有一个儿子选中，父亲就选中，那么可以直接勾选父亲了。）
            if (!arr[i].hasOwnProperty("check")) {
              this.$set(arr[i], "check", status);
            } else {
              arr[i].check = status;
            }
            // console.error('arr[i].check:',arr[i].name, status);
            if (rootArr.length) {
              // 如果还没找到最底层，继续循环找下去
              this.loopFindSon(arr[i].children, rootArr,status);
            }else{
              if(!arr[i].children){
                return
              }
              // 如果找到了操作的那一层，如果该层下面还有儿子，就将儿子都选中
              for(let j=0;j<arr[i].children.length;j++){
                let sonOne = arr[i].children[j];
                if (!sonOne.hasOwnProperty("check")) {
                  this.$set(sonOne, "check", status);
                } else {
                  sonOne.check = status;
                }
              }
            }
          }
        }
      }
      // JSON.stringify(allFa)
      let realFa = JSON.parse(JSON.stringify(allFa))
      // console.error('realFa',realFa);
      if (!status && allFa.length) {
        let needFa = allFa.pop();
        
        let hasTrue = false;
        for (let i = 0; i < needFa.children.length; i++) {
          if (needFa.children[i].check) {
            hasTrue = true;
            break;
          }
        }
        if (!needFa.hasOwnProperty("check")) {
          this.$set(needFa, "check", hasTrue);
        } else {
          needFa.check = hasTrue;
        }
        if (allFa.length) {
          this.loopCheckFa(allFa);
        }
      }

      // console.error('最后结果：',theRight);
    },
    loopCheckFa(allFa) {
      let needFa = allFa.pop();
      let hasTrue = false;
      for (let i = 0; i < needFa.children.length; i++) {
        if (needFa.children[i].check) {
          hasTrue = true;
          break;
        }
      }
      if (!needFa.hasOwnProperty("check")) {
        this.$set(needFa, "check", hasTrue);
      } else {
        needFa.check = hasTrue;
      }
      if (allFa.length) {
        this.loopCheckFa(allFa);
      }
    },
    loopFindSon(arr, rootArr, status, allFa) {
      let one = rootArr.shift();
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].name == one) {
          if (!status) {
            
            if (rootArr.length) {
              // 收集父级
              allFa.push(arr[i]);
              this.loopFindSon(arr[i].children, rootArr,status, allFa);
            }else{
              // 如果已经找到操作的那一层了。因为父亲不选中，就把该层下面的儿子都不选中
              if(arr[i].children){
                for(let j=0;j<arr[i].children.length;j++){
                  let ason = arr[i].children[j]
                  if (!ason.hasOwnProperty("check")) {
                    this.$set(ason, "check", status);
                  } else {
                    ason.check = status;
                  }
                }
              }
              
            }
          } else {
            if (!arr[i].hasOwnProperty("check")) {
              this.$set(arr[i], "check", status);
            } else {
              arr[i].check = status;
            }
            // console.error('arr[i].check:',arr[i].name, status);
            if (rootArr.length) {
              this.loopFindSon(arr[i].children, rootArr,status);
            }else{
              if(!arr[i].children){
                return
              }
              // 如果已经找到操作的那一层了。因为父亲选中，就把该层下面的儿子都选中
              for(let j=0;j<arr[i].children.length;j++){
                let sonOne = arr[i].children[j];
                if (!sonOne.hasOwnProperty("check")) {
                  this.$set(sonOne, "check", status);
                } else {
                  sonOne.check = status;
                }
              }
            }
          }
        }
      }
    },
    editRow(row) {
      this.currentRole = JSON.parse(JSON.stringify(row));
      this.showRight = true;
      this.isAdd = false;
    },
    pageSelectFun(a, b) {
      console.log("pageSelectFun", a, b);
    },
    checkSameName(name){
      let hasOne = false;
      for(let i=0;i<this.allRole.length;i++){
        if(this.allRole[i].name==name){
          hasOne = true;
          break;
        }
      }
      return hasOne;
    },
    blurFun(name) {
      console.log("blurFun，这里可以检查是否有重复命名");
      let hasOne = this.checkSameName(name)
      if(hasOne){
        this.$message({
          message: '该角色名已被占用！',
          type:'warning'
        })
      }
    },
    saveRole(row) {
      if (!row.name) {
        this.$message({
          message: "请填写角色名！",
          type: "warning",
        });
        return;
      }
      let hasOne = this.checkSameName(row.name)
      if(hasOne){
        this.$message({
          message: '该角色名已被占用！',
          type:'warning'
        })
        return;
      }
      this.allRole.push(JSON.parse(JSON.stringify(row)));
      this.showRight = false;
    },
    updateRole(row) {
      console.log("updateRole");
      for (let i = 0; i < this.allRole.length; i++) {
        if (this.allRole[i].name == row.name) {
          // 此处要深拷贝一下，否则会污染
          this.allRole[i].allRight = JSON.parse(JSON.stringify(this.currentRole.allRight));
          break;
        }
      }
      this.showRight = false;
    },
    addRole() {
      this.currentRole = JSON.parse(JSON.stringify(this.baseRole));
      this.showRight = true;
      this.isAdd = true;
    },
    async delRow(row){
      let rel = await this.answerFun();
      if(!rel){
        // 点击了取消
        return
      }
      for (let i = 0; i < this.allRole.length; i++) {
        if (this.allRole[i].name == row.name) {
          this.allRole.splice(i,1)
          break;
        }
      }
    }
  },
};
</script>


<style scoped>
.pageTitle {
  font-size: 18px;
  background: #91ccb1;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
}
</style>