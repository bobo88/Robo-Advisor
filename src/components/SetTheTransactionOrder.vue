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
        <router-link to="/issue-order/import-instruction">
          <span class="file-btn">导入指令</span>
        </router-link>
        <!-- <span class="file-btn">导入指令</span> -->
        <!-- <input id="fileId" type="file" name="file" style="display:none;" />
  			<label for="fileId"><span class="file-btn">导入指令</span></label> -->
  		</p>
  	</header>

    <table cellpadding="0" cellspacing="0" class="table-item table-common-main-lang">
      <thead>
        <tr>
          <th class="left-tit">1.选择交易合约<span class="error" v-if="!prodCode">*必填项</span></th> 
          <th>
            <Select v-model="prodCode" style="width:140px">
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
          <td class="left-tit">2.设置交易信号<span class="error" v-if="!(!!tradeSignalType && !!tradeSignalCond && !!tradeSignalValue)">*必填项</span></td>
          <td>
            <span class="mr10">当</span>
            <Select v-model="tradeSignalType" style="width:86px" class="mr10">
                <Option v-for="item in priceTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select v-model="tradeSignalCond" style="width:86px" class="mr10">
                <Option v-for="item in calculatorList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input v-model="tradeSignalValue" placeholder="请输入价格" style="width: 86px"></Input>
          </td>
        </tr>

        <tr>
          <td class="left-tit">3.设置买卖方向<span class="error" v-if="!bs">*必填项</span></td>
          <td>
            <Button type="ghost" shape="circle" class="buy-btn" @click="tradingDirection(1)" :class="{current: bs == 'b' }">买</Button>
            <Button type="ghost" shape="circle" class="sell-btn" @click="tradingDirection(2)" :class="{current: bs == 's' }">卖</Button>
          </td>
        </tr>

        <tr>
          <td class="left-tit">4.设置交易类型<span class="error" v-if="!offsetFlag">*必填项</span></td>
          <td>
            <Button type="ghost" shape="circle" style="width:86px" class="mr10 def-btn" @click="offsetFlagFun(1)" :class="{current: offsetFlag == 1 }">开仓</Button>
            <Button type="ghost" shape="circle" style="width:86px" class="mr10 def-btn" @click="offsetFlagFun(2)" :class="{current: offsetFlag == 2 }">平仓</Button>
          </td>
        </tr>

        <tr>
          <td class="left-tit">5.设置委托价格<span class="error" v-if="!entrPrice">*必填项</span></td>
          <td>
            <Input v-model="entrPrice" placeholder="请输入委托价格" style="width: 140px"></Input>
          </td>
        </tr>

        <tr>
          <td class="left-tit">6.设置委托手数<span class="error" v-if="!entrAmount">*必填项</span></td>
          <td>
            <Input v-model="entrAmount" placeholder="请输入委托手数" style="width: 140px" class="mr10"></Input>
            <span>可开: &nbsp;&nbsp;- -</span>
          </td>
        </tr>

        <tr>
          <td class="left-tit">7.指令有效期<span class="error" v-if="!orderDeadline">*必填项</span></td>
          <td>
            <span class="mr10">截止当日</span>
            <Time-picker format="HH:mm" placeholder="选择时间" style="width: 140px" placement="top" v-model="orderDeadline"></Time-picker>
            <span class="tips">提示：时间截止后，未触发的指令自动失效；指令仅限当日有效</span>
          </td>
        </tr>
        <tr>
          <td colspan="2" style="text-align:center;"><span class="submit-btn" @click="submitTransactionOrder">确认添加交易指令</span></td>
        </tr>

      </tbody>
    </table>
  </div>
</template>

<script>
//引入全局过滤器
import timeFormatter from '@/filter/timeFormatter'
import plusOrReduce from '@/components/common/plusOrReduce'

