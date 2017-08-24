<!--
内容：账户持仓页面
作者：BOBO
日期： 20170817
-->
<template>
  <div class="user-account-position-lang mb30">
  	<header class="table-common-head clearfix">
  		<span class="tit fl">账户持仓 <br/> Current Position</span>
  		<p class="head-summary fr" v-if="headSummary">
  			<span>账户总资产：5,678,010.75</span>
  			<span>收益率：<em class="f-red">+23.45%</em></span>
  			<span>累计盈亏：<em class="f-red">+6,780.25</em></span>
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
        <tr v-for="item in simulatedData">
          <td>{{ item.spotName }}</td>
          <td>{{ item.positionType }}</td>
          <td>{{ item.positionAmount }}</td>
          <td>{{ item.availableAmount }}</td>
          <td>{{ item.currentPrice | currencyFormatter }}</td>
          <td>{{ item.averageCost | currencyFormatter }}</td>
          <td><plus-or-reduce-state :obj="item.floatingReturn"></plus-or-reduce-state></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
//引入全局过滤器
import currencyFormatter from '@/filter/currencyFormatter'
import plusOrReduceState from '@/components/common/plusOrReduceState'

export default {
  components: {
    currencyFormatter,
    plusOrReduceState
  },
  name: 'user-account-position-lang',
  props: ['headSummary'], // 父组件传headSummary属性过来，如果为false，则不显示账户持仓组件头部右边内容
  data () {
    return {
      simulatedData: [],

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
          }
        ]
      }

    }
  },
  mounted: function(){
    var vm = this;
    var params = {trading_token: vm.$store.state.trading_token};

    this.$http({
      method: 'post',
      url: process.env.BASE_URL + '/marketAccount/currentPosition',
      params: params,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    })
    .then(function (response) {
      if(response.data.code === 100){
        vm.simulatedData = response.data.data.list_defer_posi_info;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.user-account-position-table{
		.ivu-table-header{}
	}
</style>
