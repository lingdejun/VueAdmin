<template>
  <div class="app-container">
    <div>
      <el-row>
        <el-radio-group v-model="category" @change="categoryChange">
          <el-radio-button label="1">赛科员工</el-radio-button>
          <el-radio-button label="2">前台安保</el-radio-button>
        </el-radio-group>
      </el-row>
    </div>
    <div class="filter-container" style="margin-top:10px">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline">
        <el-row v-if="category==1">
          <el-form-item label="员工编号">
            <el-input v-model="listQuery.Number" />
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="listQuery.Name" />
          </el-form-item>
          <el-form-item label="员工邮箱">
            <el-input v-model="listQuery.Email" />
          </el-form-item>
          <el-form-item label="VIP通道使用权限">
            <el-select v-model="listQuery.Vip">
              <el-option label="全部" value="" />
              <el-option label="关闭" value="0" />
              <el-option label="开启" value="1" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
              搜索
            </el-button>
          </el-form-item>
        </el-row>
        <el-row v-if="category!=1">
          <el-form-item label="员工编号">
            <el-input v-model="listQuery.Number" />
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="listQuery.Name" />
          </el-form-item>
          <el-form-item label="对应门岗">
            <el-select v-model="listQuery.Gate" clearable class="filter-item" style="width: 130px">
              <el-option v-for="item in gateOptions" :key="item.Value" :label="item.Key" :value="item.Value" />
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
        <el-col :span="6"><img :src="lineIcon"><img :src="listIcon" style="margin-left:20px;height:20px"><span style="margin-left:10px;clear: both;vertical-align: super;font-size: 18px;">结果列表</span></el-col>
        <el-col :span="18" style="text-align:right;padding-right:10px">
          <el-button v-waves class="filter-item" @click="addEmployee">
            添加
          </el-button>
          <el-button v-waves class="filter-item" @click="download">
            下载模板
          </el-button>
          <el-upload
            class="upload-demo inline-block"
            :headers="uploadHeaders"
            :action="fileUrl"
            :on-success="fileSuccess"
            :multiple="false"
          >
            <el-button size="small" type="primary">上传文件</el-button>
          </el-upload>
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
      <el-table-column label="Id" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="员工编号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Name }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="category==1" label="邮箱" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Email }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="category==1" label="可否使用VIP通道" align="center">
        <template slot-scope="{row}">
          <span v-if="row.Vip==0">关闭</span>
          <span v-if="row.Vip==1">开启</span>
        </template>
      </el-table-column>
      <el-table-column v-if="category!=1" label="对应门岗" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Gate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="editEmployee(row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="deleteEmployee(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.PageIndex" :limit.sync="listQuery.PageSize" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="employeeModel" label-position="right" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="员工编号" prop="Number">
          <el-input v-model="employeeModel.Number" />
        </el-form-item>
        <el-form-item label="姓名" prop="Name">
          <el-input v-model="employeeModel.Name" />
        </el-form-item>
        <el-form-item label="邮箱" prop="Email">
          <el-input v-model="employeeModel.Email" />
        </el-form-item>
        <el-form-item label="员工类型" prop="Category">
          <el-radio v-model="employeeModel.Category" label="1">赛科员工</el-radio>
          <el-radio v-model="employeeModel.Category" label="2">前台安保</el-radio>
        </el-form-item>
        <el-form-item label="可否使用vip通道" prop="Vip" label-width="auto">
          <el-radio v-model="employeeModel.Vip" label="1">启用</el-radio>
          <el-radio v-model="employeeModel.Vip" label="0">关闭</el-radio>
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
  </div>
</template>

<script>
import { fetchList, createEmployee, updateEmployee, delEmployee, downloadTemplate } from '@/api/employee'
import { fetchGateArea } from '@/api/controlevalue'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import listIcon from '@/icons/List_Icon_2.png'
import lineIcon from '@/icons/Line_1.png'
export default {
  name: 'EmployeeManager',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      uploadHeaders: {
        'LoginId': '123'
      },
      fileUrl: 'http://test6.topbpm.com/visitbgapi/emp/import',
      listIcon: listIcon,
      lineIcon: lineIcon,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        PageIndex: 1,
        PageSize: 10,
        Name: '',
        Number: '',
        Vip: '',
        Gate: ''
      },
      downloadLoading: false,
      category: 1,
      vip: '',
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑员工',
        add: '添加员工'
      },
      employeeModel: {
        Id: '',
        Category: 1,
        Name: '',
        Number: '',
        Email: '',
        Vip: ''
      },
      gateOptions: []
    }
  },
  created() {
    this.getList()
    this.getGateArea()
  },
  methods: {
    getList() {
      if (this.vip !== '') {
        this.listQuery.vip = this.vip
      }
      this.listQuery.Category = this.category
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
    getGateArea() {
      fetchGateArea().then(response => {
        console.log(response)
        this.gateOptions = response.Data
      })
    },
    categoryChange() {
      this.listQuery.Name = ''
      this.listQuery.Number = ''
      this.listQuery.Vip = ''
      this.listQuery.Gate = ''
      this.getList()
    },
    handleFilter() {
      this.listQuery.PageIndex = 1
      this.getList()
    },
    resetTemp() {
      this.employeeModel = {
        Id: '',
        Category: '1',
        Name: '',
        Number: '',
        Email: '',
        Vip: '0'
      }
    },
    addEmployee() {
      this.resetTemp()
      this.dialogStatus = 'add'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    editEmployee(row) {
      this.employeeModel = Object.assign({}, row) // copy obj
      this.employeeModel.Category = this.employeeModel.Category + ''
      this.employeeModel.Vip = this.employeeModel.Vip + ''
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    deleteEmployee(row, index) {
      const para = {
        id: row.Id
      }
      delEmployee(para).then(() => {
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
          createEmployee(this.employeeModel).then(() => {
            this.list.unshift(this.employeeModel)
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
          const tempData = Object.assign({}, this.employeeModel)
          // tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateEmployee(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.employeeModel.id)
            this.list.splice(index, 1, this.employeeModel)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    download() {
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
