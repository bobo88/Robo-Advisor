<!--
内容：账户持仓 组件
作者：BOBO
日期： 20170802
-->
<template>
  <div class="account-position">
  	<header class="table-common-head clearfix">
  		<span class="tit fl">账户持仓</span>
  		<p class="head-summary fr" v-if="headSummary">
  			<span>账户总资产：5678010.75</span>
  			<span>收益率：<em class="f-red">+23.45%</em></span>
  			<span>累计盈亏：<em class="f-red">+6780.25</em></span>
  			<span>仓位：46.34%</span>
  		</p>
  	</header>
    <Table stripe :columns="columns" :data="data" class="table-common-main account-position-table"></Table>
  </div>
</template>

<script>
export default {
  name: 'account-position',
  props: ['headSummary'], // 父组件传headSummary属性过来，如果为false，则不显示账户持仓组件头部右边内容
  data () {
    return {
        columns: [
            {
                title: '合约',
                key: 'contract'
            },
            {
                title: '多空类型',
                key: 'straddleType',
                render: (h, params) => {
                	var straddleTypeStr = params.row.straddleType;
                	var bRed = false, bGreen = false;
                	switch (straddleTypeStr) {
                		case '多':
                			bRed = true;
                			break;
                		case '空':
                			bGreen = true;
                			break;
                		default:
                			break;
                	}

                    return h('div', [
                        h(
                        	'strong',
                        	{
                        		'class':{'f-red':bRed,'f-green': bGreen}
                        	}, 
                        	params.row.straddleType
                        )
                    ]);
                }
            },
            {
                title: '数量/可用',
                key: 'quantityAvailability'
            },
            {
                title: '现价',
                key: 'presentPrice'
            },
            {
                title: '开仓均价',
                key: 'openTheAveragePrice'
            },
            {
                title: '浮动盈亏',
                key: 'floatingProfitAndLoss',
                render: (h, params) => {
                	var floatingProfitAndLossStr = params.row.floatingProfitAndLoss;
                	var bRed = false, bGreen = false;
                	floatingProfitAndLossStr.indexOf('+') !== -1 ? bRed = true : bGreen = true ;

                    return h('div', [
                        h(
                        	'strong',
                        	{
                        		'class':{'f-red':bRed,'f-green': bGreen}
                        	}, 
                        	params.row.floatingProfitAndLoss
                        )
                    ]);
                }
            },
            {
                title: '持仓均价',
                key: 'averagePriceOfPositions'
            },
            {
                title: '持仓盈亏',
                key: 'positionProfitAndLoss',
                render: (h, params) => {
                	var positionProfitAndLossStr = params.row.positionProfitAndLoss;
                	var bRed = false, bGreen = false;
                	positionProfitAndLossStr.indexOf('+') !== -1 ? bRed = true : bGreen = true ;

                    return h('div', [
                        h(
                        	'strong',
                        	{
                        		'class':{'f-red':bRed,'f-green': bGreen}
                        	}, 
                        	params.row.positionProfitAndLoss
                        )
                    ]);
                }
            }
      	],
      	data: [
          	{
              	contract: '黄金延期',
              	straddleType: '多',
              	quantityAvailability: '30/25',
              	presentPrice: 281.30,
              	openTheAveragePrice: 261.30,
              	floatingProfitAndLoss: '+200000.00',
              	averagePriceOfPositions: 261.310,
              	positionProfitAndLoss: '+199000.00'
          	},
          	{
              	contract: '白银延期',
              	straddleType: '空',
              	quantityAvailability: '30/25',
              	presentPrice: 281.30,
              	openTheAveragePrice: 261.30,
              	floatingProfitAndLoss: '+340000.00',
              	averagePriceOfPositions: 261.310,
              	positionProfitAndLoss: '+199000.00'
          	},
          	{
              	contract: '迷你黄金延期',
              	straddleType: '空',
              	quantityAvailability: '30/25',
              	presentPrice: 281.30,
              	openTheAveragePrice: 261.30,
              	floatingProfitAndLoss: '-10000.00',
              	averagePriceOfPositions: 261.310,
              	positionProfitAndLoss: '-900.00'
          	},
          	{
              	contract: '黄金延期',
              	straddleType: '多',
              	quantityAvailability: '30/25',
              	presentPrice: 281.30,
              	openTheAveragePrice: 261.30,
              	floatingProfitAndLoss: '-90.00',
              	averagePriceOfPositions: 261.310,
              	positionProfitAndLoss: '+199000.00'
          	}
      	]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.account-position-table{
		.ivu-table-header{}
	}
</style>
