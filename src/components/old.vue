<!--
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2021-05-25 12:01:07
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-06-17 18:30:43
-->
<template>
  <div class="flexBox-c pd10">
    <p class="top-title">
      <el-button size="mini" type="success" @click="addFun" class="fr">{{
        $t("common.add")
      }}</el-button>
      <el-button
        size="mini"
        type="primary"
        @click="exportFun"
        class="fr mg-r10"
        >{{ $t("common.export") }}</el-button
      >

      {{ $t("old.oldDataManagement") }}
    </p>
    <div class="grap-box flex1">
      <el-table
        :data="
          tableData.filter(
            (data) =>
              !search ||
              data.productIndex.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width: 100%"
      >
        <el-table-column
          :label="$t('old.productIndex')"
          prop="productIndex"
          width="140px"
        >
        </el-table-column>
        <el-table-column
          :label="$t('old.oldPerson')"
          prop="oldPerson"
        ></el-table-column>
        <el-table-column
          :label="$t('old.oldType')"
          prop="oldType"
        ></el-table-column>
        <el-table-column
          :label="$t('old.productType')"
          prop="productType"
        ></el-table-column>
        <el-table-column
          :label="$t('old.oldTime')"
          prop="oldTime"
          width="160px"
          :formatter="formatterTime"
        ></el-table-column>
        <el-table-column
          :label="$t('old.oldDuration')"
          prop="oldDuration"
        ></el-table-column>
        <el-table-column
          :label="$t('old.barCodeLength')"
          prop="barCodeLength"
        ></el-table-column>
        <el-table-column
          :label="$t('old.barCodeCount')"
          prop="barCodeCount"
        ></el-table-column>
        <el-table-column
          :label="$t('old.barCodeGroup')"
          prop="barCodeGroup"
          :formatter="formatter"
        >
        </el-table-column>
        <el-table-column align="right" width="200px">
          <template slot="header">
            <div class="flexBox-r">
              <span class="mg-r10">{{ $t("common.operate") }}</span>
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
          <el-form-item :label="$t('old.productIndex')" prop="productIndex">
            <el-select
              class="p100"
              v-model="form.productIndex"
              size="mini"
              :placeholder="$t('common.pleaseSelect')"
            >
              <el-option
                v-for="(item, index) in allProductType"
                :key="item + index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('old.oldPerson')" prop="oldPerson">
            <el-select
              class="p100"
              v-model="form.oldPerson"
              size="mini"
              :placeholder="$t('common.pleaseSelect')"
            >
              <el-option
                v-for="(item, index) in allAssemblePerson"
                :key="item + index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('old.oldType')" prop="oldType">
            <el-select
              class="p100"
              v-model="form.oldType"
              size="mini"
              :placeholder="$t('common.pleaseSelect')"
            >
              <el-option
                v-for="(item, index) in allAssembleType"
                :key="item + index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('old.productType')" prop="productType">
            <el-select
              class="p100"
              v-model="form.productType"
              size="mini"
              :placeholder="$t('common.pleaseSelect')"
            >
              <el-option
                v-for="(item, index) in allAssembleType"
                :key="item + index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('old.oldTime')" prop="oldTime">
            <el-date-picker
              style="width:100%"
              v-model="form.oldTime"
              type="datetime"
              value-format="timestamp"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>

          <el-form-item :label="$t('old.oldDuration')" prop="oldDuration">
            <el-input v-model.number="form.oldDuration" size="mini"></el-input>
          </el-form-item>

          <el-form-item :label="$t('old.barCodeLength')" prop="barCodeLength">
            <el-input v-model.number="form.barCodeLength" size="mini"></el-input>
          </el-form-item>

          <el-form-item :label="$t('old.barCodeCount')" prop="barCodeCount">
            <el-input v-model.number="form.barCodeCount" size="mini"></el-input>
          </el-form-item>

          <p class="text-l mg-b10">
            <el-button
              size="mini"
              class="fr"
              type="success"
              @click="addModel"
              >{{ $t("common.add") }}</el-button
            >
            {{ $t("old.barCodeGroup") }}:
          </p>
          <div>
            <el-table :data="form.barCodeGroup" style="width: 100%" size="mini">
              <el-table-column type="index" width="50"> </el-table-column>
              <el-table-column
                :label="$t('old.barCode')"
                prop="barCode"
              ></el-table-column>
              <el-table-column :label="$t('common.operate')">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="mini"
                    @click="editModel(scope.row)"
                    >{{ $t("common.edit") }}</el-button
                  >
                  <el-button
                    type="text"
                    class="myRed"
                    size="mini"
                    @click="deleteModel(scope.row)"
                    >{{ $t("common.delete") }}</el-button
                  >
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
      width="40%"
    >
      <div
        class="grap-box"
        style="overflow: auto"
        :style="{ maxHeight: dialog_maxH + 'px' }"
      >
        <el-form
          ref="formName2"
          :rules="rules2"
          :model="techForm"
          label-width="120px"
          size="mini"
        >
          <el-form-item :label="$t('old.barCode')" prop="barCode">
            <el-input size="small" v-model="techForm.barCode"></el-input>
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
import { mapState } from "vuex";

export default {
  data() {
    return {
      lableWidth: "100px",
      form: {},
      baseForm: {
        id: '',
        productIndex: "111",
        oldPerson: "李四",
        oldType: "单一模式",
        productType: "组合模式",
        oldTime: "",
        oldDuration: 2,
        barCodeLength: 3,
        barCodeCount: 4,
        barCodeGroup: [],
      },
      showAdd: false,
      isAdd: true,
      search: "",
      tableData: [],
      allProductType: ["111", "222", "333"],
      allAssemblePerson: ["张三", "李四", "王五"],
      allAssembleType: ["组合模式", "单一模式", "其他模式"],
      baseTechForm: {
        id: '',
        barCode: "",
      },
      techForm: {},
      isAddModel: true,
      showAdd2: false,
    };
  },
  mounted() {},
  computed: {
    ...mapState(["dialog_maxH", "dialog_topStr"]),
    rules() {
      return {
        productIndex: [
          {
            required: true,
            message: Languages.t("common.notNull"),
            trigger: "blur",
          },
        ],
        oldPerson: [
          {
            required: true,
            message: Languages.t("common.notNull"),
            trigger: "blur",
          },
        ],
        oldType: [
          {
            required: true,
            message: Languages.t("common.notNull"),
            trigger: "blur",
          },
        ],
        productType: [
          {
            required: true,
            message: Languages.t("common.notNull"),
            trigger: "blur",
          },
        ],
        oldTime: [
          {
            required: true,
            message: Languages.t("common.notNull"),
            trigger: "blur",
          },
        ],
        oldDuration: [
          {
            required: true,
            message: Languages.t("common.notNull"),
            trigger: "blur",
          },
        ],
        barCodeLength: [
          {
            required: true,
            message: Languages.t("common.notNull"),
            trigger: "blur",
          },
        ],
        barCodeCount: [
          {
            required: true,
            message: Languages.t("common.notNull"),
            trigger: "blur",
          },
        ]
      };
    },
    rules2() {
      return{
        barCode: [
          {
            required: true,
            message: Languages.t("common.notNull"),
            trigger: "blur",
          },
        ]
      }
    }
  },
  methods: {
    formatterTime(row, column, value, index){
      return this.formatDate(value)
    },
    formatter(row, column, value, index) {
      let str = "";
      for (let i = 0; i < value.length; i++) {
        if (i > 0) {
          str += "," + value[i].barCode;
        } else {
          str += value[i].barCode;
        }
      }
      return str;
    },
    exportFun() {
      console.error("exportFun");
      this.myMsg(Languages.t("common.developing"), "warning");
    },
    addFun() {
      var iszh = this.$i18n.locale == "zh" ? true : false;
      this.lableWidth = "130px";
      if (iszh) {
        this.lableWidth = "80px";
      }
      this.showAdd = true;
      this.isAdd = true;
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
          console.log("error submit-1 ");
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
    addModel() {
      this.isAddModel = true;
      this.showAdd2 = true;
      this.baseTechForm.id = Date.now(); //生成唯一id
      this.techForm = JSON.parse(JSON.stringify(this.baseTechForm));
    },
    submitFun(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 增加
          if (this.isAddModel) {
            this.form.barCodeGroup.push(
              JSON.parse(JSON.stringify(this.techForm))
            );
          }
          // 修改
          else {
            this.sureUpdateModel();
          }
          this.showAdd2 = false;
        } else {
          console.error("commit error!");
        }
      });
    },
    editModel(form) {
      this.isAddModel = false;
      this.showAdd2 = true;
      this.techForm = JSON.parse(JSON.stringify(form));
    },
    sureUpdateModel() {
      let arr = this.form.barCodeGroup;
      let row = JSON.parse(JSON.stringify(this.techForm));
      console.error("更新：", row, arr);
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id == row.id) {
          console.error("找到", i);
          arr.splice(i, 1, row);
          break;
        }
      }
    },
    async deleteModel(row) {
      let rel = await this.answerFun(Languages.t("common.sureToDelete"));
      if (!rel) {
        return;
      }
      let arr = this.form.barCodeGroup;
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