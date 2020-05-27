<template>
  <div>
    <!-- <v-calendar :attributes="attrs" /> -->
    <v-calendar
      class="custom-calendar"
      :masks="masks"
      :attributes="attributes"
      disable-page-swipe
      is-expanded
    >
      <div
        slot="day-content"
        slot-scope="{ day, attributes }"
        class="flex flex-col h-full z-10 overflow-hidden"
      >
        <span class="day-label text-sm text-gray-900">{{ day.day }}</span>
        <div class="flex-grow overflow-y-scroll overflow-x-auto">
          <div v-for="(attr, index) in attributes" :key="index">
            <el-dropdown v-if="attr.customData.AppointmentAmount>0 || attr.customData.ArriveAmount>0 || attr.customData.LeaveAmount>0" trigger="click">
              <span style="cursor: pointer;color: #409eff;">
                点我查看<i class="el-icon-caret-bottom el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item class="clearfix">
                  预约
                  <el-badge class="mark" :value="attr.customData.AppointmentAmount" />
                </el-dropdown-item>
                <el-dropdown-item class="clearfix">
                  入场
                  <el-badge class="mark" :value="attr.customData.ArriveAmount" />
                </el-dropdown-item>
                <el-dropdown-item class="clearfix">
                  离场
                  <el-badge class="mark" :value="attr.customData.LeaveAmount" />
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!-- <p v-if="attr.customData.AppointmentAmount>0">
              <el-badge :value="attr.customData.AppointmentAmount" class="item">
                <el-button size="small">预约</el-button>
              </el-badge>
              <el-badge :value="attr.customData.ArriveAmount" class="item">
                <el-button size="small">入场</el-button>
              </el-badge>
              <el-badge :value="attr.customData.LeaveAmount" class="item">
                <el-button size="small">离场</el-button>
              </el-badge>
            </p> -->
            <!-- <p class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1">预约{{ attr.customData.AppointmentAmount }}人</p>
            <p class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1">入场{{ attr.customData.ArriveAmount }}人</p>
            <p class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1">离场{{ attr.customData.LeaveAmount }}人</p> -->
          </div>
        </div>
      </div></v-calendar>
  </div>
</template>

<script>
import { getCalendar } from '@/api/booking'

export default {
  name: 'Dashboard',
  data() {
    return {
      attrs: [
        {
          key: 'today',
          highlight: true,
          dates: new Date()
        }
      ],
      masks: {
        weekdays: 'WWW'
      },
      value: new Date(),
      attributes: null
    }
  },
  created() {
    this.fetchList()
  },
  methods: {
    fetchList() {
      const month = new Date().getMonth()
      const year = new Date().getFullYear()
      const data = {
        Year: year,
        Month: month + 1
      }
      getCalendar(data).then(response => {
        if (response.Result === 1) {
          const attrs = response.Data.map((item, index) => {
            return {
              key: index,
              customData: {
                AppointmentAmount: item.AppointmentAmount,
                ArriveAmount: item.ArriveAmount,
                LeaveAmount: item.LeaveAmount,
                class: 'bg-red-600 text-white'
              },
              dates: new Date(item.ChartDate)
            }
          })
          this.attributes = attrs
          console.log(attrs)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar-track {
  display: none;
}
/deep/ .custom-calendar.vc-container {
  --day-border: 1px solid #b8c2cc;
  --day-border-highlight: 1px solid #b8c2cc;
  --day-width: 90px;
  --day-height: 90px;
  --weekday-bg: #f5f5fa;
  --weekday-border: 1px solid #eaeaea;
  border-radius: 0;
  & .vc-header {
    background-color: #f1f5f8;
    padding: 10px 0;
  }
  & .vc-weeks {
    padding: 0;
  }
  & .vc-weekday {
    background-color: var(--weekday-bg);
    border-bottom: var(--weekday-border);
    border-top: var(--weekday-border);
    padding: 5px 0;
  }
  & .vc-day {
    padding: 0 5px 3px 5px;
    text-align: left;
    height: var(--day-height);
    min-width: var(--day-width);
    background-color: white;
    &.weekday-1,
    &.weekday-7 {
      background-color: #eff8ff;
    }
    &:not(.on-bottom) {
      border-bottom: var(--day-border);
      &.weekday-1 {
        border-bottom: var(--day-border-highlight);
      }
    }
    &:not(.on-right) {
      border-right: var(--day-border);
    }
  }
  & .vc-day-dots {
    margin-bottom: 5px;
  }
  & .vc-h-full p{
    line-height: 0em;
  }
}
</style>
