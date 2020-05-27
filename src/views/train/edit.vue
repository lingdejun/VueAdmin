<template>
  <div class="app-container" style="overflow: hidden;">
    <div class="content-container">
      <el-row style="padding: 20px;border-bottom: 1px solid;">
        <el-col>
          培训类型
        </el-col>
      </el-row>
      <el-form style="margin-top:20px" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="title" style="width:500px" />
        </el-form-item>
      </el-form>
      <el-row style="padding:20px" type="flex" justify="start">
        <el-col :span="6">
          <el-radio v-model="trainCategory" :label="1">访客培训</el-radio>
        </el-col>
        <el-col :span="6">
          <el-radio v-model="trainCategory" :label="2">临时驾驶员培训</el-radio>
        </el-col>
      </el-row>
    </div>

    <div class="second-content-container">
      <el-row style="padding: 20px;border-bottom: 1px solid;">
        <el-col>
          上传培训视频
        </el-col>
      </el-row>
      <el-row style="padding:20px">
        <el-col :span="6" style="text-align:right;padding-right:20px">
          请选择添加视频
        </el-col>
        <el-col :span="18">
          <el-upload
            class="upload-demo"
            drag
            :headers="headers"
            :action="fileUrl"
            :multiple="false"
            :on-success="uploadSuccess"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          </el-upload>
        </el-col>
      </el-row>
    </div>

    <div class="second-content-container">
      <el-row style="padding: 20px;border-bottom: 1px solid;">
        <el-col>
          试题内容编辑
        </el-col>
      </el-row>
      <drag ref="childDrug" />
    </div>
  </div>
</template>

<script>
import drag from './components/drug'
export default {
  name: 'TrainEditFrom',
  components: {
    drag
  },
  data() {
    return {
      headers: {
        'LoginId': '123'
      },
      title: '',
      trainCategory: '1',
      fileUrl: 'http://test6.topbpm.com/visitbgapi/train/upload',
      vedioUrl: '',
      trainId: 0
    }
  },
  created() {
    console.log()
  },
  methods: {
    uploadSuccess(response, file) {
      if (response.Result === 1) {
        this.vedioUrl = response.Data
      }
    }
  }
}
</script>
<style>
.content-container{
  background-color: white;
}
.second-content-container{
  background-color: white;
  margin-top: 10px;
}
</style>
