<template>
  <div class="cashBackDetail-container">
    <div class="t">
      <header>
        <h2>{{reportInfo.feeAmt}}</h2>
        <p>返现金额(元)</p>
      </header>
      <ul class="section">
        <li v-if="reportInfo.payStatus">
          <p>返现状态：</p>
          <p>{{reportInfo.payStatus | payStatusText }}</p>
        </li>
        <li v-else>
          <p>报单状态：</p>
          <p>{{reportInfo.status | statusText }}</p>
        </li>
        <li>
          <p>平台名称：</p>
          <p>{{reportInfo.platfromName}}</p>
        </li>
        <li>
          <p>投资金额：</p>
          <p>{{reportInfo.investAmt}}元</p>
        </li>
        <li>
          <p>产品期限：</p>
          <p>{{reportInfo.productDeadLine}}</p>
        </li>
        <li>
          <p>投资时间：</p>
          <p>{{reportInfo.investTime}}</p>
        </li>
        <li v-if="reportInfo.payTime">
          <p>返现时间：</p>
          <p>{{reportInfo.payTime}}</p>
        </li>
        <li v-if="!!reportInfo.payTime && !reportInfo.feeStrategy">
          <p>报单时间：</p>
          <p>{{reportInfo.recordTime}}</p>
        </li>
      </ul>
    </div>
    <footer v-if="showFooter">对此单有疑问  联系客服&nbsp;<a href="tel:400-888-6987">400-888-6987</a></footer>
  </div>
</template>
<script>
  export default {
    name:'postDetailInfo',
    data(){
      return {
        reportInfo:''
      }
    },
    computed:{
      showFooter(){
        return this.$route.query.footer == 0 ? false :true
      }
    },
    filters: {
      statusText: function (num) {
        if(num === '0'){
          return '报单中'
        }else if(num === '1'){
          return '报单成功'
        }else if(num === '2'){
          return '报单失败'
        }
      },
      payStatusText:function(num){
        if(num === '1'){
          return '返现中'
        }else if(num === '2'){
          return '返现成功'
        }else if(num === '3'){
          return '返现失败'
        }
      }
    },
    created(){
      if(this.$route.query.id){
        let http = this.$axios;
        http.post('sunburnDetail',{id:this.$route.query.id}).then(res=>{
          this.reportInfo = res
        })
      }
    }
  }
</script>
<style scoped>
  .cashBackDetail-container{
    width: 100%;
    height: 100%;
    background-color: #f0eff4;
  }
  .cashBackDetail-container .t{
    height: 100%;
    padding-bottom: .85rem;
  }
  .cashBackDetail-container header{
    background-color: #fff;
    border-bottom: 1px solid #eee;
  }
  .cashBackDetail-container header h2{
    padding-top: .6rem;
    text-align: center;
    font-size: .64rem;
    line-height: 1;
    color: #3b4257;
    font-family: DINOT;
  }
  .cashBackDetail-container header p{
    font-size: .24rem;
    color: #9197a6;
    text-align: center;
    padding-bottom: .48rem;
    padding-top: .1rem;
  }
  .cashBackDetail-container .section{
    background-color: #fff;
    padding: .2rem .3rem;
  }
  .cashBackDetail-container .section li{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: .7rem;
  }
  .cashBackDetail-container .section li p:first-child{
    color: #9197a6;
    font-size: .26rem;
  }
  .cashBackDetail-container .section li p:last-child{
    color: #3b4257;
    font-size: .26rem;
  }
  .cashBackDetail-container footer{
    height: .85rem;
    margin-top: -.85rem;
    text-align: center;
    font-size: .26rem;
    color: #9197a6;
  }
  .cashBackDetail-container footer a{
    color: #4e8cef;
    font-size: .26rem;
  }
</style>
