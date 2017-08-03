<!--
内容：默认首页（下达指令页面）
作者：BOBO
日期： 20170802
-->
<template>
  <div class="issue-order">
  	<!-- 账户持仓 -->
    <account-position-lang :head-summary="true"></account-position-lang>

	<!-- 设置交易指令 -->
    <set-the-transaction-order></set-the-transaction-order>
  </div>
</template>

<script>
//引入 “账户持仓” 组件
import AccountPositionLang from '@/components/AccountPositionLang'
//引入 “设置交易指令” 组件
import SetTheTransactionOrder from '@/components/SetTheTransactionOrder'

export default {
	components: {
		AccountPositionLang,
		SetTheTransactionOrder
	},
  	name: 'issue-order',
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
