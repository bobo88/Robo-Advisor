<!--
内容：弹窗组件
作者：BOBO
日期： 20170814
-->
<template>
  <div class="pop-up">
    <div class="pop-up-content">
      <a href="javascript:;" class="close iconfont icon-icons64x6403" @click="closePop"></a>
      <div class="content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pop-up',
  data () {
    return {

    }
  },
  methods: {
    closePop(){
      this.$emit('close-tc');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .pop-up{ position: fixed; z-index: 9999; top: 0; bottom: 0; left: 0; right: 0; margin: auto; width: 100%; height:100%; background: rgba(0,0,0, 0.6);
    .pop-up-content{ position: absolute; z-index: 1; top: 0; bottom: 0; left: 0; right: 0; margin: auto; width: 800px; height:180px; background: #fff;
      .close{ display: inline-block; position: absolute; z-index: 2; top: 5px; right: 5px; width: 25px; height: 25px; line-height: 25px; font-size: 20px; color: #333; font-weight: bold; vertical-align: middle; text-align: center;}
      .content{ position: absolute; z-index:1; padding: 30px; width: 100%; height: 100%; color: #000;}
      
      table{ width: 100%; border-left: 1px solid #ddd; border-top: 1px solid #ddd;}
      th, td{ padding: 0 5px; height: 60px; line-height: 20px; text-align: center; border-bottom: 1px solid #ddd; border-right: 1px solid #ddd;}
    }
  }
</style>
