<!--
内容：登录 组件
作者：BOBO
日期： 20170821
-->
<template>
  <div class="login-component mb30">
  	
    <p class="logo"><img src="../assets/logo.png"></p>

    <form action="#" method="post" autofocus autocomplete="off">
      <p class="item-form">
        <Input placeholder="账号" v-model="account" style="width: 330px; height: 50px;" @keyup.native.enter="login"></Input>
      </p>
      <p class="item-form">
        <Input type="password" placeholder="密码" v-model="password" style="width: 330px; height: 50px;" @keyup.native.enter="login"></Input>
      </p>
      <!-- <p class="item-form">
        <Input placeholder="验证码" style="width: 200px; height: 50px;"></Input>
      </p> -->
      <p class="item-form">
        <Button type="ghost" class="login-btn" @click="login">登录</Button>
      </p>
      <p class="error-msg">{{ msgCont }}</p>
    </form>
    
  </div>
</template>

<script>
export default {
  name: 'login-component',
  data () {
    return {
      isLoging: false,
      account: '',
      password: '',
      msgCont: ''
    }
  },
  mounted: function(){
    // alert(2);
  },
  computed: {

  },
  methods: {
    login(){
      var vm = this;
      if(this.account!='' && this.password!=''){
          this.toLogin();
      }else{
        vm.msgCont = '请完整输入账号和密码';
          setTimeout(function(){
            vm.msgCont = '';
          }, 2000);
      }
    },
    toLogin(){
        var vm = this;
        //需要向后端发送的登录参数
        let params = {
          userName: this.account,
          pw: this.password
        }

        //设置在登录状态
        this.isLoging = true;
        
        //请求后端,比如:
        this.$http({
          method: 'post',
          url: process.env.BASE_URL + '/roboAdvisor/login',
          params: params,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        })
        .then(function (response) {
          if(response.data.code === 100){
            // let expireDays = 1000 * 60 * 60 * 24 * 15;
            // vm.setCookie('session', response.data.data.trading_token, expireDays);
            sessionStorage.setItem('trading_token', response.data.data.trading_token);
            sessionStorage.setItem('nickname', response.data.data.nickname);
            vm.$store.commit('SETTOKEN', response.data.data.trading_token);
            vm.$store.commit('SETNICKNAME', response.data.data.nickname);

            //登录成功后
            vm.$router.push('/main'); 
          }else{
            vm.msgCont = '账号或密码错误';
            setTimeout(function(){
              vm.msgCont = '';
            }, 2000);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
	.login-component{ position: fixed; z-index:1; top: 0; left: 0; right:0; bottom: 0; margin: auto; padding: 100px 0 40px; width: 470px; height: 350px; background: #1D2742; box-shadow: 0 10px 20px 0 rgba(0,0,0,0.60); border-radius: 8px;
    .logo{ position: absolute; z-index: 2; top: -70px; left: 165px; width: 140px; height: 140px; background:#000; border-radius: 50%; overflow: hidden;
      img{ position: absolute; z-index: 3; left: 50%; transform: translate(-50%);}
    }
    .error-msg{ padding: 5px 0; line-height:20px; color: #f00; font-size: 14px; text-align: center;}
    .item-form{ padding: 0 70px; font-size: 14px;
      input.ivu-input{ height: 40px;}
      .login-btn{ margin-top: 20px; width: 330px; height: 40px; border-radius: 20px; color: #fff; background-image: linear-gradient(90deg, #6F64FF 0%, #B93BFB 100%);}
    }
  }
</style>
