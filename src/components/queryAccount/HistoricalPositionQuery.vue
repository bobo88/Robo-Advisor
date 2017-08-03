<!--
内容：历史持仓页面
作者：BOBO
日期： 20170803
-->
<template>
  <div class="historical-position-query">
  	<!-- 历史持仓 -->
    <historical-position-query-component></historical-position-query-component>

  </div>
</template>

<script>
import HistoricalPositionQueryComponent from '@/components/HistoricalPositionQueryComponent'

export default {
  	components: {
  		HistoricalPositionQueryComponent
  	},
  	name: 'historical-position-query',
  	data () {
	    return {
	      	msg: ''
	    }
  	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
