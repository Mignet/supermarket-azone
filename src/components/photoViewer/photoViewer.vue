<template>
  <transition name="fade">
  	<div class="photo-viewer-container" @click="complete" v-show="show">
  		<swiper :options="swiperOption">
  		  <swiper-slide v-for="(imgItem,index) in imgArr" :key="index">
  		  	<img :src="imgItem | serverImage">
  		  </swiper-slide>
  		</swiper>
  	</div>
  </transition>
</template>
<script>
	import 'swiper/dist/css/swiper.css'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	export default{
		name:'photoViewer',
		props:['imgArr','initialSlide','show'],
		data(){
			return {
				swiperOption:{
					observer:true,
					observeParents:true,
					initialSlide:this.initialSlide
				},
			}
		},
		methods:{
			complete(){
				this.$emit('complete')
			}
		},
		components:{
			swiper,
			swiperSlide
		}
	}
</script>
<style scoped>
	.photo-viewer-container{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,.6);
		display: flex;
		align-items: center;
		justify-content: center;
    z-index: 998;
	}
	.photo-viewer-container .swiper-container{
		width: 80%;
		margin: 0 auto;
	}
	.fade-enter-active {
	    transition: opacity .5s ease;
	}
	.fade-leave-active {
	    transition: opacity .5s ease;
	}
	.fade-enter, .fade-leave-to{
	    opacity: 0;
	}
</style>
