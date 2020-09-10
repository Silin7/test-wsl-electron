<template>
  <div class="bs_bx page_box">
      <div class="main-container">
        <!-- <template name="点名器">
          <el-carousel :interval="200" type="card" height="200px" @setActiveItem="setActiveItem(item)" :loop="true" :autoplay="isAutoplay">
            <el-carousel-item v-for="item in 6" :key="item">
              <h3 class="medium">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </template> -->
        <div>{{isname}}</div>
          <el-button type="success" @click="showNames">成功按钮</el-button>
          <el-button type="warning" @click="stop">警告按钮</el-button>
      </div>
    <!-- 装饰 -->
    <template name="decorate">
      <img src="../../assets/images/qp01.png" alt="" class="diaryPageqp01">
      <img src="../../assets/images/qp02.png" alt="" class="diaryPageqp02">
      <img src="../../assets/images/qp03.png" alt="" class="diaryPageqp03">
    </template>
  </div>
</template>

<script>
  import "../../styleSheet/projectStyle/beginsPage.scss"
  export default {
    mounted() {
    },
    data() {
      return {
        interval: '',
        isname: '',
        names: ['张三','小明','小刚','小王','小张','小李','小胡']
      }
    },
    filters: {
     
    },
    methods: {
      showNames() {
        clearInterval(this.interval);
        let i = 0
        this.interval = setInterval(() => {
          this.isname = this.names[i]
          i++;
          if (i == this.names.length - 1) {
            i = 0;
          }
        },30)
      },
      stop() {
        clearInterval(this.interval);
      }
    }
  }
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
