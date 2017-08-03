<!--
内容：当日数据 组件
作者：BOBO
日期： 20170803
-->
<template>
  <div class="todays-data-component mb30">
  	<header class="table-common-head clearfix">
  		<span class="tit fl">当日数据 <br/> Today's Data</span>
  		<div class="todays-data-component-summary fr">
        <span class="current-day mr10">2017/07/13</span>

  			<Select v-model="chooseContract" style="width:140px" class="mr10">
            <Option v-for="item in chooseContractList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="operatingStatus" style="width:140px" class="mr10">
            <Option v-for="item in operatingStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>

        <Button type="ghost" shape="circle">导出(Export)</Button>
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
  name: 'todays-data-component',
  data () {
    return {
      chooseContract: '',
      chooseContractList: [
          {
              value: '选择合约1',
              label: '选择合约1'
          },
          {
              value: '选择合约2',
              label: '选择合约2'
          },
          {
              value: '选择合约3',
              label: '选择合约3'
          }
      ],
      operatingStatus: '',
      operatingStatusList: [
          {
              value: '运行状态1',
              label: '运行状态1'
          },
          {
              value: '运行状态2',
              label: '运行状态2'
          },
          {
              value: '运行状态3',
              label: '运行状态3'
          }
      ],
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
	.todays-data-component-summary{ padding: 14px 15px; height: 60px;}
  .current-day{ color: #90A4D9; font-size: 14px;}
  .ivu-btn-ghost{ color: #8598CB; border-color: #8598CB; font-size: 14px;
    &:hover{ color: #fff; background-image: linear-gradient(90deg, #6F64FF 0%, #B93BFB 100%);}
  }
</style>
