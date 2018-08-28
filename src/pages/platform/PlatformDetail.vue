<template>
	<div class="platform-container">
		<header>
			<div class="top">
				<div class="top-left scale-1px">
					<img :src="platformInfo.platformIco | serverImage">
				</div>
				<div class="top-right">
					<h2><b>{{platformInfo.name}}</b><i v-if="platformInfo.orgTag" v-for = 'orgTagItem in platformInfo.orgTagArr'>{{orgTagItem}}</i></h2>
					<h3><p>历史年化收益率：</p><i>{{platformInfo.minProfit}}%～{{platformInfo.maxProfit}}%</i></h3>
					<h3 v-if="platformInfo.grade"><p>安全等级：</p><i>{{platformInfo.grade | gradeFilter}}</i></h3>
				</div>
			</div>
			<div class="bottom">{{platformInfo.orgAdvantage}}</div>
		</header>

		<div class="intro-wrap">
			<button @click="goPlatformSummary"><img src="./../../assets/platform-intro-icon.png"> 平台介绍</button>
			<div class="line"></div>
			<button @click="goRiskController"><img src="./../../assets/fengkongjianbao-icon.png"> 风控简报</button>
		</div>

		<div class="banner-wrapper"><img src="./../../assets/platform-banner.jpg"></div>

		<div class="lists-wrapper">
			<h2><i></i><p><span>投资返现</span><img src="./../../assets/dot-icon.svg"><span>首投</span></p></h2>
			<platform-item :list='list'  v-for="(list,index) in lists" :key="index" :order="index"/>
		</div>
		<div class="rule-wrapper" v-if="platformInfo.rewardRule">
			<h2><i></i><p>返现规则</p></h2>
			<div class="rule-content" v-html="platformInfo.rewardRule"></div>
		</div>
		<warn-component />
		<div style="height:1rem;"></div>
		<div class="buy-wrapper" @click="showTips">{{isOneKeyRegister ? '立即购买' : '注册购买'}}</div>
		<buy-tips v-if="show" @hideTips='hideTips' :link='platformInfo.orgUrl' :platformInfo="platformInfo"/>
	</div>
</template>

<script>
	import platformItem from './components/platformItem.vue'
	import warnComponent from './../../components/warn/warn.vue'
	import buyTips from './components/buyTips.vue'

	export default {
		name:"platformDetail",
		data(){
			return {
				lists:[],
				show:false,
				platformInfo:"",
				// 是否一键注册 默认false
				isOneKeyRegister:false
			}
		},
		mounted(){
			var http  = this.$axios;
			http.post('orginfoaDetail',{
				orgCode:this.$route.query.orgNumber
			}).then(response=>{
				this.platformInfo = this._filter(response)
				comm.setTitle(this.platformInfo.name || '平台详情')
				this.lists = this.platformInfo.cimOrgInvestStrategyAExtendsList
				this.isOneKeyRegister = this.platformInfo.orgRegisterStatus == 1 ? true : false

				if(this.$publicConfig.isApp){
					if(comm.isIOS()){
						this.$native.action('refreshPage');
					}
					setTimeout(()=>{
						this.$native.action('removeLocalSharedBtn');
						setTimeout(()=>{
							var appShareData = {
							    shareTitle: '推荐貅比特严选理财平台-'+this.platformInfo.name+'，最大综合年化'+this.lists[0].maxFeeRatio+'%。', // 分享标题
							    shareDesc: '投资'+this.platformInfo.name+'理财产品，享受额外返现。多个投资返现策略选择，赶紧来投资吧!',
							    shareLink: this.$publicConfig.projectUrl+'platformDetail?orgNumber=' + this.platformInfo.orgNumber,
							    shareImgurl: 'dfa3e35be331f6ec67566130f67820b9', // 分享图标
							    rightItemName:'分享'
							}
							this.$native.action('aPrefectureShareFunction',appShareData)
						},200)
					},200)
				}
			},error=>{
			})
		},
		methods:{
			showTips(){
				if(window._hmt){
				  _hmt.push(['_trackEvent', 'T_5_1_3_1_1', 'click']);
				}
				if(this.$publicConfig.isApp){
					if(!this.$userInfo.token){
						this.$native.action('tokenExpired')
					}else{
						this.show = true;
					}
				}else{
					// this.show = true;
					window.location.href = 'https://liecai.bethye.top/pages/download/download.html';
				}
			},
			hideTips(){
				this.show = false;
			},
			_filter(response){
				// 机构标签
				response.orgTagArr = response.orgTag.split(/,|，/)
				return response;
			},
			// 跳转到平台简介页面
			goPlatformSummary(){
				sessionStorage.setItem('__PLATFORMINFO__',JSON.stringify(this.platformInfo));
				this.$router.push({path:'/platform/platformSummary',query:{orgNumber:this.platformInfo.orgNumber}})
			},
			goRiskController(){
				sessionStorage.setItem('__PLATFORMINFO__',JSON.stringify(this.platformInfo));
				this.$router.push({path:'/platform/riskController',query:{orgNumber:this.platformInfo.orgNumber}})
			}
		},
		components:{
			platformItem,
			warnComponent,
			buyTips
		}
	}
