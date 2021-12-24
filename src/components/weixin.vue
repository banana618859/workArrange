<!--
 * @Descripttion: unTitle
 * @Author: yizheng.yuan
 * @Date: 2021-11-28 16:58:31
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-11-28 17:16:15
-->
<template>
    <div class="warp_one" id="app">
    <div class="head">
      <div class="headIcon" :style="{backgroundImage:`url(${myIcon})`}">
      </div>
      <p class="openId">ID:{{openId}}</p>
    </div>
    <div class="main">
      <div class="searchBox">
        <p><input class="input-default" placeholder="请输入您的身份证号" /></p>
        <p><button class="button-default mg-t20">查 询</button></p>
      </div>
      <div class="pd20">
        <div class="resultBox">
          <div v-if="!resultObj" class="noResultBox">
            <!-- <div class="imgBox"><img src="./images/notFount.png"></div> -->
            <p class="theme-gray mg-t15 font16 font-l">未查询到相关信息</p>
          </div>
          <div v-else>
            <ul>
              <li class="font16">{{resultObj.companyName}}</li>
              <li>姓名：{{resultObj.personName}}</li>
              <li>手机号：<span class="theme-blue">{{resultObj.phone}}</span></li>
            </ul>
            <p><button class="button-default mg-t20">绑 定</button></p>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
const local = window.location.href;
const iconUrl = 'http://6497-61-140-181-220.ngrok.io/html/demo.png';
const redirect_uri = window.location.href;
const wxConfig = {
  appId: 'wx3680aee5b396cc0f',
  appsecret: '626c988a2e4af8cc459424187951792e',
  token: 'fsadfsdfd978466545654',
  scope: 'snsapi_userinfo',
};
const snsapi_base_Url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wxConfig.appId}&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=${wxConfig.scope}&state=123#wechat_redirect`;

export default {
  data() {
    return {
      myIcon: iconUrl,
      openId: 'WERdfdfg3434dssfsdfsq',
      resultObj: {
        companyName: '山东侨联智能科技有限公司',
        personName: '王岩',
        phone: '13631338856',
      },
    };
  },
  mounted() {
    // this.getRight()
    // window.location.href = snsapi_base_Url;
    // this.getOne();
  },
  methods: {
    getOne() {
      const code = this.getUrlParam('code'); // 截取路径中的code
      if (code == null || code === '') {
        console.error('跳转授权11：');
        window.location.href = snsapi_base_Url;
        // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=' + encodeURIComponent(local) + '&response_type=code&scope=snsapi_base&state=1#wechat_redirect';
      } else {
        console.error('获取到的code:', code);
        this.getRight();
        // this.getOpenId(code) //把code传给后台获取用户信息
      }
    },
    getUrlParam(name) {
      const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
      const url = window.location.href.split('#')[0];
      const search = url.split('?')[1];
      if (search) {
        const r = search.substr(0).match(reg);
        if (r !== null) return unescape(r[2]);
        return null;
      } return null;
    },
    getRight() {
      const url = 'http://qiaolianyun.viphk.91tunnel.com/servlet/getUserInfo';
      axios.post(url, { code: 'sdfs' })
        .then((res) => {
          console.log('object', res);
        })
        .catch((err) => {
          console.error('err:', err);
        });
    },
  },

};
</script>

  <style>
    .warp_one {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .head {
      height: 200px;
      background-color: #0f59a4;
      text-align: center;
    }

    .headIcon {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin: 30px auto;
      background-size: 100% 100%;
    }

    .openId {
      color: #fff;
      font-size: 16px;
      font-weight: bold;
    }

    .main {
      flex: 1;
      background-color: #eff3f6;
    }

    .searchBox {
      background-color: #fff;
      padding: 20px;
      box-shadow: 0 0 8px #ccc;
    }

    .input-default,
    .button-default {
      width: 100%;
      height: 45px;
      line-height: 45px;
      border: 1px solid #ddd;
      border-radius: 3px;
      padding: 0 5px;
    }

    .button-default {
      text-align: center;
      border: none;
      background-color: #0f59a4;
      color: #fff;
      font-size: 16px;
    }

    .resultBox {
      padding: 15px 20px;
      border: 1px solid #eee;
      background-color: #fff;
      color: #010101;
      font-weight: bold;
      font-size: 12px;
      border-radius: 5px;
      box-shadow: 0 0 25px #ccc;
    }

    .resultBox li {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #f2f2f2;

    }

    .noResultBox {
      text-align: center;

    }

    .imgBox {
      margin: 10px auto;
    }

    .imgBox img {
      width: 100px;
      height: 100px;
    }

    .theme-blue {
      color: #0f59a4;
    }
    .theme-gray {
      color: #9c9e9d;
    }

    .theme-black {
      color: #010101;
    }
  </style>
