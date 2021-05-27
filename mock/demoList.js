/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2021-05-24 16:46:40
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-05-24 17:49:49
 */
// let demoList = [{
//   id: 1,
//   name: 'zs',
//   age: '23',
//   job: '前端工程师'
// }, {
//   id: 2,
//   name: 'ww',
//   age: '24',
//   job: '后端工程师'
// }]

// export default {
//   'get|/parameter/query': option => {
//     return {
//       status: 200,
//       message: 'success',
//       data: demoList
//     };
//   }
// }

let demoList = {
  status: 200,
  message: 'success',
  data: {
    total: 100,
    'rows|10': [{
      id: '@guid',
      name: '@cname',
      'age|20-30': 23,
      'job|1': ['前端工程师', '后端工程师', 'UI工程师', '需求工程师']
    }]
  }
};
export default {
    'get|/parameter/query': demoList
}