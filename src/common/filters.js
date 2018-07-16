import Vue from 'vue';
import publicConfig from './../publicConfig'

Vue.filter('serverImage',(url)=>{
	if(!url) return
	if(url.indexOf('http') == 0){
	    return url
	}else {
	    url = publicConfig.imageUrl + url + '?f=png'
	    return url
	}
})

Vue.filter('hideMobile',(mobile)=>{
	if(!mobile) return
	let reg = /^(\d{3})\d{4}(\d{4})$/;
	mobile = mobile.replace(reg, "$1****$2");
	return mobile
})

// 评级转换
Vue.filter('gradeFilter',(value) => {
  if (!value) return ''
  switch(value){
    case '1':
      return 'B';
      break;
    case '2':
      return 'BB';
      break;
    case '3':
      return 'BBB';
      break;
    case '4':
      return 'A';
      break;
    case '5':
      return 'AA';
      break;
    case '6':
      return 'AAA';
      break;
    default:
      return "";
  }
})
