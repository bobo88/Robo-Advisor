<!--
内容：模拟历史持仓页面
作者：BOBO
日期： 20170803x
-->
<template>
  <div class="simulation-historical-position-query">
    <!-- 模拟历史持仓 -->
    <historical-position-query-component></historical-position-query-component>

  </div>
</template>

<script>
import HistoricalPositionQueryComponent from '@/components/HistoricalPositionQueryComponent'

export default {
    components: {
      HistoricalPositionQueryComponent
    },
    name: 'simulation-historical-position-query',
    data () {
      return {

      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
