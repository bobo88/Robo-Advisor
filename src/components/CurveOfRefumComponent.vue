<!--
内容：收益走势 组件
作者：BOBO
日期： 20170803
-->
<template>
  <div class="curve-of-refum-component mb30">
  	<header class="table-common-head clearfix">
  		<span class="tit fl">收益走势 <br/> Curve Of Account Return</span>
  		<div class="curve-of-refum-component-summary fr">
  			<Date-picker type="date" placeholder="选择日期" style="width: 140px" placement="bottom-end" class="mr10"></Date-picker>
        <span class="mr10">至</span>
        <Date-picker type="date" placeholder="选择日期" style="width: 140px" placement="bottom-end" class="mr10"></Date-picker>
        <Button type="info" shape="circle" style="width: 70px" class="mr10">查询</Button>
  		</div>
  	</header>

    <div class="chart-wrap">
      <div id="curveOfRefumChart" style="width:100%; height: 500px;"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'curve-of-refum-component',
  data () {
    return {

    }
  },
  mounted(){
    this.$nextTick(function() {
        var curveOfRefumChart = echarts.init(document.getElementById('curveOfRefumChart'));
        var curveOfRefumChartOption = {
            title: {
                text: '收益率(Return Rate)',
                top: 10,
                left: 10,
                textStyle: {
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 'normal'
                }
            },
            tooltip : {
                trigger: 'axis'
            },
            color:['#48cda6','#fd87ab','#11abff'],  //手动设置每个图例的颜色
            legend: {
                top: 10,
                right: 'center',
                itemHeight: 10,
                itemWidth: 10,
                itemGap: 50,
                textStyle:{
                    color: '#fff',
                },
                data:['Real Account','Au(T+D)','Simulated Account']
            },
            toolbox: {
        
            },
            calculable : true,
            xAxis : [
                {  
                    splitLine:{show: false}, //去除网格线
                    type : 'category',
                    boundaryGap : false,
                    axisLine:{
                      lineStyle: {
                        color: '#fff'
                      }
                    },
                    data : ['2016.10','2016.11','2016.12','2017.01','2017.02','2017.03','2017.04', '2017.05']
                }
            ],
            yAxis : [
                {
                    splitLine:{
                        lineStyle: {
                            color: '#333D5C'
                        }
                    },
                    axisLine:{
                      lineStyle: {
                        color: '#fff'
                      }
                    },
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'Real Account',
                    type:'line',
                    data:[3344, 3744, 8876, 4553, 3456, 2345, 6788, 4678]
                },
                {
                    name:'Au(T+D)',
                    type:'line',
                    data:[5344, 3478, 3244, 5555, 2389, 7532, 3788, 5888]
                },
                {
                    name:'Simulated Account',
                    type:'line',
                    data:[2344, 5677, 6771, 7899, 6788, 6532, 3456, 6544]
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        curveOfRefumChart.setOption(curveOfRefumChartOption);

    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .curve-of-refum-component-summary{ padding: 14px 15px; height: 60px;}
    .chart-wrap{ padding: 30px; background: #252F48;}
</style>
