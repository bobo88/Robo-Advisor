<!--
内容：设置交易指令页面
作者：BOBO
日期： 20170803
-->
<template>
  <div class="set-the-transaction-order mb30">
  	<header class="table-common-head clearfix">
  		<span class="tit fl">设置交易指令 <br/> Set The Transaction Order</span>
  		<p class="import-instructions fr">
  			<Button type="ghost" shape="circle">导入指令</Button>
  		</p>
  	</header>

    <table cellpadding="0" cellspacing="0" class="table-item table-common-main-lang">
      <thead>
        <tr>
          <th class="left-tit">1.选择交易合约</th> 
          <th>
            <Select v-model="tradingContract" style="width:140px">
                <Option v-for="item in tradingContractList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <div class="current-trading-data">
              <span class="ct-item">最新：
                <em class="f-red">{{ currentTradingData.currentPrice }}</em> 
                <plus-or-reduce :obj="currentTradingData.amplitude"></plus-or-reduce> 
                <plus-or-reduce :obj="currentTradingData.amplitude2"></plus-or-reduce>
              </span>
              <span class="ct-item">涨停：<em class="f-red">{{ currentTradingData.currentPrice }}</em></span>
              <span class="ct-item">跌停：<em class="f-green">{{ currentTradingData.decline }}</em></span>
            </div>
          </th> 
        </tr>
      </thead>
      <tbody>

        <tr>
          <td class="left-tit">2.设置交易信号</td>
          <td>
            <span class="mr10">当</span>
            <Select v-model="priceType" style="width:86px" class="mr10">
                <Option v-for="item in priceTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select v-model="calculator" style="width:86px" class="mr10">
                <Option v-for="item in calculatorList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="timeInput" placeholder="请输入价格" style="width: 86px"></Input>
          </td>
        </tr>

        <tr>
          <td class="left-tit">3.设置买卖方向</td>
          <td>
            <Button type="primary" shape="circle" class="buy-btn">买</Button>
            <Button type="primary" shape="circle" class="sell-btn">卖</Button>
          </td>
        </tr>

        <tr>
          <td class="left-tit">4.设置交易类型</td>
          <td>
            <Button type="info" shape="circle" style="width:86px" class="mr10">开仓</Button>
            <Button type="ghost" shape="circle" style="width:86px" class="mr10">平仓</Button>
            <Button type="ghost" shape="circle" style="width:86px" class="mr10">平今</Button>
          </td>
        </tr>

        <tr>
          <td class="left-tit">5.设置委托价格</td>
          <td>
            <Input v-model="commissionPriceInput" placeholder="请输入委托价格" style="width: 140px"></Input>
          </td>
        </tr>

        <tr>
          <td class="left-tit">6.设置委托手数</td>
          <td>
            <Input v-model="commissionNumInput" placeholder="请输入委托手数" style="width: 140px" class="mr10"></Input>
            <span>可开: &nbsp;&nbsp;- -</span>
          </td>
        </tr>

        <tr>
          <td class="left-tit">7.指令有效期</td>
          <td>
            <span class="mr10">截止当日</span>
            <Time-picker format="HH:mm" placeholder="选择时间" style="width: 140px" placement="top"></Time-picker>
            <span class="tips">提示：时间截止后，未触发的指令自动失效；指令仅限当日有效</span>
          </td>
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
  name: 'set-the-transaction-order',
  data () {
    return {
      tradingContractList: [
          {
              value: '黄金延期',
              label: '黄金延期'
          },
          {
              value: '白银延期',
              label: '白银延期'
          },
          {
              value: '迷你黄金延期',
              label: '迷你黄金延期'
          }
      ],
      tradingContract: '',

      currentTradingData: {
        currentPrice: 280.12,
        decline: 263.13,
        amplitude: {
          "status": 'plus',
          "num": 1.12
        },
        amplitude2: {
          "status": 'plus',
          "num": 0.46
        }
      },

      priceType: '',
      priceTypeList: [
        {
            value: '最新价',
            label: '最新价'
        },
        {
            value: '当前价',
            label: '当前价'
        },
        {
            value: '昨天价',
            label: '昨天价'
        }
      ],

      calculator: '',
      calculatorList: [
        {
            value: '大于等于',
            label: '大于等于'
        },
        {
            value: '小于等于',
            label: '小于等于'
        },
        {
            value: '等于',
            label: '等于'
        }
      ],

      timeInput: '',
      commissionPriceInput: '',
      commissionNumInput: '',

      //时段
      timePeriod: '',
      timePeriodList: [
        {
            value: '上午',
            label: '上午'
        },
        {
            value: '下午',
            label: '下午'
        }
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.set-the-transaction-order{
    .import-instructions{ padding: 14px 15px; height: 60px; line-height: 32px;
      .ivu-btn-ghost{ color: #8598CB; border-color: #8598CB; font-size: 14px;
        &:hover{ color: #fff; background-image: linear-gradient(90deg, #6F64FF 0%, #B93BFB 100%);}
      }
    }

    .table-item{ color: #fff; font-size: 14px; font-weight: normal; text-align: left;
      th{ font-size: 14px; text-align: left; font-weight: normal;}
      .left-tit{ padding-left: 20px; width: 140px;}

      .current-trading-data{ display: inline-block;
        .ct-item{ display: inline-block; margin-left: 50px;}
        .plus-or-reduce{ margin-left: 15px;}
      }

      .buy-btn{ margin-right: 10px; width: 86px; font-size: 14px; background: #FF2424; border: none;}
      .sell-btn{ width: 86px; font-size: 14px; background: #11D411; border: none;}

      .tips{ margin-left: 30px; font-size: 12px; color: #90A4D9;}
    }
  }
</style>
