<!-- 我的返现页 -->
<template>
  <div class="myCashBack-container">
    <div class="list-container">
      <div v-for="orderList in orderLists" class="list-wrap">
        <h2>{{orderList.dateText}}</h2>
        <div v-for="(item,index) in orderList.datas" class="item-wrap" :key="index">
          <cashback-item :result="item" />
        </div>
      </div>
    </div>
    <div class="bottom-text" v-if="this.pageCount > 0"><i class="line"></i><p>{{bottomText}}</p><i class="line"></i></div>
    <empty v-if="isEmpty"/>
  </div>
</template>

<script>
  import cashbackItem from './../../components/cashbackItem/cashbackItem'
  import empty from './../../components/empty/empty.vue'
  export default {
    name:'myCashBack',
    data(){
      return {
        lists:[],
        isEmpty:false,
        pageCount:0,
        pageSize:10,
        pageIndex:1,
        bottomText:'加载中...',
        orderLists:[],
        time:""
      }
    },
    mounted(){
      this.getInitData()
      this.throttleLoad=comm.throttle(()=>{
        this.scrollEvent()
      },50)
      window.addEventListener('scroll',this.throttleLoad)
    },
    destroyed(){
      window.removeEventListener('scroll',this.throttleLoad)
    },
    methods:{
      getInitData(){
        this.pageIndex = 1;
        this.getData();
      },
      loadmoreData(){
        if(this.pageIndex >= this.pageCount) return
        this.pageIndex++;
        this.getData()
      },
      getData(){
        let http  = this.$axios;
        http.post('orginfoaUnrecordPageList',{
          pageIndex:this.pageIndex,
          pageSize:10,
          order:this.$route.query.order || ""
        }).then(response=>{
          this.lists = this.lists.concat(response.datas)
          this.orderLists = this._filter(this.lists)
          this.pageCount = response.pageCount
          if(response.totalCount <= 0){
            this.isEmpty = true;
          }
          if(this.pageIndex >= this.pageCount){
            this.bottomText = '没有更多了'
          }else{
            this.bottomText = '上拉加载更多'
          }
        })
      },
      scrollEvent(){
        var scrollTop = comm.scrollTop()
        var clientHeight = document.documentElement.clientHeight;
        var scrollHeight = document.documentElement.scrollHeight;
        if( scrollHeight-clientHeight - scrollTop <= 50){
          this.loadmoreData()
        }
      },
      _filter(result){
        let resArr = [];
        let resTime;
        result.forEach((item,index)=>{
          let itemObj = {};
          let date = item.updateTime
          let time = new Date(date.split(' ')[0]).getTime();
          let orderTime = new Date(date.replace(/-/g, "/"))
          var mm = orderTime.getMonth() + 1;
          var dd = orderTime.getDate();
          var yy = orderTime.getFullYear();
          itemObj.dateText = yy + "年" + mm + "月" + dd + '日';
          itemObj.time = time;
          itemObj.datas = []
          itemObj.datas.push(item);
          if(resTime){
            if(resTime === time){
              resArr[resArr.length - 1].datas = resArr[resArr.length - 1].datas.concat(itemObj.datas)
            }else{
              resTime = time;
              resArr.push(itemObj)
            }
          }else{
            resTime = time;
            resArr.push(itemObj)
          }
        })
        return resArr;
      }
    },
    components:{
      cashbackItem,
      empty
    }
  }
</script>
<style scoped>
  .myCashBack-container .list-container{
    background-color: #fff;
  }
  .myCashBack-container .list-container h2{
    height: .5rem;
    line-height: .5rem;
    font-size: .24rem;
    color: #9197a6;
    padding: 0 .3rem;
    background-color: #f0eff4;
  }
  .myCashBack-container .bottom-text{
    width: 100%;
    height: 1.1rem;
    background: #f0eff4;
    display:flex;
    justify-content: center;
    font-size: .24rem;
    line-height: 1;
    padding-top: .3rem;
    color: #999;
  }
  .myCashBack-container .bottom-text .line{
    width: 1.1rem;
    height: 0;
    border-bottom: 1px solid #dcdcdc;
    padding-top:.12rem;
  }
  .myCashBack-container .bottom-text p{
    padding: 0 .2rem;
  }
</style>
