<!--
内容：资产查询
作者：BOBO
日期： 20170802
-->
<template>
  <div class="asset-query">
    <account-position-lang :head-summary="true"></account-position-lang>
  </div>
</template>

<script>
import AccountPositionLang from '@/components/AccountPositionLang'

export default {
	components: {
		AccountPositionLang
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
