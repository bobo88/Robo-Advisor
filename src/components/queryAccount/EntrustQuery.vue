<!--
内容：委托查询页面
作者：BOBO
日期： 20170803
-->
<template>
  <div class="entrust-query">
  	<!-- 委托查询 -->
    <user-entrust-query-component></user-entrust-query-component>

  </div>
</template>

<script>
import UserEntrustQueryComponent from '@/components/UserEntrustQueryComponent'

export default {
  	components: {
  		UserEntrustQueryComponent
  	},
  	name: 'entrust-query',
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
