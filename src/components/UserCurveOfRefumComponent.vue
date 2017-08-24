<!--
内容：收益走势 组件
作者：BOBO
日期： 20170803
-->
<template>
  <div class="curve-of-refum-component">
    <div class="curve-of-refum-summary-component mb30">
        <ul class="cofsc-list clearfix">
           <li>
                <i class="iconfont icon-quanyizhongxin mr10"></i>
                <div class="cont">
                    <p class="info-cont">{{ TOP.TotalAsset }}</p>
                    <p class="info-tit">账户权益(Total Asset)</p>
                </div>
           </li> 
           <li>
                <i class="iconfont icon-yingkuizichan mr10"></i>
                <div class="cont">
                    <p class="info-cont">{{ TOP.CumulativeReturn }}</p>
                    <p class="info-tit">总盈亏(Cumulative Return)</p>
                </div>
           </li>
           <li>
                <i class="iconfont icon-jingzhi mr10"></i>
                <div class="cont">
                    <p class="info-cont">{{ TOP.NetWorthRate }}</p>
                    <p class="info-tit">净值(Net Worth Rate)</p>
                </div>
           </li>
           <li>
                <i class="iconfont icon-baifenbi mr10"></i>
                <div class="cont">
                    <p class="info-cont">{{ TOP.ROA }}%</p>
                    <p class="info-tit">总收益率(ROA)</p>
                </div>
           </li>
        </ul>
    </div>

  	<header class="table-common-head clearfix">
  		<span class="tit fl">收益走势 <br/> Curve Of Account Return</span>
  		<div class="curve-of-refum-component-summary fr">
  			<Date-picker type="date" v-model="start_date" placeholder="选择日期" style="width: 140px" placement="bottom-end" class="mr10"></Date-picker>
        <span class="mr10">至</span>
        <Date-picker type="date" v-model="end_date" placeholder="选择日期" style="width: 140px" placement="bottom-end" class="mr10"></Date-picker>
        <Button type="info" shape="circle" style="width: 70px" class="mr10" @click="searchData">查询</Button>
  		</div>
  	</header>

    <div class="chart-wrap">
      <div id="curveOfRefumChart" style="width:100%; height: 500px;"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'

function formatTime(s) {
    if(!s){
        return;
    }
    var _str = [];

    //年yyyy
    _str[0] = s.getFullYear();
    //月MM
    s.getMonth() >= 9 ? _str[1] = s.getMonth()+1 : _str[1] = '0' + (s.getMonth()+1);
    //日dd
    s.getDate() > 9 ? _str[2] = s.getDate() : _str[2] = '0' + s.getDate();
    //小时HH
    s.getHours() > 9 ? _str[3] = s.getHours() : _str[3] = '0' + s.getHours();
    //分钟mm
    s.getMinutes() > 9 ? _str[4] = s.getMinutes() : _str[4] = '0' + s.getMinutes();
    //秒钟ss
    s.getSeconds() > 9 ? _str[5] = s.getSeconds() : _str[5] = '0' + s.getSeconds();
    
    return _str.join('');
}

export default {
  name: 'curve-of-refum-component',
  data () {
    return {
        end_date: '', //结束日期
        start_date: '', //开始日期
        //top
        TOP: {
            TotalAsset: 0,
            ROA: 0,
            NetWorthRate: 0,
            CumulativeReturn: 0
        },
        //CurveOfAccountReturn
        CurveOfAccountReturn: []
    }
  },
  mounted(){
    
  },
  computed: {
    startDateFarmatter() {
      var s = this.start_date;
      return formatTime(s);
    },
    endDateFarmatter() {
      var s = this.end_date;
      return formatTime(s);
    }
  },
  methods: {
    searchData(){
      var vm = this;
      var params = {
        end_date: this.endDateFarmatter, //结束日期
        start_date: this.startDateFarmatter, //开始日期
        trading_token: vm.$store.state.trading_token //交易token
      };

      if(!!this.end_date && !!this.start_date){
        this.$http({
          method: 'post',
          url: process.env.BASE_URL + '/marketSimulated/CurveOfRefum',
          params: params,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        })
        .then(function (response) {
          if(response.data.code === 100){
            vm.TOP = response.data.data.top;
            vm.CurveOfAccountReturn = response.data.data.CurveOfAccountReturn;
            // this.showCurveMap();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    },
    showCurveMap(){
        var vm = this;
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
                    // data : vm.CurveOfAccountReturn.day
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .cofsc-list{ 
        li{ position: relative; z-index: 1; float: left; margin-right: 1%; width: 24%; height: 164px; background: #1D2742; box-shadow: 0 0 10px 0 rgba(0,0,0,0.10); border-radius: 4px;
            .iconfont{ position: absolute; z-index: 2; top: 0; right: 0; color: #293451; font-size: 100px;
                &.icon-baifenbi{ font-weight: bold;}
            }
            .cont{ position:relative; z-index: 2; padding: 42px 0; text-align: center;
                .info-cont{ height: 50px; line-height: 50px; font-size: 36px; color: #8A9DD1; letter-spacing: -0.87px;}
                .info-tit{ height: 30px; line-height: 30px; font-size: 14px; color: #8A9DD1; letter-spacing: -0.34px;}
            }
        }
    }
    .curve-of-refum-component-summary{ padding: 14px 15px; height: 60px;}
    .chart-wrap{ padding: 30px; background: #252F48;}
</style>
