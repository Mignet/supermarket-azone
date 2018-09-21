let environment = 'development';

if(process.env.NODE_ENV === 'production'){
	environment = 'production';
}

const httpsProtocol = 'http://'

// 后台服务地址
const serverHost  = {
    development  : '10.16.0.128:8888/',
    production : 'market.bethye.top/'
};

// 图片服务器地址
const imgHost =  {
	development :'image.bethye.top/',
	production  :'image.bethye.top/'
};

const projectHost = {
	development :'10.16.0.128:12003/',
	production  :'declare.bethye.top/'
}

// 后台服务链接前缀 https://premarket.bethye.top/
const httpsServerUrl = httpsProtocol + serverHost[environment]

// 图片服务器前缀 https://image.bethye.top/
const imageUrl = httpsProtocol + imgHost[environment]

// 项目名前缀 https://declare.bethye.top/
const projectUrl = httpsProtocol + projectHost[environment]

export default {
	environment,
	httpsServerUrl,
	imageUrl,
	projectUrl
}
