<!--
内容：默认首页（下达指令页面）
作者：BOBO
日期： 20170802
-->
<template>
  <div class="issue-order">
    <account-position></account-position>
  </div>
</template>

<script>
import AccountPosition from '@/components/AccountPosition'

export default {
	components: {
		AccountPosition
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
