<!--
内容：委托查询页面
作者：BOBO
日期： 20170803
-->
<template>
  <div class="entrust-query">
  	<!-- 委托查询 -->
    <entrust-query-component></entrust-query-component>

  </div>
</template>

<script>
import EntrustQueryComponent from '@/components/EntrustQueryComponent'

export default {
  	components: {
  		EntrustQueryComponent
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
