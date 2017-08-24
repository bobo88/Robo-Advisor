<!--
内容：历史持仓页面
作者：BOBO
日期： 20170803
-->
<template>
  <div class="historical-position-query">
  	<!-- 历史持仓 -->
    <user-historical-position-query-component></user-historical-position-query-component>

  </div>
</template>

<script>
import UserHistoricalPositionQueryComponent from '@/components/UserHistoricalPositionQueryComponent'

export default {
  	components: {
  		UserHistoricalPositionQueryComponent
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
