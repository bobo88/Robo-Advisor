<!--
内容：收益走势简介 组件
作者：BOBO
日期： 20170803
-->
<template>
  <div class="curve-of-refum-summary-component mb30">
  	<ul class="cofsc-list clearfix">
       <li>
            <i class="iconfont icon-quanyizhongxin mr10"></i>
            <div class="cont">
                <p class="info-cont">1464147.78</p>
                <p class="info-tit">账户权益(Total Asset)</p>
            </div>
       </li> 
       <li>
            <i class="iconfont icon-yingkuizichan mr10"></i>
            <div class="cont">
                <p class="info-cont">465748.78</p>
                <p class="info-tit">总盈亏(Cumulative Return)</p>
            </div>
       </li>
       <li>
            <i class="iconfont icon-jingzhi mr10"></i>
            <div class="cont">
                <p class="info-cont">1.5678</p>
                <p class="info-tit">净值(Net Worth Rate)</p>
            </div>
       </li>
       <li>
            <i class="iconfont icon-baifenbi mr10"></i>
            <div class="cont">
                <p class="info-cont">46.54%</p>
                <p class="info-tit">总收益率(ROA)</p>
            </div>
       </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'curve-of-refum-summary-component',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .cofsc-list{ 
        li{ position: relative; z-index: 1; float: left; margin-right: 1%; width: 24%; height: 164px; background: #1D2742; box-shadow: 0 0 10px 0 rgba(0,0,0,0.10); border-radius: 4px;
            .iconfont{ position: absolute; z-index: 2; top: 0; right: 0; color: #293451; font-size: 100px;
                &.icon-baifenbi{ font-weight: bold;}
            }
            .cont{ position:relative; z-index: 2; padding: 42px 0; text-align: center;
                .info-cont{ height: 50px; line-height: 50px; font-size: 36px; color: #8A9DD1; letter-spacing: -0.87px;}
                .info-tit{ height: 30px; line-height: 30px; font-size: 14px; color: #8A9DD1; letter-spacing: -0.34px;}
            }
        }
    }
</style>
