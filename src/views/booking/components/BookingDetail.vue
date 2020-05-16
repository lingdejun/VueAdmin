<template>
  <div class="app-container">
    <div class="content-container">
      <div style="padding-bottom: 10px;padding-top: 10px;border-bottom:1px solid #dfe6ec;border-top-right-radius: 10px;border-top-left-radius: 10px;">
        <el-row>
          <el-col :span="4"><img :src="lineIcon"><span style="margin-left:20px;clear: both;vertical-align: top;font-size: 25px;">预约单详情</span></el-col>
        </el-row>
      </div>
      <div class="detail-container">
        <div style="border-bottom: 2px solid #eef0f3;"><img :src="editIcon"><span style="margin-left:20px;clear: both;vertical-align: top;font-size: 15px;">预约单信息</span></div>
        <el-form :inline="true" label-position="left" :model="bookDetail" class="demo-form-inline" style="background-color: #f5f5fa;padding: 20px 0 0 20px;">
          <el-row>
            <el-col :span="8">
              <el-form-item label="预约日期">
                <el-date-picker
                  v-model="bookDetail.bookDate"
                  type="date"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="预计到达时间">
                <el-time-picker
                  v-model="bookDetail.startTime"
                  value-format="HH:mm"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="预计离开时间">
                <el-time-picker
                  v-model="bookDetail.endTime"
                  value-format="HH:mm"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="接待人姓名">
                <el-input v-model="bookDetail.receptionistName" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="接待人邮箱">
                <el-input v-model="bookDetail.receptionistEmail" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="需要协助获得出入许可">
                <el-radio v-model="bookDetail.needLisenceHelp" label="1">需要</el-radio>
                <el-radio v-model="bookDetail.needLisenceHelp" label="2">不需要</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="来访事由">
              <el-select v-model="bookDetail.reason">
                <el-option label="开会" value="meeting" />
                <el-option label="vip来访" value="vipcoming" />
              </el-select>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <div class="detail-container_second">
        <div style="border-bottom: 2px solid #eef0f3;"><img :src="carIcon"><span style="margin-left:20px;clear: both;vertical-align: top;font-size: 15px;">车辆信息</span></div>
        <div style="background-color: #f5f5fa;padding: 10px 0 10px 20px;">
          <el-row v-for="(item,index) in carInfosTemp" :key="index" style="padding: 10px 20px 10px 20px;" type="flex" justify="space-between">
            <el-col v-for="(cell,i) in item" :key="i" :span="6">
              <div class="car_grid-content car_bg-purple">
                <img :src="carIcon">&emsp;<span>车牌号:</span>{{ cell.carLisence }}&emsp;<span>车辆总人数</span>{{ cell.personCount }}<span>人</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="detail-container_second">
        <div style="border-bottom: 2px solid #eef0f3;"><img :src="personIcon"><span style="margin-left:20px;clear: both;vertical-align: top;font-size: 15px;">人员信息</span></div>
        <div style="background-color: #f5f5fa;padding: 10px 0 10px 20px;">
          <el-row v-for="(item,index) in personInfosTemp" :key="index" style="padding: 10px 20px 10px 20px;" type="flex" justify="space-between">
            <el-col v-for="(cell,i) in item" :key="i" :span="5">
              <div class="person-form-part1-container">
                <el-row type="flex" class="item-row">
                  <el-col :span="8" class="text-right">
                    <label>访客单位:</label>
                  </el-col>
                  <el-col :span="16" class="text-left">
                    {{ cell.company }}
                  </el-col>
                </el-row>
                <el-row type="flex" class="item-row">
                  <el-col :span="8" class="text-right">
                    <label>简称:</label>
                  </el-col>
                  <el-col :span="16" class="text-left">
                    {{ cell.simpleName }}
                  </el-col>
                </el-row>
                <el-row type="flex" class="item-row">
                  <el-col :span="8" class="text-right">
                    <label>姓名:</label>
                  </el-col>
                  <el-col :span="16" class="text-left">
                    {{ cell.name }}
                  </el-col>
                </el-row>
                <el-row type="flex" class="item-row">
                  <el-col :span="8" class="text-right">
                    <label>性别:</label>
                  </el-col>
                  <el-col :span="16" class="text-left">
                    {{ cell.sex }}
                  </el-col>
                </el-row>
                <el-row type="flex" class="item-row">
                  <el-col :span="8" class="text-right">
                    <label>联系电话:</label>
                  </el-col>
                  <el-col :span="16" class="text-left">
                    {{ cell.mobile }}
                  </el-col>
                </el-row>
                <el-row type="flex" class="item-row">
                  <el-col :span="8" class="text-right">
                    <label>国籍:</label>
                  </el-col>
                  <el-col :span="16" class="text-left">
                    {{ cell.nationality }}
                  </el-col>
                </el-row>
                <el-row type="flex" class="item-row">
                  <el-col :span="8" class="text-right">
                    <label>证件类型:</label>
                  </el-col>
                  <el-col :span="16" class="text-left">
                    {{ cell.idType }}
                  </el-col>
                </el-row>
                <el-row type="flex" class="item-row">
                  <el-col :span="8" class="text-right">
                    <label>证件号:</label>
                  </el-col>
                  <el-col :span="16" class="text-left">
                    {{ cell.idNum }}
                  </el-col>
                </el-row>
                <el-row type="flex" style="background-color: #edf4fb;" class="item-row">
                  <el-col :span="8" class="text-right">
                    <label>是否为驾驶员:</label>
                  </el-col>
                  <el-col :span="16" class="text-left">
                    {{ cell.isDriver }}
                  </el-col>
                </el-row>
                <el-row type="flex" style="background-color: #edf4fb;border-bottom-left-radius: 15px;border-bottom-right-radius: 15px;" class="item-row">
                  <el-col :span="8" class="text-right">
                    <label>HSSE培训时间:</label>
                  </el-col>
                  <el-col :span="16" class="text-left">
                    {{ cell.learnDate }}
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
          <el-row v-for="(item,index) in comeOutInfosTemp" :key="index" style="padding: 10px 20px 10px 20px;" type="flex" justify="space-between">
            <el-col v-for="(cell,i) in item" :key="i" :span="5">
              <div class="person-form-part2-container">
                <el-row type="flex" class="item-row">
                  <el-col :span="10" class="text-right">
                    <div>
                      <el-row type="flex" class="item-row">
                        <el-col :span="8" class="text-center"><img :src="greenPointIcon"></el-col>
                        <el-col :span="16"><label>访客卡号:</label></el-col>
                      </el-row>
                    </div>
                  </el-col>
                  <el-col :span="14" class="text-left">
                    <div>
                      <el-row type="flex" class="item-row">
                        <el-col :span="24">{{ cell.idNum }}</el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
                <el-row type="flex" class="item-row">
                  <el-col :span="10" class="text-right">
                    <div>
                      <el-row type="flex" class="item-row">
                        <el-col :span="8" class="text-center"><img :src="comeoutIcon"></el-col>
                        <el-col :span="16"><label>入场时间:</label></el-col>
                      </el-row>
                    </div>
                  </el-col>
                  <el-col :span="14" class="text-left">
                    <div>
                      <el-row type="flex" class="item-row">
                        <el-col :span="24">{{ cell.inTime }}</el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
                <el-row type="flex" class="item-row">
                  <el-col :span="10" class="text-right">
                    <div>
                      <el-row type="flex" class="item-row">
                        <el-col :span="8" class="text-center"><img :src="comeoutIcon"></el-col>
                        <el-col :span="16"><label>离场时间:</label></el-col>
                      </el-row>
                    </div>
                  </el-col>
                  <el-col :span="14" class="text-left">
                    <div>
                      <el-row type="flex" class="item-row">
                        <el-col :span="24">{{ cell.outTime }}</el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
                <el-row type="flex" style="background-color: #FFFFFF;border-bottom-left-radius: 15px;border-bottom-right-radius: 15px;" class="item-row">
                  <el-col :span="8" class="text-right">
                    <label>姓名:</label>
                  </el-col>
                  <el-col :span="16" class="text-left">
                    {{ cell.name }}
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
import { fetchArticle } from '@/api/article'
import lineIcon from '@/icons/Line_1.png'
import editIcon from '@/icons/bookingdetail/Edit_1.png'
import carIcon from '@/icons/bookingdetail/Fill_1.png'
import personIcon from '@/icons/bookingdetail/Oval_1.png'
import comeoutIcon from '@/icons/bookingdetail/L_1.png'
import greenPointIcon from '@/icons/bookingdetail/GreenPoint_1.png'

