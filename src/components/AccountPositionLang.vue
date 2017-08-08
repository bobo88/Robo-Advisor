<!--
内容：账户持仓页面
作者：BOBO
日期： 20170802
-->
<template>
  <div class="account-position-lang mb30">
  	<header class="table-common-head clearfix">
  		<span class="tit fl">账户持仓 <br/> Current Position</span>
  		<p class="head-summary fr" v-if="headSummary">
  			<span>账户总资产：5678010.75</span>
  			<span>收益率：<em class="f-red">+23.45%</em></span>
  			<span>累计盈亏：<em class="f-red">+6780.25</em></span>
  			<span>仓位：46.34%</span>
  		</p>
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
          <td>{{ item.spotName }}</td>
          <td>{{ item.positionType }}</td>
          <td>{{ item.positionAmount | currencyFormatter }}</td>
          <td>{{ item.availableAmount | currencyFormatter }}</td>
          <td>{{ item.currentPrice | currencyFormatter }}</td>
          <td>{{ item.averageCost | currencyFormatter }}</td>
          <td><plus-or-reduce :obj="item.floatingReturn"></plus-or-reduce></td>
          <td><plus-or-reduce :obj="item.returnRatio" :percentage="true"></plus-or-reduce></td>
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
  name: 'account-position-lang',
  props: ['headSummary'], // 父组件传headSummary属性过来，如果为false，则不显示账户持仓组件头部右边内容
  data () {
    return {

      tableData: {
        tHead: [
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
              title: '可用数量',
              lang: 'Available Amount'
          },
          {
              title: '现价',
              lang: 'Current Price'
          },
          {
              title: '开仓均价',
              lang: 'Average Cost'
          },
          {
              title: '浮动盈亏',
              lang: 'Floating Return'
          },
          {
              title: '盈亏比例',
              lang: 'Return Ratio'
          }
        ],
        tDataList:[
            {
                spotName: '黄金延期',
                positionType: '多',
                positionAmount: 30,
                availableAmount: 25,
                currentPrice: 281.30,
                averageCost: 261.30,
                floatingReturn: {
                  "status": 'plus',
                  "num": 24400.00
                },
                returnRatio: {
                    "status": 'plus',
                    "num": 12
                }
            },
            {
                spotName: '白银延期',
                positionType: '多',
                positionAmount: 30,
                availableAmount: 25,
                currentPrice: 281.30,
                averageCost: 261.30,
                floatingReturn: {
                  "status": 'reduce',
                  "num": 900.00
                },
                returnRatio: {
                    "status": 'plus',
                    "num": 12
                }
            },
            {
                spotName: '迷你黄金延期',
                positionType: '多',
                positionAmount: 30,
                availableAmount: 25,
                currentPrice: 281.30,
                averageCost: 261.30,
                floatingReturn: {
                  "status": 'plus',
                  "num": 24400.00
                },
                returnRatio: {
                    "status": 'plus',
                    "num": 12
                }
            },
            {
                spotName: '黄金延期',
                positionType: '多',
                positionAmount: 30777,
                availableAmount: 25556,
                currentPrice: 281.30,
                averageCost: 261.30,
                floatingReturn: {
                  "status": 'plus',
                  "num": 24400.00
                },
                returnRatio: {
                    "status": 'reduce',
                    "num": 0.05
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
