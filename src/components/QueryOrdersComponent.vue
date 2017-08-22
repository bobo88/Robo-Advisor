<!--
内容：查看指令 组件
作者：BOBO
日期： 20170803
-->
<template>
  <div class="query-orders-component mb30">
    <header class="table-common-head clearfix">
        <span class="tit fl">查看指令 <br/> Query Orders</span>
        <div class="query-orders-component-summary fr">
            <Date-picker type="date" placeholder="选择日期" style="width: 140px" placement="bottom-end" class="mr10"></Date-picker>
            <span class="mr10">至(To)</span>
            <Date-picker type="date" placeholder="选择日期" style="width: 140px" placement="bottom-end" class="mr10"></Date-picker>

            <Select v-model="chooseContract" style="width:160px" class="mr10">
                <Option v-for="item in chooseContractList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select v-model="operatingStatus" style="width:180px" class="mr10">
                <Option v-for="item in operatingStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>

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
          <td>{{ item.OrderNumber }}</td>
          <td>{{ item.Time }}</td>
          <td>{{ item.SpotName }}</td>
          <td>{{ item.TradeSignal.default}}<br/> {{ item.TradeSignal.lang }}</td>
          <td>{{ item.TradeType }}</td>
          <td>{{ item.OrderPrice }}</td>
          <td>{{ item.OrderAmount }}</td>
          <td>{{ item.Deadline }}</td>

          <td v-if="item.Remark.succ" class="f-blue" @click="showPopUp(item.OrderNumber)">{{ item.Remark.text }}</td>
          <td v-else>{{ item.Remark.text }}</td>

        </tr>
      </tbody>
    </table>

    <pop-up v-if="showPopUpState" @close-tc="closePopUp">
      <div slot="content">
        <table cellpadding="0" cellspacing="0">
          <thead>
            <tr>
              <th v-for="item of itemOrderPopUpData">{{ item.state }}<br/> {{ item.lang }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td v-for="item of itemOrderPopUpData">{{ item.content }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </pop-up>

  </div>
</template>

<script>
//引入全局过滤器
import currencyFormatter from '@/filter/currencyFormatter'
import plusOrReduce from '@/components/common/plusOrReduce'
//引入弹窗组件
import PopUp from '@/components/common/PopUp'

export default {
  components: {
    currencyFormatter,
    plusOrReduce,
    PopUp
  },
  name: 'query-orders-component',
  data () {
    return {
        chooseContract: '',
        chooseContractList: [
            {
                value: '选择合约 all spots',
                label: '选择合约 all spots'
            },
            {
                value: '黄金延期Au(T+D)',
                label: '黄金延期Au(T+D)'
            },
            {
                value: '迷你黄金延期mAu(T+D)',
                label: '迷你黄金延期mAu(T+D)'
            },
            {
                value: '白银延期Ag(T+D)',
                label: '白银延期Ag(T+D)'
            }
        ],
        operatingStatus: '',
        operatingStatusList: [
            {
                value: '选择运行状态 all run_status',
                label: '选择运行状态 all run_status'
            },
            {
                value: '中断 suspended',
                label: '中断 suspended'
            },
            {
                value: '运行中 running',
                label: '运行中 running'
            },
            {
                value: '已触发 triggered',
                label: '已触发 triggered'
            },
            {
                value: '已成交 trade succeeded',
                label: '已成交 trade succeeded'
            }
        ],

        tableData: {
            tHead: [
              {
                  title: '指令编号',
                  lang: 'Order Number'
              },
              {
                  title: '下发时间',
                  lang: 'Time'
              },
              {
                  title: '合约',
                  lang: 'Spot Name'
              },
              {
                  title: '交易信号',
                  lang: 'Trade Signal'
              },
              {
                  title: '交易类型',
                  lang: 'Trade Type'
              },
              {
                  title: '交易价格',
                  lang: 'Order Price'
              },
              {
                  title: '交易数量',
                  lang: 'Order Amount'
              },
              {
                  title: '指令截止时间',
                  lang: 'Deadline'
              },
              {
                  title: '来源备注',
                  lang: 'Remark'
              }
            ],
            tDataList:[
                {
                    OrderNumber: '1058521455dk155',
                    Time: '10:33:18',
                    SpotName: '黄金延期Au(T+D)',
                    TradeSignal: {
                        "default": '价格>=279.00',
                        "lang": 'p>=279.00'
                    },
                    TradeType: '多开(Buy Long)',
                    OrderPrice: 279.68,
                    OrderAmount: 10,
                    Deadline: '15:30',
                    Remark: {
                        "text": '已下发(Running)',
                        "succ": false
                    }
                },
                {
                    OrderNumber: '1058521455dk155',
                    Time: '10:33:18',
                    SpotName: '白银延期Au(T+D)',
                    TradeSignal: {
                        "default": '价格>=279.00',
                        "lang": 'p>=279.00'
                    },
                    TradeType: '多开(Buy Long)',
                    OrderPrice: 558.68,
                    OrderAmount: 60,
                    Deadline: '15:30',
                    Remark: {
                        "text": '已触发，委托(Triggered)',
                        "succ": true
                    }
                },
                {
                    OrderNumber: '1058521455dk155',
                    Time: '10:33:18',
                    SpotName: '迷你黄金延期Au(T+D)',
                    TradeSignal: {
                        "default": '价格>=279.00',
                        "lang": 'p>=279.00'
                    },
                    TradeType: '多开(Buy Long)',
                    OrderPrice: 457.68,
                    OrderAmount: 100,
                    Deadline: '15:30',
                    Remark: {
                        "text": '交易成功(Trade)',
                        "succ": true
                    }
                },
                {
                    OrderNumber: '1058521455dk155',
                    Time: '10:33:18',
                    SpotName: '黄金延期Au(T+D)',
                    TradeSignal: {
                        "default": '价格>=279.00',
                        "lang": 'p>=279.00'
                    },
                    TradeType: '多开(Buy Long)',
                    OrderPrice: 268.68,
                    OrderAmount: 10,
                    Deadline: '15:30',
                    Remark: {
                        "text": '已下发(Running)',
                        "succ": false
                    }
                }
                
            ]
        },

        showPopUpState: false,
        itemOrderPopUpData: {
          eExchTime: {
            state: '委托时间',
            lang: 'E Exch Time',
            content: ''
          },
          prodCode: {
            state: '合约',
            lang: 'Prod Code',
            content: ''
          },
          orderType: {
            state: '委托类型',
            lang: 'Order Type',
            content: ''
          },
          orderPrice: {
            state: '委托价格',
            lang: 'Order Price',
            content: ''
          },
          orderAmount: {
            state: '委托数量',
            lang: 'Order Amount',
            content: ''
          },
          matchAmount: {
            state: '成交数量',
            lang: 'Match Amount',
            content: ''
          }
        }
    }
  },
  methods: {
    showPopUp(order){
      this.showPopUpState = true;

      //这里需要用axios的post请求，把当前的order-number发给后台，让后台返回数据（下面代码仅仅是模拟）
      this.itemOrderPopUpData = {
        eExchTime: {
          state: '委托时间',
          lang: 'E Exch Time',
          content: '9:35:26'
        },
        prodCode: {
          state: '合约',
          lang: 'Prod Code',
          content: '迷你黄金延期Au(T+D)'
        },
        orderType: {
          state: '委托类型',
          lang: 'Order Type',
          content: '多平'
        },
        orderPrice: {
          state: '委托价格',
          lang: 'Order Price',
          content: '280.00'
        },
        orderAmount: {
          state: '委托数量',
          lang: 'Order Amount',
          content: '20'
        },
        matchAmount: {
          state: '成交数量',
          lang: 'Match Amount',
          content: '10'
        }
      };
    },
    closePopUp(){
      this.showPopUpState = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .query-orders-component-summary{ padding: 14px 15px; height: 60px;}
    .f-blue{ color: #24B1F7; cursor: pointer;}
</style>
