<template>
  <div class="app-container">
    <div style="padding-bottom: 10px;padding-top: 10px;background-color:#FFFFFF;border:1px solid #dfe6ec;border-top-right-radius: 10px;border-top-left-radius: 10px;">
      <el-row>
        <el-col :span="6">
          <span style="margin-left:10px;clear: both;vertical-align: super;font-size: 18px;">健康信息收集开关</span>
          <!-- <el-switch
            v-model="state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          /> -->
        </el-col>
        <el-col :span="4" style="padding-right:10px">
          <el-switch
            v-model="state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeState"
          />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { get, update } from '@/api/sysconfig'
import waves from '@/directive/waves' // waves directive
import listIcon from '@/icons/List_Icon_2.png'
import lineIcon from '@/icons/Line_1.png'
export default {
  name: 'Health',
  directives: { waves },
  data() {
    return {
      listIcon: listIcon,
      lineIcon: lineIcon,
      listLoading: true,
      downloadLoading: false,
      state: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      const data = {
        id: 1
      }
      this.listLoading = true
      get(data).then(response => {
        this.state = response.Data.Value === '1'

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    changeState() {
      console.log(this.state)
      const data = {
        Id: 1,
        Value: this.state ? '1' : '0'
      }
      console.log(data)
      update(data).then(response => {
        if (response.Result !== 1) {
          this.$notify({
            title: 'error',
            message: '更新失败',
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
