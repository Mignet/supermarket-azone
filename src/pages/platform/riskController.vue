<!-- 风控简介页面 -->
<template>
	<div class="riskController-container">
		<img v-if="riskManagementImg" :src="riskManagementImg | serverImage">
		<to-continue v-else/>
	</div>
</template>
<script>
	import toContinue from './../../components/toContinue/toContinue.vue'
	export default {
		name:'riskController',
		data(){
			return {
				riskManagementImg:""
			}
		},
		mounted(){
			if(sessionStorage.getItem('__PLATFORMINFO__')){
				let data = JSON.parse(sessionStorage.getItem('__PLATFORMINFO__'))
				this.riskManagementImg = data.riskManagementImg
			}else{
			  	let orgNumber = this.$route.query.orgNumber
			  	let http = this.$axios;
			  	http.post('orginfoaDetail',{
					orgCode:orgNumber
				}).then(res => {
					this.riskManagementImg = res.riskManagementImg

				})
			}
		},
		components:{
			toContinue
		}
	}
</script>
<style scoped>
	.riskController-container img{
		display: block;
		width: 100%;
		margin: 0 auto;
	}
</style>