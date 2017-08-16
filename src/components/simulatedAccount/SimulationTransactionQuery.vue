<!--
内容：模拟成交查询页面
作者：BOBO
日期： 20170809x
-->
<template>
  <div class="simulation-transction-query">
    <!-- 模拟成交查询 -->
    <exchange-query></exchange-query>

  </div>
</template>

<script>
import ExchangeQuery from '@/components/ExchangeQuery'

export default {
    components: {
      ExchangeQuery
    },
    name: 'simulation-transction-query',
    data () {
      return {

      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
