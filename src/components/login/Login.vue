<!--
内容：登录 页面
作者：BOBO
日期： 20170821
-->
<template>
  <div class="login">
  	<!-- 查看指令 -->
    <login-component></login-component>
  </div>
</template>

<script>
import LoginComponent from '@/components/LoginComponent'

export default {
	components: {
		LoginComponent
	},
  	name: 'login',
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
