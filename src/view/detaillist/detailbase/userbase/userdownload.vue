<template>
  <div>

    <div class="el-table">
      <table width="100%">
        <tr colspan="6">
          <th colspan="6">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jibenxinxi"></use>
            </svg>文件信息
          </th>
        </tr>

        <ul>
          <li >
            <label>前十大合作客户名单及年交易额：</label><br>
            <div v-for="(item,index) of detail.cooperativeClients" :key="index">
            <a :href="item" target="view_window">{{item}}</a><br>
            </div>
          </li>
          <li>
            <label>人力服务合同：</label><br>
            <div v-for="(item,index) of detail.manpowerServiceContract" :key="index">
            <a :href="item" target="view_window">{{item}}</a><br>
            </div>
          </li>
          <li>
            <label>5份以上劳动合同：</label><br>
            <div v-for="(item,index) of detail.laborContract" :key="index">
            <a :href="item" target="view_window">{{item}}</a><br>
            </div>
          </li>
          <li>
            <label>近一年的核心企业回款记录：</label><br>
            <div v-for="(item,index) of detail.returnRecords" :key="index">
            <a :href="item" target="view_window">{{item}}</a><br>
            </div>
          </li>
          <li>
            <label>本次融资对应的发薪名单、金额：</label><br>
            <div v-for="(item,index) of detail.paymentList" :key="index">
            <a :href="item" target="view_window">{{item}}</a><br>
            </div>
          </li>

          <li>
            <label>应收款对账凭证：</label><br>
            <div v-for="(item,index) of detail.receivables" :key="index">
            <a :href="item" target="view_window">{{item}}</a><br>
            </div>
          </li>

        </ul>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

      //基本信息
      detail: {
      },
    };
  },
  mounted() {
    this.getdetail();
  },
  methods: {
    //查看认证
    getLink(url){
      window.open(url)
    },

    getdetail() {
      var processNo=this.$route.query.processNo;
      this.$axios({
              method: 'post',
              url: this.$store.state.domain +"/manage/case/particulars",
              data: {
                processNo:processNo
              }
          })
          .then(
              response => {
              if(response.data.code==0){
                    this.detail = response.data.detail.result
              }else{
                  this.$message.error(response.data.msg);
              }
              }
            ).catch(
              error => {
              this.$message({
                    dangerouslyUseHTMLString: true,//表示提示的是html片段
                    message: '<svg class="icon" aria-hidden="true"> <use xlink:href="#icon-shengqi"></use> </svg> '+
                    error.response.data.message,
                    type: "error"
                  });
              }
            )}
  },
  watch: {},
  components: {}
};
</script>

 <style lang='less' scoped>
* {
  font-size: 14px;

  box-sizing: border-box;

  list-style: none;
}

ul {
  display: flex;
  flex-wrap: wrap;

  width: 100%;

  // 上左右下
  margin: 10px 0 10px;

  li {
    line-height: 40px;

    width: 100%;
    margin-bottom:20px;
    border-bottom: 1px solid rgba(238, 238, 238, 0.733);

    label {
      float: left;

      width: 260px;
      margin-right: 10px;
      color: #fff;
      text-align: center;
      background-color: #a07062;
    }
    div{
      border-bottom: 1px dotted rgb(159, 159, 204);
    }
  }
}

.outpadding {
  padding: 30px 0;
}

svg {
  width: 40px;
  height: 40px;
  padding: -1px 8px !important;
}
.tab-dd {
  padding: 30px;
  width: 100%;
}

/* 表格表头样式 */
.el-table th {
  color: rgba(204, 160, 102, 0.925) !important;
  background-color: rgba(245, 244, 236, 0.979) !important;
}

/* 图标样式 */
svg {
  padding: 3px 10px;
}
</style>
