<!--
内容：模拟收益走势页面
作者：BOBO
日期： 20170809x
-->
<template>
  <div class="simulation-curve-of-refum">
    <!-- 模拟收益走势 -->
    <user-curve-of-refum-component></user-curve-of-refum-component>
  </div>
</template>

<script>
import UserCurveOfRefumComponent from '@/components/UserCurveOfRefumComponent'

export default {
    components: {
      UserCurveOfRefumComponent
    },
    name: 'simulation-curve-of-refum',
    data () {
      return {

      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
