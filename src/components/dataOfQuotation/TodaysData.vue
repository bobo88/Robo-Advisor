<!--
内容：当日数据页面
作者：BOBO
日期： 20170803
-->
<template>
  <div class="todays-data">
  	<!-- 当日数据 -->
    <todays-data-component></todays-data-component>

  </div>
</template>

<script>
import TodaysDataComponent from '@/components/TodaysDataComponent'

export default {
  	components: {
  		TodaysDataComponent
  	},
  	name: 'todays-data',
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