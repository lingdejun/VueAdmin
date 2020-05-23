<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline">
        <el-row>
          <el-form-item label="卡号">
            <el-input v-model="listQuery.Number" />
          </el-form-item>
          <el-form-item label="序列号">
            <el-input v-model="listQuery.SN" />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="State">
              <el-option label="已归还" value="0" />
              <el-option label="使用中" value="1" />
              <el-option label="已作废" value="-1" />
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
        <el-col :span="6"><img :src="lineIcon"><img :src="listIcon" style="margin-left:20px;height:20px"><span style="margin-left:10px;clear: both;vertical-align: super;font-size: 18px;">访客卡列表</span></el-col>
        <el-col :span="18" style="text-align:right;padding-right:10px">
          <el-button v-waves class="filter-item" @click="handleFilter">
            批量导入
          </el-button>
          <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
            下载模板
          </el-button>
          <el-button v-waves class="filter-item" @click="addCard">
            添加
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
      <el-table-column label="卡号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="序列号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.SN }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="{row}">
          <span>{{ row.State+'' | stateFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" label="操作" align="center">
        <template slot-scope="scope">
          <router-link :to="'/vistorcards/records/'+scope.row.Id">
            <el-button>
              使用记录
            </el-button>
          </router-link>
          <el-button :disabled="scope.row.State==-1" @click="obsoleteCard(scope.row.Id)">
            作废
          </el-button>
          <el-button :disabled="scope.row.State===0 || scope.row.State==-1" @click="restCard(scope.row.Id)">
            重置状态
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.PageIndex" :limit.sync="listQuery.PageSize" @pagination="getList" />

    <el-dialog title="添加卡片" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="cardModel" label-position="right" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="卡号" prop="Number">
          <el-input v-model="cardModel.Number" />
        </el-form-item>
        <el-form-item label="序列号" prop="SN">
          <el-input v-model="cardModel.SN" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="save">
          保存
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { getCards, obsolete, reset, add, downloadTemplate } from '@/api/vistorcards'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import listIcon from '@/icons/List_Icon_2.png'
import lineIcon from '@/icons/Line_1.png'
export default {
  name: 'VistorCardsList',
  components: { Pagination },
  directives: { waves },
  filters: {
    stateFilter(state) {
      const stateMap = {
        '0': '已归还',
        '1': '使用中',
        '-1': '已作废',
        '-9': '异常'
      }
      return stateMap[state]
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
      State: '',
      listQuery: {
        PageIndex: 1,
        PageSize: 10,
        SN: '',
        Number: ''
      },
      downloadLoading: false,
      dialogFormVisible: false,
      cardModel: {
        Number: '',
        SN: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      if (this.State !== '') {
        this.listQuery.State = this.State
      }
      this.listLoading = true
      getCards(this.listQuery).then(response => {
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
      downloadTemplate({}).then(response => {
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
    addCard() {
      this.dialogFormVisible = true
      this.cardModel = {
        Number: '',
        SN: ''
      }
      console.log('add card')
    },
    obsoleteCard(Id) {
      const data = {
        id: Id
      }
      obsolete(data).then(response => {
        this.$notify({
          title: 'Success',
          message: '保存成功',
          type: 'success',
          duration: 2000
        })
        this.getList()
      })
    },
    restCard(Id) {
      const data = {
        id: Id
      }
      reset(data).then(response => {
        this.$notify({
          title: 'Success',
          message: '保存成功',
          type: 'success',
          duration: 2000
        })
        this.getList()
      })
    },
    save() {
      add(this.cardModel).then(response => {
        this.$notify({
          title: 'Success',
          message: '保存成功',
          type: 'success',
          duration: 2000
        })
        this.getList()
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
