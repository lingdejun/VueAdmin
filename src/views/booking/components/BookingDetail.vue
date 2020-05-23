<template>
  <div class="app-container">
    <div class="content-container">
      <div style="padding-bottom: 10px;padding-top: 10px;border-bottom:1px solid #dfe6ec;border-top-right-radius: 10px;border-top-left-radius: 10px;">
        <el-row>
          <el-col :span="4"><img :src="lineIcon"><span style="margin-left:20px;clear: both;vertical-align: top;font-size: 25px;">预约单详情</span></el-col>
        </el-row>
      </div>
      <div class="detail-container">
        <div style="border-bottom: 2px solid #eef0f3;"><img :src="editIcon"><span style="margin-left:20px;clear: both;vertical-align: top;font-size: 15px;">{{ formTitle }}</span></div>
        <el-form v-if="category==='1'" :inline="true" label-position="left" :model="appointmentInfo" class="demo-form-inline" style="background-color: #f5f5fa;padding: 20px 0 0 20px;">
          <el-row>
            <el-col :span="8">
              <el-form-item label="预约日期">
                <el-input v-model="appointmentInfo.AppointmentDate" readonly />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="预计到达时间">
                <el-input v-model="appointmentInfo.ArriveTime" readonly />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="预计离开时间">
                <el-input v-model="appointmentInfo.LeaveTime" readonly />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="接待人姓名">
                <el-input v-model="appointmentInfo.ReceiverName" readonly />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="接待人邮箱">
                <el-input v-model="appointmentInfo.ReceiverEmail" readonly />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="需要协助获得出入许可">
                <el-radio v-model="appointmentInfo.CIAPass" disabled label="是">需要</el-radio>
                <el-radio v-model="appointmentInfo.CIAPass" disabled label="否">不需要</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="来访事由">
                <el-input v-model="appointmentInfo.Reason" readonly />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="预约入口">
                <el-input v-model="appointmentInfo.Source" readonly />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="备注">
                <el-input v-model="appointmentInfo.Remark" readonly />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-form v-if="category==='2'" :inline="true" label-position="left" :model="vipAppointmentInfo" class="demo-form-inline" style="background-color: #f5f5fa;padding: 20px 0 0 20px;">
          <el-row>
            <el-col :span="12">
              <el-form-item label="起始时间">
                <el-input v-model="vipAppointmentInfo.ArriveTime" readonly />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="结束时间">
                <el-input v-model="vipAppointmentInfo.LeaveTime" readonly />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="接待人姓名">
                <el-input v-model="vipAppointmentInfo.ReceiverName" readonly />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="接待人邮箱">
                <el-input v-model="vipAppointmentInfo.ReceiverEmail" readonly />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="来访事由">
                <el-input v-model="vipAppointmentInfo.Reason" readonly />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="VIP人数">
                <el-input v-model="vipAppointmentInfo.VipAmount" readonly />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="备注">
                <el-input v-model="vipAppointmentInfo.Remark" readonly />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div v-if="category==='1'" class="detail-container_second">
        <div style="border-bottom: 2px solid #eef0f3;"><img :src="carIcon"><span style="margin-left:20px;clear: both;vertical-align: top;font-size: 15px;">车辆信息</span></div>
        <div style="background-color: #f5f5fa;padding: 10px 0 10px 20px;">
          <el-row v-for="(item,index) in vehicleListTemp" :key="index" style="padding: 10px 20px 10px 20px;" type="flex" justify="start">
            <el-col v-for="(cell,i) in item" :key="i" :span="7" style="margin-left:10px;">
              <div class="car_grid-content car_bg-purple">
                <img :src="carIcon">&emsp;<span>车牌号:</span>{{ cell.Number }}&emsp;<span>车辆总人数</span>{{ cell.PassengerAmount }}<span>人</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div v-if="category==='1'" class="detail-container_second">
        <div style="border-bottom: 2px solid #eef0f3;"><img :src="personIcon"><span style="margin-left:20px;clear: both;vertical-align: top;font-size: 15px;">人员信息</span></div>
        <div style="background-color: #f5f5fa;padding: 10px 0 10px 20px;">
          <el-row v-for="(item,index) in visitorListTemp" :key="index" style="padding: 10px 20px 10px 20px;" type="flex" justify="start">
            <el-col v-for="(cell,i) in item" :key="i" :span="5" style="margin-left:10px;">
              <div class="person-form-part1-container">
                <el-row type="flex" class="item-row">
                  <el-col :span="12" class="text-right">
                    <label>访客单位:</label>
                  </el-col>
                  <el-col :span="12" class="text-left">
                    {{ cell.Company }}
                  </el-col>
                </el-row>
                <!-- <el-row type="flex" class="item-row">
                  <el-col :span="8" class="text-right">
                    <label>简称:</label>
                  </el-col>
                  <el-col :span="16" class="text-left">
                    {{ cell.simpleName }}
                  </el-col>
                </el-row> -->
                <el-row type="flex" class="item-row">
                  <el-col :span="12" class="text-right">
                    <label>姓名:</label>
                  </el-col>
                  <el-col :span="12" class="text-left">
                    {{ cell.Name }}
                  </el-col>
                </el-row>
                <el-row type="flex" class="item-row">
                  <el-col :span="12" class="text-right">
                    <label>性别:</label>
                  </el-col>
                  <el-col :span="12" class="text-left">
                    {{ cell.Gender }}
                  </el-col>
                </el-row>
                <el-row type="flex" class="item-row">
                  <el-col :span="12" class="text-right">
                    <label>联系电话:</label>
                  </el-col>
                  <el-col :span="12" class="text-left">
                    {{ cell.Mobile }}
                  </el-col>
                </el-row>
                <el-row type="flex" class="item-row">
                  <el-col :span="12" class="text-right">
                    <label>国籍:</label>
                  </el-col>
                  <el-col :span="12" class="text-left">
                    {{ cell.Nation }}
                  </el-col>
                </el-row>
                <el-row type="flex" class="item-row">
                  <el-col :span="12" class="text-right">
                    <label>证件类型:</label>
                  </el-col>
                  <el-col :span="12" class="text-left">
                    {{ cell.IDType }}
                  </el-col>
                </el-row>
                <el-row type="flex" class="item-row">
                  <el-col :span="12" class="text-right">
                    <label>证件号:</label>
                  </el-col>
                  <el-col :span="12" class="text-left">
                    {{ cell.IDNumber }}
                  </el-col>
                </el-row>
                <el-row type="flex" style="background-color: #edf4fb;" class="item-row">
                  <el-col :span="12" class="text-right">
                    <label>是否需要驾驶车辆进入化工区:</label>
                  </el-col>
                  <el-col :span="12" class="text-left">
                    {{ cell.CIAVehicle }}
                  </el-col>
                </el-row>
                <el-row type="flex" style="background-color: #edf4fb;" class="item-row">
                  <el-col :span="12" class="text-right">
                    <label>HSSE有效期:</label>
                  </el-col>
                  <el-col :span="12" class="text-left">
                    {{ cell.HSSEExpired }}
                  </el-col>
                </el-row>
                <el-row type="flex" style="background-color: #edf4fb;border-bottom-left-radius: 15px;border-bottom-right-radius: 15px;" class="item-row">
                  <el-col :span="12" class="text-right">
                    <label>临时驾驶员有效期:</label>
                  </el-col>
                  <el-col :span="12" class="text-left">
                    {{ cell.HSSEDriverExpired }}
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="detail-container_second">
        <div style="border-bottom: 2px solid #eef0f3;"><img :src="comeoutIcon"><span style="margin-left:20px;clear: both;vertical-align: top;font-size: 15px;">入场时间</span></div>
        <div style="background-color: #f5f5fa;padding: 10px 0 10px 20px;">
          <el-row v-for="(item,index) in registerListTemp" :key="index" style="padding: 10px 20px 10px 20px;" type="flex" justify="start">
            <el-col v-for="(cell,i) in item" :key="i" :span="7" style="margin-left:20px;">
              <div class="person-form-part2-container">
                <el-row type="flex" class="item-row">
                  <el-col :span="12" class="text-right">
                    <div>
                      <el-row type="flex" class="item-row">
                        <el-col :span="4" class="text-center"><img :src="greenPointIcon"></el-col>
                        <el-col :span="20"><label>访客卡号:</label></el-col>
                      </el-row>
                    </div>
                  </el-col>
                  <el-col :span="12" class="text-left">
                    <div>
                      <el-row type="flex" class="item-row">
                        <el-col :span="24">{{ cell.CardNumber }}</el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
                <el-row type="flex" class="item-row">
                  <el-col :span="12" class="text-right">
                    <div>
                      <el-row type="flex" class="item-row">
                        <el-col :span="4" class="text-center"><img :src="comeoutIcon"></el-col>
                        <el-col :span="20"><label>入场时间:</label></el-col>
                      </el-row>
                    </div>
                  </el-col>
                  <el-col :span="12" class="text-left">
                    <div>
                      <el-row type="flex" class="item-row">
                        <el-col :span="24">{{ cell.ArriveTime }}</el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
                <el-row type="flex" class="item-row">
                  <el-col :span="12" class="text-right">
                    <div>
                      <el-row type="flex" class="item-row">
                        <el-col :span="4" class="text-center"><img :src="comeoutIcon"></el-col>
                        <el-col :span="20"><label>离场时间:</label></el-col>
                      </el-row>
                    </div>
                  </el-col>
                  <el-col :span="12" class="text-left">
                    <div>
                      <el-row type="flex" class="item-row">
                        <el-col :span="24">{{ cell.LeaveTime }}</el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
                <el-row type="flex" style="background-color: #FFFFFF;border-bottom-left-radius: 15px;border-bottom-right-radius: 15px;" class="item-row">
                  <el-col :span="12" class="text-right">
                    <label>姓名:</label>
                  </el-col>
                  <el-col :span="12" class="text-left">
                    {{ cell.Name }}
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getDetail, getVipDetail } from '@/api/booking'
import lineIcon from '@/icons/Line_1.png'
import editIcon from '@/icons/bookingdetail/Edit_1.png'
import carIcon from '@/icons/bookingdetail/Fill_1.png'
import personIcon from '@/icons/bookingdetail/Oval_1.png'
import comeoutIcon from '@/icons/bookingdetail/L_1.png'
import greenPointIcon from '@/icons/bookingdetail/GreenPoint_1.png'