export default {
  components: {
    timeFormatter,
    plusOrReduce
  },
  name: 'set-the-transaction-order',
  data () {
    return {
      bs: '', //买卖方向： b买， s卖
      entrAmount: '', //委托数量
      entrPrice: '', //委托价格
      offsetFlag: '', //开平标志
      orderDeadline: '', //指令截止时间
      prodCode: '', //合约代码
      tradeSignalCond: '', //交易信号条件
      tradeSignalType: '', //交易信号类型
      tradeSignalValue: '', //交易信号值

      tradingContractList: [
          {
              value: 'Au(T+D)',
              label: '黄金延期'
          },
          {
              value: 'Ag(T+D)',
              label: '白银延期'
          },
          {
              value: 'mAu(T+D)',
              label: '迷你黄金延期'
          }
      ],

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

      priceTypeList: [
        {
            value: '1',
            label: '最新价'
        },
        {
            value: '2',
            label: '成交量'
        },
        {
            value: '3',
            label: '成交额'
        },
        {
            value: '4',
            label: '均线'
        }
      ],

      calculatorList: [
        {
            value: '1',
            label: '大于等于'
        },
        {
            value: '2',
            label: '小于等于'
        }
      ],

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
  },
  computed: {
    orderDeadlineFarmatter: function () {
      var s = this.orderDeadline;
      var _str = [];
      if(s !== '') {
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
    }
  },
  methods: {
    tradingDirection(num){
      if(num == 1){
        this.bs = 'b';
      }else{
        this.bs = 's';
      }
    },
    offsetFlagFun(num){
      if(num == 1){
        this.offsetFlag = 1;
      }else{
        this.offsetFlag = 2;
      }
    },
    submitTransactionOrder(){
      if(!!this.bs && !!this.entrAmount && !!this.entrPrice && !!this.offsetFlag && !!this.orderDeadlineFarmatter && !!this.prodCode && !!this.tradeSignalCond && !!this.tradeSignalType && !!this.tradeSignalValue ){

        var params = {
          bs: this.bs,
          entrAmount: parseFloat(this.entrAmount),
          entrPrice: parseFloat(this.entrPrice),
          offsetFlag: parseFloat(this.offsetFlag),
          orderDeadlineFarmatter: this.orderDeadlineFarmatter,
          prodCode: this.prodCode,
          tradeSignalCond: parseFloat(this.tradeSignalCond),
          tradeSignalType: parseFloat(this.tradeSignalType),
          tradeSignalValue: parseFloat(this.tradeSignalValue)
        };

        this.$http.post('/api/marketOrder/issueOrder', {
          params: params
        })
        .then(function (response) {
          console.log(response);
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
	.set-the-transaction-order{
    .file-btn, .submit-btn{ margin-bottom: 0; font-weight: 400; text-align: center; vertical-align: middle; -ms-touch-action: manipulation; touch-action: manipulation; cursor: pointer; background-image: none; border: 1px solid transparent; white-space: nowrap; line-height: 1.5; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; padding: 6px 15px; font-size: 12px; border-radius: 4px; transition: color .2s linear,background-color .2s linear,border .2s linear; color: #495060; border-color: #dddee1; display: inline-block; color: #8598CB; border-color: #8598CB; font-size: 14px;
      &:hover{ color: #fff; background-image: linear-gradient(90deg, #6F64FF 0%, #B93BFB 100%);}
    }
    .import-instructions{ padding: 14px 15px; height: 60px; line-height: 32px;}

    .table-item{ color: #fff; font-size: 14px; font-weight: normal; text-align: left;
      th{ font-size: 14px; text-align: left; font-weight: normal;}
      .left-tit{ position: relative; z-index: 1; padding-left: 20px; width: 160px;
        .error{ position: absolute; z-index:2; bottom: -2px; left: 20px; color: #f00; font-size:12px;}
      }

      .current-trading-data{ display: inline-block;
        .ct-item{ display: inline-block; margin-left: 50px;}
        .plus-or-reduce{ margin-left: 15px;}
      }

      .buy-btn{ margin-right: 10px; width: 86px; font-size: 14px; border: none;
        &.current{ background: #FF2424; border-color: #FF2424 !important;}
      }
      .sell-btn{ width: 86px; font-size: 14px; border: none;
        &.current{ background: #11D411; border-color: #11D411 !important;}
      }
      .def-btn{
        &.current{ background: #2db7f5; border-color: #2db7f5 !important;}
      }

      .tips{ margin-left: 30px; font-size: 12px; color: #90A4D9;}
    }
  }
</style>
