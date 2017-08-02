<template>
  <div id="app">
    <left></left>
    <top></top>

    <router-view></router-view>
  </div>
</template>

<script>
import Left from '@/components/common/Left'
import Top from '@/components/common/Top'
import '@/fonts/iconfont.css'    // 使用 iconfont图标库

export default {
  components: {
    Left,
    Top
  },
  name: 'app'
}
</script>

<style>
*{ margin: 0; padding: 0; box-sizing: border-box;}
caption,th{text-align:left;}
h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal;}
.clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden;}
.clearfix{display:inline-block;}
* html .clearfix{height:1%;}
.clearfix{display:block;}

#app {
  position: relative;
  z-index: 1;
  font-family: 'PingFangSC-Regular', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  background: #192037;
  min-height: 100vh;
}

</style>
