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
          <td>{{ item.InstID }}</td>
          <td>{{ item.QuoteTime }}</td>
          <td>{{ item.Open | currencyFormatter }}</td>
          <td>{{ item.High | currencyFormatter }}</td>
          <td>{{ item.Low | currencyFormatter }}</td>
          <td>{{ item.Close | currencyFormatter }}</td>
          <td><plus-or-reduce :obj="item.UpDown"></plus-or-reduce></td>
          <td><plus-or-reduce :obj="item.UpDownRate" :percentage="true"></plus-or-reduce></td>
          <td>{{ item.Average | currencyFormatter }}</td>
          <td>{{ item.Volume }}</td>
          <td>{{ item.RMBTurnOver }}</td>
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
              title: '合约',
              lang: 'Inst ID'
          },
          {
              title: '时间',
              lang: 'Quote Time'
          },
          {
              title: '开盘价',
              lang: 'Open'
          },
          {
              title: '最高价',
              lang: 'High'
          },
          {
              title: '最低价',
              lang: 'Low'
          },
          {
              title: '收盘价',
              lang: 'Close'
          },
          {
              title: '涨跌额',
              lang: 'Up Down'
          },
          {
              title: '涨跌幅',
              lang: 'Up Down Rate'
          },
          {
              title: '均价',
              lang: 'Average'
          },
          {
              title: '成交量',
              lang: 'Volume'
          },
          {
              title: '成交金额(万)',
              lang: 'RMB TurnOver'
          }
        ],
        tDataList:[
            {
                InstID: '黄金延期Au(T+D)',
                QuoteTime: '15:30',
                Open: 268.68,
                High: 282.34,
                Low: 258.66,
                Close: 270.99,
                UpDown: {
                  "status": 'plus',
                  "num": 0.09
                },
                UpDownRate: {
                    "status": 'plus',
                    "num": 0.03
                },
                Average: 270.07,
                Volume: 1134,
                RMBTurnOver: 105441
            },
            {
                InstID: '白银延期Au(T+D)',
                QuoteTime: '15:30',
                Open: 268.68,
                High: 282.34,
                Low: 258.66,
                Close: 270.99,
                UpDown: {
                  "status": 'reduce',
                  "num": 0.03
                },
                UpDownRate: {
                    "status": 'reduce',
                    "num": 0.06
                },
                Average: 270.07,
                Volume: 1134,
                RMBTurnOver: 105441
            },
            {
                InstID: '迷你黄金延期Au(T+D)',
                QuoteTime: '15:30',
                Open: 268.68,
                High: 282.34,
                Low: 258.66,
                Close: 270.99,
                UpDown: {
                  "status": 'plus',
                  "num": 0.09
                },
                UpDownRate: {
                    "status": 'plus',
                    "num": 0.03
                },
                Average: 270.07,
                Volume: 1134,
                RMBTurnOver: 465637
            },
            {
                InstID: '黄金延期Au(T+D)',
                QuoteTime: '15:30',
                Open: 268.68,
                High: 544.34,
                Low: 433.66,
                Close: 344.99,
                UpDown: {
                  "status": 'reduce',
                  "num": 0.09
                },
                UpDownRate: {
                    "status": 'reduce',
                    "num": 0.03
                },
                Average: 270.07,
                Volume: 1134,
                RMBTurnOver: 566344
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
