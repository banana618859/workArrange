<!--
 * @Descripttion:
 * @Author: yizheng.yuan
 * @Date: 2021-05-25 12:01:07
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-06-18 14:07:25
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

      {{ $t("order.orderManagement") }}
    </p>
    <div class="grap-box flex1">
      <el-table
        :data="
          tableData.filter(
            (data) =>
              !search || data.orderNumber.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width: 100%"
      >
        <el-table-column :label="$t('order.orderNumber')" prop="orderNumber" width="140px">
        </el-table-column>
        <el-table-column
          :label="$t('order.outputStatus')"
          prop="outputStatus"
        ></el-table-column>
        <el-table-column
          :label="$t('order.productSn')"
          prop="productSn"
        ></el-table-column>
        <el-table-column
          :label="$t('order.deliveryTime')"
          prop="deliveryTime"
        >
          <template slot-scope="scope">
            <span>{{ formatter(scope.row.deliveryTime)}}</span>
          </template>
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
          label-width="120px"
        >
          <el-form-item :label="$t('order.orderNumber')" prop="orderNumber">
            <el-input
              size="small"
              v-model="form.orderNumber"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('order.outputStatus')" prop="outputStatus">
            <el-input size="small" v-model="form.outputStatus"></el-input>
          </el-form-item>
          <el-form-item :label="$t('order.productSn')" prop="productSn">
            <el-input size="small" v-model="form.productSn"></el-input>
          </el-form-item>
          <el-form-item :label="$t('order.deliveryTime')" prop="deliveryTime">
            <el-date-picker
              style="width: 100%"
              v-model="form.deliveryTime"
              size="small"
              type="datetime"
              :placeholder="$t('common.pleaseSelectDate')"
              align="right"
              value-format="timestamp"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-form-item>
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
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      form: {},
      baseForm: {
        orderNumber: '',
        outputStatus: '',
        productSn: '',
        deliveryTime: '',
      },
      showAdd: false,
      isAdd: true,
      search: '',
      tableData: [],
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            },
          },
          {
            text: '明天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit('pick', date);
            },
          },
          {
            text: '一周后',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            },
          },
        ],
      },

    };
  },
  mounted() {
  },
  computed: {
    ...mapState(['dialog_maxH', 'dialog_topStr']),
    rules() {
      return {
        orderNumber: [
          {
            required: true,
            message: Languages.t('common.notNull'),
            trigger: 'blur',
          },
        ],
        outputStatus: [
          {
            required: true,
            message: Languages.t('common.notNull'),
            trigger: 'blur',
          },
        ],
        productSn: [
          {
            required: true,
            message: Languages.t('common.notNull'),
            trigger: 'blur',
          },
        ],
        deliveryTime: [
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
    exportFun() {
      console.error('exportFun');
      this.myMsg(Languages.t('common.developing'), 'warning');
    },
    formatter(deliveryTime) {
      console.log('修改日期-kk:', deliveryTime);
      return this.formatDate(deliveryTime);
    },
    addFun() {
      this.showAdd = true;
      this.isAdd = true;
      this.form = JSON.parse(JSON.stringify(this.baseForm));
      this.form.orderNumber = `${Date.now()}`;
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
          console.log('error submit!!');
          return false;
        }
      });
    },
    sureUpdate(row) {
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].orderNumber == row.orderNumber) {
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
        if (this.tableData[i].orderNumber == row.orderNumber) {
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
