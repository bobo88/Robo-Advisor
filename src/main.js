// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'

import axios from 'axios'
import iView from 'iview'
import 'iview/dist/styles/iview.css'    // 使用 CSS

Vue.use(iView);
Vue.use(Vuex);
Vue.prototype.$http = axios;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;';

Vue.config.productionTip = false;

/* eslint-disable no-new */
const store = new Vuex.Store({
	state: {
		domain:'http://test.example.com', //保存后台请求的地址，修改时方便（比方说从测试服改成正式服域名）
		userInfo: { //保存用户信息
			nick: null,
			ulevel: null,
			uid: null,
			portrait: null
		}
	},
	mutations: {
		//更新用户信息
		updateUserInfo(state, newUserInfo) {
			state.userInfo = newUserInfo;
		}
	},
	actions: {
		updateUserInfo(context){
			context.commit('updateUserInfo');
		}
	}
});

//设置cookie,增加到vue实例方便全局调用
//vue全局调用的理由是，有些组件所用到的接口可能需要session验证，session从cookie获取
//当然，如果session保存到vuex的话除外
Vue.prototype.setCookie = (c_name, value, expiredays) => {
  var exdate = new Date();　　　　
  exdate.setDate(exdate.getDate() + expiredays);　　　　
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

//获取cookie、
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}
Vue.prototype.getCookie = getCookie;

//删除cookie
Vue.prototype.delCookie =(name) => {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null)
	  document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  //监听路由检查登录
  watch:{
	"$route" : 'checkLogin'
  },
  created: function(){
  	this.checkLogin();
  },
  methods: {
  	checkLogin(){
  	  //检查是否存在session
  	  //cookie操作方法在源码里有或者参考网上的即可
  	  if(!this.getCookie('session')){
  	    //如果没有登录状态则跳转到登录页
  	    this.$router.push('/login');
  	  }
  	  // else{
  	  //   //否则跳转到登录后的页面
  	  //   this.$router.push('/main');
  	  // }
  	}
  }
})
