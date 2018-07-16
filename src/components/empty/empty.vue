<template>
  <div class="empty-container">
    <img src="./../../assets/share-empty.png">
    <p>空空如也~ 赶紧去投资吧</p>
    <button @click='goHome'>返回投资</button>
  </div>
</template>
<script>
  export default{
    name:'emptyPost',
    methods:{
      // 跳转回首页
      goHome(){
        if(this.$native.isApp){
          let data = {
            android: {
              name: 'MainActivity',
              paramsKey: 'skipTab',
              params: 'p1t4'
            },
            ios: {
              name: 'AgentContainerViewController',
              method: '',
              params: '1'
            }
          }
          this.$native.skipAppPage(data)
        }else{
          this.$router.replace('/')
        }
      }
    }
  }
</script>
<style scoped>
  .empty-container{
    padding-top: 3.85rem;
  }
  .empty-container img{
    display: block;
    margin: 0 auto;
    width: 1.72rem;
  }
  .empty-container p{
    text-align: center;
    color: #9197a6;
    font-size: .24rem;
    line-height: 1.4;
    padding-bottom: .5rem;
  }
  .empty-container button{
    display: block;
    width:1.8rem;
    height: .6rem;
    margin: 0 auto;
    color: #fff;
    font-size: .26rem;
    background-color: #4e8cef;
    border-radius: .3rem;
  }
</style>
