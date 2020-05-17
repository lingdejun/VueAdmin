<template>
  <div class="app-container">
    <div style="padding-bottom: 10px;padding-top: 10px;background-color:#FFFFFF;border:1px solid #dfe6ec;border-top-right-radius: 10px;border-top-left-radius: 10px;">
      <el-row>
        <el-col :span="4"><img :src="lineIcon"><img :src="listIcon" style="margin-left:20px"><span style="margin-left:10px;clear: both;vertical-align: top;font-size: 25px;">角色列表</span></el-col>
        <el-col :span="8" :offset="12" style="text-align:center">
          <el-button v-waves class="filter-item" @click="addRole">
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
      <el-table-column label="角色编号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Number }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色名称" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="分配权限" align="center">
        <template slot-scope="{row}">
          <el-button plain size="mini" @click="editPermission(row)">
            分配权限
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="人员配置" align="center">
        <template slot-scope="{row}">
          <el-button plain type="info" size="mini" @click="editEmployeeSet(row)">
            配置
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="editRole(row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="deleteRole(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="roleModel" label-position="right" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="角色名称" prop="Number">
          <el-input v-model="roleModel.Number" />
        </el-form-item>
        <el-form-item label="角色编号" prop="Name">
          <el-input v-model="roleModel.Name" />
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

    <el-dialog title="分配权限" :visible.sync="setPermissionFormVisible">
      <!-- <el-tree
        :data="permissionList"
        show-checkbox
        node-key="id"
        :props="defaultProps">
      </el-tree> -->
      <div style="text-align:center">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="permissionSetSave()">
          保存
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="人员配置" :visible.sync="employeeSetFormVisible">
      <el-form :inline="true" :model="employeeSearchModel" class="demo-form-inline">
        <el-row>
          <el-form-item label="员工编号">
            <el-input v-model="employeeSearchModel.Number" />
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="employeeSearchModel.Name" />
          </el-form-item>
          <el-form-item>
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
              搜索
            </el-button>
          </el-form-item>
        </el-row>
      </el-form>
      <el-table
        ref="multipleTable"
        :data="empList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          prop="Name"
          label="员工姓名"
          width="120"
        />
        <el-table-column
          prop="Number"
          label="员工姓名"
        />
      </el-table>
      <pagination v-show="employeeTotal>0" :total="employeeTotal" :page.sync="employeeSearchModel.PageIndex" :limit.sync="employeeSearchModel.PageSize" @pagination="getEmp" />
      <div style="text-align:center">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="employeeSetSave()">
          保存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRoles, createRole, delRole, getRoleEmp, saveEmp } from '@/api/rolemanage'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import listIcon from '@/icons/List_Icon_2.png'
import lineIcon from '@/icons/Line_1.png'
export default {
  name: 'Roles',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      listIcon: listIcon,
      lineIcon: lineIcon,
      tableKey: 0,
      list: null,
      listLoading: true,
      downloadLoading: false,
      dialogFormVisible: false,
      employeeSetFormVisible: false,
      setPermissionFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑角色',
        add: '添加角色'
      },
      roleModel: {
        Id: 0,
        Number: '',
        Name: ''
      },
      employeeTotal: 0,
      employeeSearchModel: {
        PageIndex: 1,
        PageSize: 10,
        Name: '',
        Number: '',
        RoleId: ''
      },
      multipleSelection: [],
      empList: null,
      permission: {
        Number: '',
        Name: ''
      },
      permissionList: null,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getRoles().then(response => {
        console.log(response)
        this.list = response.Data

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getEmp() {
      getRoleEmp(this.employeeSearchModel).then(response => {
        console.log(response)
        // this.empList = response.Data.Items
        this.employeeSearchModel.PageIndex = response.Data.PageIndex
        this.empList = response.Data.Items
        this.employeeTotal = response.Data.TotalReadCount

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 2 * 1000)
      }).then(() => {
        // 设置选中状态
        this.empList.forEach(item => {
          if (item.Checked === 1) {
            this.$refs.multipleTable.toggleRowSelection(item, true)
          }
        })
      })
    },
    resetTemp() {
      this.roleModel = {
        Id: 0,
        Number: '',
        Name: ''
      }
    },
    handleFilter() {
      this.getEmp()
    },
    addRole() {
      this.resetTemp()
      this.dialogStatus = 'add'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    editRole(row) {
      this.roleModel = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    deleteRole(row, index) {
      delRole(this.roleModel).then(() => {
        this.list.splice(index, 1)
        this.$notify({
          title: 'Success',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    editPermission(row) {
      this.setPermissionFormVisible = true
    },
    editEmployeeSet(row) {
      this.employeeSetFormVisible = true
      this.employeeSearchModel.RoleId = row.Id
      this.getEmp()
    },
    save() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createRole(this.roleModel).then(() => {
            this.list.unshift(this.roleModel)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '保存成功',
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
          const tempData = Object.assign({}, this.roleModel)
          createRole(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.roleModel.id)
            this.list.splice(index, 1, this.roleModel)
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
    permissionSetSave() {

    },
    employeeSetSave() {
      const Ids = this.multipleSelection.map(item => {
        return item.Id
      })
      const data = {
        roleId: this.employeeSearchModel.RoleId,
        empIds: Ids
      }
      saveEmp(data).then(() => {
        this.employeeSetFormVisible = true
        this.$notify({
          title: 'Success',
          message: '保存成功',
          type: 'success',
          duration: 2000
        })
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
    handleSelectionChange(val) {
      this.multipleSelection = val
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
