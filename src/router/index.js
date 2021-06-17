/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2021-04-17 18:35:51
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-06-16 14:39:01
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue'
import right from '../components/right.vue'

// 资产管理
import Instrument from '../components/instrument.vue'
// 产品管理
import Product from '../components/product.vue'

// 订单管理
import Order from '../components/order.vue'

// 组装管理
import Assemble from '../components/assemble.vue'
Assemble
// 老化管理
import Old from '../components/old.vue'

// 组件管理
import Comp from '../components/comp.vue'


// 组件管理
import Upload from '../components/Upload.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/instrument',
        name: 'instrument',
        component: Instrument,
        meta:{
          name: 'common.instrumentManager'
        }
      },
      {
        path: '/product',
        name: 'product',
        component: Product,
        meta:{
          name: 'common.productManager'
        }
      },
      {
        path: '/order',
        name: 'order',
        component: Order,
        meta:{
          name: 'common.orderManager'
        }
      },
      {
        path: '/assemble',
        name: 'assemble',
        component: Assemble,
        meta:{
          name: 'common.assemble'
        }
      },
      {
        path: '/old',
        name: 'old',
        component: Old,
        meta:{
          name: 'common.oldManager'
        }
      },
      {
        path: '/comp',
        name: 'comp',
        component: Comp,
        meta:{
          name: 'common.compManager'
        }
      },
      {
        path: '/right',
        name: 'right',
        component: right,
        meta:{
          name: 'common.rightManager',
          faName: 'common.rightManager'
        },
      },
      {
        path: '/about',
        name: 'about',
        component: About,
        meta:{
          name: 'common.otherManager',
          faName: 'common.rightManager'
        },
      },
      {
        path: '/upload',
        name: 'upload',
        component: Upload,
        meta:{
          name: 'common.upload',
          faName: 'common.rightManager'
        },
      }
    ]
  },
  
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
