<template>

  <div class="drag_box">

    <div :class="fiedLeft?'drag_left new-fied':'drag_left'">
      <div class="new-drag-topbtn">题型</div>
      <draggable class="dragArea list-group" :list="list1" :sort="false" :group="{ name: 'module-rs', pull: 'clone', put: false }" :clone="cloneDog" @change="log">
        <div v-for="element in list1" :key="element.QuestionIndex" class="list-group-item">
          {{ element.QuestionTitle }}
        </div>
      </draggable>
    </div>
    <div :class="fiedLeft?'drag_right new-fied-rigth':'drag_right'" style="padding: 20px;">
      <draggable class="dragArea list-group" :list="list2" group="module-rs" @change="log">
        <div v-for="(element,index) in list2" :key="element.QuestionIndex" class="list-group-item">

          <div v-if="element.QuestionCategory=='1'" class="new-coltype">
            <div class="col_tag">
              <div class="col_name">{{ index+1+"." }} {{ element.QuestionTitle }}</div>
              <!--<div class="operation"><span @click="editClick(element)">编辑</span><span>删除</span></div>-->
            </div>
            <div class="operation"><img src="../../../assets/images/drugedit.png" @click="editClick(element,index)"><img v-if="cktype!=2" src="../../../assets/images/drugdelete.png" @click="deleteClick(element,index)"></div>
            <el-radio-group disabled>
              <div v-for="(item,index2) in element.OptionList" :key="item.OptionIndex">
                <div class="line25">
                  <el-radio :label="index2">{{ item.OptionTitle }}</el-radio>
                </div>
              </div>
            </el-radio-group>
          </div>

          <div v-else-if="element.QuestionCategory=='2'" class="new-coltype">
            <div class="col_tag">
              <div class="col_name">{{ index+1+"." }} {{ element.QuestionTitle }}</div>
              <!--<div class="operation"><span @click="editClick(element)">编辑</span><span>删除</span></div>-->
            </div>
            <div class="operation"><img src="../../../assets/images/drugedit.png" @click="editClick(element,index)"><img v-if="cktype!=2" src="../../../assets/images/drugdelete.png" @click="deleteClick(element,index)"></div>
            <el-checkbox-group disabled>
              <div v-for="(item,index3) in element.OptionList" :key="item.OptionIndex">
                <div class="line25">
                  <el-checkbox :label="index3">{{ item.OptionTitle }}</el-checkbox>
                </div>
              </div>
            </el-checkbox-group>

          </div>

          <div v-else-if="element.QuestionCategory=='3'" class="new-coltype">
            <div class="col_tag">
              <div class="col_name">{{ index+1+"." }} {{ element.QuestionTitle }}</div>
              <!--<div class="operation"><span @click="editClick(element)">编辑</span><span>删除</span></div>-->
            </div>
            <div class="operation"><img src="../../../assets/images/drugedit.png" @click="editClick(element,index)"><img v-if="cktype!=2" src="../../../assets/images/drugdelete.png" @click="deleteClick(element,index)"></div>
            <el-radio-group disabled>
              <div v-for="(item,index4) in element.OptionList" :key="item.OptionIndex">
                <div class="line25">
                  <el-radio :label="index4">{{ item.OptionTitle }}</el-radio>
                </div>
                <div v-if="item.OptionImg!=''" class="col_upload">
                  <img :src="item.OptionImg" style="width: 80px; height: 80px;">
                </div>
              </div>
            </el-radio-group>
          </div>

          <div v-else-if="element.QuestionCategory=='4'" class="new-coltype">
            <div class="col_tag">
              <div class="col_name">{{ index+1+"." }} {{ element.QuestionTitle }}</div>
              <!--<div class="operation" @click="editClick(element)"><span>编辑</span><span>删除</span></div>-->
            </div>
            <div class="operation"><img src="../../../assets/images/drugedit.png" @click="editClick(element,index)"><img v-if="cktype!=2" src="../../../assets/images/drugdelete.png" @click="deleteClick(element,index)"></div>
            <el-checkbox-group disabled>
              <div v-for="(item,index5) in element.OptionList" :key="item.OptionIndex">
                <div class="line25">
                  <el-checkbox :label="index5">{{ item.OptionTitle }}</el-checkbox>
                </div>
                <div>
                  <div v-if="item.OptionImg!=''" class="col_upload">
                    <img :src="item.OptionImg" style="width: 80px; height: 80px;">

                  </div>
                </div>
              </div>
            </el-checkbox-group>
          </div>

          <div v-else-if="element.QuestionCategory=='5'" class="new-coltype">
            <div class="col_tag">
              <div class="col_name">{{ index+1+"." }} {{ element.QuestionTitle }}</div>
              <!--<div class="operation"><span @click="editClick(element)">编辑</span><span>删除</span></div>-->
            </div>
            <div class="operation"><img src="../../../assets/images/drugedit.png" @click="editClick(element,index)"><img v-if="cktype!=2" src="../../../assets/images/drugdelete.png" @click="deleteClick(element,index)"></div>
            <el-input style="width: 490px;" type="textarea" readonly />
          </div>

          <div v-else-if="element.QuestionCategory=='6'" class="new-coltype">
            <div class="col_tag">
              <div class="col_name">{{ index+1+"." }} {{ element.QuestionTitle }}</div>
              <!--<div class="operation"><span @click="editClick(element)">编辑</span><span>删除</span></div>-->
            </div>
            <div class="operation">
              <img src="../../../assets/images/drugedit.png" @click="editClick(element,index)">
              <img v-if="cktype!=2" src="../../../assets/images/drugdelete.png" @click="deleteClick(element,index)">
            </div>
            <el-input style="width: 490px;" readonly />
          </div>

          <div v-if="element.QuestionCategory=='7'" class="new-coltype">
            <div class="col_tag">
              <div class="col_name">{{ index+1+"." }} {{ element.QuestionTitle }}</div>
              <!--<div class="operation"><span @click="editClick(element)">编辑</span><span>删除</span></div>-->
            </div>
            <div class="operation"><img src="../../../assets/images/drugedit.png" @click="editClick(element,index)"><img v-if="cktype!=2" src="../../../assets/images/drugdelete.png" @click="deleteClick(element,index)"></div>
            <el-radio-group disabled>
              <div v-for="(item,index6) in element.OptionList" :key="item.OptionIndex">
                <div class="line25">
                  <el-radio :label="index6">{{ item.OptionTitle }}</el-radio>
                </div>
              </div>
            </el-radio-group>
          </div>
        </div>
      </draggable>
      <div>
        <el-button class="yulan" @click="saveForm('3')">预览</el-button>
        <el-button type="primary" @click="savePaperSavequestions('2')">保存</el-button>
      </div>
    </div>

    <!--弹出编辑-->
    <div class="new-drug-dialog">
      <el-dialog title="编辑" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
        <!--Category-->
        <el-form ref="formEditControl" :model="formEditControl" :rules="rules" :inline="true">
          <el-row>
            <el-form-item label="名称" prop="QuestionTitle">
              <el-input v-model="formEditControl.QuestionTitle" :readonly="cktype==2" />
            </el-form-item>
          </el-row>

          <el-table v-if="formEditControl.QuestionCategory!='5'&&formEditControl.QuestionCategory!='6'" :data="formEditControl.OptionList" style="width: 100%">
            <el-table-column prop="" label="选项文字" width="250">
              <template slot-scope="scope">
                <div v-if="cktype==2" class="table_input">
                  <el-input v-model="scope.row.OptionTitle" readonly />
                  <img v-if="formEditControl.OptionList.length>'2'" src="../../../assets/images/drugdelete.png">
                </div>
                <div v-else class="table_input">
                  <el-input v-model="scope.row.OptionTitle" />
                  <img v-if="formEditControl.OptionList.length>'2'" src="../../../assets/images/drugdelete.png" @click="deleteRow(scope.row,scope.$index)">
                </div>
              </template>

            </el-table-column>
            <el-table-column v-if="formEditControl.QuestionCategory=='3'||formEditControl.QuestionCategory=='4'" prop="" label="图片">
              <template slot-scope="scope">
                <div @click="uploadIndex(scope)">
                  <el-upload class="dialog_upload" :headers="uploadHeaders" :disabled="cktype==2" :action="fileUrl" list-type="picture-card" :on-remove="handleRemove" :show-file-list="false" :on-success="fileSuccess" accept=".jpg,.jpeg,.png,.gif">
                    <div v-if="scope.row.OptionImg==''" class="new-topimg">
                      <i class="el-icon-plus" />
                    </div>
                    <img v-else :src="scope.row.OptionImg" style="width: 100px;height: 100px; margin: 0 auto;">
                  </el-upload>
                </div>
              </template>
            </el-table-column>
            <el-table-column v-if="category=='3'" prop="" label="正确答案">
              <template slot-scope="scope">
                <div v-if="cktype==2">
                  <el-checkbox v-model="scope.row.OptionIsCorrect" disabled />
                </div>
                <div v-else>
                  <el-checkbox v-if="formEditControl.QuestionCategory=='2'||formEditControl.QuestionCategory=='4'" v-model="scope.row.OptionIsCorrect" />
                  <el-checkbox v-if="formEditControl.QuestionCategory=='1'||formEditControl.QuestionCategory=='3' || formEditControl.QuestionCategory=='7'" v-model="scope.row.OptionIsCorrect" @change="changeRadio(formEditControl.OptionList,scope.$index)" />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="" label="上移下移">
              <template slot-scope="scope">
                <div v-if="cktype==2">
                  <span class="upiconChange"><img src="../../../assets/images/iconup.png"></span> <span class="upiconChange"><img src="../../../assets/images/icondown.png"></span>
                </div>
                <div v-else>
                  <span class="upiconChange" @click="upFunction(scope.$index)"><img src="../../../assets/images/iconup.png"></span> <span class="upiconChange" @click="downFunction(scope.$index)"><img src="../../../assets/images/icondown.png"></span>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="flex-row" style="justify-content:space-between;">
            <div v-if="formEditControl.QuestionCategory!='5'&&formEditControl.QuestionCategory!='6'&&formEditControl.QuestionCategory!='7'" class="col_add_delete">
              <el-button type="primary" class="xiayibu" style="margin: 10px !important;" :disabled="cktype==2" @click="addOptions">新增选项</el-button>
              <!--<el-button type="primary" v-if="formEditControl.OptionList.length>'2'" @click="deleteOptions" class="xiayibu">删除选项</el-button>-->
              <!--<span v-if="formEditControl.options.length>'2'" @click="deleteOptions">删除选项</span>-->
            </div>
            <div v-if="formEditControl.QuestionCategory=='3'||formEditControl.QuestionCategory=='4'" style="margin-right: 20px;">建议图片尺寸800*600，每张图片不超过5M</div>
          </div>
          <input type="text" style="display:none">
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogSave('formEditControl')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>

