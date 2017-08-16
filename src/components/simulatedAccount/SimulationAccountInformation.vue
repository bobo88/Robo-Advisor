<!--
内容：模拟账户概要页面
作者：BOBO
日期： 20170809x
-->
<template>
  <div class="simulation-account-information">
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
  	name: 'simulation-account-information',
  	data () {
	    return {

	    }
  	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>