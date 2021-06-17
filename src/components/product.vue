<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2021-05-25 12:01:07
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-06-16 16:34:07
-->
<template>
  <div class="flexBox-c pd10">
    <p class="top-title">
      <el-button size="mini" type="success" @click="addFun" class="fr">{{
        $t("common.add")
      }}</el-button>
      {{ $t("common.productManager") }}
    </p>
    <div class="grap-box flex1">
      <el-table
        :data="
          tableData.filter(
            (data) =>
              !search || data.name.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width: 100%"
      >
        <el-table-column
          :label="$t('product.typeNumber')"
          prop="typeNumber"
          width="140px"
        >
        </el-table-column>
        <el-table-column
          :label="$t('product.testProject')"
          prop="testProject"
        ></el-table-column>
        <el-table-column
          :label="$t('product.matterNumber')"
          prop="matterNumber"
        ></el-table-column>
        <el-table-column :label="$t('product.testSOP')" prop="testSOP">
          <template v-slot="scope">
            <span class="hand myBlue" @click="lookTestSOP(scope.row)">{{$t('common.see')}}</span>
          </template>
        </el-table-column>

        <el-table-column
          :label="$t('product.fixPath')"
          prop="fixPath"
        ></el-table-column>
        <el-table-column
          :label="$t('product.testAsset')"
          prop="testAsset"
        >
          <template v-slot="scope">
            <span class="hand myBlue" @click="lookTestAsset(scope.row)">{{$t('common.see')}}</span>
            <span class="hand myBlue mg-l10" @click="exportTestAsset(scope.row)">{{$t('common.export')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('product.technologicalProcess')"
          prop="technologicalProcess">
          <template v-slot="scope">
            <span class="hand myBlue" @click="lookTechProcess(scope.row)">{{$t('common.see')}}</span>
          </template>
          </el-table-column>
        <el-table-column
          :label="$t('product.technologicalProcessFile')"
          prop="technologicalProcessFile"
        ></el-table-column>
        <el-table-column
          :label="$t('product.assembleSOP')"
          prop="assembleSOP">
        <template v-slot="scope">
            <span class="hand myBlue" @click="lookAssembleSOP(scope.row)">{{$t('common.see')}}</span>
          </template>
        </el-table-column>

        <el-table-column width="160px" :label="$t('common.operate')">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              >{{ $t("common.edit") }}</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >{{ $t("common.delete") }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      class="mydialog"
      :title="isAdd ? $t('common.add') : $t('common.edit')"
      :top="dialog_topStr"
      :visible.sync="showAdd"
      :close-on-click-modal="false"
      width="40%">
      <div
        class="grap-box"
        style="overflow: auto"
        :style="{ maxHeight: dialog_maxH + 'px' }"
      >
        <el-form
          ref="formName"
          :rules="rules"
          :model="form"
          label-width="120px"
          size="mini"
        >
          <el-form-item :label="$t('product.typeNumber')" prop="typeNumber">
            <el-input size="small" v-model="form.typeNumber"></el-input>
          </el-form-item>
          <el-form-item :label="$t('product.matterNumber')" prop="matterNumber">
            <el-input size="small" v-model="form.matterNumber"></el-input>
          </el-form-item>
          <el-form-item :label="$t('product.testProject')" prop="testProject">
            <el-input placeholder="请选择路径" v-model="form.testProject">
              <el-button slot="append" icon="el-icon-folder-opened" @click="openFolder('testProject')"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('product.testSOP')" prop="testSOP">
            <el-input placeholder="请选择路径" v-model="form.testSOP">
              <el-button slot="append" icon="el-icon-folder-opened" @click="openFolder('testSOP')"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('product.fixPath')" prop="fixPath">
            <el-input placeholder="请选择路径" v-model="form.fixPath">
              <el-button slot="append" icon="el-icon-folder-opened" @click="openFolder('fixPath')"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('product.testAsset')" prop="testAsset">
            <el-input placeholder="请选择路径" v-model="form.testAsset">
              <el-button slot="append" icon="el-icon-folder-opened" @click="openFolder('testAsset')"></el-button>
            </el-input>
          </el-form-item>
          
          <el-form-item
            :label="$t('product.technologicalProcessFile')"
            prop="technologicalProcessFile"
          >
            <el-input placeholder="请选择路径" v-model="form.technologicalProcessFile">
              <el-button slot="append" icon="el-icon-folder-opened" @click="openFolder('technologicalProcessFile')"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('product.assembleSOP')" prop="assembleSOP">
            <el-input placeholder="请选择路径" v-model="form.assembleSOP">
              <el-button slot="append" icon="el-icon-folder-opened" @click="openFolder('assembleSOP')"></el-button>
            </el-input>
          </el-form-item>
          <p class="text-l mg-b10">
            <el-button size="mini" class="fr" type="success" @click="addTechProcess">{{$t('common.add')}}</el-button>
            {{$t('product.technologicalProcess')}}:</p>
          <div>
            <el-table :data="form.technologicalProcess" style="width: 100%" size="mini">
              <el-table-column
                :label="$t('product.procedure')"
                prop="procedure"
              ></el-table-column>
              <el-table-column
                :label="$t('product.standardTime')"
                prop="standardTime"
              ></el-table-column>
              <el-table-column
                :label="$t('common.operate')"
              >
                <template slot-scope="scope">
                  <el-button type="text" size="mini" @click="editTechProcess(scope.row)">{{$t('common.edit')}}</el-button>
                  <el-button type="text" class="myRed" size="mini" @click="deleteTechProcess(scope.row)">{{$t('common.delete')}}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="showAdd = false">{{
          $t("common.cancel")
        }}</el-button>
        <el-button size="mini" type="primary" @click="sureFun('formName')">{{
          $t("common.ok")
        }}</el-button>
      </span>
    </el-dialog>

    <el-dialog
      class="mydialog"
      :title="isAddTech ? $t('common.add') : $t('common.edit')"
      :top="dialog_topStr"
      :visible.sync="showAddTech"
      :close-on-click-modal="false"
      width="40%">
      <div
        class="grap-box"
        style="overflow: auto"
        :style="{ maxHeight: dialog_maxH + 'px' }"
      >
        <el-form
          ref="formName"
          :rules="rules"
          :model="techForm"
          label-width="120px"
          size="mini"
        >
          <el-form-item :label="$t('product.procedure')" prop="procedure">
            <el-input size="small" v-model="techForm.procedure"></el-input>
          </el-form-item>
          <el-form-item :label="$t('product.standardTime')" prop="standardTime">
            <el-input size="small" v-model="techForm.standardTime"></el-input>
          </el-form-item>
          
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="showAddTech = false">{{
          $t("common.cancel")
        }}</el-button>
        <el-button size="mini" type="primary" @click="isAddTech ? sureAddTechProcess('formName') : sureUpdateTechProcess('formName')">{{
          $t("common.ok")
        }}</el-button>
      </span>
    </el-dialog>

      <form id="fileForm" style="height: 0">
        <input
          class="el-upload__input"
          type="file"
          id="fileFormInput"
          @change="fileSelectChange"
          nwdirectory
        />
      </form>

    <!-- <pdfVue :url="filePath" :showDialog="showFile" @closeBox="showFile=false"></pdfVue> -->

    <myDialog 
      :titleName="theTitle"
      :showDialog="showFile" 
      :dialogWidth="dialogWidth"
      @closeDialog="showFile=false">
      <myPdf slot="container" :url="filePath"></myPdf>
    </myDialog>

  </div>
</template>

<script>
import { mapState } from "vuex";

import myDialog from './myDialog.vue';

import myPdf from './myPDF.vue';


export default {
  components:{
    myDialog,
    myPdf
  },
  data() {
    return {
      dialogWidth: '90%',
      theTitle: '',
      showFile: false,
      filePath: '',
      baseTechForm:{
        id: '',
        procedure:'',
        standardTime: ''
      },
      techForm:{
      },
      isAddTech: true,
      showAddTech: false,
      dataArr: [
        {
          name: "one",
          class: "class1",
        },
        {
          name: "two",
          class: "class2",
        },
        {
          name: "three",
          class: "class2",
        },
      ],
      form: {
        id: "",
        name: "",
        typeNumber: "",
        expire: "",
      },
      baseForm: {
        typeNumber: "1",
        testProject: "2",
        matterNumber: "3",
        testSOP: '4',
        fixPath: "5",
        testAsset: '6',
        technologicalProcess:[],
        technologicalProcessFile: "PLM路径",
        assembleSOP: '7'
      },
      showAdd: false,
      isAdd: true,
      search: "",
      tableData: [],
      search: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "明天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周后",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.funA();
  },
  computed: {
    ...mapState(["dialog_maxH", "dialog_topStr"]),
    rules() {
      return {
        id: [
          {
            required: true,
            message: Languages.t("common.notNull"),
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: Languages.t("common.notNull"),
            trigger: "blur",
          },
        ],
        typeNumber: [
          {
            required: true,
            message: Languages.t("common.notNull"),
            trigger: "blur",
          },
        ],
        expire: [
          {
            required: true,
            message: Languages.t("common.notNull"),
            trigger: "blur",
          },
        ],
      };
    },
  },
  methods: {
    lookTechProcess(row){
      console.error('lookTechProcess:',row);
    },
    lookAssembleSOP(row){
      console.error('lookAssembleSOP:',row);
    },
    exportTestAsset(row){
      console.error('exportTestAsset:',row);
    },
    lookTestAsset(row){
      console.error('lookTestAsset:',row);
    },
    lookTestSOP(row){
      console.error('lookTestSOP:',row);
      this.dialogWidth="80%";
      this.theTitle= Languages.t('common.preview')
      this.showFile= true;
      this.filePath='http://localhost:7000/getpdf'
    },
    addTechProcess(){
      this.isAddTech = true;
      this.showAddTech=true;
      this.baseTechForm.id = Date.now();
      this.techForm=JSON.parse(JSON.stringify(this.baseTechForm))
    },
    sureAddTechProcess(){
      this.showAddTech=false;
      this.form.technologicalProcess.push(JSON.parse(JSON.stringify(this.techForm)));
      console.error('technologicalProcess:',this.form.technologicalProcess);
    },
    editTechProcess(form){
      this.isAddTech = false;
      this.showAddTech=true;
      this.techForm=JSON.parse(JSON.stringify(form))
    },
    sureUpdateTechProcess(){
      this.showAddTech=false;
      let arr = this.form.technologicalProcess;
      let row = JSON.parse(JSON.stringify(this.techForm));
      console.error('更新：',row);
      for(let i=0;i<arr.length;i++){
        if(arr[i].id==row.id){
          console.error('找到',i);
          arr.splice(i,1,row);
          break;
        }
      }
    },
    async deleteTechProcess(row){
      let rel = await this.answerFun(Languages.t('common.sureToDelete'));
      if(!rel){
        return
      }
      let arr = this.form.technologicalProcess;
      for(let i=0;i<arr.length;i++){
        if(arr[i].procedure==row.procedure){
          arr.splice(i,1);
          break;
        }
      }
    },
    openFolder(currentFileName){
      this.currentFileName = currentFileName;
      document.getElementById('fileForm') &&
          document.getElementById('fileForm').reset();
        // 再打开
        document.getElementById('fileFormInput').click();
    },
    async fileSelectChange() {
      const theSelectPath = event.target.value;
      console.log('fileSelectChange:', theSelectPath);
      this.form[this.currentFileName]=theSelectPath;
    },
    formatter(expire) {
      console.log("修改日期-kk:", expire);
      return this.formatDate(expire);
    },
    funA() {
      let nameArr = [];
      let newArr = [];
      let dataArr = [
        {
          name: "one",
          class: "class1",
        },
        {
          name: "two",
          class: "class2",
        },
        {
          name: "three",
          class: "class2",
        },
      ];
      for (let i = 0; i < dataArr.length; i++) {
        if (!nameArr.includes(dataArr[i].class)) {
          nameArr.push(dataArr[i].class);
          // 新建
          newArr.push({
            class: dataArr[i].class,
            children: [dataArr[i]],
          });
        } else {
          let indx = nameArr.indexOf(dataArr[i].class);
          newArr[indx].children.push(dataArr[i]);
        }
      }
      console.log("分组后结果--newArr:", nameArr, newArr);
    },
    addFun() {
      this.showAdd = true;
      this.isAdd = true;
      this.form = JSON.parse(JSON.stringify(this.baseForm));
      this.form.id = Date.now() + "";
    },
    sureFun(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            this.tableData.push(JSON.parse(JSON.stringify(this.form)));
          } else {
            this.sureUpdate(this.form);
          }
          this.showAdd = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    sureUpdate(row) {
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].id == row.id) {
          this.tableData.splice(i, 1, row);
          break;
        }
      }
      this.showAdd = false;
    },
    handleEdit(index, row) {
      this.form = this.copyObj(row);
      this.isAdd = false;
      this.showAdd = true;
    },
    async handleDelete(index, row) {
      console.log(index, row);
      let rel = await this.answerFun();
      if (!rel) {
        return;
      }
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].id == row.id) {
          this.tableData.splice(i, 1);
          break;
        }
      }
    },
  },
};
</script>

<style>
</style>