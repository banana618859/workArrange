/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2021-05-25 17:33:26
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-05-26 16:08:00
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'


import zh from '@/assets/languages/zh_cn.json';
import en from '@/assets/languages/en_us.json';

// element-ui 国际化
import ElementUI from 'element-ui'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n)
 
// 注册i18n实例并引入语言文件
const i18n = new VueI18n({
  locale: 'zh',
  messages: {
    'zh': {...zh,...zhLocale},
    'en': {...en,...enLocale}
  }
})

Vue.use(ElementUI,{
  i18n:(key,value) =>i18n.t(key,value) //重点！！在注册Element时设置i18n的处理方法（这里有个小坑）
});

window.Languages = i18n;

export default i18n