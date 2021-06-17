<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2021-05-25 12:01:07
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-06-15 18:02:17
-->
<template>
  <div class="flexBox-c pd10">
    <p class="top-title">
      <el-button size="mini" type="success" @click="addFun" class="fr">{{
        $t("common.add")
      }}</el-button>
      {{ $t("instrument.instrumentManager") }}
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
        <el-table-column :label="$t('instrument.id')" prop="id" width="140px">
        </el-table-column>
        <el-table-column
          :label="$t('instrument.name')"
          prop="name"
        ></el-table-column>
        <el-table-column
          :label="$t('instrument.typeNumber')"
          prop="typeNumber"
        ></el-table-column>
        <el-table-column
          :label="$t('instrument.expire')"
          prop="expire"
        >
          <template slot-scope="scope">
            <span class="myRed" v-if="scope.row.expire < Date.now()">
              {{$t('common.expire')}}
            </span>
            <span v-else>{{ formatter(scope.row.expire)}}</span>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              :placeholder="$t('common.pleaseInputKeyword')"
            />
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
          label-width="100px"
        >
          <el-form-item :label="$t('instrument.id')" prop="id">
            <el-input
              size="small"
              v-model="form.id"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('instrument.name')" prop="name">
            <el-input size="small" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item :label="$t('instrument.typeNumber')" prop="typeNumber">
            <el-input size="small" v-model="form.typeNumber"></el-input>
          </el-form-item>
          <el-form-item :label="$t('instrument.expire')" prop="expire">
            <el-date-picker
              style="width: 100%"
              v-model="form.expire"
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
import { mapState } from "vuex";


export default {
  data() {
    return {
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
        id: "",
        name: "",
        typeNumber: "",
        expire: "",
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
    // 获取页面的高度
    let bodyH = document.documentElement.clientHeight;
    let dialog_topBottom = 110;
    this.$store.commit("save_dialog_maxH", bodyH - dialog_topBottom);
    console.log("dialog_maxH", this.dialog_maxH);

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