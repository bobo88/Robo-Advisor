<!--
内容：查看指令 页面
作者：BOBO
日期： 20170803
-->
<template>
  <div class="query-orders">
  	<!-- 查看指令 -->
    <query-orders-component></query-orders-component>
  </div>
</template>

<script>
import QueryOrdersComponent from '@/components/QueryOrdersComponent'

export default {
	components: {
		QueryOrdersComponent
	},
  	name: 'query-orders',
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
