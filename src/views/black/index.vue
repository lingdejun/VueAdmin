<template>
  <div class="app-container">
    <div class="filter-container" style="margin-top:10px">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline">
        <el-row>
          <el-form-item label="访客单位">
            <el-input v-model="listQuery.Company" />
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="listQuery.Name" />
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="listQuery.Mobile" />
          </el-form-item>
          <!-- <el-form-item label="国籍">
            <el-select v-model="listQuery.Vip">
              <el-option label="全部" value="" />
              <el-option label="关闭" value="0" />
              <el-option label="开启" value="1" />
            </el-select>
          </el-form-item> -->
        </el-row>
        <el-row>
          <el-form-item label="证件类型">
            <el-select v-model="listQuery.IDType" clearable class="filter-item" style="width: 130px">
              <el-option v-for="item in idTypeOptions" :key="item.Value" :label="item.Key" :value="item.Value" />
            </el-select>
          </el-form-item>
          <el-form-item label="证件号">
            <el-input v-model="listQuery.IDNumber" />
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
        <el-col :span="18" style="text-align:right;padding-right:10px">
          <el-button v-waves class="filter-item" @click="addBlackItem">
            添加黑名单
          </el-button>
          <el-button v-waves class="filter-item" @click="exportData">
            黑名单导出
          </el-button>
          <el-upload
            class="upload-demo inline-block"
            :headers="uploadHeaders"
            :action="fileUrl"
            :on-success="fileSuccess"
            :multiple="false"
          >
            <el-button class="filter-item">黑名单导入</el-button>
          </el-upload>
          <el-button v-waves class="filter-item" @click="download">
            模板下载
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
      <el-table-column label="序号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="来访单位" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Company }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Gender }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Mobile }}</span>
        </template>
      </el-table-column>
      <el-table-column label="国籍" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Nation }}</span>
        </template>
      </el-table-column>
      <el-table-column label="证件类型" align="center">
        <template slot-scope="{row}">
          <span>{{ row.IDTypeText }}</span>
        </template>
      </el-table-column>
      <el-table-column label="证件号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ID_Number }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="200px" label="操作" align="center">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="view(row)">
            查看
          </el-button>
          <el-button type="primary" size="mini" @click="editBlackItem(row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="deleteBlackItem(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.PageIndex" :limit.sync="listQuery.PageSize" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="blackModel" label-position="right" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="访客单位" prop="Company">
          <el-input v-model="blackModel.Company" />
        </el-form-item>
        <el-form-item label="姓名" prop="Name">
          <el-input v-model="blackModel.Name" />
        </el-form-item>
        <el-form-item label="性别" prop="Gender">
          <el-radio v-model="blackModel.Gender" label="1">男</el-radio>
          <el-radio v-model="blackModel.Gender" label="0">女</el-radio>
        </el-form-item>
        <el-form-item label="联系电话" prop="Mobile">
          <el-input v-model="blackModel.Mobile" />
        </el-form-item>
        <el-form-item label="国籍" prop="Nation">
          <el-input v-model="blackModel.Nation" />
        </el-form-item>
        <el-form-item label="证件类型">
          <el-select v-model="blackModel.ID_Type" clearable class="filter-item" style="width: 130px">
            <el-option v-for="item in idTypeOptions" :key="item.Value" :label="item.Key" :value="item.Value" />
          </el-select>
        </el-form-item>
        <el-form-item label="证件号" prop="ID_Number">
          <el-input v-model="blackModel.ID_Number" />
        </el-form-item>
        <el-form-item label="备注" prop="Remark">
          <el-input v-model="blackModel.Remark" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='add'?save():update()">
          保存
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="查看" :visible.sync="dialogViewFormVisible">
      <el-form :model="blackModel" label-position="right" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="访客单位" prop="Company">
          <span>{{ blackModel.Company }}</span>
        </el-form-item>
        <el-form-item label="姓名" prop="Name">
          <span>{{ blackModel.Name }}</span>
        </el-form-item>
        <el-form-item label="性别" prop="Gender">
          <span>{{ blackModel.Gender }}</span>
        </el-form-item>
        <el-form-item label="联系电话" prop="Mobile">
          <span>{{ blackModel.Mobile }}</span>
        </el-form-item>
        <el-form-item label="国籍" prop="Nation">
          <span>{{ blackModel.Nation }}</span>
        </el-form-item>
        <el-form-item label="证件类型" prop="IDTypeText">
          <span>{{ blackModel.IDTypeText }}</span>
        </el-form-item>
        <el-form-item label="证件号" prop="ID_Number">
          <span>{{ blackModel.ID_Number }}</span>
        </el-form-item>
        <el-form-item label="备注" prop="Remark">
          <span>{{ blackModel.Remark }}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="dialogViewFormVisible = false">
          取消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, saveBlack, delBlack, downloadBlack, exportBlack } from '@/api/black'
