<!-- 图片查看组件 -->
<template>
  <transition name="fade">
  	<div class="imageView-container" @click="complete" v-if="show">
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
		name:'imageView',
		props:['imgArr','initialSlide','show'],
		data(){
			return {
				swiperOption:{
					observer:true,
					observeParents:true,
					initialSlide:this.initialSlide,
				}
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
	.imageView-container{
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,1);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 998;
	}
	.imageView-container .swiper-container{
		width: 100%;
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