</template>

<script>
import draggable from 'vuedraggable'
import { paperSavequestions, getTrainInfo } from '@/api/train'

export default {
  name: 'TrainEdit',
  order: 3,
  components: {
    draggable
  },
  data() {
    return {
      uploadHeaders: {
        'LoginId': '123'
      },
      // controlType:1单选题，2多选题，3图片单选题，4图片多选题，5开放性问题，6打分题
      list1: [{
        QuestionId: 0,
        QuestionIndex: 0,
        QuestionTitle: '单选题',
        QuestionCategory: 1, // 控件类型
        OptionList: [{
          OptionId: 0,
          OptionIndex: 0,
          OptionTitle: '选项1',
          OptionImg: '',
          OptionIsCorrect: false
        },
        {
          OptionId: 0,
          OptionIndex: 1,
          OptionTitle: '选项2',
          OptionImg: '',
          OptionIsCorrect: false
        },
        {
          OptionId: 0,
          OptionIndex: 2,
          OptionTitle: '选项3',
          OptionImg: '',
          OptionIsCorrect: false
        },
        {
          OptionId: 0,
          OptionIndex: 3,
          OptionTitle: '选项4',
          OptionImg: '',
          OptionIsCorrect: false
        }
        ]
      },
      {
        QuestionId: 0,
        QuestionIndex: 1,
        QuestionTitle: '多选题',
        QuestionCategory: 2, // 控件类型
        OptionList: [{
          OptionId: 0,
          OptionIndex: 0,
          OptionTitle: '选项1',
          OptionImg: '',
          OptionIsCorrect: false
        },
        {
          OptionId: 0,
          OptionIndex: 1,
          OptionTitle: '选项2',
          OptionImg: '',
          OptionIsCorrect: false
        },
        {
          OptionId: 0,
          OptionIndex: 2,
          OptionTitle: '选项3',
          OptionImg: '',
          OptionIsCorrect: false
        },
        {
          OptionId: 0,
          OptionIndex: 3,
          OptionTitle: '选项4',
          OptionImg: '',
          OptionIsCorrect: false
        }
        ]
      },

      {
        QuestionId: 0,
        QuestionIndex: 2,
        QuestionTitle: '图片单选题',
        QuestionCategory: 3, // 控件类型
        OptionList: [{
          OptionId: 0,
          OptionIndex: 0,
          OptionTitle: '选项1',
          OptionImg: '',
          OptionIsCorrect: false
        },
        {
          OptionId: 0,
          OptionIndex: 1,
          OptionTitle: '选项2',
          OptionImg: '',
          OptionIsCorrect: false
        },
        {
          OptionId: 0,
          OptionIndex: 2,
          OptionTitle: '选项3',
          OptionImg: '',
          OptionIsCorrect: false
        },
        {
          OptionId: 0,
          OptionIndex: 3,
          OptionTitle: '选项4',
          OptionImg: '',
          OptionIsCorrect: false
        }
        ]
      },

      {
        QuestionId: 0,
        QuestionIndex: 3,
        QuestionTitle: '图片多选题',
        QuestionCategory: 4, // 控件类型
        OptionList: [{
          OptionId: 0,
          OptionIndex: 0,
          OptionTitle: '选项1',
          OptionImg: '',
          OptionIsCorrect: false
        },
        {
          OptionId: 0,
          OptionIndex: 1,
          OptionTitle: '选项2',
          OptionImg: '',
          OptionIsCorrect: false
        },
        {
          OptionId: 0,
          OptionIndex: 2,
          OptionTitle: '选项3',
          OptionImg: '',
          OptionIsCorrect: false
        },
        {
          OptionId: 0,
          OptionIndex: 3,
          OptionTitle: '选项4',
          OptionImg: '',
          OptionIsCorrect: false
        }
        ]
      },
      {
        QuestionId: 0,
        QuestionIndex: 4,
        QuestionTitle: '开放性问题',
        QuestionCategory: 5, // 控件类型
        OptionList: []
      },
      {
        QuestionId: 0,
        QuestionIndex: 5,
        QuestionTitle: '打分题',
        QuestionCategory: 6, // 控件类型
        OptionList: []
      },
      {
        QuestionId: 0,
        QuestionIndex: 6,
        QuestionTitle: '是非题',
        QuestionCategory: 7, // 控件类型
        OptionList: [{
          OptionId: 0,
          OptionIndex: 0,
          OptionTitle: '是',
          OptionImg: '',
          OptionIsCorrect: false
        },
        {
          OptionId: 0,
          OptionIndex: 1,
          OptionTitle: '否',
          OptionImg: '',
          OptionIsCorrect: false
        }
        ]
      }
      ],
      list2: [],
      dialogFormVisible: false,
      formEditControl: {

        QuestionId: '',
        QuestionTitle: '',
        QuestionCategory: '', // 控件类型
        OptionList: []

      },
      rules: {
        QuestionTitle: [{
          required: true,
          message: '请输入标题',
          trigger: 'blur'
        }]
      },
      dialogImageUrl: '',
      fiedLeft: false,
      dialogIndex: -1,
      fileUrl: 'http://test6.topbpm.com/visitbgapi/train/upload',
      imageUrl: '',
      cktype: '1',
      category: '3'

    }
  },
  created() {
    const trainId = this.$route.params && this.$route.params.id
    if (trainId !== '0') {
      this.getList(trainId)
    }
  },
  mounted() {
    this.onscrollFn()
  },
  methods: {
    getList(trainId) {
      const data = {
        id: trainId
      }
      getTrainInfo(data).then(response => {
        if (response.Result === 1) {
          this.$parent.trainCategory = response.Data.TrainCategory
          this.$parent.title = response.Data.TrainTitle
          this.$parent.vedioUrl = response.Data.TrainVideo === null || response.Data.TrainVideo === '' ? '' : response.Data.TrainVideo
          if (response.Data.QuestionList.length > 0 && response.Data.QuestionList[0].QuestionId !== 0) {
            let str = JSON.stringify(response.Data.QuestionList)
            str = str.replace(new RegExp('"OptionIsCorrect":1', 'gm'), '"OptionIsCorrect": true')
            str = str.replace(new RegExp('"OptionIsCorrect":0', 'gm'), '"OptionIsCorrect": false')
            console.log(str)
            this.list2 = JSON.parse(str)
          }
        }
      })
    },
    log: function(evt) {
      window.console.log(evt)
    },
    cloneDog(evt) {
      return evt
    },
    editClick(ele, index) {
      console.log(index)
      this.dialogIndex = index
      this.dialogFormVisible = true
      this.formEditControl.QuestionId = ele.QuestionId
      this.formEditControl.QuestionIndex = ele.QuestionIndex
      this.formEditControl.QuestionTitle = ele.QuestionTitle
      this.formEditControl.QuestionCategory = ele.QuestionCategory
      this.formEditControl.OptionList = []
      //							 this.formEditControl.options=ele.OptionList;
      if (ele.OptionList && ele.OptionList.length > 0) {
        ele.OptionList.forEach(item => {
          const opt = {
            OptionId: item.OptionId,
            OptionIndex: item.OptionIndex,
            OptionTitle: item.OptionTitle,
            OptionImg: item.OptionImg,
            OptionIsCorrect: item.OptionIsCorrect

          }
          this.formEditControl.OptionList.push(opt)
          index++
        })
      }
    },
    deleteClick(ele, index) {
      this.list2.splice(index, 1)
    },
    addOptions() { // 增加选项
      const len = this.formEditControl.OptionList.length
      const item = {
        OptionId: 0,
        OptionIdex: len,
        OptionTitle: '选项' + (len + 1),
        OptionImg: '',
        OptionIsCorrect: false
      }
      this.formEditControl.OptionList.push(item)
    },
    deleteOptions() { // 删除选项
      this.formEditControl.OptionList.pop()
    },
    deleteRow(row, myIndex) {
      this.formEditControl.OptionList.splice(myIndex, 1) // 删除
    },
    onscrollFn() {
      const elmain = document.getElementById('app-wrapper')
      const _this = this
      elmain.onscroll = function() {
        const scrollTop = elmain.pageYOffset || elmain.scrollTop || document.body.scrollTop
        console.log(scrollTop)
        if (scrollTop > 300) {
          _this.fiedLeft = true
        } else {
          _this.fiedLeft = false
        }
      }
    },
    dialogSave(formName) {
      var str = JSON.stringify(this.formEditControl)
      this.list2[this.dialogIndex] = JSON.parse(str)
      this.dialogFormVisible = false
    },
    fileSuccess(response, file, fileList) {
      if (response.Result === 1) {
        this.formEditControl.OptionList[this.optionsIndex].OptionImg = response.Data
      }
    },
    uploadIndex(scope) {
      console.log('index:' + scope.$index)
      this.optionsIndex = scope.$index
    },
    handleRemove(file, fileList) {
      this.formEditControl.OptionList[this.optionsIndex].OptionImg = ''
    },
    upFunction(i) {
      console.log('upFunction')
    },
    downFunction(i) {
      console.log('downFunction')
    },
    changeRadio(item, index) {
      item.forEach(it => {
        it.OptionIsCorrect = false
      })
      item[index].OptionIsCorrect = true
    },
    savePaperSavequestions(type) { // 保存题目
      const data = {
        TrainId: this.$route.params.id,
        TrainCategory: this.$parent.trainCategory,
        TrainTitle: this.$parent.title,
        TrainVideo: this.$parent.vedioUrl
      }
      if (this.list2.length > 0) {
        data.QuestionList = this.list2
      }
      let str = JSON.stringify(data)
      str = str.replace(new RegExp('false', 'gm'), '0')
      str = str.replace(new RegExp('true', 'gm'), '1')
      const data2 = JSON.parse(str)
      paperSavequestions(data2).then(response => {
        if (response.Result === 1) {
          this.$notify({
            title: 'Success',
            message: '保存成功',
            type: 'success',
            duration: 2000
          })
        }
      })
    }
  }
}
</script>

