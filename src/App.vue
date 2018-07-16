<template>
  <div style="width:100%;height:100%;background-color: #f0eff4;">
    <router-view/>
    <Loading v-show='isShowLoading'></Loading>
  </div>
</template>

<script>

  import './../static/css/reset.css'
  import './../static/css/public.css'
  import './components/popup/popup.css'
  
  const Loading = () => import('@/components/Loading/Loading.vue')
  import bus from './common/bus'
  export default {
    name: 'App',
    data(){
      return {
        isShowLoading:false
      }
    },
    created(){
      bus.$on('toggleLoading',show=>{
        this.isShowLoading = show;
      })
    },
    components:{
      Loading
    }
  }
</script>
