
/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2021-05-08 09:10:17
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-05-08 09:19:00
 */
export default {
  methods:{
    answerFun(text='确定删除?'){
      return new Promise((resolve,reject)=>{
        this.$confirm(text, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            resolve(true)
          }).catch(() => {
            resolve(false)        
        })
      })
    }
  }
}