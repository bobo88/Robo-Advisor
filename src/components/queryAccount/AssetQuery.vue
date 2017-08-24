<!--
内容：资产查询
作者：BOBO
日期： 20170802
-->
<template>
  <div class="asset-query">
  	<!-- 账户参数 -->
    <user-account-parameters></user-account-parameters>

  	<!-- 账户持仓 -->
    <user-account-position-lang :head-summary="true"></user-account-position-lang>
  </div>
</template>

<script>
import UserAccountPositionLang from '@/components/UserAccountPositionLang'
import UserAccountParameters from '@/components/UserAccountParameters'

export default {
	components: {
		UserAccountPositionLang,
		UserAccountParameters
	},
  	name: 'asset-query',
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
