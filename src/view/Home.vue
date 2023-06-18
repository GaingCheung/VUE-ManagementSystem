<template>
  <div>
    <el-row>
      
      <!-- 左侧 -->
      <el-col :span="8" style="padding-right:10px">

        <!-- 用户信息显示 -->
        <el-card >
          <!-- 上方用户头像和名称 -->
          <div class="user">
            <img src="../assets/bell.jpg" alt="">
            <div class="userinfo">
              <p class="name">Admin</p>
              <p class="access">超级管理员</p>
            </div>
          </div>
          <!-- 上方用户头像和名称 -->
          <!-- 下方地点和时间 -->
          <div class="login-info">
            <p>上次登录时间：<span>2022-11-01</span></p>
            <p>上次登录地点：<span>广州</span></p>
          </div>
          <!-- 下方地点和时间 -->          
        </el-card>
        <!-- 用户信息显示 -->    
        
        <!-- 下方表格 -->
        <el-card style="margin-top: 20px; height: 460px;">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column v-for="(val, key) in tableLabel"  :prop="key" :label="val" :key="key">
            </el-table-column>
          </el-table>
        </el-card>
        <!-- 下方表格 -->

      </el-col>
      <!-- 左侧 -->

      <!-- 右侧 -->
      <el-col :span="16" style="padding-left:10px">
        <!-- 上方订单统计 -->
        <div class="num">
          <el-card v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0}">
            <i :class="`el-icon-${item.icon}`" :style="{backgroundColor: item.color}"></i>
            <div class="detail">
              <p>￥{{ item.value }}</p>
              <p>{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <!-- 上方订单统计 -->

        <!-- 折线图 -->
        <el-card style="height: 280px">
          <div ref="echarts1" style="height: 280px;"></div>
        </el-card>
        <!-- 折线图 -->

        <div class="graph">

          <!-- 柱状图 -->
          <el-card>
            <div ref="echarts2" style="height: 260px"></div>
          </el-card>
          <!-- 柱状图 -->

          <!-- 饼状图 -->
          <el-card>
            <div ref="echarts3" style="height: 240px"></div>
          </el-card>
          <!-- 饼状图 -->
        </div>
      </el-col>
      <!-- 右侧 -->

    </el-row>
  </div>
</template>

<script>
import { getData } from '../api'
import * as echarts from 'echarts'
export default {
  data(){
    return {
      // 行表格数据
      tableData :[],
      // 行表格表头名称
      tableLabel:{
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      // 右侧订单数据
      countData:[
        {
          name: '今日支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name:'今日收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name:'今日未支付订单',
          value:1234,
          icon: 's-goods',
          color: '#5ab1ef'
        },
        {
          name: '今日支付订单1',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9'
        },
        {
          name:'今日收藏订单1',
          value: 210,
          icon: 'star-on',
          color: '#ffb980'
        },
        {
          name:'今日未支付订单1',
          value:1234,
          icon: 's-goods',
          color: '#5ab1ef'
        }
      ]
    }
  },
  mounted(){
    // 请求首页数据，返回一个promise函数
    getData().then(({ data }) => {
      // 行表格数据
      const { tableData } = data.data
      this.tableData = tableData
      
      // 折线图
      // 基于准备好的dom的节点，初始化echarts实例
      const echarts1 = echarts.init(this.$refs.echarts1)
      var echarts1Option = {}
      const{ orderData } = data.data
      // x轴
      echarts1Option.xAxis = {
        data: orderData.date
      }
      // y轴
      echarts1Option.yAxis = {}
      // 图例
      const legend = Object.keys(orderData.data[0])
      echarts1Option.legend = {
        data: legend
      }
      // 具体数据
      echarts1Option.series = []
      legend.forEach(key => {
        echarts1Option.series.push({
          name: key,
          data: orderData.data.map(item => item[key]),
          type: 'line'
        })
      })
      echarts1.setOption(echarts1Option)
      // 折线图

      // 柱状图
      const echarts2 = echarts.init(this.$refs.echarts2)
      var echarts2Option = {
        legend:{
          textStyle: {
            color: "#333"
          }
        },
        grid: {
          left: '20%'
        },
        tooltip:{
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data:[],
          axisLine: {
            lineStyle: {
              color: '#17b3a3'
            }
          },
          axisLabel:{
            interval: 0,
            color: '#333'
          }
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: '#17b3a3'
              }
            }
          }
        ],
        color: ['#2ec7c9', '#b6a2de'],
        series: []
      }
      const { userData } = data.data
      echarts2Option.xAxis.data = userData.map(item => item.date)
      echarts2Option.series = [
        {
          name: '新增用户',
          data: userData.map(item => item.new),
          type: 'bar'
        },
        {
          name: '活跃用户',
          data: userData.map(item => item.active),
          type: 'bar'
        }
      ]
      echarts2.setOption(echarts2Option)
      // 柱状图

      // 饼状图
      const echarts3 = echarts.init(this.$refs.echarts3)
      const{ videoData } = data.data
      var echarts3Option = {
        tooltip:{
          trigger: 'item'
        },
        color: [
          '#0f78f4',
          '#dd536b',
          '#9462e5',
          '#a6a6a6',
          '#e1bb22',
          '#39c362',
          '#3ed1cf'
        ],
        series:[]
      }
      echarts3Option.series = [
        {
          type: 'pie',
          data: videoData
        }
      ]
      echarts3.setOption(echarts3Option)
      // 饼状图
    })
  }
}
</script>

<style lang="less" scoped>
.user{
  // 用户信息上方头像和名称
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    img{
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 40px;
    }
    .userinfo{
      .name{
        font-size: 32px;
        margin-bottom: 10px;
      }
      .access{
        color: #999;
      }
    }
}
.login-info{
  // 用户信息下方地点和时间
  p {
      line-height: 28px;
      font-size: 14px;
      color: #999;
      span{
        color: #666;
        margin-left: 60px;
      }
    }
  }
.num{
  // 右侧上方订单详细
  display:flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-card{
    width: 32%;
    margin-bottom: 20px;
      i {
          width: 80px;
          height: 80px;
          font-size: 30px;
          color: #fff;
          text-align: center;
          line-height: 80px;
        }
      
        .detail {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-left: 15px;
      
          :first-child {
            line-height: 30px;
            height: 30px;
            font-size: 30px;
            margin-bottom: 10px;
          }
      
          :last-child {
            font-size: 14px;
            text-align: center;
            color: #999;
          }
        }
  }
  
}
.graph{
  // 下方三个图标区域
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  .el-card{
    width: 48%;
    height: 260px;
  }
}
</style>