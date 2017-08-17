<!--
内容：数值状态组件（ 根据数值所在的状态status，给数值加 "+" 或者 "-"）
作者：BOBO
日期： 20170802
-->
<template>
  <div class="plus-or-reduce-state">
    <span v-if=" obj > 0" class="f-red">
      <em>+</em>
      <em>{{ obj | currencyFormatter }} <i v-if="percentage">%</i></em>
    </span>
    <span v-else-if="obj < 0" class="f-green">
      <em>{{ obj | currencyFormatter }} <i v-if="percentage">%</i></em>
    </span>
    <span v-else>
      <em>{{ obj | currencyFormatter }} <i v-if="percentage">%</i></em>
    </span>
  </div>
</template>

<script>
//引入全局过滤器
import currencyFormatter from '@/filter/currencyFormatter'

export default {
  components: {
    currencyFormatter
  },
  props: ['obj','percentage'],
  name: 'plus-or-reduce-state',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .plus-or-reduce-state{ display: inline-block;}
</style>
