let environment = 'development';

if(process.env.NODE_ENV === 'production'){
	environment = 'production';
}

const httpsProtocol = 'http://'

// 后台服务地址
const serverHost  = {
    development  : '10.16.0.128:8888/',
    production : 'market.v5ent.com/'
};

// 图片服务器地址
const imgHost =  {
	development :'image.v5ent.com/',
	production  :'image.v5ent.com/'
};

const projectHost = {
	development :'10.16.0.128:12003/',
	production  :'declare.v5ent.com/'
}

// 后台服务链接前缀 https://premarket.v5ent.com/
const httpsServerUrl = httpsProtocol + serverHost[environment]

// 图片服务器前缀 https://image.v5ent.com/
const imageUrl = httpsProtocol + imgHost[environment]

// 项目名前缀 https://declare.v5ent.com/
const projectUrl = httpsProtocol + projectHost[environment]

export default {
	environment,
	httpsServerUrl,
	imageUrl,
	projectUrl
}
