<template>
  <div class="app-container">
    <div class="filter-container" style="margin-top:10px">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline">
        <el-row>
          <el-form-item label="预约日期">
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
          <el-form-item label="报备状态">
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
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
              搜索
            </el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <div style="padding-bottom: 10px;padding-top: 10px;background-color:#FFFFFF;border:1px solid #dfe6ec;border-top-right-radius: 10px;border-top-left-radius: 10px;">
      <el-row>
        <el-col :span="6"><img :src="lineIcon"><img :src="listIcon" style="margin-left:20px;height:20px"><span style="margin-left:10px;clear: both;vertical-align: super;font-size: 18px;">结果列表</span></el-col>
        <el-col :span="18" style="text-align:right;padding-right:10px" />
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
      <el-table-column label="接待人" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Receiver }}</span>
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
          <span>{{ row.VisitorAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="来访人员" align="center">
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
      <el-table-column label="报备状态" align="center">
        <template slot-scope="{row}">
          <span>{{ row.State }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/send/detail/'+scope.row.Id">
            <el-button>
              查看信息
            </el-button>
          </router-link>
          <el-button type="danger" @click="deleteItem(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.PageIndex" :limit.sync="listQuery.PageSize" @pagination="getList" />

  </div>
</template>

<script>
import { fetchList, delSend } from '@/api/send'
import { fetchVistorReason } from '@/api/controlevalue'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import listIcon from '@/icons/List_Icon_2.png'
import lineIcon from '@/icons/Line_1.png'
export default {
  name: 'Send',
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
      listQuery: {
        PageIndex: 1,
        PageSize: 10,
        ReceiverName: '',
        State: '',
        Company: '',
        Reason: '',
        VisitorName: '',
        LicenseNumber: '',
        GteAppointmentDate: '',
        LteAppointmentDate: ''
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
      if (this.ArriveDate != null && this.ArriveDate.length > 0) {
        this.listQuery.GteAppointmentDate = this.ArriveDate[0]
        this.listQuery.LteAppointmentDate = this.ArriveDate[1]
      } else {
        this.listQuery.GteAppointmentDate = ''
        this.listQuery.LteAppointmentDate = ''
      }
      fetchList(this.listQuery).then(response => {
        console.log(response)
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
    handleFilter() {
      this.listQuery.PageIndex = 1
      this.getList()
    },
    deleteItem(row, index) {
      const para = {
        id: row.Id
      }
      delSend(para).then(response => {
        if (response.Result === 1) {
          this.list.splice(index, 1)
          this.$notify({
            title: 'Success',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: 'Fail',
            message: '删除失败',
            type: 'warning',
            duration: 2000
          })
        }
      })
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

.inline-block{
  display: inline-block;
}
</style>
