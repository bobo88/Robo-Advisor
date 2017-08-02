<!--
内容：公共头部
作者：BOBO
日期： 20170802
-->
<template>
  <div class="top">
    <h1 class="user-name">
      <img src="../../assets/default_user.jpg" width="50" height="50" alt="">
      <span>园博吧超级管理员</span>
    </h1>
  </div>
</template>

<script>
export default {
  name: 'top',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .top{ position: absolute; z-index: 2; top: 0; padding-left: 260px; width: 100%; height: 80px; background: #11172C; box-shadow: 0 4px 10px 0 rgba(0,0,0,0.10);
    .user-name{ padding: 15px 20px; height: 80px; line-height: 50px; vertical-align: middle;
      img{ display: inline-block; width: 50px; height: 50px; border-radius: 50px; vertical-align: middle;}
      span{ margin-left: 10px; display: inline-block; height: 50px; line-height: 50px; vertical-align: middle;}
    }
  }
</style>
