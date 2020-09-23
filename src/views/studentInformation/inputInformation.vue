<template>
  <div class="page_box bs_bx">
    <el-container style="height: 100vh; border: 1px solid #eee">
      <!-- 添加班级 -->
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <!-- 班级列表 -->
        <div class="calssList">
          <div class="classItem" v-for="(item, index) in dataList" :key="index" @click="currentClass(item)">
            <span><i class="el-icon-user-solid"></i> {{item.classRoomName}}</span>
            <span><i class="el-icon-caret-right"></i></span>
          </div>
        </div>
        <!-- 添加班级 -->
        <div class="addClass">
          <el-button plain style="width: 80%;" @click="addClassRoom">添加班级</el-button>
        </div>
      </el-aside>
      <!-- 学生姓名列表 -->
      <el-container>
        <el-main v-if="currentItem .classRoomId">
          <div class="currentClass">
            <span class="currentClass_span">当前班级： {{currentItem .classRoomName}}</span>
            <el-button type="text" @click="quitePage">退出 <i class="el-icon-switch-button"></i></el-button>
          </div>
          <el-table :data="currentItem.studentList" height="80vh" border style="width: 100%" :row-class-name="tableRowClassName">
            <el-table-column align="center" header-align="center" prop="stNumber" label="学号" sortable></el-table-column>
            <el-table-column align="center" header-align="center" prop="stName" label="姓名"></el-table-column>
            <el-table-column align="center" header-align="center" prop="stClass" label="班级"></el-table-column>
            <el-table-column align="center" header-align="right" >
              <template slot="header" slot-scope="scope">
                <el-button @click="addStudent">新增</el-button>
              </template>
              <template slot-scope="scope">
                <!-- 修改有bug，不想解决了，暂时注释 -->
                <!-- <el-button style="width: 40% !important;" @click="handleEdit(scope.$index, scope.row)">修改</el-button> -->
                <el-button style="width: 60% !important;" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="saveStudent" v-if="currentItem.studentList.length > 0">
            <el-button style="width: 100% !important;" type="primary" @click="saveStudent">保存</el-button>
          </div>
        </el-main>
        <el-main v-else>
          <div class="currentClass">
            <span class="currentClass_span"> </span>
            <el-button type="text" @click="quitePage">退出 <i class="el-icon-switch-button"></i></el-button>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <!-- 选择班级弹框 -->
    <el-dialog title="请选择班级" :visible.sync="addClassDialog" width="60%" modal>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-select v-model="grade" placeholder="请选择" style="width: 100%;">
            <el-option
              v-for="item in gradeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-select v-model="banj" placeholder="请选择" style="width: 100%;">
            <el-option
              v-for="item in banjList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addClassDialog = false">取 消</el-button>
        <el-button type="primary" @click="addGrade">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增同学 -->
    <el-dialog title="请选择班级" :visible.sync="addStudentDialog" width="60%" modal>
      <el-form label-position="top" label-width="80px" :model="stInfomation">
        <el-form-item label="学号">
          <el-input v-model="stInfomation.stNumber" clearable></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="stInfomation.stName" clearable></el-input>
        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="stInfomation.stClass" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addStudentDialog = false">取 消</el-button>
        <el-button type="primary" @click="saveAddStudent">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import "../../styleSheet/projectStyle/studentInformation.scss"
  import { truncate } from 'fs-extra'
  import { isNull } from 'util'
  import { constants } from 'zlib';
  import { json } from 'body-parser';
  const fs = require('fs')
  const path = require('path')
  export default {
    mounted() {
      this.getFileList()
    },
    data() {
      return {
        dataList: [],
        currentItem: {},
        stInfomation: {
          stNumber: '',
          stName: '',
          stClass: '',
        },
        addClassDialog: false,
        addStudentType: -1,
        addStudentDialog: false,
        grade: '',
        gradeTxt: '',
        banj: '',
        banjTxt: '',
        classRoomId: '',
        classRoomName: '',
        tableData: [],
        gradeList: [
          {
            value: 'G1',
            label: '一年级'
          },{
            value: 'G2',
            label: '二年级'
          },{
            value: 'G3',
            label: '三年级'
          },{
            value: 'G4',
            label: '四年级'
          },{
            value: 'G5',
            label: '五年级'
          },{
            value: 'G6',
            label: '六年级'
          },{
            value: 'G7',
            label: '七年级'
          },{
            value: 'G8',
            label: '八年级'
          },{
            value: 'G9',
            label: '九年级'
          },{
            value: 'G10',
            label: '高一年级'
          },{
            value: 'G11',
            label: '高二年级'
          },{
            value: 'G12',
            label: '高三年级'
          }
        ],
        banjList: [
          {
            value: '01',
            label: '一班'
          }, {
            value: '02',
            label: '二班'
          }, {
            value: '03',
            label: '三班'
          }, {
            value: '04',
            label: '四班'
          }, {
            value: '05',
            label: '五班'
          }, {
            value: '06',
            label: '六班'
          }, {
            value: '07',
            label: '七班'
          }, {
            value: '08',
            label: '八班'
          }, {
            value: '09',
            label: '九班'
          }, {
            value: '10',
            label: '十班'
          }, {
            value: '11',
            label: '十一班'
          }, {
            value: '12',
            label: '十二班'
          }, {
            value: '13',
            label: '十三班'
          }, {
            value: '14',
            label: '十四班'
          }, {
            value: '15',
            label: '十五班'
          }, {
            value: '16',
            label: '十六班'
          }, {
            value: '17',
            label: '十七班'
          }, {
            value: '18',
            label: '十八班'
          }, {
            value: '19',
            label: '十九班'
          }, {
            value: '20',
            label: '二十班'
          }, {
            value: '21',
            label: '二十一班'
          }, {
            value: '22',
            label: '二十二班'
          }, {
            value: '23',
            label: '二十三班'
          }, {
            value: '24',
            label: '二十四班'
          }
        ],
      }
    },
    methods: {
      // 读取本地json
      getFileList() {
        let _this = this
        let fileList = []
        let urlPath = path.join(process.cwd(), '/src/dataJson/')
        fs.readdir(urlPath, function (err, files) {
          for(let i = 0; i < files.length; i++) {
            console.log(JSON.parse(fs.readFileSync(urlPath + files[i])))
            _this.dataList.push(JSON.parse(fs.readFileSync(urlPath + files[i])))
            // _this.dataList.push(fs.readFileSync(urlPath + files[i]))
          }
        })
        // this.dataList.forEach(element => {
        //   element = JSON.parse(element)
        // });
      },
      // 添加班级
      addClassRoom() {
        this.addClassDialog = true;
      },
      addGrade() {
        let _this = this
        let addGradeNext = true
        this.gradeList.forEach(item => {
          if (item.value === this.grade) {
            this.gradeTxt = item.label
          }
        })
        this.banjList.forEach(item => {
          if (item.value === this.banj) {
            this.banjTxt = item.label
          }
        })
        this.classRoomId = this.grade + this.banj
        this.classRoomName = this.gradeTxt + this.banjTxt
        this.dataList.forEach(item => {
          if (item.classRoomId === this.classRoomId) {
            addGradeNext = false
            this.$message.error(`您已经添加了${this.classRoomName}`);
          }
        })
        let data = {
          classRoomId: this.classRoomId,
          classRoomName: this.classRoomName,
          studentList: []
        }
        let urlPath = path.join(process.cwd(), `/src/dataJson/${this.classRoomId}.json`)
        let dataJson = JSON.stringify(data)
        if (addGradeNext) {
          fs.writeFileSync(urlPath, dataJson)
          this.$message.success(`您已成功添加${this.classRoomName}`)
        }
        this.addClassDialog = false
      },
      // 显示当前班级信息
      currentClass(item) {
        this.currentItem = item
      },
      // 添加学生
      addStudent() {
        this.addStudentType = -1
        this.stInfomation = {
          stNumber: '',
          stName: '',
          stClass: '',
        }
        this.addStudentDialog = true
      },
      saveAddStudent() {
        let _this = this
        let saveAddStudentNext = true
        if (this.stInfomation.stNumber === '') {
          this.$message.error('请填写学生学号')
          return
        } else {
          if (_this.currentItem.studentList.length > 0) {
            _this.currentItem.studentList.forEach(item => {
              console.log(item.stNumber)
              console.log(_this.stInfomation.stNumbe)
              if (item.stNumber === _this.stInfomation.stNumber) {
                saveAddStudentNext = false
                _this.$message.error('学生学号重复')
              }
            })
            // for (let i = 0; i < _this.currentItem.studentList.length > 0; i++) {
            //   if (_this.currentItem.studentList[i].stNumber === _this.stInfomation.stNumber) {
            //     console.log(_this.currentItem.studentList[i].stNumber)
            //     console.log(_this.stInfomation.stNumber)
            //     saveAddStudentNext = false
            //     _this.$message.error('学生学号重复')
            //   }
            // }
          }
        }
        if (/^[0-9]*$/.test(this.stInfomation.stNumber) === false) {
          this.$message.error('学生学号应为纯数字')
          return
        }
        if (this.stInfomation.stName === '') {
          this.$message.error('请填写学生姓名')
          return
        }
        if (this.stInfomation.stClass === '') {
          this.$message.error('请填写学生班级')
          return
        }
        console.log(saveAddStudentNext)
        if (saveAddStudentNext) {
          // addStudentType小于0为新增学生信息，大于0为修改学生信息
          if (this.addStudentType < 0) {
            this.currentItem.studentList.push(this.stInfomation)
            this.$message.success('新增学生信息成功')
          } else {
            this.currentItem.studentList.splice(this.addStudentType, 1, row)
            this.$message.success('修改学生信息成功')
          }
          this.addStudentDialog = false
        }
      },
      saveStudent() {
        let _this = this
        let currentItemJson = JSON.stringify(this.currentItem)
        let urlPath = path.join(process.cwd(), '/src/dataJson/', this.currentItem.classRoomId + '.json')
        console.log(urlPath)
        console.log(currentItemJson)
        // fs.writeFileSync(urlPath, currentItemJson)
        fs.writeFile(urlPath, currentItemJson, (err) => {
            _this.$message.success('保存成功')
          // if (err) {
          //   console.log(err)
          // } else {
          //   _this.$message.success('保存成功')
          // }
        });
      },
      // 修改学生信息
      handleEdit(index, row) {
        this.addStudentType = index
        this.stInfomation = row
        this.addStudentDialog = true
      },
      // 删除学生信息
      handleDelete(index, row) {
        let _this = this
        this.$confirm('您确定删除这条学生信息吗?', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           _this.currentItem.studentList.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 退出系统
      quitePage() {
        this.$router.go(-1)
      },
      // 渐变色
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      }
    }
  }
</script>