</script>
<style scoped>
.platform-container{
	background-color: #f0eff4;
}
.platform-container .intro-wrap{
	display: flex;
	width: 100%;
	height: .8rem;
	background-color: #fff;
	margin-top: .3rem;
	margin-bottom: .3rem;
	align-items: center;
}
.platform-container .intro-wrap button{
	flex:1;
	background-color: #fff;
	height: 100%;
	font-size:14px;
	color: #4f5960;
}
.platform-container .intro-wrap button img{
	width: .42rem;
}
.platform-container .intro-wrap .line{
	width: 1px;
	height: .5rem;
	background-color: #e1e3e4;
	transform: scaleX(.5);
}
header{
	width: 100%;
	height: 3.55rem;
	background: url('./../../assets/header-bg.png') no-repeat center;
	background-size: cover;
	box-sizing: border-box;
	padding:.8rem .3rem 0;
}
header .top{
	display:flex;
	align-items:flex-start;
}
header .top-left{
	width: 1.4rem;
	height: 1.4rem;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: .3rem;
}
header .top-left:after{
	border-radius: 10px;
	border-color: #999;
}
header .top img{
	width: 100%;
}
header .top h2{
	display: flex;
	align-items: center;
	flex-wrap: wrap;
}
header .top h2 b{
	font-size: .32rem;
	color: #4f5960;
	line-height: 1;
	padding-right: .3rem;
}
header .top h2 i{
	font-size: .2rem;
	line-height: 1;
	color: #4e8cef;
	padding: .06rem .1rem;
	box-sizing: border-box;
	background-color: #e0ecff;
	border:1px solid #4e8cef;
	border-radius: 5px;
	margin-right: .2rem;
}
header .top h3{
	padding-top: .24rem;
	display: flex;
	align-items: center;
}
header .top h3 p{
	font-size: .3rem;
	color: #999;
	line-height:1;
}
header .top h3 i{
	font-family: DINOT;
	font-size: .3rem;
	line-height:1;
	color: #4f5960;
}
header .bottom{
	padding-top: .5rem;
	font-size: .26rem;
	color: #4f5960;
}
.banner-wrapper{
	background-color: #fff;
	width: 100%;
	overflow: hidden;
	margin-bottom: .3rem;
}
.banner-wrapper a{
	display:block;
}
.banner-wrapper img{
	width: 100%;
}
.lists-wrapper{
	margin-top: .3rem;
	background-color: #fff;
}
.lists-wrapper h2{
	width: 100%;
	height: .8rem;
	display: flex;
	padding: 0 .3rem;
	align-items: center;
}
.lists-wrapper i{
	width: .08rem;
	height: .3rem;
	background-color: #4e8cef;
	margin-right: .2rem;
}
.platform-container .lists-wrapper p{
	font-size: .32rem;
	color: #3b4257;
	display: flex;
	flex: 1;
	align-items: center;
}
.platform-container .lists-wrapper p span{
}
.platform-container .lists-wrapper p img{
	width: .32rem;
}
.buy-wrapper{
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	height: 1rem;
	line-height: 1rem;
	color: #fff;
	background-color: #4e8cef;
	text-align: center;
	font-size: .32rem;
	z-index: 800;
}
.rule-wrapper{
	margin-top: .3rem;
	background-color: #fff;
}
.rule-wrapper h2{
	width: 100%;
	height: .8rem;
	display: flex;
	padding: 0 .3rem;
	align-items: center;
}
.rule-wrapper i{
	width: .08rem;
	height: .3rem;
	background-color: #4e8cef;
	margin-right: .2rem;
}
.rule-wrapper p{
	font-size: .32rem;
	color: #3b4257;
}
.rule-content{
	border-top: 1px solid #f0eff4;
	padding:.3rem;
}
</style>

