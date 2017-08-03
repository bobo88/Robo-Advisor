<!--
内容：历史持仓 组件
作者：BOBO
日期： 20170803
-->
<template>
  <div class="historical-position-query-component">
  	<header class="table-common-head clearfix">
  		<span class="tit fl">历史持仓<br/> Historical Position Query</span>
	    <div class="hpqc-summary fr">
        <Tooltip placement="bottom">
            <i class="iconfont icon-tips mr10"></i>

            <div slot="content" style="width: 350px;">
                <p>提示：最多同时查询连续五个交易日的持仓情况</p>
                <p>Alert: five days' position can be showed at the same time at most</p>
            </div>
        </Tooltip>

        <Date-picker type="date" placeholder="选择日期" style="width: 140px" placement="bottom-end" class="mr10"></Date-picker>
        <span class="mr10">至</span>
        <Date-picker type="date" placeholder="选择日期" style="width: 140px" placement="bottom-end" class="mr10"></Date-picker>
        <Button type="info" shape="circle" style="width: 70px" class="mr10">查询</Button>
      </div>
  	</header>
    
    <div class="historicalPositionQueryData-wrap">
      <template v-for="obj in historicalPositionQueryData">
        <h5 class="date-tit">{{ obj.date }}日持仓情况</h5>

        <table cellpadding="0" cellspacing="0" class="table-common-main-lang">
          <thead>
            <tr>
              <th v-for="item in obj.tHead">
                <strong>{{ item.title }}</strong>
                {{ item.lang }}
              </th>  
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in obj.tDataList">
              <td>{{ item.SpotName }}</td>
              <td>{{ item.PositionType }}</td>
              <td>{{ item.PositionAmount }}</td>
              <td>{{ item.AverageCost | currencyFormatter }}</td>
              <td>{{ item.ClosePrice | currencyFormatter }}</td>
              <td><plus-or-reduce :obj="item.floatingReturn"></plus-or-reduce></td>
              <td>{{ item.PositionMargin | currencyFormatter }}</td>
              <td>{{ item.PositionRatio }}%</td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>

  </div>
</template>

<script>
//引入全局过滤器
import currencyFormatter from '@/filter/currencyFormatter'
import plusOrReduce from '@/components/common/plusOrReduce'

