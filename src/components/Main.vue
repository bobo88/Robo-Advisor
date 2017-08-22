<template>
  <div id="main">
    <left></left>
    <top></top>
    
    <div class="main-content">
      <router-view></router-view>
    </div>
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
  name: 'main'
}
</script>

<style lang="less">
.main-content{ padding: 110px 50px 20px 310px; min-width: 100%; min-height: 100%;}
</style>
