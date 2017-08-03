<!--
内容：委托查询 组件
作者：BOBO
日期： 20170803
-->
<template>
  <div class="entrust-query mb30">
  	<header class="table-common-head clearfix">
  		<span class="tit fl">委托查询 <br/> Entrust Query</span>
  		<div class="entrust-query-summary fr">
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
          <td>{{ item.E_exchTime }}</td>
          <td>{{ item.ProdCode }}</td>
          <td>{{ item.OrderType }}</td>
          <td>{{ item.OrderPrice | currencyFormatter }}</td>
          <td>{{ item.OrderAmount }}</td>
          <td>{{ item.MatchAmount }}</td>
          <td>{{ item.EntrStat.default }}<br/>{{ item.EntrStat.lang }}</td>
          <td style="color: #24B1F7;">{{ item.OrderNumber }}</td>
          <td>{{ item.Remark }}</td>
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
  name: 'entrust-query',
  data () {
    return {

      tableData: {
        tHead: [
          {
              title: '委托时间',
              lang: 'E_exch Time'
          },
          {
              title: '合约',
              lang: 'Prod Code'
          },
          {
              title: '委托类型',
              lang: 'Order Type'
          },
          {
              title: '委托价格',
              lang: 'Order Price'
          },
          {
              title: '委托数量',
              lang: 'Order Amount'
          },
          {
              title: '成交数量',
              lang: 'Match Amount'
          },
          {
              title: '委托状态',
              lang: 'Entr Stat'
          },
          {
              title: '对应指令编号',
              lang: 'Order Number'
          },
          {
              title: '来源备注',
              lang: 'Remark'
          }
        ],
        tDataList:[
            {
                E_exchTime: '2017-05-25 9:23:35',
                ProdCode: '黄金延期Au(T+D)',
                OrderType: '多开(Buy Long)',
                OrderPrice: 282.34,
                OrderAmount: 10,
                MatchAmount: 10,
                EntrStat: {
                  "default": '全部成交',
                  "lang": 'All Succeeded'
                },
                OrderNumber: '170525dk0234',
                Remark: 'auto_order'
            },
            {
                E_exchTime: '2017-05-25 9:23:35',
                ProdCode: '白银延期Au(T+D)',
                OrderType: '多开(Buy Long)',
                OrderPrice: 50,
                OrderAmount: 390,
                MatchAmount: 280,
                EntrStat: {
                  "default": '部分剩撤',
                  "lang": 'Partly Succeeded'
                },
                OrderNumber: '170525dk0234',
                Remark: 'auto_order'
            },
            {
                E_exchTime: '2017-05-25 9:23:35',
                ProdCode: '迷你黄金延期Au(T+D)',
                OrderType: '空平(Close Short)',
                OrderPrice: 282.34,
                OrderAmount: 5,
                MatchAmount: 10,
                EntrStat: {
                  "default": '全部成交',
                  "lang": 'All Succeeded'
                },
                OrderNumber: '170525dk0234',
                Remark: 'auto_order'
            },
            {
                E_exchTime: '2017-05-25 9:23:35',
                ProdCode: '黄金延期Au(T+D)',
                OrderType: '多开(Buy Long)',
                OrderPrice: 282.34,
                OrderAmount: 10,
                MatchAmount: 10,
                EntrStat: {
                  "default": '全部成交',
                  "lang": 'All Succeeded'
                },
                OrderNumber: '170525dk0234',
                Remark: 'auto_order'
            },
            {
                E_exchTime: '2017-05-25 9:23:35',
                ProdCode: '白银延期Au(T+D)',
                OrderType: '多开(Buy Long)',
                OrderPrice: 50,
                OrderAmount: 390,
                MatchAmount: 280,
                EntrStat: {
                  "default": '部分剩撤',
                  "lang": 'Partly Succeeded'
                },
                OrderNumber: '170525dk0234',
                Remark: 'auto_order'
            },
            {
                E_exchTime: '2017-05-25 9:23:35',
                ProdCode: '迷你黄金延期Au(T+D)',
                OrderType: '空平(Close Short)',
                OrderPrice: 282.34,
                OrderAmount: 5,
                MatchAmount: 10,
                EntrStat: {
                  "default": '全部成交',
                  "lang": 'All Succeeded'
                },
                OrderNumber: '170525dk0234',
                Remark: 'auto_order'
            },
            {
                E_exchTime: '2017-05-25 9:23:35',
                ProdCode: '黄金延期Au(T+D)',
                OrderType: '多开(Buy Long)',
                OrderPrice: 282.34,
                OrderAmount: 10,
                MatchAmount: 10,
                EntrStat: {
                  "default": '全部成交',
                  "lang": 'All Succeeded'
                },
                OrderNumber: '170525dk0234',
                Remark: 'auto_order'
            },
            {
                E_exchTime: '2017-05-25 9:23:35',
                ProdCode: '白银延期Au(T+D)',
                OrderType: '多开(Buy Long)',
                OrderPrice: 50,
                OrderAmount: 390,
                MatchAmount: 280,
                EntrStat: {
                  "default": '部分剩撤',
                  "lang": 'Partly Succeeded'
                },
                OrderNumber: '170525dk0234',
                Remark: 'auto_order'
            },
            {
                E_exchTime: '2017-05-25 9:23:35',
                ProdCode: '迷你黄金延期Au(T+D)',
                OrderType: '空平(Close Short)',
                OrderPrice: 282.34,
                OrderAmount: 5,
                MatchAmount: 10,
                EntrStat: {
                  "default": '全部成交',
                  "lang": 'All Succeeded'
                },
                OrderNumber: '170525dk0234',
                Remark: 'auto_order'
            },
            {
                E_exchTime: '2017-05-25 9:23:35',
                ProdCode: '黄金延期Au(T+D)',
                OrderType: '多开(Buy Long)',
                OrderPrice: 282.34,
                OrderAmount: 88,
                MatchAmount: 12,
                EntrStat: {
                  "default": '全部成交',
                  "lang": 'All Succeeded'
                },
                OrderNumber: '170525dk0234',
                Remark: 'auto_order'
            }
        ]
      }

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.entrust-query-summary{ padding: 14px 15px; height: 60px;}
</style>