export default {
  name: 'BookingDetail',
  data() {
    return {
      lineIcon: lineIcon,
      editIcon: editIcon,
      carIcon: carIcon,
      personIcon: personIcon,
      comeoutIcon: comeoutIcon,
      greenPointIcon: greenPointIcon,
      category: '',
      detailId: '',
      formTitle: '',
      appointmentInfo: null,
      vipAppointmentInfo: null,
      vehicleList: [],
      visitorList: [],
      registerList: [],
      tempRoute: {},
      loading: false
    }
  },
  computed: {
    vehicleListTemp: function() {
      let index = 0
      const count = 3
      const arrTemp = []
      const vehicleList = this.vehicleList
      for (let i = 0; i < this.vehicleList.length; i++) {
        index = parseInt(i / count)
        if (arrTemp.length <= index) {
          arrTemp.push([])
        }
        arrTemp[index].push(vehicleList[i])
      }
      return arrTemp
    },
    visitorListTemp: function() {
      let index = 0
      const count = 4
      const arrTemp = []
      const visitorList = this.visitorList
      for (let i = 0; i < this.visitorList.length; i++) {
        index = parseInt(i / count)
        if (arrTemp.length <= index) {
          arrTemp.push([])
        }
        arrTemp[index].push(visitorList[i])
      }
      return arrTemp
    },
    registerListTemp: function() {
      let index = 0
      const count = 3
      const arrTemp = []
      const registerList = this.registerList
      for (let i = 0; i < this.registerList.length; i++) {
        index = parseInt(i / count)
        if (arrTemp.length <= index) {
          arrTemp.push([])
        }
        arrTemp[index].push(registerList[i])
      }
      return arrTemp
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    const category = this.$route.params && this.$route.params.category
    this.detailId = id
    this.category = category
    this.formTitle = category === '1' ? '预约单信息' : '来访信息'

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
      if (this.category === '1') {
        getDetail(data).then(response => {
          if (response.Result === 1) {
            this.appointmentInfo = response.Data.AppointmentInfo
            this.vehicleList = response.Data.VehicleList
            this.vehicleList = this.vehicleList.concat(response.Data.VehicleList)
            this.visitorList = response.Data.VisitorList
            this.registerList = response.Data.RegisterList
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        getVipDetail(data).then(response => {
          if (response.Result === 1) {
            this.vipAppointmentInfo = response.Data.AppointmentInfo
            this.registerList = response.Data.RegisterList
          }
        }).catch(err => {
          console.log(err)
        })
      }
      this.setTagsViewTitle()
      this.setPageTitle()
    },
    setTagsViewTitle() {
      const title = this.category === '1' ? '预约单详情' : 'Vip预约单详情'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.appointmentInfo.Id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = this.category === '1' ? '预约单详情' : 'Vip预约单详情'
      document.title = `${title} - ${this.appointmentInfo.Id}`
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
.detail-container{
  padding: 30px 20px 30px 20px;
}
.detail-container_second{
  padding: 0 20px 30px 20px;
}
.car_grid-content{
  border-radius: 4px;
  /* min-height: 36px; */
  padding: 15px;
  text-align: center;
  color: #FFFFFF;
}
.car_bg-purple {
    background: #8291a9;
  }
.person-form-part1-container{
  /* padding: 10px 10px  0 10px; */
  background-color: #FFFFFF;
  border-radius: 15px;
  font-size: small;
}

.person-form-part1-container .item-row {
  padding: 5px;
}

.person-form-part1-container .item-row label {
  font-size: 12px;
}

.person-form-part2-container{
  background-color: #f5f5fa;
  border-radius: 15px;
  border: 1px solid #e1e1ec;
  font-size: small;
}
.person-form-part2-container .item-row {
  padding: 5px;
}

.person-form-part2-container .item-row label{
  font-size: 12px;
}
.item-row label{
  vertical-align: middle;
  /* font-size: 12px; */
  color: #606266;
}

.text-left{
  text-align: left;
  padding-left: 10px;
}
.text-right{
  text-align: right;
}
.text-center{
  text-align: center;
}

</style>
