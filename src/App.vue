<template>
  <div id="app">
    <left></left>
    <top></top>
    
    <div class="main">
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
  name: 'app'
}
</script>

<style lang="less">
*{ margin: 0; padding: 0; box-sizing: border-box;}
caption,th{text-align:left;}
h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal;}
.clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden;}
.clearfix{display:inline-block;}
* html .clearfix{height:1%;}
.clearfix{display:block;}
.fl{ float: left;}
.fr{ float: right;}
em{ font-style: normal;}
strong{ font-weight: normal;}

/* 公用表格样式 */
.f-red{ color: #FF2424;}
.f-green{ color: #11D411;}
.table-common-head{ padding: 15px; height: 60px; line-height: 30px; font-size: 14px; background: #11172C; border-radius: 3px 3px 0 0;
  .tit{ color: #fff;}
  .head-summary{ color: #94A8DE;
    span{ margin-left: 40px; display: inline-block;}
  }
}
.table-common-main{ border: none; border-radius: 0 0 3px 3px; overflow: hidden;
  /* 去掉iview默认表格边框  */ 
  .ivu-table{ font-size: 14px;
    &:before{ height: 0; background-color: none;}
    &:after{ width: 0; background-color: none;}
  }

  .ivu-table td, .ivu-table th{ font-weight: normal; border-bottom: none; text-align: center;}
  .ivu-table-header{ color: #94A8DE; background: #1D2742;
    th{ height: 50px; background: #1D2742;}
  }
  
  /* iview默认表格主体部分 */
  .ivu-table-body{ background: #252F48;
    .ivu-table-row{ 
      &.ivu-table-row-hover{
        td{ background: #3B4B76;}
      }
      td{ color:#fff; background: #252F48;}
    }
    tr:nth-child(2n){
      td{ background: #1D2742;}
    }
  }
}

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
.main{ padding: 110px 50px 20px 310px; min-width: 100%; min-height: 100%;}

</style>
