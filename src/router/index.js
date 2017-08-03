import Vue from 'vue'
import Router from 'vue-router'
import IssueOrder from '@/components/issueOrder/IssueOrder'


import AssetQuery from '@/components/queryAccount/AssetQuery'

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
    	component: AssetQuery, // 注意： 当父路由把第一个子路由当做默认路由时，父路由的component不能省略
    	redirect: '/query-account/asset-query',
    	children: [
    		{
    			path: 'asset-query',
    			component: AssetQuery
    		}
    	]	
    }
  ]
})
