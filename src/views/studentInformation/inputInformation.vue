<template>
  <div class="page_box bs_bx">
    <el-container style="height: 100vh; border: 1px solid #eee">
      <!-- 添加班级 -->
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <!-- 班级列表 -->
        <div class="calssList">
          <div class="classItem">
            <span><i class="el-icon-user-solid"></i> 七年级一班</span>
            <span><i class="el-icon-caret-right"></i></span>
          </div>
          <div class="classItem">
            <span><i class="el-icon-user-solid"></i> 七年级二班</span>
            <span><i class="el-icon-caret-right"></i></span>
          </div>
        </div>
        <!-- 添加班级 -->
        <div class="addClass">
          <el-button plain style="width: 80%;" @click="addClassRoom">添加班级</el-button>
        </div>
      <el-popover
        placement="right"
        width="400"
        trigger="click">
      </el-popover>
      </el-aside>
      <!-- 学生姓名列表 -->
      <el-container>
        <el-main>
          <el-table
            :data="tableData"
            height="80vh"
            border
            style="width: 100%"
            :row-class-name="tableRowClassName">
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
            <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
          </el-table>
          <div style="margin-top: 20px">
            <el-button>切换第二、第三行的选中状态</el-button>
            <el-button>取消选择</el-button>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <!-- 选择班级弹框 -->
    <el-dialog title="请选择班级" :visible.sync="dialogVisible" width="60%" modal>
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
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addGrade">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import "../../styleSheet/projectStyle/studentInformation.scss"
import { truncate } from 'fs-extra';
import { isNull } from 'util';
  const fs = require('fs')
  const path = require('path')
  export default {
    mounted() {
      this.getFileList()
    },
    data() {
      return {
        dataList: [],
        dialogVisible: false,
        grade: '',
        gradeTxt: '',
        banj: '',
        banjTxt: '',
        classRoomId: '',
        classRoomName: '',
        isNext: true,
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
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
      getFileList() {
        let _this = this
        let fileList = []
        let urlPath = path.join(process.cwd(), '/src/dataJson/')
        fs.readdir(urlPath, function (err, files) {
          for(let i = 0; i < files.length; i++) {
            _this.dataList.push(JSON.parse(fs.readFileSync(urlPath + files[i])))
            console.log(_this.dataList)
          }
          // if (err) {
          //   console.log(err)
          // } else {
          //   files.forEach((file) => {
          //     console.log(file.split('.')[0])
          //     _this.myGradeList.push(file.split('.')[0])
          //   })
          // }
        })
      },
      // 选择班级
      addClassRoom() {
        this.dialogVisible = true;
      },
      // 添加班级
      addGrade() {
        let _this = this
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
            this.isNext = false
          }
        })
        let data = {
          classRoomId: this.classRoomId,
          classRoomName: this.classRoomName,
          studentList: []
        }
        let urlPath = path.join(process.cwd(), `/src/dataJson/${this.classRoomId}.json`)
        let dataJson = JSON.stringify(data)
        if (this.isNext) {
          fs.writeFileSync(urlPath, dataJson)
        }
        this.dialogVisible = false
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },

      handleEdit(index, row) {
        console.log(index, row);
        this.getFileList()
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  }
</script>

