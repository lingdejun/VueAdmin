<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline">
        <el-row>
          <el-form-item label="预约入口">
            <el-select v-model="listQuery.Source">
              <el-option label="全部" value="" />
              <el-option label="官网预约" value="1" />
              <el-option label="微信预约" value="2" />
              <el-option label="现场预约" value="3" />
              <el-option label="接待人预约" value="4" />
            </el-select>
          </el-form-item>
          <el-form-item label="接待人">
            <el-input v-model="listQuery.Receiver" />
          </el-form-item>
          <el-form-item label="预约日期">
            <el-date-picker
              v-model="AppointmentDate"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
          <el-form-item label="访客类型">
            <el-select v-model="listQuery.Category">
              <el-option label="全部" value="" />
              <el-option label="普通访客" value="1" />
              <el-option label="vip访客" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="预约状态">
            <el-select v-model="listQuery.State">
              <el-option label="全部" value="" />
              <el-option label="申请中" value="0" />
              <el-option label="未报备" value="1" />
              <el-option label="已报备" value="2" />
              <el-option label="已完成" value="3" />
              <el-option label="已拒绝" value="4" />
              <el-option label="已登记" value="5" />
              <el-option label="已失效" value="6" />
              <el-option label="已删除" value="-1" />
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="来访单位">
            <el-input v-model="listQuery.Company" />
          </el-form-item>
          <el-form-item label="来访事由">
            <el-select v-model="listQuery.Reason">
              <el-option v-for="item in visitReasonOptions" :key="item.Value" :label="item.Key" :value="item.Value" />
            </el-select>
          </el-form-item>
          <el-form-item label="来访人员">
            <el-input v-model="listQuery.VisitorName" />
          </el-form-item>
          <el-form-item label="来访车辆">
            <el-input v-model="listQuery.LicenseNumber" />
          </el-form-item>
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
        <el-col :span="6"><img :src="lineIcon"><img :src="listIcon" style="margin-left:20px;height:20px"><span style="margin-left:10px;clear: both;vertical-align: super;font-size: 18px;">预约列表</span></el-col>
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
      <el-table-column label="预约入口" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Source }}</span>
        </template>
      </el-table-column>
      <el-table-column label="接待人" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Receiver }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预约日期" align="center">
        <template slot-scope="{row}">
          <span>{{ row.AppointmentDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预约到达/离开时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.AppointmentTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="访客类型" align="center">
        <template slot-scope="{row}">
          <!-- <span v-if="row.Category===1">普通访客</span>
          <span v-if="row.Category===2">vip访客</span> -->
          <span>{{ row.CategoryText }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预约状态" align="center">
        <template slot-scope="{row}">
          <el-tag :class=" row.State | statusFilter ">{{ row.State }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="来访单位" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Company }}</span>
        </template>
      </el-table-column>
      <el-table-column label="来访事由" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Reason }}</span>
        </template>
      </el-table-column>
      <el-table-column label="来访人数" align="center">
        <template slot-scope="{row}">
          <span>{{ row.VisitorAmount }}人</span>
        </template>
      </el-table-column>
      <el-table-column label="来访姓名" align="center">
        <template slot-scope="{row}">
          <span>{{ row.VisitorName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="来访车辆数" align="center">
        <template slot-scope="{row}">
          <span>{{ row.VehicleAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="来访车辆" align="center">
        <template slot-scope="{row}">
          <span>{{ row.LicenseNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预约单" align="center">
        <template slot-scope="scope">
          <router-link :to="'/booking/detail/'+scope.row.Id+'/'+scope.row.Category">
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
import { fetchList, exportdata } from '@/api/booking'
import { fetchVistorReason } from '@/api/controlevalue'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import listIcon from '@/icons/List_Icon_2.png'
import lineIcon from '@/icons/Line_1.png'
export default {
  name: 'Booking',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        申请中: 'sqz',
        报备中: 'bbz',
        已登记: 'ydj',
        已拒绝: 'yjj',
        已生效: 'ysx',
        已删除: 'ysc',
        已完成: 'ywc'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      listIcon: listIcon,
      lineIcon: lineIcon,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      AppointmentDate: null,
      listQuery: {
        PageIndex: 1,
        PageSize: 20,
        Source: '',
        Receiver: '',
        GteAppointmentDate: '',
        LteAppointmentDate: '',
        Category: '',
        State: '',
        Company: '',
        Reason: '',
        VisitorName: '',
        LicenseNumber: '',
        Range: ''
      },
      downloadLoading: false,
      visitReasonOptions: []
    }
  },
  created() {
    this.getList()
    this.getVisitReason()
  },
  methods: {
    getList() {
      this.listLoading = true
      if (this.AppointmentDate != null && this.AppointmentDate.length > 0) {
        this.listQuery.GteAppointmentDate = this.AppointmentDate[0]
        this.listQuery.LteAppointmentDate = this.AppointmentDate[1]
      } else {
        this.listQuery.GteAppointmentDate = ''
        this.listQuery.LteAppointmentDate = ''
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
    getVisitReason() {
      fetchVistorReason().then(response => {
        console.log(response)
        this.visitReasonOptions = response.Data
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
.sqz{
  background-color: #22589a;
  color:#f3f6fa;
}
.bbz{
  background-color:#644cbd;
  color:#f3f6fa;
}
.ydj{
  background-color:#c58202;
  color:#f3f6fa;
}
.yjj{
  background-color:#ed6544;
  color:#f3f6fa;
}
.ysx{
  background-color:#3d87ee;
  color:#f3f6fa;
}
.ysc{
  background-color:#9b9b9b;
  color:#f3f6fa;
}
.ywc{
  background-color:#46c23b;
  color:#f3f6fa;
}

</style>
