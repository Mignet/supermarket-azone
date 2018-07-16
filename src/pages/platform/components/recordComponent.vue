<!--档案组件-->
<template>
  <div class="recordComponent-container">
    <section class="section-1">
      <h2>基本信息</h2>
      <p v-if="result.capital">注册资本：{{result.capital}}万元</p>
      <p v-if="result.upTime">上线时间：{{result.upTime | selectDay}}</p>
      <p v-if="result.city">所在城市：{{result.city}}</p>
      <p v-if="result.grade">安全评级：{{result.grade | gradeFilter}}</p>
      <p v-if="result.icpFiling">ICP备案：{{result.icpFiling}}</p>
      <p v-if="result.contact">客服电话：<a :href="concatTel">{{result.contact}}</a></p>
      <ul>
        <li v-for="(item,index) in result.orgPapersList" :key="index"  @click="showImageView(index)">
          <img :src="item.orgPicture | serverImage">
        </li>
      </ul>
    </section>
    <section class="section-2" v-if="result.teamInfos.length">
      <h2>高管团队</h2>
      <ul>
        <li v-for="(teamInfo,index) in result.teamInfos" :key='index'>
          <div class="l">
            <img :src="teamInfo.orgHeadImg | serverImage">
          </div>
          <div class="r">
            <h3>{{teamInfo.orgMemberName}}&nbsp;{{teamInfo.orgMemberGrade}}</h3>
            <h3>{{teamInfo.orgDescribe}}</h3>
          </div>
        </li>
      </ul>
    </section>
    <section class="section-3" v-if="result.orgEnvironmentList.length">
      <h2>现场实拍</h2>
      <ul>
        <li v-for="(orgEnvironmentItem,index) in result.orgEnvironmentList" :key="index" @click="showEnvironmentImageView(index)">
          <img :src="orgEnvironmentItem.orgPicture | serverImage">
        </li>
      </ul>
    </section>
    <div v-if="isShowImageView">
      <image-view 
        :imgArr='imgArr'
        :initialSlide="imageIndex"
        :show='isShowImageView'
        @complete="hideImageView"
      />
    </div>
  </div>
</template>

<script>
  const imageView = () => import('@/components/imageView/imageView.vue')
    export default {
      name: "recordComponent",
      props:['result'],
      data(){
        return {
          imgArr:[],
          imageIndex:0,
          isShowImageView:false,
        }
      },
      computed:{
        // 客服电话
        concatTel(){
          if(this.result.contact){            
            return "tel:" + this.result.contact
          }else{
            return "";
          }
        }
      },
      filters:{
        // 选择天数
        selectDay: function (date) {
          return date.split(' ')[0]
        },
      },
      methods:{
        // 隐藏
        hideImageView(){
          this.isShowImageView = false;
        },
        showImageView(index){
          let imgArr = [];
          this.result.orgPapersList.forEach(item =>{
            imgArr.push(item.orgPicture)
          })
          this.imgArr = imgArr
          this.imageIndex = index
          this.isShowImageView = true;
        },
        showEnvironmentImageView(index){
          let imgArr = [];
          this.result.orgEnvironmentList.forEach(item =>{
            imgArr.push(item.orgPicture)
          })
          this.imgArr = imgArr
          this.imageIndex = index
          this.isShowImageView = true;
        }
      },
      components:{
        imageView
      }
    }
</script>

<style scoped>
  .recordComponent-container{
    padding: 0 .3rem .6rem;
    background-color: #f4f5f7;
    height: 100%;
  }
  .recordComponent-container section{
    padding-top: .5rem;
  }
  .recordComponent-container h2{
    font-size: 16px;
    color: #3b4257;
  }
  .recordComponent-container .section-1 p{
    padding-top: .2rem;
    font-size: 15px;
    color: #5f6678;
  }
  .recordComponent-container .section-1 p a{
    color: #4e8cef;
  }
  .recordComponent-container .section-1 ul{
    display: flex;
    flex-wrap: wrap;
    padding-top: .36rem;
  }
  .recordComponent-container .section-1 ul li{
    width: 2.23333rem;
    height: 1.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border:1px solid #dee1e5;
    margin-right: .1rem;
    margin-bottom: .1rem;
    overflow: hidden;
  }
  .recordComponent-container .section-1 ul li img{
    width: 95%;
  }
  .recordComponent-container .section-1 ul li:nth-child(3n){
    margin-right: 0;
  }
  .recordComponent-container .section-2 li{
    padding-top: .3rem;
    display: flex;
  }
  .recordComponent-container .section-2 li .l{
    width: 1.4rem;
    padding-right: .2rem;
  }
  .recordComponent-container .section-2 li .l img{
    width: 100%;
  }
  .recordComponent-container .section-2 li .r{
    flex: 1;
    padding-top: .2rem;
  }
  .recordComponent-container .section-2 li .r h3{
    font-size: 15px;
    color: #5f6678;
    line-height: 1.5;
    text-align: justify;
    padding-bottom: .1rem;
  }
  .recordComponent-container .section-3 ul{
    padding-top: .3rem;
    display: flex;
    width: 7.1rem;
  }
  .recordComponent-container .section-3 li{
    flex: 1;
    margin-right: .2rem;
  }
</style>
