import Vue from 'vue'
import Router from 'vue-router'
import IssueOrder from '@/components/issueOrder/IssueOrder'


import QueryAccount from '@/components/queryAccount/QueryAccount'
import AssetQuery from '@/components/queryAccount/AssetQuery'
import TransactionQuery from '@/components/queryAccount/TransactionQuery'

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
    			component: IssueOrder
    		},

    		// 历史持仓
    		{
    			path: 'historical-position-query',
    			component: IssueOrder
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
