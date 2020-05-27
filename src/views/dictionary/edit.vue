<template>
  <div class="app-container">
    <div style="padding-bottom: 10px;padding-top: 10px;background-color:#FFFFFF;border:1px solid #dfe6ec;border-top-right-radius: 10px;border-top-left-radius: 10px;">
      <el-row>
        <el-col :span="6"><img :src="lineIcon"><img :src="listIcon" style="margin-left:20px;height:20px"><span style="margin-left:10px;clear: both;vertical-align: super;font-size: 18px;">{{ title }}</span></el-col>
        <el-col :span="18" style="text-align:right;padding-right:10px">
          <el-button v-waves class="filter-item" @click="addItem">
            添加{{ title }}
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
      <el-table-column label="编号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.SN }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="title" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Name }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="listQuery.pid==1" label="是否必填备注" align="center">
        <template slot-scope="{row}">
          <span>{{ row.RemarkRequired }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="listQuery.pid==2" label="关联项" align="center">
        <template slot-scope="{row}">
          <span>{{ row.Children }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" label="操作" align="center">
        <template slot-scope="{row}">
          <el-button @click="edit(row)">
            编辑
          </el-button>
          <el-button @click="del(row.Id)">
            删除
          </el-button>
          <el-button @click="move(row.Id,-1)">
            上移
          </el-button>
          <el-button @click="move(row.Id,1)">
            下移
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="textReasonMap[dialogReasonStatus]" :visible.sync="dialogReasonFormVisible">
      <el-form ref="dataReasonForm" :rules="reasonRules" :model="reasonModel" label-position="right" label-width="110px" style="width: 400px; margin-left:50px;">
        <el-form-item label="来访理由名称" prop="Name">
          <el-input v-model="reasonModel.Name" />
        </el-form-item>
        <el-form-item label="是否必填备注" prop="RemarkRequired">
          <el-select v-model="reasonModel.RemarkRequired">
            <el-option label="否" value="0" />
            <el-option label="是" value="1" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="dialogReasonFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="saveReason">
          保存
        </el-button>
      </div>
    </el-dialog>
    <el-dialog :title="textAreaMap[dialogAreaStatus]" :visible.sync="dialogAreaFormVisible">
      <el-form ref="dataAreaForm" :rules="areaRules" :model="areaModel" label-position="right" label-width="110px" style="width: 400px; margin-left:50px;">
        <el-form-item label="来访区域名称" prop="Name">
          <el-input v-model="areaModel.Name" />
        </el-form-item>
        <el-form-item label="关联项">
          <vue-tags-input
            v-model="Tag"
            :tags="areaTags"
            @tags-changed="newTags => areaTags = newTags"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="dialogAreaFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogAreaStatus==='add'?saveArea():updateArea()">
          保存
        </el-button>
      </div>
    </el-dialog>
    <el-dialog :title="textCertificateMap[dialogCertificateStatus]" :visible.sync="dialogCertificateFormVisible">
      <el-form ref="dataForm" :rules="idRules" :model="certificateModel" label-position="right" label-width="80px" style="width: 400px; margin-left:50px;">
        <el-form-item label="证件类型" prop="Name">
          <el-input v-model="certificateModel.Name" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="dialogCertificateFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="saveCertificate">
          保存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getItemList, getChildList, saveItem, delItem, moveItem } from '@/api/dictionary'
import waves from '@/directive/waves' // waves directive
import listIcon from '@/icons/List_Icon_2.png'
import lineIcon from '@/icons/Line_1.png'
import VueTagsInput from '@johmun/vue-tags-input'
export default {
  name: 'DictionaryEdit',
  components: {
    VueTagsInput
  },
  directives: { waves },
  data() {
    return {
      listIcon: listIcon,
      lineIcon: lineIcon,
      tableKey: 0,
      list: null,
      listLoading: true,
      listQuery: {
        pid: ''
      },
      title: '',
      downloadLoading: false,
      dialogReasonFormVisible: false,
      dialogAreaFormVisible: false,
      dialogCertificateFormVisible: false,
      textReasonMap: {
        update: '编辑来访理由',
        add: '添加来访理由'
      },
      textAreaMap: {
        update: '编辑来访区域',
        add: '添加来访区域'
      },
      textCertificateMap: {
        update: '编辑证件类型',
        add: '添加证件类型'
      },
      dialogReasonStatus: 'add',
      dialogAreaStatus: 'add',
      dialogCertificateStatus: 'add',
      reasonModel: {
        Id: 0,
        Pid: '',
        Name: '',
        RemarkRequired: '0'
      },
      certificateModel: {
        Id: 0,
        Pid: '',
        Name: ''
      },
      areaModel: {
        Name: ''
      },
      areaTags: [],
      Tag: '',
      reasonRules: {
        Name: [
          { required: true, message: '请输入来访理由名称', trigger: 'blur' }
        ],
        RemarkRequired: [
          { required: true, message: '是否必填备注', trigger: 'blur' }
        ]
      },
      areaRules: {
        Name: [
          { required: true, message: '请输入来访区域名称', trigger: 'blur' }
        ]
      },
      idRules: {
        Name: [
          { required: true, message: '请输入证件类型', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.listQuery.pid = this.$route.params && this.$route.params.id
    this.title = this.$route.params && this.$route.params.title
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getItemList(this.listQuery).then(response => {
        this.list = response.Data

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    addItem() {
      if (this.listQuery.pid === '1') {
        this.dialogReasonStatus = 'add'
        this.dialogReasonFormVisible = true
        this.reasonModel = {
          Id: 0,
          Pid: this.listQuery.pid,
          Name: '',
          RemarkRequired: '0'
        }
        this.$nextTick(() => {
          this.$refs['dataReasonForm'].clearValidate()
        })
        console.log(111)
      }
      if (this.listQuery.pid === '2') {
        this.dialogAreaFormVisible = 'add'
        this.dialogAreaFormVisible = true
        this.areaModel = {}
        this.$nextTick(() => {
          this.$refs['dataAreaForm'].clearValidate()
        })
        console.log(111)
      }
      if (this.listQuery.pid === '3') {
        this.dialogCertificateStatus = 'add'
        this.dialogCertificateFormVisible = true
        this.certificateModel = {
          Id: 0,
          Pid: this.listQuery.pid,
          Name: ''
        }
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
        console.log(111)
      }
    },
    edit(row) {
      if (this.listQuery.pid === '1') {
        this.reasonModel = Object.assign({}, row)
        this.reasonModel.RemarkRequired = row.RemarkRequired === '否' ? '0' : '1'
        this.dialogReasonStatus = 'update'
        this.dialogReasonFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataReasonForm'].clearValidate()
        })
        console.log(111)
      }
      if (this.listQuery.pid === '2') {
        this.getChild(row.Id)
        this.dialogAreaStatus = 'update'
        this.dialogAreaFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataAreaForm'].clearValidate()
        })
        console.log(111)
      }
      if (this.listQuery.pid === '3') {
        this.certificateModel = Object.assign({}, row)
        this.certificateModel.RemarkRequired = row.RemarkRequired === '否' ? '0' : '1'
        this.dialogCertificateStatus = 'update'
        this.dialogCertificateFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
        console.log(111)
      }
    },
    getChild(Id) {
      const data = {
        id: Id
      }
      getChildList(data).then(response => {
        this.areaModel = response.Data
        this.areaTags = response.Data.Children.map(item => {
          return {
            id: item.Id,
            text: item.Name
          }
        })
        console.log(this.areaModel)
      })
    },
    saveReason() {
      this.$refs['dataReasonForm'].validate((valid) => {
        if (valid) {
          saveItem(this.reasonModel).then(response => {
            if (response.Result === 1) {
              this.$notify({
                title: 'Success',
                message: '保存成功',
                type: 'success',
                duration: 1000
              })
              this.dialogReasonFormVisible = false
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
        } else {
          return false
        }
      })
    },
    saveArea() {
      if (this.areaTags.length <= 0) {
        this.$message.error('请选择关联项')
        return false
      }

      this.$refs['dataAreaForm'].validate((valid) => {
        if (valid) {
          this.areaModel.Pid = this.listQuery.pid
          if (this.areaTags.length > 0) {
            const children = this.areaTags.map(item => {
              return {
                Name: item.text
              }
            })
            this.areaModel.Children = children
          }
          saveItem(this.areaModel).then(response => {
            if (response.Result === 1) {
              this.$notify({
                title: 'Success',
                message: '保存成功',
                type: 'success',
                duration: 1000
              })
              this.dialogAreaFormVisible = false
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
        } else {
          return false
        }
      })
    },
    updateArea() {
      if (this.areaTags.length <= 0) {
        this.$message.error('请选择关联项')
        return false
      }
      this.$refs['dataAreaForm'].validate((valid) => {
        if (valid) {
          const childPid = this.areaModel.Id
          if (this.areaTags.length > 0) {
            const children = this.areaTags.map(item => {
              const id = item.hasOwnProperty('id') ? item.id : '0'
              return {
                Id: id,
                Pid: childPid,
                Name: item.text
              }
            })
            this.areaModel.Children = children
          }
          saveItem(this.areaModel).then(response => {
            if (response.Result === 1) {
              this.$notify({
                title: 'Success',
                message: '保存成功',
                type: 'success',
                duration: 1000
              })
              this.dialogAreaFormVisible = false
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
        } else {
          return false
        }
      })
    },
    saveCertificate() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          saveItem(this.certificateModel).then(response => {
            if (response.Result === 1) {
              this.$notify({
                title: 'Success',
                message: '保存成功',
                type: 'success',
                duration: 1000
              })
              this.dialogCertificateFormVisible = false
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
        } else {
          return false
        }
      })
    },
    del(Id) {
      const data = {
        id: Id
      }
      delItem(data).then(response => {
        if (response.Result === 1) {
          this.$notify({
            title: 'Success',
            message: '删除成功',
            type: 'success',
            duration: 1000
          })
          this.dialogReasonFormVisible = false
          this.getList()
        } else {
          this.$notify({
            title: 'Fail',
            message: '删除失败',
            type: 'warning',
            duration: 1000
          })
        }
      })
    },
    move(Id, Offest) {
      const data = {
        id: Id,
        offset: Offest
      }
      const tip = Offest > 0 ? '下移' : '上移'
      moveItem(data).then(response => {
        if (response.Result === 1) {
          this.$notify({
            title: 'Success',
            message: tip + '成功',
            type: 'success',
            duration: 1000
          })
          this.dialogReasonFormVisible = false
          this.getList()
        } else {
          this.$notify({
            title: 'Fail',
            message: tip + '失败',
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
