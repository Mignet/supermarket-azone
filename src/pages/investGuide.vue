<!-- 如何完成投资页面 -->
<template>
	<div class="investGuide-container">
		<swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
		  <swiper-slide>
		  	<div class="content">
		  		<div class="top">
		  			<h2><span>1</span><span>/5</span></h2>
		  			<p>在超级返，选择投资平台;</p>
		  		</div>
		  		<div class="img-wrap">
		  			<img src="./../assets/investGuide-1.jpg">
		  		</div>
		  	</div>
		  </swiper-slide>
		  <swiper-slide>
		  	<div class="content">
		  		<div class="top">
		  			<h2><span>2</span><span>/5</span></h2>
		  			<p>点击“去注册购买”，跳转至注册页面;</p>
		  		</div>
		  		<div class="img-wrap">
		  			<img src="./../assets/investGuide-2.jpg">
		  		</div>
		  	</div>
		  </swiper-slide>
		  <swiper-slide>
		  	<div class="content">
		  		<div class="top">
		  			<h2><span>3</span><span>/5</span></h2>
		  			<p>使用猎财大师注册手机号完成注册;</p>
		  		</div>
		  		<div class="img-wrap">
		  			<img src="./../assets/investGuide-3.jpg">
		  		</div>
		  	</div>
		  </swiper-slide>
		  <swiper-slide>
		  	<div class="content">
			  	<div class="top">
			  		<h2><span>4</span><span>/5</span></h2>
			  		<p>完成注册，继续投资或下载APP投资;<span>满足相应的起投金额、起投期限，才能获得猎财返现。</span></p>
			  	</div>
			  	<div class="img-wrap">
			  		<img src="./../assets/investGuide-4.jpg">
			  	</div>	
		  	</div>
		  </swiper-slide>
		  <swiper-slide>
		  	<div class="content">
		  		<div class="top">
		  			<h2><span>5</span><span>/5</span></h2>
		  			<p>点击“我的返现”，查看返现详情。</span></p>
		  		</div>
		  		<div class="img-wrap"><img src="./../assets/investGuide-5.jpg"></div>
		  	</div>
		  </swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
	</div>
</template>
<script>
	import 'swiper/dist/css/swiper.css'
	
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	  export default {
	    name: 'investGuide',
	    data() {
	      return {
	        notNextTick: true,
	        swiperOption: {
	          direction: 'horizontal',
	          grabCursor: true,
	          setWrapperSize: true,
	          autoHeight: true,
	          pagination:{el:'.swiper-pagination'} ,
	          paginationClickable: true,
	          observeParents: true,
	          spaceBetween:16,
	          centeredSlides:true,
	          slidesPerView:'auto',
	          on:{
	          	touchStart(){
	          		if(this.activeIndex === 0){
	          		    this.allowSlidePrev = false;
	          		}else{
	          		    this.allowSlidePrev = true
	          		}

	          		if(this.isEnd){
	          		    this.allowSlideNext = false;
	          		}else{
	          		    this.allowSlideNext = true;
	          		}
	          	}
	          }
	        }
	      }
	    },
	    computed: {
	      swiper() {
	        return this.$refs.mySwiper.swiper
	      }
	    },
	    mounted(){

	    },
	    components:{
	    	swiper,
	    	swiperSlide
	    }
	  }
</script>
<style scoped>
	.investGuide-container{
		width: 100%;
		height: 100%;
		padding-top: .44rem;
	}
	.investGuide-container .swiper-container{
		width: 100%;
		overflow: hidden;
	}
	.investGuide-container .swiper-container .swiper-wrapper{
		padding-bottom: .6rem;
	}
	.investGuide-container .swiper-container .swiper-slide{
		 padding-bottom: .6rem; 
		width: 6.06rem;
		height: 11.13rem;
	}
	.investGuide-container .swiper-container .swiper-slide .content{
		background-color: #fff;
		height: 10.4rem;
		border-radius: 10px;
	}
	.investGuide-container .swiper-slide .top{
		padding-top: .4rem;
		padding-left: .4rem;
		padding-right: .4rem;
	}
	.investGuide-container .swiper-slide .top h2{
		font-size: .4rem;
		color: #3b4257;
		padding-bottom: .2rem;
		line-height: 1.4;
	}
	.investGuide-container .swiper-slide .top h2 span:last-child{
		color: #9197a6;
	}
	.investGuide-container .swiper-slide .top p{
		font-size: .3rem;
		color: #3b4257;
		height: 1.2rem;
		text-align: justify;
		line-height: 1.4;
	}
	.investGuide-container .swiper-slide .top p span{
		display: block;
		font-size: .26rem;
		color: #9197a6;
	}
	.investGuide-container .img-wrap img{
		width: 4.24rem;
		display: block;
		margin: 0 auto;
	}
</style>