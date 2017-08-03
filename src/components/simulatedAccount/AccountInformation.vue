<!--
内容：模拟账户页面
作者：BOBO
日期： 20170803
-->
<template>
  <div class="account-information">
    <!-- 账户参数 -->
    <account-parameters></account-parameters>

    <!-- 账户持仓 -->
    <account-position-lang :head-summary="false"></account-position-lang>
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
  	name: 'account-information',
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