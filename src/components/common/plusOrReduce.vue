<!--
内容：数值状态组件（ 根据数值所在的状态status，给数值加 "+" 或者 "-"）
作者：BOBO
日期： 20170802
-->
<template>
  <div class="plus-or-reduce">
    <span v-if=" obj.status === 'plus' " class="f-red">
      <em>+</em>
      <em>{{ obj.num }} <i v-if="percentage">%</i></em>
    </span>
    <span v-else class="f-green">
      <em>-</em>
      <em>{{ obj.num }} <i v-if="percentage">%</i></em>
    </span>
  </div>
</template>

<script>
export default {
  props: ['obj','percentage'],
  name: 'plus-or-reduce',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .plus-or-reduce{ display: inline-block;}
</style>
