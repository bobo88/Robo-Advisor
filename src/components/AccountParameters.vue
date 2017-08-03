<!--
内容：账户持仓页面
作者：BOBO
日期： 20170802
-->
<template>
  <div class="account-paremeters mb30">
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
        <tr v-for="item in tableData.tDataList">
          <td>{{ item.totalAsset | currencyFormatter }}</td>
          <td>{{ item.cumulativeReturn | currencyFormatter }}</td>
          <td>{{ item.ROA }}%</td>
          <td>{{ item.networthRate }}</td>
          <td><plus-or-reduce :obj="item.maxDrawdown" :percentage="true"></plus-or-reduce></td>
          <td>{{ item.sharpeRatio }}</td>
          <td>{{ item.successRatio }}%</td>
          <td>{{ item.positionRatio }}%</td>
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
        <tr v-for="item in tableData2.tDataList">
          <td><plus-or-reduce :obj="item.lastSurplus"></plus-or-reduce></td>
          <td>{{ item.positionMargin | currencyFormatter }}</td>
          <td>{{ item.availableFund | currencyFormatter }}</td>
          <td>{{ item.frozenFund | currencyFormatter }}</td>
          <td>{{ item.fundEfficiency }}%</td>
          <td>{{ item.longPosition }}%</td>
          <td>{{ item.shortPosition }}%</td>
          <td><plus-or-reduce :obj="item.floatingReturn"></plus-or-reduce></td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
//引入全局过滤器
import currencyFormatter from '@/filter/currencyFormatter'
import plusOrReduce from '@/components/common/plusOrReduce'

export default {
  components: {
    currencyFormatter,
    plusOrReduce
  },
  name: 'account-paremeters',
  data () {
    return {

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
        ],
        tDataList:[
          {
            totalAsset: 1465147.48,
            cumulativeReturn: 465277.78,
            ROA: 46.57,
            networthRate: 1.4651,
            maxDrawdown: {
              "status": "reduce",
              "num": 10.65
            },
            sharpeRatio: 1.132,
            successRatio: 71.6,
            positionRatio: 46.78
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
        ],
        tDataList:[
          {
            lastSurplus: {
              "status": 'plus',
              "num": 13045.26
            },
            positionMargin: 3678955.78,
            availableFund: 786197.78,
            frozenFund: 0,
            fundEfficiency: 46.34,
            longPosition: 39.98,
            shortPosition: 13.68,
            floatingReturn: {
              "status": 'plus',
              "num": 234567
            }
          }
        ]
      }

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.account-position-table{
		.ivu-table-header{}
	}
</style>
