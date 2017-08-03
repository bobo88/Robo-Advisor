<!--
内容：资产查询
作者：BOBO
日期： 20170802
-->
<template>
  <div class="asset-query">
  	<!-- 账户参数 -->
    <account-parameters></account-parameters>

  	<!-- 账户持仓 -->
    <account-position-lang :head-summary="true"></account-position-lang>
  </div>
</template>

<script>
import AccountPositionLang from '@/components/AccountPositionLang'
import AccountParameters from '@/components/AccountParameters'

export default {
	components: {
		AccountPositionLang,
		AccountParameters
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
