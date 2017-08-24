<!--
内容：成交查询页面
作者：BOBO
日期： 20170803
-->
<template>
  <div class="transction-query">
  	<!-- 成交查询 -->
    <user-exchange-query></user-exchange-query>

  </div>
</template>

<script>
import UserExchangeQuery from '@/components/UserExchangeQuery'

export default {
  	components: {
  		UserExchangeQuery
  	},
  	name: 'transction-query',
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
