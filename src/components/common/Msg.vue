<!--
内容：弹窗提示
作者：BOBO
日期： 20170817
-->
<template>
  <div class="msg">
    <div class="msg-content" :style="msgStyle">
      <a href="javascript:;" class="close iconfont icon-icons64x6403" @click="closeMsg"></a>
      <div class="content">
        {{ msg }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'msg',
  props: ['msg', 'msgStyle'],
  data () {
    return {

    }
  },
  methods: {
    closeMsg(){
      this.$emit('close-tc');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .msg{ position: fixed; z-index: 9999; top: 0; bottom: 0; left: 0; right: 0; margin: auto; width: 100%; height:100%; background: rgba(0,0,0, 0.6);
    .msg-content{ position: absolute; z-index: 1; top: 0; bottom: 0; left: 0; right: 0; margin: auto; width: 800px; height:100px; background: #fff; border-radius: 5px;
      .close{ display: inline-block; position: absolute; z-index: 2; top: 5px; right: 5px; width: 25px; height: 25px; line-height: 25px; font-size: 20px; color: #333; font-weight: bold; vertical-align: middle; text-align: center;}
      .content{ position: absolute; z-index:1; padding: 30px; width: 100%; height: 100%; line-height: 40px; color: #000; font-size: 14px; text-align: center;}
      
    }
  }
</style>
