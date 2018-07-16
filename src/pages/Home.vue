<template>
	<div class="home-container">
		<a class="banner-wrap" @click.stop="goMsgOne">
			<img src="./../assets/banner.jpg" alt="banner">
		</a>
		<div class="button-wrapper">
			<a @click="goShare"><img src="./../assets/share-icon.png">&nbsp;晒单</a>
			<a @click="goMyCashBack"><img src="./../assets/fanxian-icon.png">&nbsp;我的返现</a>
		</div>
		<div @click.stop="goInvestGuide" class="banner-desc-wrap">
			<img src="./../assets/banner-desc.png">
		</div>
		<loadmore api="orginfoaPageList" isShowLoading="0">
			<product-list :item="slotProps.item" slot-scope="slotProps"></product-list>
		</loadmore>
	</div>
</template>

<script>
	import loadmore from '@/components/loadmore/loadmore'
	import ProductList from '@/components/productList/productList'

	export default {
		name:'home',
		methods:{
			goMsgOne(){
				if(this.$publicConfig.isApp){
					let data = {
					    android:{
					        name:'WebActivityCommon',
					        paramsKey:'url,shareFlag',
					        params:this.$publicConfig.projectUrl + 'msg/1,Boolean_true',
					    },
					    ios:{
					        name:'UniversalInteractWebViewController',
					        method:'initRequestUrl:requestMethod:',
					        params:this.$publicConfig.projectUrl + 'msg/1?isApp=liecai,Get'
					    }
					}
					this.$native.skipAppPage(data)
				}else{
					this.$router.push({path:'/msg/1'})
				}
			},
			// 如何完成投资
			goInvestGuide(){
				if(this.$publicConfig.isApp){
					let data = {
					    android:{
					        name:'WebActivityCommon',
					        paramsKey:'url,shareFlag',
					        params:this.$publicConfig.projectUrl + 'investGuide,Boolean_true',
					    },
					    ios:{
					        name:'UniversalInteractWebViewController',
					        method:'initRequestUrl:requestMethod:',
					        params:this.$publicConfig.projectUrl + 'investGuide?isApp=liecai,Get'
					    }
					}
					this.$native.skipAppPage(data)
				}else{
					this.$router.push({path:'/investGuide'})
				}
			},
			goShare(){
				if(window._hmt){
				  _hmt.push(['_trackEvent', 'T_5_1_1', 'click']);
				}
				if(this.$publicConfig.isApp){
					let data = {
					    android:{
					        name:'WebActivityCommon',
					        paramsKey:'url,shareFlag',
					        params:this.$publicConfig.projectUrl + 'share,Boolean_true',
					    },
					    ios:{
					        name:'UniversalInteractWebViewController',
					        method:'initRequestUrl:requestMethod:',
					        params:this.$publicConfig.projectUrl + 'share?isApp=liecai,Get'
					    }
					}
					if(this.$userInfo.token){
						this.$native.skipAppPage(data)
					}else{
						this.$native.action('tokenExpired')
					}
				}else{
					this.$router.push('/share')
				}
			},
      goMyCashBack(){
				if(window._hmt){
				  _hmt.push(['_trackEvent', 'T_5_1_2', 'click']);
				}
				if(this.$publicConfig.isApp){
					let data = {
					    android:{
					        name:'WebActivityCommon',
					        paramsKey:'url,shareFlag',
					        params:this.$publicConfig.projectUrl + 'postDetail,Boolean_true',
					    },
					    ios:{
					        name:'UniversalInteractWebViewController',
					        method:'initRequestUrl:requestMethod:',
					        params:this.$publicConfig.projectUrl + 'postDetail?isApp=liecai,Get'
					    }
					}
					if(this.$userInfo.token){
						this.$native.skipAppPage(data)
					}else{
						this.$native.action('tokenExpired')
					}
				}else{
					this.$router.push('/postDetail')
				}
			}
		},
		components:{
			productList: ProductList,
			loadmore
		}
	}
</script>

<style scoped>
	.home-container .button-wrapper{
		width: 100%;
		height: 1.08rem;
		margin-top: -.3rem;
		padding-bottom: .18rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #fff;
	}
	.button-wrapper a{
		width: 3.53rem;
		height: 1.08rem;
		border-radius: 4px;
		display:flex;
		align-items:center;
		justify-content: center;
		background: url('./../assets/btn.png') no-repeat center;
		background-size: cover;
		font-size: .32rem;
		color: #3b4257;
		font-weight: bold;
	}
	.button-wrapper a img{
		width: .46rem;
	}
	.banner-desc-wrap{
		padding-top: .22rem;
		background-color: #fff;
		padding-bottom: .3rem;
	}
	.banner-desc-wrap img{
		display: block;
		width: 6.9rem;
		margin:0 auto;
	}
</style>