export default {
  name: 'BookingDetail',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      lineIcon: lineIcon,
      editIcon: editIcon,
      carIcon: carIcon,
      personIcon: personIcon,
      comeoutIcon: comeoutIcon,
      greenPointIcon: greenPointIcon,
      bookDetail: {
        id: '',
        bookDate: '',
        startTime: '',
        endTime: '',
        receptionistName: '',
        receptionistEmail: '',
        needLisenceHelp: '',
        reason: '',
        from: '',
        remark: ''
      },
      carInfos: [
        {
          carLisence: '沪A123456',
          personCount: '1'
        },
        {
          carLisence: '沪A123456',
          personCount: '2'
        },
        {
          carLisence: '沪A123456',
          personCount: '3'
        },
        {
          carLisence: '沪A123456',
          personCount: '4'
        }
      ],
      personInfos: [
        {
          company: '上海浮鼎信息技术有限公司',
          simpleName: '浮鼎',
          name: '张三',
          sex: '男',
          mobile: '18621111111',
          nationality: '中国',
          idType: '身份证',
          idNum: '34222251999****0899',
          isDriver: '是',
          learnDate: '2019-10-10'
        }
      ],
      comeOutInfos: [
        {
          idNum: 'FKX001',
          inTime: '2019-10-10 10:00',
          outTime: '2019-10-10 18:00',
          name: '张三',
          status: ''
        }
      ],
      tempRoute: {},
      loading: false
    }
  },
  computed: {
    carInfosTemp: function() {
      let index = 0
      const count = 3
      const arrTemp = []
      const carInfos = this.carInfos
      for (let i = 0; i < this.carInfos.length; i++) {
        index = parseInt(i / count)
        if (arrTemp.length <= index) {
          arrTemp.push([])
        }
        arrTemp[index].push(carInfos[i])
      }
      return arrTemp
    },
    personInfosTemp: function() {
      let index = 0
      const count = 4
      const arrTemp = []
      const personInfos = this.personInfos
      for (let i = 0; i < this.personInfos.length; i++) {
        index = parseInt(i / count)
        if (arrTemp.length <= index) {
          arrTemp.push([])
        }
        arrTemp[index].push(personInfos[i])
      }
      return arrTemp
    },
    comeOutInfosTemp: function() {
      let index = 0
      const count = 4
      const arrTemp = []
      const comeOutInfos = this.comeOutInfos
      for (let i = 0; i < this.comeOutInfos.length; i++) {
        index = parseInt(i / count)
        if (arrTemp.length <= index) {
          arrTemp.push([])
        }
        arrTemp[index].push(comeOutInfos[i])
      }
      return arrTemp
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      fetchArticle(id).then(response => {
        this.postForm = response.data
        // set tagsview title
        this.setTagsViewTitle()

        // set page title
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    }
  },
  setTagsViewTitle() {
    const title = '预约单详情'
    const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.bookDetail.id}` })
    this.$store.dispatch('tagsView/updateVisitedView', route)
  },
  setPageTitle() {
    const title = '预约单详情'
    document.title = `${title} - ${this.bookDetail.id}`
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
}

.person-form-part1-container .item-row {
  padding: 5px;
}
.person-form-part2-container{
  background-color: #f5f5fa;
  border-radius: 15px;
  border: 1px solid #e1e1ec;
}

.person-form-part2-container .item-row{
  padding: 5px;
}
.item-row label{
  vertical-align: middle;
  font-size: 14px;
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
