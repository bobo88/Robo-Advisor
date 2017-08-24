<!--
内容：账户持仓页面
作者：BOBO
日期： 20170802
-->
<template>
  <div class="user-account-paremeters mb30">
  	<header class="table-common-head clearfix">
  		<span class="tit fl">账户参数 <br/> Account Index</span>
  	</header>

    <table cellpadding="0" cellspacing="0" class="table-common-main-lang">
      <thead>
        <tr>
          <th v-for="item in tableData.tHead">
            <strong>{{ item.title }}</strong>
            {{ item.lang }}
          </th>  
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ simulatedData.totalAsset | currencyFormatter }}</td>
          <td><plus-or-reduce-state :obj="simulatedData.cumulativeReturn"></plus-or-reduce-state></td>
          <td>{{ simulatedData.ROA }}%</td>
          <td>{{ simulatedData.netWorthRate }}</td>
          <td><plus-or-reduce-state :obj="simulatedData.maxDrawdown" :percentage="true"></plus-or-reduce-state></td>
          <td>{{ simulatedData.sharpeRatio }}</td>
          <td>{{ simulatedData.successRatio }}%</td>
          <td>{{ simulatedData.positionRatio }}%</td>
        </tr>
      </tbody>
    </table>

    <table cellpadding="0" cellspacing="0" class="table-common-main-lang">
      <thead>
        <tr>
          <th v-for="item in tableData2.tHead">
            <strong>{{ item.title }}</strong>
            {{ item.lang }}
          </th>  
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><plus-or-reduce-state :obj="simulatedData.lastSurplus"></plus-or-reduce-state></td>
          <td>{{ simulatedData.positionMargin | currencyFormatter }}</td>
          <td>{{ simulatedData.availableFund | currencyFormatter }}</td>
          <td>{{ simulatedData.frozenFund | currencyFormatter }}</td>
          <td>{{ simulatedData.fundEfficiency }}%</td>
          <td>{{ simulatedData.longPosition }}%</td>
          <td>{{ simulatedData.shortPosition }}%</td>
          <td><plus-or-reduce-state :obj="simulatedData.floatingReturn"></plus-or-reduce-state></td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
//引入全局过滤器
import currencyFormatter from '@/filter/currencyFormatter'
import plusOrReduceState from '@/components/common/plusOrReduceState'

export default {
  components: {
    currencyFormatter,
    plusOrReduceState
  },
  name: 'user-account-paremeters',
  data () {
    return {
      simulatedData: {},

      tableData: {
        tHead: [
          {
              title: '账户总权益',
              lang: 'Total Asset'
          },
          {
              title: '总盈亏',
              lang: 'Cumulative Return'
          },
          {
              title: '总收益率',
              lang: 'ROA'
          },
          {
              title: '净值',
              lang: 'Networth Rate'
          },
          {
              title: '最大回撤',
              lang: 'Max Drawdown'
          },
          {
              title: '夏普比率',
              lang: 'Sharpe Ratio'
          },
          {
              title: '成功率',
              lang: 'Success Ratio'
          },
          {
              title: '总仓位',
              lang: 'Position Ratio'
          }
        ]
      },

      tableData2: {
        tHead: [
          {
              title: '上日盈亏',
              lang: 'Last Surplus'
          },
          {
              title: '持仓占用资金',
              lang: 'Position Margin'
          },
          {
              title: '可用资金',
              lang: 'Available Fund'
          },
          {
              title: '冻结资金',
              lang: 'Frozen Fund'
          },
          {
              title: '资金使用率',
              lang: 'Fund Efficiency'
          },
          {
              title: '多头仓位',
              lang: 'Long Position'
          },
          {
              title: '空头仓位',
              lang: 'Short Position'
          },
          {
              title: '总浮动盈亏',
              lang: 'Floating Return'
          }
        ]
      }

    }
  },
  mounted: function(){
    var vm = this;
    var params = {trading_token: vm.$store.state.trading_token};

    this.$http({
      method: 'post',
      url: process.env.BASE_URL + '/marketAccount/accountIndex',
      params: params,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    })
    .then(function (response) {
      if(response.data.code === 100){
        vm.simulatedData = response.data.data;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.account-position-table{
		.ivu-table-header{}
	}
</style>
