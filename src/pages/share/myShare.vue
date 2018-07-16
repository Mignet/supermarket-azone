<!-- 我的晒单页 -->
<template>
  <div class="myShare-container">
    <div class="section-1" v-if="postListsNumber > 0">
      <cashback-item v-for="(postList,index) in postLists" :key="index" :result="postList"/>
      <div v-if="postListsNumber >2" @click="viewMorePost" class="view-more"><p>查看更多&nbsp;</p><img src="./../../assets/arrow-right-icon.png"></div>
    </div>
    <section class="section-2" v-show="this.listsData.pageCount > 0">
      <loadmore
        api="sunburnPageList"
        :params='{type:1,pageSize:3}'
        @transferData="transferData"
      >
        <share-item :item="slotProps.item" slot-scope="slotProps" />
      </loadmore>
    </section>
    <empty v-if="this.listsData.pageCount <= 0 && postListsNumber <= 0"/>
  </div>
</template>
<script>
  const loadmore = () => import("@/components/loadmore/loadmore.vue")
  const shareItem = () => import('./components/shareItem.vue')
  const empty = () => import('../../components/empty/empty.vue')
  const cashbackItem = () => import('./../../components/cashbackItem/cashbackItem.vue')

  export default {
    name:'myShare',
    data(){
      return {
        listsData:{},
        // 报单列表
        postLists:{},
        // 报单总数
        postListsNumber:0
      }
    },
    mounted(){
      let http = this.$axios;
      http.post('orginfoaUnrecordPageList',{pageIndex:1,pageSize:2,order:1}).then(res => {
        this.postLists = res.datas
        this.postListsNumber = res.totalCount
      }).catch(err =>{})
    },
    methods:{
      transferData(data){
        this.listsData = data
      },
      // 查看更多报单
      viewMorePost(){
        this.$router.push({path:'/postDetail',query:{order:1}})
      }
    },
    components:{
      shareItem,
      loadmore,
      empty,
      cashbackItem
    },
  }
</script>
<style scoped>
  .myShare-container .section-1{
    background-color: #fff;
    margin-bottom: .3rem;
  }
  .myShare-container .view-more{
    width: 100%;
    height: .8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #9197a6;
  }
  .myShare-container .view-more img{
    width: .15rem;
  }
</style>
