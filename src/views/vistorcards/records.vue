<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline">
        <el-row>
          <el-form-item label="使用人">
            <el-input v-model="listQuery.UserName" />
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="listQuery.Mobile" />
          </el-form-item>
          <el-form-item label="领取时间">
            <el-date-picker
              v-model="GetDateTime"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="接待人">
            <el-input v-model="listQuery.ReceiverName" />
          </el-form-item>
          <el-form-item label="接待人邮箱">
            <el-input v-model="listQuery.ReceiverEmail" />
          </el-form-item>
          <el-form-item label="归还时间">
            <el-date-picker
              v-model="ReturnDateTime"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
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
        <el-col :span="6"><img :src="lineIcon"><img :src="listIcon" style="margin-left:20px;height:20px"><span style="margin-left:10px;clear: both;vertical-align: super;font-size: 18px;">使用记录</span></el-col>
        <el-col :span="18" style="text-align:right;padding-right:10px">
          <el-button v-waves class="filter-item" @click="handleDownload">
            导出
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
      <el-table-column label="使用人" align="center">
        <template slot-scope="{row}">
          <span>{{ row.UserName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column label="领取时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.TakeTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="归还时间" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ReturnTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="接待人" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ReceiverName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="接待人邮箱" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ReceiverEmail }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.PageIndex" :limit.sync="listQuery.PageSize" @pagination="getList" />

  </div>
</template>

<script>
import { getRecords, downloadRecord } from '@/api/vistorcards'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import listIcon from '@/icons/List_Icon_2.png'
import lineIcon from '@/icons/Line_1.png'
export default {
  name: 'VistorCardsRecords',
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
        UserName: '',
        Mobile: '',
        ReceiverName: '',
        ReceiverEmail: '',
        GteTakeTime: '',
        LteTakeTime: '',
        GteReturnTime: '',
        LteReturnTime: ''
      },
      GetDateTime: null,
      ReturnDateTime: null,
      downloadLoading: false
    }
  },
  created() {
    const cardId = this.$route.params && this.$route.params.id
    this.listQuery.CardId = cardId
    this.getList()
  },
  methods: {
    getList() {
      if (this.GetDateTime != null && this.GetDateTime.length > 0) {
        this.listQuery.GteTakeTime = this.GetDateTime[0]
        this.listQuery.LteTakeTime = this.GetDateTime[1]
      } else {
        this.listQuery.GteTakeTime = ''
        this.listQuery.LteTakeTime = ''
      }
      if (this.ReturnDateTime != null && this.ReturnDateTime.length > 0) {
        this.listQuery.GteReturnTime = this.GetDateTime[0]
        this.listQuery.LteReturnTime = this.GetDateTime[1]
      } else {
        this.listQuery.GteReturnTime = ''
        this.listQuery.LteReturnTime = ''
      }
      this.listLoading = true
      getRecords(this.listQuery).then(response => {
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
    handleDownload() {
      this.downloadLoading = true
      downloadRecord(this.listQuery).then(response => {
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
