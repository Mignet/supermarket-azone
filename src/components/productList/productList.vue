<!-- 晒单页 -->
<template>
	<div class="productList-container" @click="toDetail">
		<div class="top">
			<img :src="item.platformlistIco | serverImage">
			<i class="scale-1px" v-if="orgTag.length" v-for="orgTag in item.orgTagArr">{{orgTag}}</i>
		</div>
		<div class="center">最大综合年化可达&nbsp;<b>{{item.maxFeeRatio}}%</b></div>
		<div class="bottom">
			<ul>
				<li>
					<h2>{{item.manageAmount}}</h2>
					<p>理财收益(元)</p>
				</li>
				<li>
					<img src="./../../assets/add-icon.png">
				</li>
				<li>
					<h2>{{item.orgRedpacket}}</h2>
					<p>官方红包(元)</p>
				</li>
				<li>
					<img src="./../../assets/add-icon.png">
				</li>
				<li>
					<h2>{{item.returnCashAmount}}</h2>
					<p>猎财返现(元)</p>
				</li>
			</ul>
			<div class="border-bottom scale-bottom-1px"></div>
			<h3>综合年化收益率提升&nbsp;<b>{{item.orgProductRatio}}%→{{item.maxFeeRatio}}%</b><img src="./../../assets/up-icon.png"></h3>
		</div>
	</div>
</template>

<script>
	export default {
		name:"ProductList",
		props:{
			item:{
				type:Object,
				default:null
			},
		},
		created(){
			this.item = this._filter(this.item)
		},
		methods:{
			toDetail(){
				if(window._hmt){
				  _hmt.push(['_trackEvent', 'T_5_1_3', 'click']);
				}
				if(this.$publicConfig.isApp){
					let data = {
					    android:{
					        name:'WebActivityCommon',
					        paramsKey:'url,shareFlag',
					        params:this.$publicConfig.projectUrl + 'platformDetail?orgNumber='+this.item.orgNumber+',Boolean_true',
					    },
					    ios:{
					        name:'UniversalInteractWebViewController',
					        method:'initRequestUrl:requestMethod:',
					        params:this.$publicConfig.projectUrl + 'platformDetail?orgNumber='+this.item.orgNumber+'&isApp=liecai,Get'
					    }
					}
					this.$native.skipAppPage(data)
				}else{
					this.$router.push({ name: 'platformDetail', query: { orgNumber: this.item.orgNumber }})
				}
			},
			_filter(item){
				// 机构标签
				item.orgTagArr = item.orgTag.split(/,|，/)
				return this.item;
			}
		}
	}
</script>
<style scoped>
	.productList-container{
		padding:.3rem;
		border-bottom: 1px solid #eee;
		background-color: #fff;
	}
	.top{
		display:flex;
		align-items: center;
		padding-bottom: .16rem;
	}
	.top img{
		width: 1.42rem;
		padding-right: .2rem;
		box-sizing: content-box;
	}
	.top i{
		display: flex;
		align-items: center;
		font-size: .2rem;
		color: #4e8cef;
		padding:0 .1rem;
		margin-right: .16rem;
		height: .28rem;
		line-height: .28rem;
	}
	.top i:after{
		border-color: #4e8cef;
		border-radius: 8px;
	}
	.center{
		font-size: .26rem;
		color: #3b4257;
		font-weight: bold;
		display: flex;
		align-items: center;
		padding-bottom: .3rem;
	}
	.center b{
		font-size: .36rem;
		font-weight: bold;
	}
	.bottom{
		width: 100%;
		height: 1.8rem;
		background: url('./bg.png') no-repeat center;
		background-size: cover;
	}
	.bottom ul{
		width: 100%;
		display: flex;
		justify-content: center;
		height: 1.2rem;
		align-items: center;
	}
	.bottom li:nth-child(even){
		width: .8rem;
		text-align: center;
	}
	.bottom li:nth-child(even) img{
		width: .19rem;
	}
	.bottom li h2{
		text-align: center;
		font-size: .36rem;
		color: #4c6792;
		font-weight: bold;
	}
	.bottom li p{
		text-align: center;
		font-size: .24rem;
		color: #889bb9;
		padding-top: .1rem;
	}
	.border-bottom{
		width: 6.68rem;
		height: 0;
		margin: .03rem auto 0;
	}
	.border-bottom:after{
		border-bottom-style: dashed;
		border-bottom-color: #e7e9ee;
		border-bottom-width: 2px;
		width: 100%;
	}
	.productList-container h3{
		height: .6rem;
		text-align: center;
		line-height: .6rem;
		font-size: .24rem;
		color: #889bb9;
	}
	.productList-container h3 b{
		font-size: .26rem;
		color: #fd5f5f;
		font-weight: bold;
	}
	.productList-container h3 img{
		width: .16rem;
		box-sizing: content-box;
		padding-left: .1rem;
	}
</style>

