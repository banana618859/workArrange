<!--
 * @Descripttion:
 * @Author: yizheng.yuan
 * @Date: 2021-05-25 12:01:07
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-06-18 18:06:15
-->
<template>
  <div class="flexBox-c pd10">
    <p class="top-title">
      <el-button size="mini" type="success" @click="addFun" class="fr">{{
        $t("common.add")
      }}</el-button>
      <el-button size="mini" type="primary" @click="exportFun" class="fr mg-r10">{{
        $t("common.export")
      }}</el-button>

      {{ $t("assemble.assembleDataManagement") }}
    </p>
    <div class="grap-box flex1">
      <el-table
        :data="
          tableData.filter(
            (data) =>
              !search || data.productType.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width: 100%"
      >
        <el-table-column :label="$t('assemble.productType')" prop="productType" width="140px">
        </el-table-column>
        <el-table-column
          :label="$t('assemble.assemblePerson')"
          prop="assemblePerson"
        ></el-table-column>
        <el-table-column
          :label="$t('assemble.assembleType')"
          prop="assembleType"
        ></el-table-column>
        <el-table-column
          :label="$t('assemble.assembleModel')"
          prop="assembleModel" :formatter="formatter">
        </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <div class="flexBox-r">
              <span class="mg-r10">{{$t('common.operate')}}</span>
              <el-input
                class="flex1"
                v-model="search"
                size="mini"
                :placeholder="$t('common.pleaseInputKeyword')"
              />
            </div>
          </template>
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
      width="40%"
    >
      <div
        class="grap-box"
        style="overflow: auto"
        :style="{ maxHeight: dialog_maxH + 'px' }"
      >
        <el-form
          ref="formName"
          :rules="rules"
          :model="form"
          size="mini"
          :label-width="lableWidth"
        >
          <el-form-item :label="$t('assemble.productType')" prop="productType">
             <el-select class="p100" v-model="form.productType" size="mini" :placeholder="$t('common.pleaseSelect')">
              <el-option v-for="(item,index) in allProductType" :key="item+index"
              :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('assemble.assemblePerson')" prop="assemblePerson">
            <el-select class="p100" v-model="form.assemblePerson" size="mini" :placeholder="$t('common.pleaseSelect')">
              <el-option v-for="(item,index) in allAssemblePerson" :key="item+index"
              :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('assemble.assembleType')" prop="assembleType">
            <el-select class="p100" v-model="form.assembleType" size="mini" :placeholder="$t('common.pleaseSelect')">
              <el-option v-for="(item,index) in allAssembleType" :key="item+index"
              :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>

          <p class="text-l mg-b10">
            <el-button size="mini" class="fr" type="success" @click="addModel">{{$t('common.add')}}</el-button>
            {{$t('assemble.assembleModel')}}:</p>
          <div>
            <el-table :data="form.assembleModel" style="width: 100%" size="mini">
              <el-table-column
                type="index"
                width="50">
              </el-table-column>
              <el-table-column
                :label="$t('assemble.modelCode')"
                prop="modelCode"
              ></el-table-column>
              <el-table-column
                :label="$t('common.operate')"
              >
                <template slot-scope="scope">
                  <el-button type="text" size="mini" @click="editModel(scope.row)">{{$t('common.edit')}}</el-button>
                  <el-button type="text" class="myRed" size="mini" @click="deleteModel(scope.row)">{{$t('common.delete')}}</el-button>
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
      :title="isAddModel ? $t('common.add') : $t('common.edit')"
      :top="dialog_topStr"
      :visible.sync="showAdd2"
      :close-on-click-modal="false"
      width="40%">
      <div
        class="grap-box"
        style="overflow: auto"
        :style="{ maxHeight: dialog_maxH + 'px' }"
      >
        <el-form
          ref="formName2"
          :rules="rules"
          :model="techForm"
          label-width="120px"
          size="mini"
        >
          <el-form-item :label="$t('assemble.modelCode')" prop="modelCode">
            <el-input size="small" v-model="techForm.modelCode"></el-input>
          </el-form-item>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="showAdd2 = false">{{
          $t("common.cancel")
        }}</el-button>
        <el-button size="mini" type="primary" @click="submitFun('formName2')">{{
          $t("common.ok")
        }}</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      lableWidth: '100px',
      form: {},
      baseForm: {
        id: '',
        productType: '',
        assemblePerson: '',
        assembleType: '',
        assembleModel: [],
      },
      showAdd: false,
      isAdd: true,
      search: '',
      tableData: [],
      allProductType: ['111', '222', '333'],
      allAssemblePerson: ['张三', '李四', '王五'],
      allAssembleType: ['组合模式', '单一模式', '其他模式'],
      baseTechForm: {
        id: '',
        modelCode: '',
      },
      techForm: {
      },
      isAddModel: true,
      showAdd2: false,
    };
  },
  mounted() {
  },
  computed: {
    ...mapState(['dialog_maxH', 'dialog_topStr']),
    rules() {
      return {
        productType: [
          {
            required: true,
            message: Languages.t('common.notNull'),
            trigger: 'blur',
          },
        ],
        assemblePerson: [
          {
            required: true,
            message: Languages.t('common.notNull'),
            trigger: 'blur',
          },
        ],
        assembleType: [
          {
            required: true,
            message: Languages.t('common.notNull'),
            trigger: 'blur',
          },
        ],

        assembleModel: [
          {
            required: true,
            message: Languages.t('common.notNull'),
            trigger: 'blur',
          },
        ],
        modelCode: [
          {
            required: true,
            message: Languages.t('common.notNull'),
            trigger: 'blur',
          },
        ],
      };
    },
  },
  methods: {
    formatter(row, column, value, index) {
      let str = '';
      for (let i = 0; i < value.length; i++) {
        if (i > 0) {
          str += `,${value[i].modelCode}`;
        } else {
          str += value[i].modelCode;
        }
      }
      return str;
    },
    exportFun() {
      console.error('exportFun');
      this.myMsg(Languages.t('common.developing'), 'warning');
    },
    addFun() {
      // 添加时，清空关键词
      this.search = '';
      const iszh = this.$i18n.locale == 'zh';
      this.lableWidth = '130px';
      if (iszh) {
        this.lableWidth = '80px';
      }
      this.showAdd = true;
      this.isAdd = true;
      this.baseForm.id = Date.now();
      this.form = JSON.parse(JSON.stringify(this.baseForm));
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
          console.log('error submit-1 ');
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
      const rel = await this.answerFun();
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
    addModel() {
      this.isAddModel = true;
      this.showAdd2 = true;
      this.baseTechForm.id = Date.now(); // 生成唯一id
      this.techForm = JSON.parse(JSON.stringify(this.baseTechForm));
    },
    submitFun(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 增加
          if (this.isAddModel) {
            this.form.assembleModel.push(JSON.parse(JSON.stringify(this.techForm)));
          }
          // 修改
          else {
            this.sureUpdateModel();
          }
          this.showAdd2 = false;
        } else {
          console.error('commit error!');
        }
      });
    },
    editModel(form) {
      this.isAddModel = false;
      this.showAdd2 = true;
      this.techForm = JSON.parse(JSON.stringify(form));
    },
    sureUpdateModel() {
      const arr = this.form.assembleModel;
      const row = JSON.parse(JSON.stringify(this.techForm));
      console.error('更新：', row, arr);
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == row.id) {
          console.error('找到', i);
          arr.splice(i, 1, row);
          break;
        }
      }
    },
    async deleteModel(row) {
      const rel = await this.answerFun(Languages.t('common.sureToDelete'));
      if (!rel) {
        return;
      }
      const arr = this.form.assembleModel;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == row.id) {
          arr.splice(i, 1);
          break;
        }
      }
    },
  },
};
</script>

<style>
</style>
