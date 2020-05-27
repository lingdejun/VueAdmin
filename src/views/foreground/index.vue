<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline">
        <el-row>
          <el-form-item label="来访人员">
            <el-input v-model="listQuery.VisitorName" />
          </el-form-item>
          <el-form-item label="来访单位">
            <el-input v-model="listQuery.Company" />
          </el-form-item>
          <el-form-item label="到达日期">
            <el-date-picker
              v-model="ArriveDate"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
          <el-form-item label="接待人">
            <el-input v-model="listQuery.ReceiverName" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="访客类型">
            <el-select v-model="listQuery.Category">
              <el-option label="全部" value="" />
              <el-option label="普通访客" value="1" />
              <el-option label="vip访客" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="到访状态">
            <el-select v-model="listQuery.State">
              <el-option label="全部" value="" />
              <el-option label="入场" value="1" />
              <el-option label="离场" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="HSSE培训有效期">
            <el-date-picker
              v-model="listQuery.HSSEDate"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item>
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter('')">
              搜索
            </el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <div style="padding-bottom: 10px;padding-top: 10px;background-color:#FFFFFF;border:1px solid #dfe6ec;border-top-right-radius: 10px;border-top-left-radius: 10px;">
      <el-row>
        <el-col :span="6"><img :src="lineIcon"><img :src="listIcon" style="margin-left:20px;height:20px"><span style="margin-left:10px;clear: both;vertical-align: super;font-size: 18px;">统计列表</span></el-col>
        <el-col :span="18" style="text-align:right;padding-right:10px">
          <el-button v-waves class="filter-item" @click="handleFilter('1')">
            一周
          </el-button>
          <el-button v-waves class="filter-item" @click="handleFilter('2')">
            一月
          </el-button>
          <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
            导&emsp;出
          </el-button>
        </el-col>
      </el-row>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      stripe
    >
      <el-table-column label="来访姓名" align="center">
        <template slot-scope="{row}">
          <span>{{ row.VisitorName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="来访单位" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Company }}</span>
        </template>
      </el-table-column>
      <el-table-column label="到达日期" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ArriveDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入场/离场时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.RegisterTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="接待人" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Receiver }}</span>
        </template>
      </el-table-column>
      <el-table-column label="访客类型" align="center">
        <template slot-scope="{row}">
          <span>{{ row.CategoryText }}</span>
        </template>
      </el-table-column>
      <el-table-column label="HSSE培训有效期" align="center">
        <template slot-scope="{row}">
          <span>{{ row.HSSEExpired }}</span>
        </template>
      </el-table-column>
      <el-table-column label="到访状态" align="center">
        <template slot-scope="{row}">
          <span>{{ row.State }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预约单" align="center">
        <template slot-scope="scope">
          <router-link :to="'/booking/detail/'+scope.row.Id +'/'+scope.row.Category">
            <el-button>
              详情
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.PageIndex" :limit.sync="listQuery.PageSize" @pagination="getList" />
  </div>
</template>

<script>
import { fetchList, exportdata } from '@/api/foreground'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import listIcon from '@/icons/List_Icon_2.png'
import lineIcon from '@/icons/Line_1.png'
export default {
  name: 'Foreground',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      listIcon: listIcon,
      lineIcon: lineIcon,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      ArriveDate: null,
      HSSEDate: null,
      listQuery: {
        PageIndex: 1,
        PageSize: 20,
        VisitorName: '',
        Company: '',
        GteArriveDate: '',
        LteArriveDate: '',
        ReceiverName: '',
        Category: '',
        State: '',
        GteHSSE: '',
        LteHSSE: '',
        Range: ''
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      if (this.ArriveDate != null && this.ArriveDate.length > 0) {
        this.listQuery.GteArriveDate = this.AppointmentDate[0]
        this.listQuery.LteArriveDate = this.AppointmentDate[1]
      } else {
        this.listQuery.GteArriveDate = ''
        this.listQuery.LteArriveDate = ''
      }
      if (this.HSSEDate != null && this.HSSEDate.length > 0) {
        this.listQuery.GteHSSE = this.AppointmentDate[0]
        this.listQuery.LteHSSE = this.AppointmentDate[1]
      } else {
        this.listQuery.GteHSSE = ''
        this.listQuery.LteHSSE = ''
      }
      fetchList(this.listQuery).then(response => {
        this.listQuery.PageIndex = response.Data.PageIndex
        this.list = response.Data.Items
        this.total = response.Data.TotalReadCount

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter(range) {
      this.listQuery.PageIndex = 1
      this.listQuery.Range = range === '' ? '' : range
      this.getList()
    },
    handleDownload() {
      this.downloadLoading = true
      exportdata(this.listQuery).then(response => {
        if (response.Result === 1) {
          var blob = this.dataURLtoBlob(response.Data.Base64Str, response.Data.Type)
          var downloadUrl = window.URL.createObjectURL(blob)
          var anchor = document.createElement('a')
          anchor.href = downloadUrl
          anchor.download = response.Data.FileName
          anchor.click()
          this.downloadLoading = false
          window.URL.revokeObjectURL(blob)
        }
      })
    },
    dataURLtoBlob(base64Str, type) {
      const bstr = atob(base64Str)
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new Blob([u8arr], { type: type })
    }
  }
}
</script>

<style scoped>
.success{
  background-color: yellowgreen;
  color:#f3f6fa;
}

.info{
  background-color:cornflowerblue;
  color:#f3f6fa;
}

.danger{
  background-color:rgba(236, 174, 79, 0.849);
  color:#f3f6fa;
}
</style>
