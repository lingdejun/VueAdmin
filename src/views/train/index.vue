<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline">
        <el-row>
          <el-form-item label="名称">
            <el-input v-model="listQuery.Title" />
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
              v-model="SearchDate"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="listQuery.State">
              <el-option label="全部" value="" />
              <el-option label="启用" value="1" />
              <el-option label="关闭" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="listQuery.Category">
              <el-option label="访客培训" value="1" />
              <el-option label="驾驶员培训" value="2" />
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
        <el-col :span="6"><img :src="lineIcon"><img :src="listIcon" style="margin-left:20px;height:20px"><span style="margin-left:10px;clear: both;vertical-align: super;font-size: 18px;">培训列表</span></el-col>
        <el-col :span="18" style="text-align:right;padding-right:10px">
          <router-link :to="'/train/edit/0'">
            <el-button>
              添加
            </el-button>
          </router-link>
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
      <el-table-column label="名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ReleaseTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Category }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="{row}">
          <el-switch
            v-model="row.State"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            @change="stateUpdate(row)"
          />
        </template>
      </el-table-column>
      <el-table-column min-width="150px" label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/train/view/'+scope.row.Id">
            <el-button>
              查看
            </el-button>
          </router-link>
          <router-link :to="'/train/edit/'+scope.row.Id">
            <el-button>
              编辑
            </el-button>
          </router-link>
          <el-button @click="del(scope.row.Id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.PageIndex" :limit.sync="listQuery.PageSize" @pagination="getList" />

  </div>
</template>

<script>
import { getList, stateChange, delTrain } from '@/api/train'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import listIcon from '@/icons/List_Icon_2.png'
import lineIcon from '@/icons/Line_1.png'
export default {
  name: 'Train',
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
      listQuery: {
        PageIndex: 1,
        PageSize: 10,
        Title: '',
        Category: '',
        State: ''
      },
      downloadLoading: false,
      SearchDate: null
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      if (this.SearchDate != null && this.SearchDate.length > 0) {
        this.listQuery.GteReleaseTime = this.SearchDate[0]
        this.listQuery.LteReleaseTime = this.SearchDate[1]
      } else {
        this.listQuery.GteReleaseTime = ''
        this.listQuery.LteReleaseTime = ''
      }
      this.listLoading = true
      getList(this.listQuery).then(response => {
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
    },
    stateUpdate(row) {
      const data = {
        id: row.Id
      }
      stateChange(data).then(response => {
        if (response.Result !== 1) {
          this.$notify({
            title: '失败',
            message: '保存失败',
            type: 'warning',
            duration: 1000
          })
          row.State = row.State === 0 ? 1 : 0
        }
      })
    },
    del(Id) {
      const data = {
        id: Id
      }
      delTrain(data).then(response => {
        if (response.Result === 1) {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 1000
          })
          this.getList()
        } else {
          this.$notify({
            title: '失败',
            message: '保存失败',
            type: 'warning',
            duration: 1000
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
</style>
