<template>
	<div class="buy-tips-container">
		<div class="mask" @click.stop="hideTipsEvent"></div>
		<div class="content">
			<button class="close-btn" @click.stop="hideTipsEvent"><img src="./../../../assets/close-btn.png"></button>
			<h2>购买须知</h2>
			<p>{{isOneKeyRegister ? '将' : '请'}}用此手机号码注册购买<br />{{mobile | hideMobile}}</p>
			<button @click.stop='buyProduct'>{{isOneKeyRegister ? '绑定购买' : '去注册购买'}}</button>
			<h3>* 你的手机号码将与该平台绑定。</h3>
			<h3>* 平台首次投资才能获得返现。</h3>
			<h3>* 分散投资、选择恰当周期的标的可有效降低风险。</h3>
		</div>
		<form method="post" accept-charset="utf-8" style="display: none" ref="buyform">
		    <input id="orgAccount" type='hidden' name="orgAccount" v-model="formData.orgAccount"/>
		    <input id="orgKey" type='hidden' name="orgKey" v-model="formData.orgKey"/>
		    <input id="orgNumber" type='hidden' name="orgNumber" v-model="formData.orgNumber"/>
		    <input id="sign" type='hidden' name="sign" v-model="formData.sign"/>
		    <input id="timestamp" type='hidden' name="timestamp" v-model="formData.timestamp"/>
		    <input id="requestFrom" type='hidden' name="requestFrom" v-model="formData.requestFrom"/>
		</form>
	</div>
</template>
<script>
	import Vue from 'vue';
	export default {
		name:'buyTips',
		props:['hideTips','platformInfo'],
		data(){
			return {
				mobile:"",
				// 是否一键注册 默认false
				isOneKeyRegister:false,
				formData:{}
			}
		},
		mounted(){
			if(this.platformInfo){
				this.isOneKeyRegister = this.platformInfo.orgRegisterStatus == 1 ? true : false;
			}
			if(!this.$userInfo.mobile && this.$userInfo.token){
				var http = this.$axios;
				http.isShowLoading = false;
				http.post('getUserInfo').then(res=>{
					this.mobile = res.mobile;
					this.$userInfo = Object.assign(this.$userInfo,res)
				})
			}else{
				this.mobile = this.$userInfo.mobile
			}
		},
		methods:{
			hideTipsEvent(){
				this.$emit('hideTips')
			},
			buyProduct(){
				if(window._hmt){
				  _hmt.push(['_trackEvent', 'T_5_1_3_1', 'click']);
				}
				if(this.$publicConfig.isApp){
					this.$native.action('removeLocalSharedBtn');
				}
				if(this.isOneKeyRegister){
					this.isBindThirdPlatfrom()
				}else{
					window.location.href = this.platformInfo.orgUrl
				}
			},
			// 是否绑定第三方平台
			isBindThirdPlatfrom(){
				var http = this.$axios;
				http.isShowLoading = false;
				http.post('isBindOrgAcct',{platFromNumber:this.platformInfo.orgNumber}).then(res=>{
					if(res.isBind){ // 绑定第三方机构账号
						this.queryThirdBuyParams()
					}else{ // 未绑定第三方机构账号
						this.isThirdOldAccount()
					}
				})
			},
			// 获取跳转参数
			queryThirdBuyParams(){
				var http = this.$axios;
				http.isShowLoading = false;
				http.post('getOrgJumpUrl',{orgNo:this.platformInfo.orgNumber}).then(res=>{
        			this.formData = res;
        			this.$refs.buyform.setAttribute('action',this.platformInfo.orgUrl)
        			setTimeout(()=>{
						this.$refs.buyform.submit();
						this.hideTipsEvent()
						Vue.popup.tipsContinue('正在跳转至' + this.platformInfo.name);
        			},20)
				})
			},
			// 注册第三方账户
			registerThirdAccount(){
				let http = this.$axios;
				http.isShowLoading = false;
				http.post('bindOrgAcct',{platFromNumber:this.platformInfo.orgNumber}).then(res=>{
					this.queryThirdBuyParams()
				}).catch(()=>{
				})
			},
			// 是不是第三方机构的老账户
			isThirdOldAccount(){
				let http = this.$axios;
				http.isShowLoading = false;
				http.post('isExistInPlatform',{platFromNumber:this.platformInfo.orgNumber}).then(res=>{
					if(res.isExist){ // 是第三方机构的老账户
          				this.bindThirdPlatfromTips()
					}else{ // 不是第三方机构的老账户
						this.registerThirdAccount()
					}
				}).catch(()=>{
				})
			},
			// 已经是第三方老用户提示
			bindThirdPlatfromTips(){
			  var self = this;
			  Vue.popup.confirm({
			    title:"您已有"+self.platformInfo.name+"帐号",
			    msg:"通过猎财大师投资不能享受佣金、津贴、红包等奖励，建议您购买其他平台产品",
			    okText:'好的'
			  })
			},
		}
	}
</script>
<style scoped>
	.buy-tips-container{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
	}
	.mask{
		position:absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.6);
	}
	.content{
		position:absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		width: 6.3rem;
		height: 4.66rem;
		background-color: #fff;
		border-radius: 5px;
		overflow: hidden;
	}
	.buy-tips-container .close-btn{
		position: absolute;
		right: 0;
		top: 0;
		width: .8rem;
		height: .6rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fff;
	}
	.buy-tips-container .close-btn img{
		width: .22rem;
	}
	.content h2{
		text-align: center;
		font-size: .36rem;
		color: #313131;
		padding-top: .5rem;
	}
	.content p{
		font-size: .32rem;
		color: #5f6678;
		text-align:center;
		padding-top: .3rem;
		line-height: 1.5;
	}
	.content button{
		display: block;
		margin: .4rem auto .2rem;
		width: 4.24rem;
		height: .84rem;
		background-color: #4e8cef;
		border-radius: .42rem;
		color: #fff;
		font-size: .32rem;
		line-height: .84rem;
		text-align: center;
	}
	.content h3{
		padding-left: .5rem;
		font-size: .22rem;
		color: #9197a6;
		line-height:1.4;
	}
</style>
