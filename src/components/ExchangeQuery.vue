<!--
内容：成交查询 组件
作者：BOBO
日期： 20170803
-->
<template>
  <div class="exchange-query mb30">
  	<header class="table-common-head clearfix">
  		<span class="tit fl">成交查询 <br/> Exchange Query</span>
  		<div class="exchange-query-summary fr">
  			<Date-picker type="date" placeholder="选择日期" style="width: 140px" placement="bottom-end" class="mr10"></Date-picker>
        <span class="mr10">至</span>
        <Date-picker type="date" placeholder="选择日期" style="width: 140px" placement="bottom-end" class="mr10"></Date-picker>
        <Button type="info" shape="circle" style="width: 70px" class="mr10">查询</Button>
  		</div>
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
          <td>{{ item.TradeTime }}</td>
          <td>{{ item.SpotName }}</td>
          <td>{{ item.TradeType }}</td>
          <td>{{ item.TradePrice | currencyFormatter }}</td>
          <td>{{ item.TradeVolume }}</td>
          <td style="color: #24B1F7;">{{ item.Order }}</td>
          <td><plus-or-reduce :obj="item.ChangeFund"></plus-or-reduce></td>
          <td><plus-or-reduce :obj="item.TradeCost"></plus-or-reduce></td>
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
  name: 'exchange-query',
  data () {
    return {

      tableData: {
        tHead: [
          {
              title: '成交时间',
              lang: 'Trade Time'
          },
          {
              title: '合约',
              lang: 'Spot Name'
          },
          {
              title: '成交类型',
              lang: 'Trade Type'
          },
          {
              title: '成交均价',
              lang: 'Trade Price'
          },
          {
              title: '成交数量',
              lang: 'Trade Volume'
          },
          {
              title: '对应指令编号',
              lang: 'Order'
          },
          {
              title: '变动资金',
              lang: 'Change Fund'
          },
          {
              title: '交易费用',
              lang: 'Trade Cost'
          }
        ],
        tDataList:[
            {
                TradeTime: '2017-05-25 9:23:35',
                SpotName: '黄金延期Au(T+D)',
                TradeType: '多开(Buy Long)',
                TradePrice: 282.34,
                TradeVolume: 10,
                Order: '170525dk0234',
                ChangeFund: {
                  "status": 'reduce',
                  "num": 282340
                },
                TradeCost: {
                    "status": 'reduce',
                    "num": 230.56
                }
            },
            {
                TradeTime: '2017-05-25 9:23:35',
                SpotName: '白银延期Au(T+D)',
                TradeType: '多开(Buy Long)',
                TradePrice: 282.34,
                TradeVolume: 50,
                Order: '170525dk0234',
                ChangeFund: {
                  "status": 'plus',
                  "num": 4353523
                },
                TradeCost: {
                    "status": 'plus',
                    "num": 254.56
                }
            },
            {
                TradeTime: '2017-05-25 9:23:35',
                SpotName: '迷你黄金延期Au(T+D)',
                TradeType: '空平(Close Short)',
                TradePrice: 282.34,
                TradeVolume: 100,
                Order: '170525dk0234',
                ChangeFund: {
                  "status": 'plus',
                  "num": 2823457
                },
                TradeCost: {
                    "status": 'plus',
                    "num": 344646.56
                }
            },
            {
                TradeTime: '2017-05-25 9:23:35',
                SpotName: '黄金延期Au(T+D)',
                TradeType: '多开(Buy Long)',
                TradePrice: 282.34,
                TradeVolume: 60,
                Order: '170525dk0234',
                ChangeFund: {
                  "status": 'plus',
                  "num": 28255340
                },
                TradeCost: {
                    "status": 'plus',
                    "num": 33440.56
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
	.exchange-query-summary{ padding: 14px 15px; height: 60px;}
</style>
