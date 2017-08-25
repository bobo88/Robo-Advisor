<!--
内容：历史数据 组件
作者：BOBO
日期： 20170803
-->
<template>
  <div class="historical-data-component mb30">
  	<header class="table-common-head clearfix">
  		<span class="tit fl">历史数据 <br/> Historical Data</span>
  		<div class="historical-data-component-summary fr">
  			<Select v-model="chooseContract" style="width:140px" class="mr10">
            <Option v-for="item in chooseContractList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>

        <Date-picker type="date" placeholder="选择日期" style="width: 140px" placement="bottom-end" class="mr10" @on-change="setBeginDate"></Date-picker>

        <Select v-model="operatingStatus" style="width:140px" class="mr10">
            <Option v-for="item in operatingStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        
        <Button type="info" shape="circle" style="width: 70px" class="mr10" @click="getklineData">查询</Button>
       <!--  <Button type="ghost" shape="circle">导出(Export)</Button> -->
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
      <tbody>
        <tr v-for="item in pageDataList">
          <td>{{ chooseContract }}</td>
          <td>{{ item.time }}</td>
          <td>{{ item.high | currencyFormatter }}</td>
          <td>{{ item.low | currencyFormatter }}</td>
          <td>{{ item.close | currencyFormatter }}</td>
          <td>{{item.updown | tofixed}}</td>
          <td :class="plusOrReduce(item.updown)">{{item.updownRate | percentRate}}</td>
          <td :class="plusOrReduce(item.updown)">{{ item.average | currencyFormatter }}</td>
          <td>{{ item.volume }}</td>
          <td>{{ item.turnOver }}</td>
        </tr>
      </tbody>
    </table>
    <Page :total="tableData.tDataList.length" @on-change="Pagechange" :page-size="pagesize"></Page>
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
  name: 'historical-data-component',
  data () {
    return {
      time: 'day',
      begin_day: '20160412',
      chooseContract: 'Au(T+D)',
      chooseContractList: [
          {
              value: 'Au(T+D)',
              label: '黄金延期'
          },
          {
              value: 'Ag(T+D)',
              label: '白银延期'
          },
          {
              value: 'mAu(T+D)',
              label: '迷你黄金延期'
          }
      ],
      operatingStatus: '',
      operatingStatusList: [
          {
              value: 'day',
              label: '日K'
          },
          {
              value: 'week',
              label: '周K'
          },
          {
              value: 'month',
              label: '月K'
          },
          {
              value: '1',
              label: '1分钟'
          },
          {
              value: '5',
              label: '5分钟'
          },
          {
              value: '30',
              label: '30分钟'
          },
          {
              value: '60',
              label: '60分钟'
          },
          {
              value: '240',
              label: '240分钟'
          }          
      ],
      tableData: {
        tHead: [
          {
              title: '合约',
              lang: 'Inst ID'
          },
          {
              title: '时间',
              lang: 'Quote Time'
          },
          {
              title: '最高价',
              lang: 'High'
          },
          {
              title: '最低价',
              lang: 'Low'
          },
          {
              title: '收盘价',
              lang: 'Close'
          },
          {
              title: '涨跌额',
              lang: 'Up Down'
          },
          {
              title: '涨跌幅',
              lang: 'Up Down Rate'
          },
          {
              title: '均价',
              lang: 'Average'
          },
          {
              title: '成交量',
              lang: 'Volume'
          },
          {
              title: '成交金额(万)',
              lang: 'RMB TurnOver'
          }
        ],
        tDataList:[
            
        ]
      },
      pageDataList: [],
      currentPage: 1,
      pagesize: 20
    }
  },
  mounted: function () {
    this.getklineData()
  },
  methods: {
    getklineData: function () {
      var vm = this;
      var params = {inst_id: encodeURIComponent(vm.chooseContract),time: vm.time,trading_token: vm.$store.state.trading_token,begin_day: vm.begin_day};

      this.$http({
        method: 'get',
        url: process.env.BASE_URL + '/market/goldk',
        params: params,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      })
      .then(function (response) {
        console.log(response)
        if(response.data.code === 100){
          // vm.currentDatatime = response.data.data.data.data_list[0].date
          vm.tableData.tDataList = response.data.data.data.data_list.reverse()
          vm.pageDataList = vm.tableData.tDataList.slice(0, vm.currentPage * vm.pagesize)
          console.log(vm.pageDataList)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    setBeginDate: function (v) {
      console.log(v)
      this.begin_day = v.replace(/-/g,'')
      console.log(this.begin_day)
    },
    Pagechange: function (v) {
        this.currentPage = v
        console.log(v)
        this.FormatterPage(v)
    },
    FormatterPage: function (v) {
        console.log("v" + v)
        var vm = this
        this.pageDataList = vm.tableData.tDataList.slice((v - 1) * vm.pagesize, v * vm.pagesize)
        console.log(this.pageDataList)
    },
    plusOrReduce: function (str) {
      if (str >= 0) {
        return 'f-red'
      } else {
        return 'f-green'
      }
    }
  },
  filters: {
    percentRate (str) {
        return (str * 100).toFixed(2) + '%'
    },
    tofixed (str) {
        return str.toFixed(2)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.historical-data-component-summary{ padding: 14px 15px; height: 60px;}
  .current-day{ color: #90A4D9; font-size: 14px;}
  .ivu-btn-ghost{ color: #8598CB; border-color: #8598CB; font-size: 14px;
    &:hover{ color: #fff; background-image: linear-gradient(90deg, #6F64FF 0%, #B93BFB 100%);}
  }
</style>
