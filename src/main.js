setFontSize()

// 工具函数
import comm from './common/common'
window.comm = comm;

import Vue from 'vue'
import App from './App'
import router from './router'

// 300ms延时事件处理
import FastClick from 'fastclick'
FastClick.attach(document.body);

// 环境配置
import publicConfig from './publicConfig'
Vue.prototype.$publicConfig = publicConfig;

var _hmt = _hmt || []
if(publicConfig.environment === 'development'){
	var hm = document.createElement('script')
	hm.src = 'https://hm.baidu.com/hm.js?555ce3d7f32b7e52770066396ffbd7cb'
	var s = document.getElementsByTagName('script')[0]
	s.parentNode.insertBefore(hm,s)
}

if(publicConfig.environment === 'production'){
	var hm = document.createElement('script')
	hm.src = 'https://hm.baidu.com/hm.js?96c94e7ab541005ec6ceb492fca22f33'
	var s = document.getElementsByTagName('script')[0]
	s.parentNode.insertBefore(hm,s)
}

// 弹窗组件
import Popup from './components/popup/vue-popup';
Vue.use(Popup);

// ajax请求
import axios from './resource/axios'
Vue.prototype.$axios = axios;

// 用户信息
Vue.prototype.$userInfo = {};

// app交互
import native from './common/native'
Vue.prototype.$native = native;

import './common/filters'

if(native.isApp){
	Vue.prototype.$publicConfig.isApp = true;
	native.getAppToken((data)=>{
		Vue.prototype.$userInfo.token = data || "";
		comm.setCookie('__token__',data,10000)
		native.getAppVersion((appVersion) =>{
			let curVer = Number(appVersion.replace(/\./g, ''));
			Vue.prototype.$publicConfig.appVersion = curVer;
			new Vue({
			  el: '#app',
			  router,
			  components: { App },
			  template: '<App/>'
			})
		})

	})
}else{
	Vue.prototype.$publicConfig.isApp = false;
	if(Vue.prototype.$publicConfig.environment === 'development'){
		let token = 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MzA4NDY1MzU1NzMsInN1YiI6IjczZjM3NGRjNmNjZTRiNzE4YTlhNGViNzkwOGM1NGExIiwiaXNzIjoiaHR0cHM6XC9cL3d3dy5saW5rd2VlLmNvbSJ9.56ZNGQYuqH3tuiraJazWm-RBce_I18oBMMxZwyRAdeM'
		Vue.prototype.$userInfo.token = token || "";
		comm.setCookie('__token__',token,10000)
	}
	new Vue({
	  el: '#app',
	  router,
	  components: { App },
	  template: '<App/>'
	})
}


