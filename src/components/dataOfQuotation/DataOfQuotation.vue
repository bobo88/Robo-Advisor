<!--
内容：行情数据页面
作者：BOBO
日期： 20170803
-->
<template>
  <div class="data-of-quotation">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  	name: 'data-of-quotation',
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
