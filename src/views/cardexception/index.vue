<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline">
        <el-row>
          <el-form-item label="未收回卡片">
            <el-input v-model="listQuery.Number" />
          </el-form-item>
          <el-form-item label="来访姓名">
            <el-input v-model="listQuery.VisitorName" />
          </el-form-item>
          <el-form-item label="来访单位">
            <el-input v-model="listQuery.Company" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="到达日期">
            <el-date-picker
              v-model="listQuery.ArriveDate"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item label="接待人">
            <el-input v-model="listQuery.ReceiverName" />
          </el-form-item>
          <el-form-item label="访客类型">
            <el-select v-model="listQuery.Category">
              <el-option label="全部" value="" />
              <el-option label="普通访客" value="1" />
              <el-option label="vip访客" value="2" />
            </el-select>
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
        <el-col :span="6"><img :src="lineIcon"><img :src="listIcon" style="margin-left:20px;height:20px"><span style="margin-left:10px;clear: both;vertical-align: super;font-size: 18px;">异常卡列表</span></el-col>
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
      <el-table-column label="未收回卡片" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Number }}</span>
        </template>
      </el-table-column>
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
          <span>{{ row.ReceiverName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="访客类型" align="center">
        <template slot-scope="{row}">
          <span>{{ row.CategoryText }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预约单" align="center">
        <template slot-scope="scope">
          <router-link :to="'/booking/detail/'+scope.row.AppointmentId +'/'+scope.row.Category">
            <el-button>
              查看预约单
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.PageIndex" :limit.sync="listQuery.PageSize" @pagination="getList" />
  </div>
</template>

<script>
import { fetchList } from '@/api/cardexception'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import listIcon from '@/icons/List_Icon_2.png'
import lineIcon from '@/icons/Line_1.png'
export default {
  name: 'Cardexception',
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
        Number: '',
        VisitorName: '',
        Company: '',
        ArriveDate: '',
        ReceiverName: '',
        Category: ''
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
        this.listQuery.PageIndex = response.Data.PageIndex
        this.list = response.Data.Items
        this.total = response.Data.TotalReadCount

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.PageIndex = 1
      this.getList()
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
