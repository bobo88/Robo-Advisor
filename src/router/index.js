import Vue from 'vue';
import Router from 'vue-router';

//下达指令
import IssueOrder from '@/components/issueOrder/IssueOrder';

//查看指令
import QueryOrders from '@/components/queryOrders/QueryOrders';

//账户查询
import QueryAccount from '@/components/queryAccount/QueryAccount';
	//资产查询
	import AssetQuery from '@/components/queryAccount/AssetQuery';
	//成交查询
	import TransactionQuery from '@/components/queryAccount/TransactionQuery';
	//委托查询
	import EntrustQuery from '@/components/queryAccount/EntrustQuery';
	//历史持仓
	import HistoricalPositionQuery from '@/components/queryAccount/HistoricalPositionQuery';
	//收益走势
	import CurveOfRefum from '@/components/queryAccount/CurveOfRefum';

//模拟账户
import SimulatedAccount from '@/components/simulatedAccount/SimulatedAccount';
	import AccountInformation from '@/components/simulatedAccount/AccountInformation';

//行情数据
import DataOfQuotation from '@/components/dataOfQuotation/DataOfQuotation';
	import TodaysData from '@/components/dataOfQuotation/TodaysData';
	import HistoricalData from '@/components/dataOfQuotation/HistoricalData';

Vue.use(Router)

export default new Router({
  routes: [
  	//首页
    {
      path: '/',
      redirect: 'issue-order'
    },

    //下达指令
    {
    	path: '/issue-order',
    	component: IssueOrder
    },

    //查看指令
    {
    	path: '/query-orders',
    	component: QueryOrders
    },

    //账户查询
    {
    	path: '/query-account',
    	component: QueryAccount, // 注意： 当父路由把第一个子路由当做默认路由时，父路由的component不能省略，同时父路由组件里面必须包含 <router-view></router-view>
    	redirect: '/query-account/asset-query',
    	children: [
    		//资产查询
    		{
    			path: 'asset-query',
    			component: AssetQuery
    		},

    		//成交查询
    		{
    			path: 'transaction-query',
    			component: TransactionQuery
    		},

    		//委托查询
    		{
    			path: 'entrust-query',
    			component: EntrustQuery
    		},

    		// 历史持仓
    		{
    			path: 'historical-position-query',
    			component: HistoricalPositionQuery
    		},
    		// 收益走势
    		{
    			path: 'curve-of-refum',
    			component: CurveOfRefum
    		}
    	]	
    },

    //模拟账户
    {
    	path: '/simulated-account',
    	component: SimulatedAccount,
    	redirect: '/simulated-account/account-information',
    	children: [
    		//账户概要
    		{
    			path: 'account-information',
    			component: AccountInformation
    		}
    	]
    },

    //行情数据
    {
    	path: '/data-of-quotation',
    	component: DataOfQuotation,
    	redirect: '/data-of-quotation/todays-data',
    	children: [
    		//当日数据
    		{
    			path: 'todays-data',
    			component: TodaysData
    		},
    		//历史数据
    		{
    			path: 'historical-data',
    			component: HistoricalData
    		}
    	]
    }
  ]
})
