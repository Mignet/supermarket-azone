<template>
  <div class="cashbackItem-container scale-bottom-1px">
    <div class="t">
      <div class="l" @click.stop="goPostDetailInfo">
        <div class="lt">
          <img class="platform-logo" :src="itemResult.platfromIco | serverImage">
          <span class="circle"></span>
          <p>{{itemResult.productDeadLine}}</p>
        </div>
        <ul class="lb">
          <li>
            <h2>{{itemResult.investAmt || '0.00'}}</h2>
            <p>投资金额(元)</p>
          </li>
          <li>
            <h2>{{itemResult.feeAmt || '0.00'}}</h2>
            <p>返现金额(元)</p>
          </li>
        </ul>
      </div>
      <div class="r">
        <div class="rt">
          <div @click.stop='goShare' v-if="isShare">晒单</div>
        </div>
        <div class="rb" v-if="itemResult.payStatus">{{ itemResult.payStatus | payStatusText }}</div>
        <div class="rb" v-else>{{ itemResult.status | statusText }}</div>
      </div>
    </div>
    <div class="b">
      投资时间: {{itemResult.investTime}}
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  export default {
    name:'cashbackItem',
    props:['result'],
    data(){
      return {
        itemResult:this.result
      }
    },
    computed:{
      isShare(){
        return this.itemResult.shareStatus === '0' && this.itemResult.payStatus === '2' ? true : false
      }
    },
    filters: {
      payStatusText:function(num){
        if(num === '1'){
          return '返现中'
        }else if(num === '2'){
          return '返现成功'
        }else if(num === '3'){
          return '返现失败'
        }
      },
      statusText: function (num) {
        if(num === '0'){
          return '报单中'
        }else if(num === '1'){
          return '报单成功'
        }else if(num === '2'){
          return '报单失败'
        }
      }
    },
    watch:{
      itemResult(curVal){
        if(curVal){ this.itemResult = curVal }
      }
    },
    methods:{
      goShare(){
        var self = this;
        if(this.$publicConfig.appVersion >= 465){
          this.$native.action('refreshPage')
          // footer表示是否显示底部联系客服文案 0 不显示 1 显示
          let url = `${this.$publicConfig.projectUrl}cashBack/cashBackDetail?footer=0&id=${this.itemResult.id}`;
          var data = {
            android:{
              name:'ShowFormActivity',
              paramsKey:'url,id',
              params:`${url},${this.itemResult.id}`
            },
            ios:{
              name:'ZJPrefectureViewController',
              method:'initWithNibName:bundle:withUrl:withListId:',
              params:`ZJPrefectureViewController,nil,${url},${this.itemResult.id}`
            }
          }
          this.$native.skipAppPage(data)
        }else{
          var http = this.$axios;
          http.isShowLoading = false;
          http.post('sunburn',{
            id:this.itemResult.id
          }).then(res=>{
            this.itemResult.shareStatus = '1'
            Vue.popup.confirm({
              title: '晒单成功',
              msg: '奖励金<span style="color:#fd5d5d;">+0.2元</span>',
              cancelText: '确认', // 默认取消
              cancelCb: function(){
              },
              okText: '查看晒单', // 默认确认
              okCb: function(){
                self.$router.push('/myShare')
              }
            });
          },error=>{
          })
        }

      },
      goPostDetailInfo(){
        if(window._hmt){
          let tongjiReportDetail = comm.getCookie("__TONGJIREPORTDETAIL__");
          if(tongjiReportDetail === 'fromShare'){
            _hmt.push(['_trackEvent', 'T_5_1_1_2_1', 'click']);
          }else if(tongjiReportDetail === 'fromPost'){
            _hmt.push(['_trackEvent', 'T_5_1_2_3_1', 'click']);
          }
        }
        comm.setCookie("__REPORTINFO__",JSON.stringify(this.itemResult),10000)
        // footer表示是否显示底部联系客服文案 0 不显示 1 显示
        this.$router.push({path:'/cashBack/cashBackDetail',query:{id:this.itemResult.id,footer:1}})
      }
    }
  }
</script>
<style scoped>
  .cashbackItem-container{
    position: relative;
    padding: .3rem .3rem .2rem;
  }
  .cashbackItem-container .t{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: .3rem;
  }
  .cashbackItem-container .b{
    width: 7.1rem;
    height: .54rem;
    background-color: #f9fafc;
    margin: 0 auto;
    font-size:12px;
    color: #9197a6;
    text-align:center;
    line-height:.54rem;
  }
  .cashbackItem-container:after{
    left: 0;
    border-bottom: 1px solid #eee;
  }
  .cashbackItem-container .l .lt{
    display:flex;
    align-items: center;
    padding-bottom: .3rem;
  }
  .cashbackItem-container .l .lt span{
    width: .06rem;
    height: .06rem;
    border-radius: .03rem;
    background-color: #3b4257;
    margin: 0 .16rem;
  }
  .cashbackItem-container .l .lt p{
    font-size: .26rem;
    color: #3b4257;
  }
  .cashbackItem-container .platform-logo{
    width: 1.42rem;
  }
  .cashbackItem-container .l .lb{
    display:flex;
  }
  .cashbackItem-container .l .lb li{
    padding-right: 1.38rem;
  }
  .cashbackItem-container .l .lb li:last-child{
    padding-right: 0;
  }
  .cashbackItem-container .l .lb h2{
    font-size: .36rem;
    color: #3b4257;
    font-family: DINOT;
  }
  .cashbackItem-container .l .lb p{
    font-size: .24rem;
    color: #9197a6;
    padding-top: .1rem;
  }
  .cashbackItem-container .r{
    display:flex;
    flex-direction: column;
    height: 1.52rem;
    justify-content:space-between;
  }
  .cashbackItem-container .r .rt div{
    height: .44rem;
    border:1px solid #4e8cef;
    font-size: .26rem;
    color: #4e8cef;
    line-height: .44rem;
    text-align: center;
    border-radius: 5px;
    box-sizing: content-box;
    padding: 0 .1rem;
    margin-left: .6rem;
    margin-bottom: .4rem;
  }
  .cashbackItem-container .r .rb{
    padding-bottom: .2rem;
    font-size: 12px;
    color: #3b4257;
    align-self: flex-end;
  }
</style>
