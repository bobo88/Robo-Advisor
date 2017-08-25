<!--
内容：委托查询 组件
作者：BOBO
日期： 20170803
-->
<template>
  <div class="user-entrust-query mb30">
  	<header class="table-common-head clearfix">
  		<span class="tit fl">委托查询 <br/> Entrust Query</span>
  		<div class="user-entrust-query-summary fr">
  			<Date-picker type="date" v-model="start_date" placeholder="选择日期" style="width: 140px" placement="bottom-end" class="mr10"></Date-picker>
        <span class="mr10">至</span>
        <Date-picker type="date" v-model="end_date" placeholder="选择日期" style="width: 140px" placement="bottom-end" class="mr10"></Date-picker>
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
      <tbody v-if="simulatedData.length > 0">
        <tr v-for="item in pageDataList" >
          <td>{{ item.eExchTime }}</td>
          <td>{{ item.prodCode }}</td>
          <td>{{ item.orderType }}</td>
          <td>{{ item.orderPrice | currencyFormatter }}</td>
          <td>{{ item.orderAmount }}</td>
          <td>{{ item.matchAmount }}</td>
          <td>{{ item.entrStat }}</td>
          <td style="color: #24B1F7; cursor: pointer;" @click="showPopUp(item.orderNumber)">{{ item.orderNumber }}</td>
        </tr>
      </tbody>

      <tbody v-else>
        <tr>
          <td colspan="8">暂无数据</td>
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
  name: 'user-entrust-query',
  data () {
    return {
      showPopUpState: false,
      showPage: false,
      end_date: '', //结束日期
      h_query_num: 5, //每页记录数
      h_start_num: 1, //当前第几页
      start_date: '', //开始日期
      trading_token: '', //交易token

      //数据
      simulatedData: [],

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
          }
        ]
      },

      itemOrderPopUpData: {
        orderNum: {
          state: '指令编号',
          lang: 'Order Number',
          content: ''
        },
        orderTime: {
          state: '下达时间',
          lang: 'Order Time',
          content: ''
        },
        orderContent: {
          state: '指令内容',
          lang: 'Order Content',
          content: ''
        },
        runStatus: {
          state: '执行状态',
          lang: 'Run Status',
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
      var s = this.start_date;
      return formatTime(s);
    },
    endDateFarmatter() {
      var s = this.end_date;
      return formatTime(s);
    }
  },
  methods: {
    showPopUp(order){
      this.showPopUpState = true;

      //这里需要用axios的post请求，把当前的order-number发给后台，让后台返回数据（下面代码仅仅是模拟）
      this.itemOrderPopUpData = {
        orderNum: {
          state: '指令编号',
          lang: 'Order Number',
          content: '170525fl35343'
        },
        orderTime: {
          state: '下达时间',
          lang: 'Order Time',
          content: '2017-05-25 9:33:35'
        },
        orderContent: {
          state: '指令内容',
          lang: 'Order Content',
          content: '黄金延期Au(T+D)，价格p>=279.00，多开(buy long) 10手，279.60'
        },
        runStatus: {
          state: '执行状态',
          lang: 'Run Status',
          content: '10:30触发，已发出委托'
        }
      };
    },
    closePopUp(){
      this.showPopUpState = false;
    },
    searchData(){

      var vm = this;
      var params = {
        end_date: this.endDateFarmatter, //结束日期
        h_query_num: this.h_query_num, //每页记录数
        h_start_num: this.h_start_num, //当前第几页
        start_date: this.startDateFarmatter, //开始日期
        trading_token: vm.$store.state.trading_token, //交易token
      };

      if(!!this.end_date && !!this.h_query_num && !!this.h_start_num && !!this.start_date){
        this.$http({
          method: 'post',
          url: process.env.BASE_URL + '/marketAccount/historyEntrust',
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
	.user-entrust-query-summary{ padding: 14px 15px; height: 60px;}
</style>
