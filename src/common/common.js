import Vue from 'vue'
const comm = {
	setTitle(str){
		document.title = str || '猎财大师';
		var iframe = document.createElement('iframe');
		iframe.style.display = 'none';
		iframe.setAttribute('src', '/favicon.ico');
		document.body.appendChild(iframe);
		iframe.onload = function() {
		    setTimeout(() => {
		        document.body.removeChild(iframe)
		    }, 0)
		}
	},
	scrollTop(){
		return document.documentElement.scrollTop || document.body.scrollTop || 0;
	},
	setCookie(name, value, expiredays) {
	    var d = new Date();
	    d.setDate(d.getDate() + expiredays);
	    document.cookie = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + d.toGMTString()) + ";path=/";
	},
	getCookie(name) {
	    if (document.cookie.length > 0) {
	        var start = document.cookie.indexOf(name + "=")
	        if (start != -1) {
	            start = start + name.length + 1;
	            var end = document.cookie.indexOf(";", start);
	            if (end == -1) {
	                end = document.cookie.length;
	            }
	            return unescape(document.cookie.substring(start, end));
	        }
	    }
	    return '';
	},
	isWechat() {
    	var ua = navigator.userAgent.toLowerCase();
    	if (ua.match(/MicroMessenger/i) == "micromessenger") {
        	return true;
    	} else {
        	return false;
    	}
	},
	isAndroid() {
    	return navigator.userAgent.match(/Android/i) ? true : false;
	},
	isIOS() {
    	return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
	},
	//获取url中search部分字符串为json对象
	getQueryString : function (search) {
		var url = decodeURIComponent ( search || location.search );
		let arr;
		var request = {};
		if (url.indexOf("?") != -1) {
		  var str = url.substr(1);
		  arr = str.split("&");
		  for(var i = 0; i < arr.length; i ++) {
		     request[arr[i].split("=")[0]] = unescape(arr[i].split("=")[1]);
		  }
		}
		return request || {};
	},
	throttle(fn, wait){
    	var last = 0;
    	return function(){
        	var curr = +new Date()
        	if (curr - last > wait){
            	fn.apply(this, arguments);
            	last = curr;
        	}
    	}
	},
	//转码成base64
    toBase64(data){  
        var toBase64Table = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';  
        var base64Pad = '=';  
        var result = '';  
        var length = data.length;  
        var i;                                                 
        for (i = 0; i < (length - 2); i += 3) {  
            result += toBase64Table[data.charCodeAt(i) >> 2];  
            result += toBase64Table[((data.charCodeAt(i) & 0x03) << 4) + (data.charCodeAt(i + 1) >> 4)];  
            result += toBase64Table[((data.charCodeAt(i + 1) & 0x0f) << 2) + (data.charCodeAt(i + 2) >> 6)];  
            result += toBase64Table[data.charCodeAt(i + 2) & 0x3f];  
        }
        if (length % 3) {  
            i = length - (length % 3);  
            result += toBase64Table[data.charCodeAt(i) >> 2];  
            if ((length % 3) == 2) {  
                result += toBase64Table[((data.charCodeAt(i) & 0x03) << 4) + (data.charCodeAt(i + 1) >> 4)];  
                result += toBase64Table[(data.charCodeAt(i + 1) & 0x0f) << 2];  
                result += base64Pad;  
            } else {  
                result += toBase64Table[(data.charCodeAt(i) & 0x03) << 4];  
                result += base64Pad + base64Pad;  
            }  
        }  
        return result;  
    },
}

export default comm;