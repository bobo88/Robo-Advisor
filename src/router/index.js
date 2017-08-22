import Vue from 'vue';
import Router from 'vue-router';

//登录页面
import Login from '@/components/login/Login';

//主页面
import Main from '@/components/Main';

//下达指令
import IssueOrder from '@/components/issueOrder/IssueOrder';
    import IssueOrderIndex from '@/components/issueOrder/IssueOrderIndex';
    import ImportInstruction from '@/components/issueOrder/ImportInstruction';

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
    //账户概要
    import SimulationAccountInformation from '@/components/simulatedAccount/SimulationAccountInformation';
    //成交查询
    import SimulationTransactionQuery from '@/components/simulatedAccount/SimulationTransactionQuery';
    //委托查询
    import SimulationEntrustQuery from '@/components/simulatedAccount/SimulationEntrustQuery';
    //历史持仓
    import SimulationHistoricalPositionQuery from '@/components/simulatedAccount/SimulationHistoricalPositionQuery';
    //收益走势
    import SimulationCurveOfRefum from '@/components/simulatedAccount/SimulationCurveOfRefum';

//行情数据
import DataOfQuotation from '@/components/dataOfQuotation/DataOfQuotation';
	import TodaysData from '@/components/dataOfQuotation/TodaysData';
	import HistoricalData from '@/components/dataOfQuotation/HistoricalData';

Vue.use(Router)

export default new Router({
  routes: [
      {
        path: '/',
        component: Login,
        redirect: '/login'
      },
  	//首页
    {
      path: '/login',
      component: Login
    },

    //主页面
    {
        path: '/main',
        component: Main,
        redirect: '/issue-order',
        children: [
            //下达指令
            {
            	path: '/issue-order',
            	component: IssueOrder,
                children: [
                    //下达指令首页
                    {
                        path: '/',
                        component: IssueOrderIndex
                    },
                    //导入指令
                    {
                        path: 'import-instruction',
                        component: ImportInstruction
                    }
                ]   
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
                redirect: '/simulated-account/simulation-account-information',
                children: [
                    //账户概要
                    {
                        path: 'simulation-account-information',
                        component: SimulationAccountInformation
                    },
                    //成交查询
                    {
                        path: 'simulation-transaction-query',
                        component: SimulationTransactionQuery
                    },

                    //委托查询
                    {
                        path: 'simulation-entrust-query',
                        component: SimulationEntrustQuery
                    },

                    // 历史持仓
                    {
                        path: 'simulation-historical-position-query',
                        component: SimulationHistoricalPositionQuery
                    },
                    // 收益走势
                    {
                        path: 'simulation-curve-of-refum',
                        component: SimulationCurveOfRefum
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
    },

  ]
})