<style>
.new-drag-topbtn{
  background: #61CBFF;
  color: #ffffff;
  line-height: 36px;
  text-align: center;
}

.new-fied{
    position: fixed;
    top: 200px;
    left: 0px;
    margin-left: 40px !important;
    margin-top: 20px !important;
    width: 160px !important;
}
.new-fied-rigth{
  margin-left: 210px;
}

	.drag_box {
		display: flex;
		height: 100%;
		font-size: 14px;
	}

	.drag_box .drag_left {
		width: 190px;
		min-width: 190px;
		background: #ECEFF4;
		margin-left: 20px;
		margin-top: 20px;
		height: 370px;
	}

	.drag_box .drag_right {
		width: 100%;
		height: 100%;
	}

	.drag_right .list-group {
		/*height: calc(100% - 240px);*/
		overflow: auto;
		/*margin: 20px;*/
		min-height: 200px;
		/*padding-bottom: 50px;*/
	}

	.drag_left .list-group-item {
		margin: 10px;
		background: #ffffff;
		font-size: 13px;
		color: #7a859b;
		line-height: 36px;
		text-align: center;
		border-radius: 5px;
		cursor: move;
	}

	.drag_right .list-group-item {
		width: 100%;
		padding: 10px;
		position: relative;
		min-height: 50px;
		cursor: move;
		border: 1px solid #DCDCDC;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		background: #ECEFF4;
		margin-bottom: 20px;
	}

	.drag_right .sortable-ghost {
		border: 1px dashed #409EFF;
	}

	.col_upload .el-icon-plus {
		vertical-align: middle;
	}

	.col_upload .el-upload--picture-card {
		width: 100px;
		height: 100px;
		line-height: 98px;
		margin: 0 8px 8px 0;
	}

	.col_upload .el-upload-list--picture-card .el-upload-list__item {
		width: 100px;
		height: 100px;
	}

	.table_input .el-input {
		width: 180px !important;
	}

	.table_input img {
		display: inline-block;
		width: 20px;
		margin-left: 10px;
		vertical-align: text-bottom;
		cursor: pointer;
	}

	.upiconChange img {
		display: inline-block;
		vertical-align: middle;
		width: 20px;
		height: 20px;
		margin: 2px 5px;
  }

  .new-coltype{
    position: relative;
}

