
/*
 * @Descripttion: 
 * @Author: yizheng.yuan
 * @Date: 2021-05-08 09:10:17
 * @LastEditors: yizheng.yuan
 * @LastEditTime: 2021-06-16 15:39:11
 */
export default {
  methods: {
    myMsg(theText, theType) {
      this.$message({
        message: theText,
        type: theType
      });
    },
    copyObj(obj) {
      return JSON.parse(JSON.stringify(obj))
    },
    // 毫数转格式 【yyyy-MM-dd】
    formatDate(time, format='yyyy-MM-dd HH:mm:ss') {
      const t = new Date(time);
      const tf = function (i) { return (i < 10 ? '0' : '') + i; };
      return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
        switch (a) {
          case 'yyyy':
            return tf(t.getFullYear());
          // break;
          case 'MM':
            return tf(t.getMonth() + 1);
          // break;
          case 'mm':
            return tf(t.getMinutes());
          // break;
          case 'dd':
            return tf(t.getDate());
          // break;
          case 'HH':
            return tf(t.getHours());
          // break;
          case 'ss':
            return tf(t.getSeconds());
          // break;
        };
      });
    },
    answerFun(text = '确定删除?') {
      return new Promise((resolve, reject) => {
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