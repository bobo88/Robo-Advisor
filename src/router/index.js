import Vue from 'vue'
import Router from 'vue-router'
import IssueOrder from '@/components/IssueOrder'

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
    }
  ]
})