.col_tag {
    display: flex;
    justify-content: space-between;
}

.col_tag .col_name {
    font-size: 16px;
    line-height: 36px;
}

.new-coltype .operation {
    display: none;
    cursor: pointer;
    position: absolute;
    bottom: 0px;
    right: 0px;
}

.new-coltype .operation img {
    margin-left: 10px;
    width: 20px;
    display: inline-block;
}

.line25 {
    line-height: 25px;
}

.drag_right .list-group-item:hover .operation {
    display: block;
}

.dialog_upload .el-upload--picture-card{
    width: 100px;
    height: 100px;
    line-height: 55px;
}
.dialog_upload_none .el-upload--picture-card{
    display: none;
}
.dialog_upload .el-upload-list--picture-card .el-upload-list__item{
    width: 30px;
    height: 30px;
    margin: 0px;
}
.dialog_upload .el-icon-delete{
    font-size: 16px;
    vertical-align: middle;
}
.el-icon-close-tip{
    display: none !important;
}
.dialog_upload .el-progress{
    font-size: 14px !important;
}
.dialog_upload .el-upload-list--picture-card .el-upload-list__item-actions{
    font-size: 16px;
}
.dialog_upload .el-upload--picture-card .el-icon-plus{
    font-size: 16px;
}

.new-drug-dialog .el-dialog .new-ts-btn .el-form-item__content{
     margin-left: 30px !important;
}
</style>
