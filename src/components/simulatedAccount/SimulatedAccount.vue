<!--
内容：模拟账户页面
作者：BOBO
日期： 20170803
-->
<template>
  <div class="simulated-account">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  	name: 'simulated-account',
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