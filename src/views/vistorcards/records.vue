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
              v-model="LteReturnDateTime"
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
        <el-col :span="4"><img :src="lineIcon"><img :src="listIcon" style="margin-left:20px;height:20px"><span style="margin-left:10px;clear: both;vertical-align: super;font-size: 18px;">访客卡列表</span></el-col>
        <el-col :span="20" style="text-align:right;padding-right:10px">
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
import { getCards } from '@/api/vistorcards'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import listIcon from '@/icons/List_Icon_2.png'
import lineIcon from '@/icons/Line_1.png'
export default {
  name: 'VistorCardsRecords',
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
        UserName: '',
        Mobile: '',
        ReceiverName: '',
        ReceiverEmail: ''
      },
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
