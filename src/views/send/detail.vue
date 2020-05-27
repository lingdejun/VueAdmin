<template>
  <div class="app-container">
    <div class="content-container">
      <div style="padding-bottom: 10px;padding-top: 10px;border-bottom:1px solid #dfe6ec;border-top-right-radius: 10px;border-top-left-radius: 10px;">
        <el-row type="flex" justify="center">
          <el-col :span="6"><img :src="lineIcon"><span style="margin-left:20px;clear: both;vertical-align: top;font-size: 25px;">报送日志信息</span></el-col>
        </el-row>
      </div>
      <el-row type="flex" justify="space-around">
        <el-col :span="8">预约单号：{{ detail.Number }}</el-col>
        <el-col :span="9">接待人：{{ detail.Receiver }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-around" style="border-bottom:1px solid #dfe6ec">
        <el-col :span="8">报送门岗时间：{{ detail.SubmitTime }}</el-col>
        <el-col :span="9">邮件回复接待人时间：{{ detail.EmailTime }}</el-col>
      </el-row>
      <div style="padding-bottom: 10px;padding-top: 10px;border-bottom:1px solid #dfe6ec;border-top-right-radius: 10px;border-top-left-radius: 10px;">
        <el-row type="flex" justify="center">
          <el-col :span="6"><img :src="lineIcon"><span style="margin-left:20px;clear: both;vertical-align: top;font-size: 25px;">报送文件内容</span></el-col>
        </el-row>
        <el-row style="margin-top:10px" type="flex" justify="center">
          <el-col :span="6">起始时间：{{ detail.ArriveTime }}</el-col>
          <el-col :span="6">结束时间：{{ detail.LeaveTime }}</el-col>
          <el-col :span="6">来访事由：{{ detail.Reason }}</el-col>
        </el-row>
      </div>
      <div class="content">
        <table>
          <tr>
            <td colspan="3">来访车辆</td>
            <td colspan="3" class="text-right">{{ detail.VehicleLength }}辆</td>
          </tr>
          <tr v-for="vehicle in detail.VehicleList" :key="vehicle.index">
            <td colspan="3" class="more-td">车牌号:{{ vehicle.Number }}</td>
            <td colspan="3" class="more-td">随车人数:{{ vehicle.PassengerAmount }}人</td>
          </tr>
          <tr>
            <td colspan="3">驾驶员</td>
            <td colspan="3" class="text-right">{{ detail.DriverLength }}人</td>
          </tr>
          <tr v-for="driver in detail.DriverList" :key="driver.index">
            <td colspan="2" class="more-td">人员姓名:{{ driver.Name }}</td>
            <td colspan="2" class="more-td">国籍:{{ driver.Nation }}</td>
            <td colspan="2" class="more-td">证件号:{{ driver.IDNumber }}</td>
          </tr>
          <tr>
            <td colspan="3">其他人员</td>
            <td colspan="3" class="text-right">{{ detail.VisitorLength }}人</td>
          </tr>
          <tr v-for="vistor in detail.VisitorList" :key="vistor.index">
            <td colspan="2" class="more-td">人员姓名:{{ vistor.Name }}</td>
            <td colspan="2" class="more-td">国籍:{{ vistor.Nation }}</td>
            <td colspan="2" class="more-td">证件号:{{ vistor.IDNumber }}</td>
          </tr>
        </table>
        <!-- <el-row type="flex" justify="space-between" class="darkback">
          <el-col :span="6">来访车辆</el-col>
          <el-col :span="6">{{ detail.VehicleLength }}辆</el-col>
        </el-row>
        <el-row v-for="vehicle in detail.VehicleList" :key="vehicle.index" type="flex" justify="space-between" class="smallfont">
          <el-col :span="6">车牌号:{{ vehicle.Number }}</el-col>
          <el-col :span="6">随车人数:{{ vehicle.PassengerAmount }}人</el-col>
        </el-row> -->
        <!-- <el-row type="flex" justify="space-between" class="darkback">
          <el-col :span="6">驾驶员</el-col>
          <el-col :span="6">{{ detail.DriverLength }}人</el-col>
        </el-row>
        <el-row v-for="driver in detail.DriverList" :key="driver.index" type="flex" justify="space-between" class="smallfont">
          <el-col :span="6">人员姓名:{{ driver.Name }}</el-col>
          <el-col :span="6">国籍:{{ driver.Nation }}</el-col>
          <el-col :span="6">证件号:{{ driver.IDNumber }}</el-col>
        </el-row> -->
        <!-- <el-row type="flex" justify="space-between" class="darkback">
          <el-col :span="6">其他人员</el-col>
          <el-col :span="6">{{ detail.VisitorLength }}人</el-col>
        </el-row>
        <el-row v-for="vistor in detail.VisitorList" :key="vistor.index" type="flex" justify="space-between" class="smallfont">
          <el-col :span="6">人员姓名:{{ vistor.Name }}</el-col>
          <el-col :span="6">国籍:{{ vistor.Nation }}</el-col>
          <el-col :span="6">证件号:{{ vistor.IDNumber }}</el-col>
        </el-row> -->
        <el-row style="margin-top:10px;border:1px solid #dfe6ec">
          <el-col>备注</el-col>
        </el-row>
        <el-row style="border:1px solid #dfe6ec">
          <el-col>{{ detail.Remark }}</el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="6">
            <el-button type="primary" @click="submit">
              报备完成
            </el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { getDetail, saveSubmission } from '@/api/send'
import lineIcon from '@/icons/Line_1.png'
import editIcon from '@/icons/bookingdetail/Edit_1.png'
import carIcon from '@/icons/bookingdetail/Fill_1.png'
import personIcon from '@/icons/bookingdetail/Oval_1.png'
import comeoutIcon from '@/icons/bookingdetail/L_1.png'
import greenPointIcon from '@/icons/bookingdetail/GreenPoint_1.png'

export default {
  name: 'SendInfo',
  data() {
    return {
      lineIcon: lineIcon,
      editIcon: editIcon,
      carIcon: carIcon,
      personIcon: personIcon,
      comeoutIcon: comeoutIcon,
      greenPointIcon: greenPointIcon,
      loading: false,
      detailId: '',
      detail: null
    }
  },
  created() {
    this.detailId = this.$route.params && this.$route.params.id
    this.fetchData()
    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData() {
      const data = {
        id: this.detailId
      }
      getDetail(data).then(response => {
        if (response.Result === 1) {
          this.detail = response.Data
          this.detail.VehicleLength = response.Data.VehicleList != null ? response.Data.VehicleList.length : 0
          this.detail.DriverLength = response.Data.DriverList != null ? response.Data.DriverList.length : 0
          this.detail.VisitorLength = response.Data.VisitorList != null ? response.Data.VisitorList.length : 0
        }
      })
      console.log(1)
    },
    submit() {
      const data = {
        id: this.detailId
      }
      saveSubmission(data).then(response => {
        if (response.Result === 1) {
          this.$notify({
            title: 'Success',
            message: '报备成功',
            type: 'success',
            duration: 2000
          })
        } else {
          this.$notify({
            title: 'Fail',
            message: '报备失败',
            type: 'warning',
            duration: 2000
          })
        }
      })
    }
  }
}

</script>

<style scoped>
.app-container{
  min-height: inherit;
}
.content-container{
  background-color:#FFFFFF
}

.el-row{
  padding:10px 0 10px 20px
}
.text-right{
  text-align: right;
}
.content .el-row{
  border-bottom: 1px solid #e0e5e9;
}
.content table{
  border-collapse: collapse;
  width: 100%;
  font-size: 14px;
}
.content tr{
  border: 2px solid #dfe6ec;
}
.content td{
  padding:15px;
}
.content .more-td{
  border: 2px solid #dfe6ec;
}
.smallfont{
  font-size: 14px;
}
.darkback{
  background-color: #d5dadf;
}
</style>
