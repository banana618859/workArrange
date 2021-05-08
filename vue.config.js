/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2020-10-25 22:57:53
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-05-08 08:53:58
 */
var isPro = process.env.NODE_ENV === 'production';
// 引入jq需要加入以下代码
const webpack = require('webpack')
// console.log('isPro:',isPro)

const path = require('path')

// 原文链接：https://blog.csdn.net/weixin_44602682/article/details/108791366
module.exports = {
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('less').oneOfs.store
    oneOfsMap.forEach(item => {
      item
      .use('sass-resources-loader')
      .loader('sass-resources-loader')
      .options({
        // Provide path to the file with resources
        // resources: './src/assets/aa.less',
        // Or array of paths
        resources: ['./src/assets/aa.less']
      })
      .end()
    })
  },
  // 原文链接：https://blog.csdn.net/GeniusXYT/article/details/112966750
  lintOnSave: false,
  devServer: {
    open: true,
    host: 'localhost',
    port: 8000,
    https: false,
    //以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: {//配置跨域
      '/zzz':{
        target: 'https://api.oick.cn/txt/',
        ws: true,
        changOrigin: true,//允许跨域
        pathRewrite: {
          '^/zzz': ''//请求的时候使用这个api就可以
        }
      },
      '/api': {
        target: 'http://47.105.90.67:7070/',//这里后台的地址模拟的;应该填写你们真实的后台接口
        // target: 'http://localhost:7070/',
        ws: true,
        changOrigin: true,//允许跨域
        pathRewrite: {
          '^/api': ''//请求的时候使用这个api就可以
        }
      }
    }
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      less: {
        globalVars: {
          'theme-color': '#421466'
        }
      }
    }
  }
  // 在.vue文件中使用,缺点：每新增一个变量，需重新启动项目
  // 原文链接：https://blog.csdn.net/weixin_44602682/article/details/108791366
}

