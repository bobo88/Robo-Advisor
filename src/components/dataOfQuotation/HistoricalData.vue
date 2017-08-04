<!--
内容：历史数据页面
作者：BOBO
日期： 20170803
-->
<template>
  <div class="historical-data">
  	<!-- 历史数据 -->
    <historical-data-component></historical-data-component>

  </div>
</template>

<script>
import HistoricalDataComponent from '@/components/HistoricalDataComponent'

export default {
  	components: {
  		HistoricalDataComponent
  	},
  	name: 'historical-data',
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