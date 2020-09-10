<template>
  <div class="page_box bs_bx">
    <el-container style="height: 100vh; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
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
        
        <div class="addClass">
          <el-button plain style="width: 80%;" @click="tjbj">添加班级</el-button>
        </div>
      </el-aside>
      
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
            <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
            <el-button @click="toggleSelection()">取消选择</el-button>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  // import aaa from '../../background.js'
  import "../../styleSheet/projectStyle/studentInformation.scss"
  export default {
    mounted () {
      console.log(111)
    },
    data() {
      return {
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
        }]
      }
    },
    methods: {
      tjbj() {
        console.log(aaa)
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
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    }
  }
</script>

