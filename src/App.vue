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
.mr10{ margin-right: 10px;}
.mb20{ margin-bottom: 20px;}
.mb30{ margin-bottom: 30px;}
em{ font-style: normal;}
strong{ font-weight: normal;}

/* 公用表格样式 */
.f-red{ color: #FF2424;}
.f-green{ color: #11D411;}
/* 单语表格 */
.table-common-head{ height: 60px; font-size: 14px; background: #11172C; border-radius: 3px 3px 0 0;
  .tit{ padding:10px 15px; line-height: 20px; color: #fff;}
  .head-summary{ padding: 15px; height: 60px; line-height: 30px; color: #94A8DE;
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
/* 双语表格 */
.table-common-main-lang{ width: 100%; text-align: center; border: none; border-radius: 0 0 3px 3px; overflow: hidden;
  th{ padding: 5px 0; height: 50px; line-height: 20px; background: #1D2742; text-align: center; font-size: 12px;
    strong{ display: block; font-size: 14px;}
  }
  td{ height: 50px; font-size: 14px; background: #252F48;}
  tr:nth-child(2n){
    td{ background: #1D2742;}
  }
  tbody{
    tr{
      &:hover{
        td{ background: #3B4B76;}
      }
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

  /* iview 修改默认样式 */
  .ivu-select-selection{ color: #90A4D9; background: none;}
  .ivu-input{ color: #90A4D9; background: none;}
  .ivu-btn-ghost{ color: #90A4D9; border: 1px solid #90a4d9;}
  .ivu-date-picker{ color: #333;}
  .ivu-tooltip-inner{ max-width: 400px;}
}
.main{ padding: 110px 50px 20px 310px; min-width: 100%; min-height: 100%;}

</style>