import { fetchIdType } from '@/api/controlevalue'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import listIcon from '@/icons/List_Icon_2.png'
import lineIcon from '@/icons/Line_1.png'
export default {
  name: 'Black',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      uploadHeaders: {
        'LoginId': '123'
      },
      fileUrl: 'http://test6.topbpm.com/visitbgapi/blacklist/import',
      listIcon: listIcon,
      lineIcon: lineIcon,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        PageIndex: 1,
        PageSize: 10,
        Company: '',
        Name: '',
        Mobile: '',
        Nation: '',
        IDType: '',
        IDNumber: ''
      },
      downloadLoading: false,
      dialogFormVisible: false,
      dialogViewFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        add: '添加'
      },
      blackModel: {
        Id: '',
        Company: '',
        Name: '',
        Gender: '',
        Mobile: '',
        Nation: '',
        ID_Type: '',
        IDTypeText: '',
        ID_Number: '',
        Remark: ''
      },
      idTypeOptions: []
    }
  },
  created() {
    this.getList()
    this.getIdType()
  },
  methods: {
    getList() {
      this.listLoading = true
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
    getIdType() {
      fetchIdType().then(response => {
        console.log(response)
        this.idTypeOptions = response.Data
      })
    },
    handleFilter() {
      this.listQuery.PageIndex = 1
      this.getList()
    },
    resetTemp() {
      this.blackModel = {
        Id: 0,
        Company: '',
        Name: '',
        Gender: '',
        Mobile: '',
        Nation: '',
        ID_Type: '',
        IDTypeText: '',
        ID_Number: '',
        Remark: ''
      }
    },
    addBlackItem() {
      this.resetTemp()
      this.dialogStatus = 'add'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    view(row) {
      this.blackModel = Object.assign({}, row) // copy obj
      this.dialogViewFormVisible = true
    },
    editBlackItem(row) {
      this.blackModel = Object.assign({}, row) // copy obj
      this.blackModel.Gender = this.blackModel.Gender === '男' ? '1' : '0'
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    deleteBlackItem(row, index) {
      const para = {
        id: row.Id
      }
      delBlack(para).then(() => {
        this.list.splice(index, 1)
        this.$notify({
          title: 'Success',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    save() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          saveBlack(this.blackModel).then(() => {
            this.list.unshift(this.blackModel)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '添加成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        }
      })
    },
    update() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.blackModel)
          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          saveBlack(tempData).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        }
      })
    },
    download() {
      this.downloadLoading = true
      downloadBlack({}).then(response => {
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
    exportData() {
      this.downloadLoading = true
      exportBlack(this.listQuery).then(response => {
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
    },
    fileSuccess(response, file, fileList) {
      let html = '<div><span>新增：' + response.Added + '</span></div>'
      html += '<div><span>删除：' + response.Deleted + '</span></div>'
      html += '<div><span>信息变更：' + response.Updated + '</span></div>'
      html += '<div><span>消息：' + response.Info + '</span></div>'
      this.$alert(html, '导入结果', {
        dangerouslyUseHTMLString: true
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
