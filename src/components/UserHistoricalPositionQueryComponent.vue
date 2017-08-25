<!--
内容：历史持仓 组件
作者：BOBO
日期： 20170803
-->
<template>
  <div class="user-historical-position-query-component">
  	<header class="table-common-head clearfix">
  		<span class="tit fl">历史持仓<br/> Historical Position Query</span>
	    <div class="hpqc-summary fr">
        <Tooltip placement="bottom">
            <i class="iconfont icon-tips mr10"></i>

            <div slot="content" style="width: 350px;">
                <p>提示：最多同时查询连续五个交易日的持仓情况</p>
                <p>Alert: five days' position can be showed at the same time at most</p>
            </div>
        </Tooltip>

        <Date-picker type="date" placeholder="选择日期" v-model="start_date" style="width: 140px" placement="bottom-end" class="mr10"></Date-picker>
        <span class="mr10">至</span>
        <Date-picker type="date" placeholder="选择日期" v-model="end_date" style="width: 140px" placement="bottom-end" class="mr10"></Date-picker>
        <Button type="info" shape="circle" style="width: 70px" class="mr10" @click="searchData">查询</Button>
      </div>
  	</header>
    
    <div class="historicalPositionQueryData-wrap">
      <template v-for="(obj, key) in simulatedData">
        <h5 class="date-tit">{{ key }}日持仓情况</h5>

        <table cellpadding="0" cellspacing="0" class="table-common-main-lang">
          <thead>
            <tr>
              <th v-for="item in historicalPositionQueryHead">
                <strong>{{ item.title }}</strong>
                {{ item.lang }}
              </th>  
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in obj">
              <td>{{ item.spotName }}</td>
              <td>{{ item.positionType }}</td>
              <td>{{ item.positionAmount }}</td>
              <td>{{ item.averageCost | currencyFormatter }}</td>
              <td>{{ item.closePrice | currencyFormatter }}</td>
              <td><plus-or-reduce-state :obj="item.floatingReturn"></plus-or-reduce-state></td>
              <td>{{ item.positionMargin | currencyFormatter }}</td>
              <td>{{ item.positionRatio }}%</td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>

  </div>
</template>

<script>
//引入全局过滤器
import currencyFormatter from '@/filter/currencyFormatter'
import plusOrReduceState from '@/components/common/plusOrReduceState'

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
  components: {
    currencyFormatter,
    plusOrReduceState
  },
  name: 'user-historical-position-query-component',
  props: ['headSummary'], // 父组件传headSummary属性过来，如果为false，则不显示账户持仓组件头部右边内容
  data () {
    return {
      end_date: '', //结束日期
      h_query_num: 5, //每页记录数
      h_start_num: 1, //当前第几页
      start_date: '', //开始日期
      trading_token: 'xx', //交易token

      //数据
      simulatedData: [],

      historicalPositionQueryHead: [
        {
            title: '合约',
            lang: 'Spot Name'
        },
        {
            title: '多空类型',
            lang: 'Position Type'
        },
        {
            title: '持仓数量',
            lang: 'Position Amount'
        },
        {
            title: '开仓均价',
            lang: 'Average Cost'
        },
        {
            title: '收盘价',
            lang: 'Close Price'
        },
        {
            title: '浮动盈亏',
            lang: 'Floating Return'
        },
        {
            title: '占用资金',
            lang: 'Position Margin'
        },
        {
            title: '仓位',
            lang: 'Position Ratio'
        }
      ]
    }
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
        h_query_num: this.h_query_num, //每页记录数
        h_start_num: this.h_start_num, //当前第几页
        start_date: this.startDateFarmatter, //开始日期
        trading_token: vm.$store.state.trading_token, //交易token
      };

      if(!!this.end_date && !!this.h_query_num && !!this.h_start_num && !!this.start_date && !!this.trading_token){
        this.$http({
          method: 'post',
          url: process.env.BASE_URL + '/marketAccount/historyDeferPosition',
          params: params,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        })
        .then(function (response) {
          if(response.data.code === 100){
            vm.simulatedData = response.data.data.list;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .hpqc-summary{ padding: 14px 15px; height: 60px;
    .icon-tips{ font-size: 24px; vertical-align: middle;}
  }
  .historicalPositionQueryData-wrap{ height: 700px; overflow: auto;
    .date-tit{ margin: 5px 0 0; padding-left: 20px; height: 30px; line-height: 30px; background: #3B4B76;}
  }
</style>