export default {
  components: {
    currencyFormatter,
    plusOrReduce
  },
  name: 'account-position-lang',
  props: ['headSummary'], // 父组件传headSummary属性过来，如果为false，则不显示账户持仓组件头部右边内容
  data () {
    return {
      historicalPositionQueryData: [
        {
          date: '5.25',
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
                title: '开仓均价',
                lang: 'Average Cost'
            },
            {
                title: '收盘价',
                lang: 'Close Price'
            },
            {
                title: '浮动盈亏',
                lang: 'Floating Return'
            },
            {
                title: '占用资金',
                lang: 'Position Margin'
            },
            {
                title: '仓位',
                lang: 'Position Ratio'
            }
          ],
          tDataList:[
              {
                  SpotName: '黄金延期',
                  PositionType: '多开(Buy Long)',
                  PositionAmount: 30,
                  AverageCost: 282.55,
                  ClosePrice: 281.30,
                  floatingReturn: {
                    "status": 'reduce',
                    "num": 24400.00
                  },
                  PositionMargin: 28852.55,
                  PositionRatio: 10.56
              },
              {
                  SpotName: '白银延期',
                  PositionType: '多开(Buy Long)',
                  PositionAmount: 30,
                  AverageCost: 282.55,
                  ClosePrice: 281.30,
                  floatingReturn: {
                    "status": 'plus',
                    "num": 5522788.00
                  },
                  PositionMargin: 28852.55,
                  PositionRatio: 45.56
              },
              {
                  SpotName: '迷你黄金延期',
                  PositionType: '空平(Buy Long)',
                  PositionAmount: 30,
                  AverageCost: 282.55,
                  ClosePrice: 281.30,
                  floatingReturn: {
                    "status": 'plus',
                    "num": 478552.00
                  },
                  PositionMargin: 28852.55,
                  PositionRatio: 75.56
              }
          ]
        },
        {
          date: '5.24',
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
                title: '开仓均价',
                lang: 'Average Cost'
            },
            {
                title: '收盘价',
                lang: 'Close Price'
            },
            {
                title: '浮动盈亏',
                lang: 'Floating Return'
            },
            {
                title: '占用资金',
                lang: 'Position Margin'
            },
            {
                title: '仓位',
                lang: 'Position Ratio'
            }
          ],
          tDataList:[
              {
                  SpotName: '黄金延期',
                  PositionType: '多开(Buy Long)',
                  PositionAmount: 30,
                  AverageCost: 282.55,
                  ClosePrice: 281.30,
                  floatingReturn: {
                    "status": 'reduce',
                    "num": 24400.00
                  },
                  PositionMargin: 28852.55,
                  PositionRatio: 10.56
              },
              {
                  SpotName: '白银延期',
                  PositionType: '多开(Buy Long)',
                  PositionAmount: 30,
                  AverageCost: 282.55,
                  ClosePrice: 281.30,
                  floatingReturn: {
                    "status": 'plus',
                    "num": 5522788.00
                  },
                  PositionMargin: 28852.55,
                  PositionRatio: 45.56
              },
              {
                  SpotName: '迷你黄金延期',
                  PositionType: '空平(Buy Long)',
                  PositionAmount: 30,
                  AverageCost: 282.55,
                  ClosePrice: 281.30,
                  floatingReturn: {
                    "status": 'plus',
                    "num": 478552.00
                  },
                  PositionMargin: 28852.55,
                  PositionRatio: 75.56
              }
          ]
        },
        {
          date: '5.23',
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
                title: '开仓均价',
                lang: 'Average Cost'
            },
            {
                title: '收盘价',
                lang: 'Close Price'
            },
            {
                title: '浮动盈亏',
                lang: 'Floating Return'
            },
            {
                title: '占用资金',
                lang: 'Position Margin'
            },
            {
                title: '仓位',
                lang: 'Position Ratio'
            }
          ],
          tDataList:[
              {
                  SpotName: '黄金延期',
                  PositionType: '多开(Buy Long)',
                  PositionAmount: 30,
                  AverageCost: 282.55,
                  ClosePrice: 281.30,
                  floatingReturn: {
                    "status": 'reduce',
                    "num": 24400.00
                  },
                  PositionMargin: 28852.55,
                  PositionRatio: 10.56
              },
              {
                  SpotName: '白银延期',
                  PositionType: '多开(Buy Long)',
                  PositionAmount: 30,
                  AverageCost: 282.55,
                  ClosePrice: 281.30,
                  floatingReturn: {
                    "status": 'plus',
                    "num": 5522788.00
                  },
                  PositionMargin: 28852.55,
                  PositionRatio: 45.56
              },
              {
                  SpotName: '迷你黄金延期',
                  PositionType: '空平(Buy Long)',
                  PositionAmount: 30,
                  AverageCost: 282.55,
                  ClosePrice: 281.30,
                  floatingReturn: {
                    "status": 'plus',
                    "num": 478552.00
                  },
                  PositionMargin: 28852.55,
                  PositionRatio: 75.56
              }
          ]
        },
        {
          date: '5.22',
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
                title: '开仓均价',
                lang: 'Average Cost'
            },
            {
                title: '收盘价',
                lang: 'Close Price'
            },
            {
                title: '浮动盈亏',
                lang: 'Floating Return'
            },
            {
                title: '占用资金',
                lang: 'Position Margin'
            },
            {
                title: '仓位',
                lang: 'Position Ratio'
            }
          ],
          tDataList:[
              {
                  SpotName: '黄金延期',
                  PositionType: '多开(Buy Long)',
                  PositionAmount: 30,
                  AverageCost: 282.55,
                  ClosePrice: 281.30,
                  floatingReturn: {
                    "status": 'reduce',
                    "num": 24400.00
                  },
                  PositionMargin: 28852.55,
                  PositionRatio: 10.56
              },
              {
                  SpotName: '白银延期',
                  PositionType: '多开(Buy Long)',
                  PositionAmount: 30,
                  AverageCost: 282.55,
                  ClosePrice: 281.30,
                  floatingReturn: {
                    "status": 'plus',
                    "num": 5522788.00
                  },
                  PositionMargin: 28852.55,
                  PositionRatio: 45.56
              },
              {
                  SpotName: '迷你黄金延期',
                  PositionType: '空平(Buy Long)',
                  PositionAmount: 30,
                  AverageCost: 282.55,
                  ClosePrice: 281.30,
                  floatingReturn: {
                    "status": 'plus',
                    "num": 478552.00
                  },
                  PositionMargin: 28852.55,
                  PositionRatio: 75.56
              }
          ]
        },
        {
          date: '5.21',
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
                title: '开仓均价',
                lang: 'Average Cost'
            },
            {
                title: '收盘价',
                lang: 'Close Price'
            },
            {
                title: '浮动盈亏',
                lang: 'Floating Return'
            },
            {
                title: '占用资金',
                lang: 'Position Margin'
            },
            {
                title: '仓位',
                lang: 'Position Ratio'
            }
          ],
          tDataList:[
              {
                  SpotName: '黄金延期',
                  PositionType: '多开(Buy Long)',
                  PositionAmount: 30,
                  AverageCost: 282.55,
                  ClosePrice: 281.30,
                  floatingReturn: {
                    "status": 'reduce',
                    "num": 24400.00
                  },
                  PositionMargin: 28852.55,
                  PositionRatio: 10.56
              },
              {
                  SpotName: '白银延期',
                  PositionType: '多开(Buy Long)',
                  PositionAmount: 30,
                  AverageCost: 282.55,
                  ClosePrice: 281.30,
                  floatingReturn: {
                    "status": 'plus',
                    "num": 5522788.00
                  },
                  PositionMargin: 28852.55,
                  PositionRatio: 45.56
              },
              {
                  SpotName: '迷你黄金延期',
                  PositionType: '空平(Buy Long)',
                  PositionAmount: 30,
                  AverageCost: 282.55,
                  ClosePrice: 281.30,
                  floatingReturn: {
                    "status": 'plus',
                    "num": 478552.00
                  },
                  PositionMargin: 28852.55,
                  PositionRatio: 75.56
              }
          ]
        },
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .hpqc-summary{ padding: 14px 15px; height: 60px;
    .icon-tips{ font-size: 24px; vertical-align: middle;}
  }
  .historicalPositionQueryData-wrap{ height: 700px; overflow: auto;
    .date-tit{ padding-left: 20px; height: 30px; line-height: 30px; background: #3B4B76;}
  }
</style>
