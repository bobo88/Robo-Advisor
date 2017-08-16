<!--
内容：模拟委托查询页面
作者：BOBO
日期： 20170809x
-->
<template>
  <div class="simulation-entrust-query">
    <!-- 模拟委托查询 -->
    <entrust-query-component></entrust-query-component>

  </div>
</template>

<script>
import EntrustQueryComponent from '@/components/EntrustQueryComponent'

export default {
    components: {
      EntrustQueryComponent
    },
    name: 'simulation-entrust-query',
    data () {
      return {

      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>