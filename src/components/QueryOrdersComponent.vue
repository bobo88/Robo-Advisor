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
            <Date-picker type="date" v-model="startTime" placeholder="选择日期" style="width: 140px" placement="bottom-end" class="mr10"></Date-picker>
            <span class="mr10">至(To)</span>
            <Date-picker type="date" v-model="endTime" placeholder="选择日期" style="width: 140px" placement="bottom-end" class="mr10"></Date-picker>

            <Select v-model="spotName" style="width:160px" class="mr10">
                <Option v-for="item in chooseContractList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select v-model="runStatus" style="width:180px" class="mr10">
                <Option v-for="item in operatingStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>

            <Button type="info" shape="circle" style="width: 70px" class="mr10" @click="searchData">查询</Button>
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
        <tr v-for="item in pageDataList">
           <td>{{ item.orderNumber }}</td>
           <td>{{ item.orderTime }}</td>
           <td>{{ item.prodCode }}</td>
           <td>{{ item.tradeSignalType === 5 ? '---' :
                  item.tradeSignalType === 1 ? '最新价' :
                  item.tradeSignalType === 2 ?  '成交量' :
                  item.tradeSignalType === 3 ? '成交额' : '均价'
               }}
               {{ item.tradeSignalCond === 1 ? '>=' : '<='}}
               {{ item.entrPrice }}
           </td>

           <td>{{ (item.bs === 'b' && item.offsetFlag === 0) ? '多开' :
                  (item.bs === 's' && item.offsetFlag === 0) ? '空开' :
                  (item.bs === 'b' && item.offsetFlag === 1) ? '平多' : '平空' }}
           </td>
           <td>{{ item.entrPrice }}</td>
           <td>{{ item.entrAmount }}</td>
           <td>{{ item.orderDeadline }}</td>
           <td>---</td>
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

    <Page :total="simulatedData.length" @on-change="Pagechange" :page-size="pagesize" v-if="showPage"></Page>

  </div>
</template>

<script>
//引入全局过滤器
import currencyFormatter from '@/filter/currencyFormatter'
import plusOrReduce from '@/components/common/plusOrReduce'
//引入弹窗组件
import PopUp from '@/components/common/PopUp'

function formatTime(s) {
    if(!s){
        return;
    }
    var _str = [];

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

export default {
  components: {
    currencyFormatter,
    plusOrReduce,
    PopUp
  },
  name: 'query-orders-component',
  data () {
    return {
      showPopUpState: false,
      showPage: false,
      endTime: '',  //结束时间  string  
      order:'',    //指令编号  string  选填
      page_num:1,  //当前页码  number  
      page_size:5, //每页记录数 number  
      runStatus: '', //运行状态  string  选填
      spotName:'',  //合约代码  string  选填
      startTime: '',
      trading_token: '', //交易token

      //数据
      simulatedData: [],

        //合约代码
        chooseContractList: [
            {
                value: 'all spots',
                label: '选择合约 all spots'
            },
            {
                value: 'Au(T+D)',
                label: '黄金延期Au(T+D)'
            },
            {
                value: 'mAu(T+D)',
                label: '迷你黄金延期mAu(T+D)'
            },
            {
                value: 'Ag(T+D)',
                label: '白银延期Ag(T+D)'
            }
        ],

        //运行状态
        operatingStatusList: [
            {
                value: 'all run_status',
                label: '选择运行状态 all run_status'
            },
            {
                value: 'suspended',
                label: '中断 suspended'
            },
            {
                value: 'running',
                label: '运行中 running'
            },
            {
                value: 'triggered',
                label: '已触发 triggered'
            },
            {
                value: 'trade succeeded',
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
        },

        pageDataList: [],
        currentPage: 1,
        pagesize: 10
    }
  },
  computed: {
    startDateFarmatter() {
      var s = this.startTime;
      return formatTime(s);
    },
    endDateFarmatter() {
      var s = this.endTime;
      return formatTime(s);
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
    },
    searchData(){

      var vm = this;
      var params = {
        endTime: this.endDateFarmatter, //结束日期
        page_size: this.page_size, //每页记录数
        page_num: this.page_num, //当前第几页
        startTime: this.startDateFarmatter, //开始日期
        runStatus: this.runStatus, //开始日期
        spotName: this.spotName, //开始日期
        trading_token: vm.$store.state.trading_token, //交易token
      };

      if(!!this.endTime && !!this.page_size && !!this.page_num && !!this.startTime && !!this.runStatus && !!this.spotName){
        this.$http({
          method: 'post',
          url: process.env.BASE_URL + '/marketOrder/historyOrder',
          params: params,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        })
        .then(function (response) {
          if(response.data.code === 100){
            vm.simulatedData = response.data.data.list;
            vm.pageDataList = vm.simulatedData.slice(0, vm.currentPage * vm.pagesize);
            vm.showPage = true;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    },
    Pagechange: function (v) {
        this.currentPage = v
        console.log(v)
        this.FormatterPage(v)
    },
    FormatterPage: function (v) {
        console.log("v" + v)
        var vm = this
        this.pageDataList = vm.simulatedData.slice((v - 1) * vm.pagesize, v * vm.pagesize)
        console.log(this.pageDataList)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .query-orders-component-summary{ padding: 14px 15px; height: 60px;}
    .f-blue{ color: #24B1F7; cursor: pointer;}
</style>
