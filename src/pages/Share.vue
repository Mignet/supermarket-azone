<!-- 晒单页 -->
<template>
	<div class="share-container">
		<header>
			<h2>{{totalAmt}}</h2>
			<p>累计获得返现金额(元) </p>
			<router-link @click.native="postDetailTongji" to="/postDetail">
        <span>我的返现</span><img src="./../assets/right-arrow-white.png">
      </router-link>
		</header>
		<section class="section-1">
			<div class="left">
				<img src="./../assets/gold-icon.png">
				<p>晒单一次，奖励金+0.2</p>
			</div>
			<router-link @click.native="myShareTongji" to="/myShare">我的晒单</router-link>
		</section>
		<section class="section-2">
			<loadmore
				api="sunburnPageList"
				:params='{type:0,pageSize:3}'
			>
				<share-item :item="slotProps.item" slot-scope="slotProps"></share-item>
			</loadmore>
		</section>
	</div>
</template>

<script>
	const loadmore = () => import("@/components/loadmore/loadmore.vue")
	const shareItem = () => import('./share/components/shareItem.vue')
	export default {
		name:"share",
		data(){
			return {
				totalAmt:'0.00'
			}
		},
		mounted(){
			let http = this.$axios;
			http.isShowLoading = false;
			http.post('orgAtotalAmt').then(res=>{
				this.totalAmt = res.totalAmt
			},error=>{
			})
		},
		methods:{
			myShareTongji(){
				if(window._hmt){
				  _hmt.push(['_trackEvent', 'T_5_1_1_1', 'click']);
				}
			},
			postDetailTongji(){
				if(window._hmt){
				  _hmt.push(['_trackEvent', 'T_5_1_1_2', 'click']);
				}
				comm.setCookie("__TONGJIREPORTDETAIL__",'fromShare',10000)
			}
		},
		components:{
			shareItem,
			loadmore
		}
	}
</script>
<style scoped>
	.share-container{
		background-color: #f0eff4;
		overflow: hidden;
	}
	.share-container header{
		background-color: #4e8cef;
		color: #fff;
	}
	.share-container header h2{
		text-align: center;
		padding-top: .36rem;
		font-size: .56rem;
		line-height: 1;
		font-family: DINOT;
	}
	.share-container header p{
		text-align:center;
		padding-top:.2rem;
		font-size: .24rem;
		opacity: .8;
	}
	.share-container header a{
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding-right: .3rem;
		padding-top:.3rem;
		padding-bottom: .24rem;
		color: #fff;
		font-size: .26rem;
		opacity: .6;
	}
	.share-container header img{
		height: .24rem;
		width: .15rem;
		padding-left: .24rem;
		box-sizing: content-box;
	}
	.share-container .section-1{
		background-color: #fff;
		height: 1rem;
		margin-bottom: .3rem;
		display: flex;
		justify-content:space-between;
		padding: 0 .3rem;
		align-items:center;
	}
	.share-container .section-1 .left{
		display:flex;
		align-items:center;
	}
	.share-container .section-1 .left img{
		width: .56rem;
		padding-right: .2rem;
		box-sizing:content-box;
	}
	.share-container .section-1 .left p{
		font-size: .32rem;
		color: #3b4257;
		font-weight: bold;
	}
	.share-container .section-1 a{
		color: #fff;
		font-size: .26rem;
		line-height:1;
		padding:.18rem;
		background-color: #4e8cef;
		border-radius: 3px;
	}
	.share-container .section-2{
		background-color: #fff;
	}
</style>

