<!--
 * @Descripttion:aa
 * @Author: yizheng.yuan
 * @Date: 2021-06-11 09:11:39
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-10-06 13:05:07
-->
<template>
  <div style="padding: 50px;">
    <div style="width:500px; height:500px; border:1px solid red;">
      <p>视频上传：</p>
      <videoUpload></videoUpload>
    </div>
    <div style="width:500px; height:500px; border:1px solid red;">
      <!-- <baidu-map style="width:300px; height:300px;"></baidu-map> -->
      <div id="container" style="width:500px; height:500px; border:1px solid red;"></div>
    </div>
    <input type="file" id="people-export" ref="inputer" @change="fileUpload" />

   <div style="margin: 50px auto; border: 1px solid red">
      <!-- 3.向子组件 传参 -->
      <Child2 :fromParentMsg="parementMsg"></Child2>
      <button @click="parent_child_fun">调用子组件的方法</button>
    </div>
  <!-- 原文链接：https://blog.csdn.net/qq_31173561/article/details/89498942 -->

    <div style="margin: 50px auto; border: 1px solid red">
      <p style="font-size: 26px; text-align: center; padding: 30px">
        实现Element-ui表格点击可以编辑
      </p>
      <p style="font-size: 20px">方式1：</p>
      <el-table :data="tableData" style="width: 100%" @cell-click="cellClick">
        <el-table-column label="Date" prop="date"> </el-table-column>
        <el-table-column label="Name" prop="name"> </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"
            />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >Delete
              </el-button>
          </template>
        </el-table-column>
      </el-table>

      <p style="font-size: 20px; margin-top: 50px">方式2：更佳</p>
      <el-table :data="tableData2" style="width: 100%">
        <el-table-column label="Date" prop="date">
          <template slot-scope="scope">
            <span @click="oneCellClick(scope)">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Name" prop="name">
          <template slot-scope="scope">
            <span @click="oneCellClick(scope)">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div style="margin: 50px auto; border: 1px solid red; text-align:left;">
      <p>tree组件</p>
      <myTree :treeData="treeData" style="width: 300px;  border: 1px solid red;"></myTree>
    </div>

    <div style="margin: 50px auto; border: 1px solid red; text-align:left;">
      <p>根据选择列：自动变化表格</p>
      <p>
        <el-checkbox-group v-model="selectArr">
        <el-checkbox v-for="(item,index) in allColumn" :key="item+index" :label="item" name="type">

        </el-checkbox>
      </el-checkbox-group>
      </p>
      <el-table :data="tableData3" style="width: 100%">
        <el-table-column v-for="(item,index) in selectArr" :key="item+index" label="Date" prop="date">
          <template slot-scope="scope">
            <span @click="oneCellClick(scope)">{{ scope.row.date }}</span>
          </template>
        </el-table-column>

        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div style="margin: 50px auto; border: 1px solid red; text-align:left;">
      <p>vue注册全局组件</p>
      <one1></one1>
      <one2></one2>
    </div>

    <div style="margin: 50px auto; border: 1px solid red; text-align:left;">
      <p><el-button type="primary" @click="showD=true">打开弹框</el-button></p>
    </div>

    <div style="border: 1px solid red;">
      <el-form ref="form" label-position="left"
        :rules="rules"
        :model="form" :inline="false" label-width="80px">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model.number="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动名称2" prop="region">
          <el-input v-model.number="form.region"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <myDialog
      titleName="标题"
      :showDialog="showD"
      dialogWidth="80%"
      @closeDialog="showD = false"
    >
      <div slot="container">
        <iframe src="http://localhost:7000/html"></iframe>
      </div>
    </myDialog>

  </div>
</template>

<script>

// 视频上传组件
import videoUpload from './videoUpload.vue';
import myTree from './myTree.vue';
import myDialog from './myDialog.vue';
// 1.引入子组件
import Child2 from './child2.vue';

