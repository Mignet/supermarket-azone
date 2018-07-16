<template>
	<div class="platform-detail-item-container">
		<div class="section-one">
			<div class="left">
				<h2><i>起投期限</i><b>{{datas.minDeadLine}}天</b><img v-if="datas.recommend == 1" src="./../../../assets/recommand-icon.png"></h2>
				<h2><i>起投金额</i><b>{{datas.minInvestAmount}}元</b></h2>
			</div>
			<div class="right"  @click="toggleShow">
				<div class="leicaifanxian">
					<b>{{datas.returnCashAmount}}<i> 元</i></b><img src="./../../../assets/liecaifanxian-icon.png">
				</div>
				<div class="zonghenianhua">
					<p>综合年化</p>
					<b>{{datas.maxFeeRatio}}%</b>
					<img v-if="isShowDetail" src="./../../../assets/up.png">
					<img v-else src="./../../../assets/down.png">
				</div>
			</div>
		</div>
		<div v-show="isShowDetail" class="section-two">
			<div class="section-2-container">
				<div class="top"><p>预估总收益</p><b>{{(datas.manageAmount*1 + datas.orgRedpacket*1 + datas.returnCashAmount*1).toFixed(2)}}元</b></div>
				<ul>
					<li>
						<h2>{{datas.manageAmount}}</h2>
						<p>理财收益(元)</p>
					</li>
					<li>
						<img src="./../../../assets/add-icon.png">
					</li>
					<li>
						<h2>{{datas.orgRedpacket}}</h2>
						<p>官方红包(元)</p>
					</li>
					<li>
						<img src="./../../../assets/add-icon.png">
					</li>
					<li>
						<h2>{{datas.returnCashAmount}}</h2>
						<p>猎财返现(元)</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'platformDetailItem',
		props:['list','order'],
		data(){
			return {
				isShowDetail:this.order == '0'?true :false,
				datas:this.list,
			}
		},
		methods:{
			toggleShow(){
				this.isShowDetail = !this.isShowDetail
			}
		}
	}
</script>
<style scoped>
	.platform-detail-item-container{
		border-top: 1px solid #eee;
		padding: 0 .3rem;
	}
	.section-one{
		display: flex;
		justify-content: space-between;
		padding: .3rem 0;
	}
	.section-one .left h2{
		display: flex;
		align-items: center;
		line-height: 1;
	}
	.section-one .left h2:last-child{
		padding-top: .3rem;
	}
	.section-one .left h2 i{
		font-size: .24rem;
		color: #9197a6;
		padding-right: .2rem;
	}
	.section-one .left h2 b{
		font-size: .28rem;
		font-weight: bold;
		color: #3b4257;
		padding-right: .1rem;
	}
	.section-one .left h2 img{
		width: .58rem;
	}
	.leicaifanxian{
		display: flex;
		align-items:center;
	}
	.leicaifanxian b{
		font-size: .36rem;
		color: #fd5d5d;
		line-height: 1;
		font-family: DINOT;
		padding-right: .14rem;
	}
	.leicaifanxian i{
		font-size: .24rem;
	}
	.leicaifanxian img{
		width: .78rem
	}
	.zonghenianhua{
		display: flex;
		align-items: center;
		padding-top: .24rem;
		line-height: 1;
	}
	.zonghenianhua img{
		width: .2rem;
	}
	.zonghenianhua p{
		font-size: .24rem;
		color: #9197a6;
		padding-right: .2rem;
	}
	.zonghenianhua b{
		font-size: .28rem;
		color: #fd5d5d;
		font-family: DINOT;
		padding-right: .1rem;
	}
	.section-two{
		padding-bottom: .3rem;
	}
	.section-2-container{
		width: 100%;
		height: 1.8rem;
		background: url('./../../../assets/item-bg.png') no-repeat center;
		background-size:cover;
	}
	.section-2-container .top{
		padding-left: .5rem;
		display: flex;
		height: .6rem;
		align-items: center;
	}
	.section-2-container .top p{
		font-size: .24rem;
		color: #889bb9;
		padding-right: .2rem;
	}
	.section-2-container .top b{
		font-family: DINOT;
		font-size: .32rem;
		color: #fd5f5f;
	}
	.section-2-container ul{
		display: flex;
		align-items: center;
		padding-left: .5rem;
		padding-top: .25rem;
	}
	.section-2-container ul li:nth-child(even){
		width: .8rem;
	}
	.section-2-container ul li:nth-child(even) img{
		width: .2rem;
		display: block;
		margin: 0 auto; 
	}
	.section-2-container ul li h2{
		font-size: .36rem;
		color: #4c6792;
		font-weight: bold;
		text-align: center;
		line-height: 1;
	}
	.section-2-container ul li p{
		font-size: .24rem;
		color: #889bb9;
		padding-top: .1rem;
		text-align: center;
	}
</style>