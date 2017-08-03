import Vue from 'vue'
import Router from 'vue-router'
import IssueOrder from '@/components/issueOrder/IssueOrder'

//账户查询
import QueryAccount from '@/components/queryAccount/QueryAccount'
	//资产查询
	import AssetQuery from '@/components/queryAccount/AssetQuery'
	//成交查询
	import TransactionQuery from '@/components/queryAccount/TransactionQuery'
	//委托查询
	import EntrustQuery from '@/components/queryAccount/EntrustQuery'
	//历史持仓
	import HistoricalPositionQuery from '@/components/queryAccount/HistoricalPositionQuery'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'issue-order'
    },
    {
    	path: '/issue-order',
    	component: IssueOrder
    },
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
    			component: IssueOrder
    		}
    	]	
    }
  ]
})
