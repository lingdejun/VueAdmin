<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline">
        <el-row>
          <el-col :span="8">
            <el-form-item label="未回收卡片">
              <el-input v-model="listQuery.receptionist" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="回收姓名">
              <el-input v-model="listQuery.receptionist" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="来访单位">
              <el-input v-model="listQuery.visitorCompany" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="到达日期">
              <el-date-picker
                v-model="listQuery.startDateTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="接待人">
              <el-input v-model="listQuery.visitor" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="访客类型">
              <el-select v-model="listQuery.enter">
                <el-option label="普通访客" value="shanghai" />
                <el-option label="vip访客" value="beijing" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
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
      <el-table-column label="未回收卡片" align="center">
        <template slot-scope="{row}">
          <span>{{ row.from }}</span>
        </template>
      </el-table-column>
      <el-table-column label="来访姓名" align="center">
        <template slot-scope="{row}">
          <span>{{ row.visitorCompany }}</span>
        </template>
      </el-table-column>
      <el-table-column label="来访单位" align="center">
        <template slot-scope="{row}">
          <span>{{ row.visitorCompany }}</span>
        </template>
      </el-table-column>
      <el-table-column label="到达日期" align="center">
        <template slot-scope="{row}">
          <span>{{ row.receptionist }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入场/离场时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.visitReason }}</span>
        </template>
      </el-table-column>
      <el-table-column label="接待人" align="center">
        <template slot-scope="{row}">
          <span>{{ row.personCount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="访客类型" align="center">
        <template slot-scope="{row}">
          <span>{{ row.visitorName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预约单" align="center">
        <template slot-scope="scope">
          <router-link :to="'/booking/detail/'+scope.row.id">
            <el-button>
              详情
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import listIcon from '@/icons/List_Icon_2.png'
import lineIcon from '@/icons/Line_1.png'
export default {
  name: 'Cardexception',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        申请中: 'success',
        报备中: 'info',
        已登记: 'info',
        已拒绝: 'danger',
        已生效: 'info',
        已删除: 'danger',
        已完成: 'danger'
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
      listQuery: {
        page: 1,
        limit: 20,
        title: '',
        enter: '',
        receptionist: '',
        bookingDate: '',
        visitorType: '',
        bookStatus: '',
        visitorCompany: '',
        visitReason: '',
        visitor: '',
        visitCar: ''
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
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      console.log(this.listQuery.bookingDate)
      this.getList()
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
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
