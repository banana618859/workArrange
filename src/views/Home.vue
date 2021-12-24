<!--
 * @Descripttion:
 * @Author: yizheng.yuan
 * @Date: 2021-04-17 18:35:51
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-12-24 13:54:16
-->
<template>
  <div
    style="width: 100wh; height: 100vh; border: 1px solid #ccc; display: flex"
  >
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="列车排班表"/> -->

    <div style="border: 1px solid #ccc; width: 200px; height: 100%; text-align: left;
    background-color: #2d3a85;">
      <i class="el-icon-setting" style="color:white; cursor: pointer;" @click="toggle"></i>
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#2d3a85"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true"
        v-if="homeChild"
      >
        <div v-for="(item,index) in homeChild" :key="item.name+index">
          <el-menu-item v-if="!item.children" :index="item.path">
            <i class="el-icon-setting"></i>
            <span slot="title">{{$t(item.meta.name)}}</span>
          </el-menu-item>

          <el-submenu v-else :index="item.name">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{$t(item.meta.name)}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="son.path" v-for="(son,index) in item.children" :key="son.name+index">
                {{$t(son.meta.name)}}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </div>
      </el-menu>

      </div>

      <!-- <el-menu-item index="/instrument">
        <i class="el-icon-setting"></i>
        <span slot="title">资产管理</span>
      </el-menu-item>
      <el-menu-item index="/old">
        <i class="el-icon-setting"></i>
        <span slot="title">老化管理</span>
      </el-menu-item>
      <el-menu-item index="/order">
        <i class="el-icon-setting"></i>
        <span slot="title">出货订单</span>
      </el-menu-item> -->

    <div style="flex: 1; height: 100%; overflow:auto;">
      <router-view />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

import aaa from './abc.json';

console.error('aaa:', aaa);

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },

  created() {
    console.log('this', this.$router.options.routes);
    // 获取 path ='/'
    let rootRoute;
    const arr = this.$router.options.routes;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].path && arr[i].path == '/') {
        rootRoute = arr[i];
        break;
      }
    }
    const homeChild = rootRoute.children;
    console.log('homeChild', homeChild);

    // 合并儿子
    this.homeChild = [];
    const nameArr = [];
    for (let i = 0; i < homeChild.length; i++) {
      if (homeChild[i].meta.faName) {
        if (!nameArr.includes(homeChild[i].meta.faName)) {
          nameArr.push(homeChild[i].meta.faName);
          const fa = JSON.parse(JSON.stringify(homeChild[i]));
          fa.children = [homeChild[i]];
          this.homeChild.push(fa);
        } else {
          const indx = nameArr.indexOf(homeChild[i].meta.faName);
          this.homeChild[indx].children.push(homeChild[i]);
        }
      } else if (!nameArr.includes(homeChild[i].name)) {
        nameArr.push(homeChild[i].name);
        this.homeChild.push(homeChild[i]);
      }
    }
  },
  mounted() {
    window.onerror = function (e) {
      console.error('window.onerror:', e);
    };
  },
  methods: {
    toggle() {
      this.$i18n.locale = this.$i18n.locale == 'zh' ? 'en' : 'zh';
    },
  },
};
</script>
