<template>
  <!-- true显示，false不显示 -->
  <div>
    <div class="topBanner">
      <div class="content">
        <div class="searcharea">
          <!-- el-form接收一个model，必须配合el-form-item一起使用，并且在el-form-item上绑定prop属性 -->
          <el-form ref="searchform" :model="searchform" label-width="80px" size="mini">
            <el-row :gutter="30">
              <el-col :span="6">
                <el-form-item label="企业名称" prop="enterpriseName">
                  <el-input v-model="searchform.enterpriseName" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="法人姓名" prop="legalName">
                  <el-input v-model="searchform.legalName" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="申请时间" prop="startDate">
                  <el-date-picker
                    class="shi"
                    clearable
                    v-model="searchform.startDate"
                    value-format="yyyy-MM-dd HH:mm"
                    format="yyyy-MM-dd HH:mm"
                    type="datetime"
                    placeholder="开始日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="30">
              <el-col :span="6">
                <el-form-item label="至" prop="endDate">
                  <el-date-picker
                    class="shi"
                    clearable
                    v-model="searchform.endDate"
                    value-format="yyyy-MM-dd HH:mm"
                    format="yyyy-MM-dd HH:mm"
                    type="datetime"
                    placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :span="5">
                <div class="di">
                  <div class="wrapper">
                    <el-button type="primary" plain @click="search()" size="mini">搜索</el-button>
                    <el-button type="primary" plain @click="resetForm('searchform')" size="mini">重置</el-button>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <!-- =============================== 展示表格数据框 =================================== -->

        <el-table :data="tableData" border size="medium" stripe style="width: 100%; height:100%;">
          <el-table-column prop="enterpriseNo" label="企业编号" align="center"></el-table-column>
          <el-table-column prop="enterpriseName" label="企业名称" align="center"></el-table-column>
          <el-table-column prop="legalName" label="法人姓名" align="center"></el-table-column>
          <el-table-column prop="legalPhone" label="法人手机号" align="center"></el-table-column>
          <el-table-column prop="createTime" label="申请时间" align="center"></el-table-column>
          <el-table-column prop="preApproveMonthRate" label="操作" align="center">
            <!-- 点击查看详情 -->
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="gouserdetail(scope.row.enterpriseNo)">审核</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination
            background
            style="text-align:center"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="this.searchform.pageIndex"
            :page-sizes="[20,50,100]"
            :page-size="this.searchform.pageSize"
            layout="total, sizes, prev, pager, next"
            :total="count"
          >
            <!--这是显示总共有多少数据-->
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      count: 0, //总信息数
      pageIndex: 1, //初始页
      pageSize: 50, //显示当前行的条数

      //表格数据
      tableData: [],

      searchform: {
        enterpriseName: "", //企业名称
        legalName: "", //法人姓名
        accountStatus: "", //企业状态
        startDate: "", //开始时间
        endDate: "", //截止时间
        pageIndex: 1, //初始页
        pageSize: 50 //显示当前行的条数
      }
    };
  },
  // mounted只执行一次,在模板渲染成html后调用
  mounted() {
    this.getlist(); //获取用户列表
  },

  methods: {
    // 搜索功能
    search() {
      this.searchform.pageIndex = 1;
      this.searchform.pageSize = 50;
      this.getlist();
    },

    // 重置功能
    resetForm(formName) {
      this.$refs[formName].resetFields();
      // this.getlist();
    },

    // 初始每页数据数pagesize
    handleSizeChange(psize) {
      // 改变每页显示的条数
      this.searchform.pageSize = psize;
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.searchform.pageIndex = 1;
      this.getlist();
    },

    // 初始页currentPage
    handleCurrentChange(pindex) {
      this.searchform.pageIndex = pindex;
      this.getlist();
    },

    // 点击用户名跳转至详情页
    gouserdetail(enterpriseNo) {
      this.$router.push("/users/checkdetailist?enterpriseNo=" + enterpriseNo);
    },

    getlist() {
      this.$axios({
        method: "post",
        url: this.$store.state.domain + "/manage/getApproveEnterpriseList",
        data: this.searchform
      })
        .then(response => {
          if (response.data.code == 0) {
            if (
              response.data.detail.resultList == null ||
              response.data.detail.resultList == ""
            ) {
              this.tableData = "";
            } else {
              this.tableData = response.data.detail.resultList;
            }
            this.searchform.pageSize = response.data.detail.pageSize;
            this.searchform.pageIndex = response.data.detail.pageIndex;
            this.count = response.data.detail.count;
          } else {
            if (
              response.data.detail == null ||
              response.data.detail == "" ||
              response.data.detail.resultList == null ||
              response.data.detail.resultList == ""
            ) {
              this.tableData = [];
              this.$message.error(response.data.msg);
            }
            this.$message.error(response.data.msg);
          }
        })
        .catch(error => {
          this.$message({
            dangerouslyUseHTMLString: true, //表示提示的是html片段
            message:
              '<svg class="icon" aria-hidden="true"> <use xlink:href="#icon-shengqi"></use> </svg> ' +
              error.response.data.message,
            type: "error"
          });
        });
    }
  },

  //过滤器，用于格式化时间格式
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  }
};
</script>

 <style lang='less'>
</style>
