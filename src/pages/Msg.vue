<template>
	<div class="msg-container">
		<!-- 失活的组件将会被缓存！-->
		<keep-alive>
			<component v-bind:is="currentTabComponent"></component>
		</keep-alive>
	</div>
</template>
<script>
	const msgOne = () => import('@/pages/msgComponents/one')
	export default {
		name:'msg',
		data(){
			return {
				id:this.$route.params.id,
				currentTabComponent:""
			}
		},
		created(){
			switch(this.id){
				case '1' :
					comm.setTitle('超级返')
					this.currentTabComponent = msgOne;
				break;
			}
		},
		components:{
			msgOne
		}
	}
</script>