export default {
  data() {
    const checkAge = (rule, value, callback) => {
      console.error('checkAge', value);
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }
      if (!Number.isInteger(value)) {
        return callback(new Error('请输入数字值'));
      } if (value < 18) {
        return callback(new Error('必须年满18岁'));
      }
      return callback();
    };
    return {
      rules: {
        name: [
          { validator: checkAge, trigger: 'blur' },
        ],
        region: [
          { validator: checkAge, trigger: 'blur' },
        ],
      },
      parementMsg: '我是父亲传下来的',
      form: {
        name: '',
        region: '',
      },
      showD: false,
      default_column: ['id', 'name', 'date', 'address'],
      selectArr: [],
      allColumn: [],
      treeData: [{
        id: 1,
        label: '一级 1一级 1一级 1一级 1一级 1一级 1一级 1一级',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1',
            children: [{
              id: 19,
              label: '三级 1-1-1',
            }, {
              id: 110,
              label: '三级 1-1-2',
            }],
          }, {
            id: 10,
            label: '三级 1-1-2',
          }],
        }],
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 24,
          label: '二级 2-1',
          children: [{
            id: 29,
            label: '三级 2-1-1',
          }, {
            id: 20,
            label: '三级 2-1-2',
          }],
        }],
      },
      ],
      imageUrl: '',
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
      ],
      tableData2: [
        {
          id: '1',
          date: '2016-05-02',
          name: '王小虎2',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          id: '2',
          date: '2016-05-04',
          name: '王小虎2',
          address: '上海市普陀区金沙江路 1517 弄',
        },
      ],
      tableData3: [
      ],
      search: '',
    };
  },
  components: {
    videoUpload,
    myTree,
    myDialog,
    Child2,
  },
  mounted() {
    this.init_column_data();
    console.error('每次加载--', Date.now());
    setTimeout(() => {
      this.MP('NmfCIrNZD29GgyaKXBR5awpIm15XVAGP').then((BMap) => {
        console.error('回调', BMap);
        const map = new BMap.Map('container');
        console.log('map', map);
        map.centerAndZoom(new BMap.Point(113.448888, 23.175698), 12); // 初始化地图,设置中心点坐标和地图级别
        map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放

        // 创建点标记
        const marker1 = new BMap.Marker(new BMap.Point(113.448888, 23.175698));
        // 在地图上添加点标记
        map.addOverlay(marker1);
        // map.setHeading(64.5);
        // map.setTilt(73);

        // 添加控件
        const top_left_control = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_TOP_LEFT });// 左上角，添加比例尺
        const top_left_navigation = new BMap.NavigationControl(); // 左上角，添加默认缩放平移控件
        const top_right_navigation = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_ZOOM }); // 右上角，仅包含平移和缩放按钮
        /* 缩放控件type有四种类型:
        BMAP_NAVIGATION_CONTROL_SMALL：仅包含平移和缩放按钮；BMAP_NAVIGATION_CONTROL_PAN:仅包含平移按钮；BMAP_NAVIGATION_CONTROL_ZOOM：仅包含缩放按钮 */

        // 添加控件和比例尺
        map.addControl(top_left_control);
        // map.addControl(top_left_navigation);
        map.addControl(top_right_navigation);
      });
    });
  },
  methods: {
    MP(ak) {
      return new Promise(((resolve, reject) => {
        if (!window.BMap) {
          const script = document.createElement('script');
          script.type = 'text/javascript';
          const url1 = `http://api.map.baidu.com/api?&v=1.0&ak=${ak}&callback=init`;
          script.src = url1;
          script.onerror = reject;
          document.head.appendChild(script);
          console.error('window.BMap', window.BMap);
          setTimeout(() => {
            resolve(window.BMap);
          }, 1000);
        }
      }));
    },
    parent_child_fun() {
      this.$children[0].child_fun();
    },
    init_column_data() {
      // 根据数据库的数据，拿第一行的key值组成列选项
      this.allColumn = [];
      if (this.tableData3[0]) {
        const one = this.tableData3[0];
        // for (const key in one) {
        //   this.allColumn.push(key);
        // }
        this.allColumn = Object.keys(one);
      }
      if (this.allColumn.length === 0) {
        this.allColumn = JSON.parse(JSON.stringify(this.default_column));
      }
      this.selectArr = this.copyObj(this.allColumn);
    },
    cellClick(row, column, cell, event) {
      // 原文连接 http://www.voidcn.com/article/p-vshxvfex-brn.html
      console.error('object:', row, column, cell, event);
      // 先清空cell的值
      cell.innerHTML = '';
      // event.target.innerHTML = '';

      const ipt = document.createElement('input');

      ipt.value = row[column.property];
      // cell.append(ipt)
      console.error(column.property);
      ipt.type = 'text';
      // ipt.value = "这是测试加载的小例子";

      ipt.onclick = (e) => {
        console.error('输入框被点击了', e);
        e.stopPropagation();
        e.preventDefault();
        return false;
      };

      // 在绑定光标离开事件
      ipt.onblur = (e) => {
        console.error('失去光标valu:', e, column.property, e.target.value);
        // row[column.property] = e.target.value;
        this.$set(row, column.property, e.target.value);
        cell.removeChild(ipt);
        const one = document.createElement('div');
        one.className = ['cell'];
        one.innerHTML = e.target.value;
        cell.appendChild(one);
        // this.$forceUpdate();
        console.error('row', this.tableData);
      };

      cell.appendChild(ipt);
      ipt.focus();
    },
    oneCellClick(scope) {
      console.error('单元格被点击：', event, event.target.parentNode, scope);
      // this.tableData2[0].date='asdfasdf'
      const cell = event.target;
      const cellFa = event.target.parentNode;
      console.error('cell', cell);
      const { row } = scope;
      const { column } = scope;

      // cell.innerHTML = "";
      cell.style.display = 'none';

      const ipt = document.createElement('input');

      ipt.value = row[column.property];
      // cell.append(ipt)
      console.error(column.property);
      ipt.type = 'text';
      // ipt.value = "这是测试加载的小例子";

      ipt.onclick = (e) => {
        console.error('输入框被点击了', e);
        e.stopPropagation();
        e.preventDefault();
        return false;
      };

      // 在绑定光标离开事件
      ipt.onblur = (e) => {
        console.error('失去光标valu:', e, column.property, e.target.value);
        row[column.property] = e.target.value;
        cellFa.removeChild(ipt);
        cell.style.display = 'block';
        console.error('row', this.tableData2);
      };

      cellFa.appendChild(ipt);
      ipt.focus();
    },
    fileUpload(event) {
      // 上传文件
      const file = event.target.files;
      console.log(event, file);

      const formData = new FormData();
      formData.append('name', 'settingPic');
      formData.append('file', file[0]);
      console.log(formData);
      // 文件上传
      this.$axios({
        method: 'POST',
        url: '/api/fileUpload',
        data: formData,
      })
        .then((res) => {
          const { data } = res;
          if (data.success) {
            console.log(data);
          } else {
            this.$message.error(data.message || '操作失败');
          }
          this.uploadLoading = false;
        })
        .catch((e) => {
          this.uploadLoading = false;
          console.error('error:', e);
        });
    },
    // 原文链接：https://blog.csdn.net/hjhfreshman/article/details/90676072
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
/* The container of BaiduMap must be set width & height. */
.map {
  width: 400px;
  height: 300px;
}
</style>
