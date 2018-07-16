<!-- 平台简介页 -->
<template>
	<div class="platformSummary-container">
		<nav>
      <button :class="{active :  currentTabComponent === 'summaryComponent'}" @click="tabChange('summaryComponent')"><a>简介</a></button>
      <button :class="{active : currentTabComponent === 'recordComponent'}" @click="tabChange('recordComponent')"><a>档案</a></button>
    </nav>
    <div class="wrap">
      <component v-bind:is="currentTabComponent" :result="platformInfo"></component>
    </div>
	</div>
</template>
<script>
  const summaryComponent = () => import('./components/summaryComponent.vue')
  const recordComponent = () => import('./components/recordComponent.vue')
	export default {
		name:"platformSummary",
    data(){
      return {
        currentTabComponent : 'summaryComponent',
        platformInfo:{}
      }
    },
		mounted(){
			if(sessionStorage.getItem('__PLATFORMINFO__')){
				let data = JSON.parse(sessionStorage.getItem('__PLATFORMINFO__'))
        this.platformInfo = data;
			}else{
			  let orgNumber = this.$route.query.orgNumber
			  let http = this.$axios;
			  http.post('orginfoaDetail',{
          orgCode:orgNumber
        }).then(res => {
          this.platformInfo = res
        })
      }
		},
    methods:{
		  tabChange(componentName){
		    this.currentTabComponent = componentName;
      }
    },
    components:{
		  summaryComponent,
      recordComponent
    }
	}
</script>
<style scoped>
  .platformSummary-container nav{
    width: 100%;
    height: .8rem;
    display: flex;
    position: fixed;
    left: 0;
    top: 0;
    background: #fff;
  }
  .platformSummary-container nav button{
    flex: 1;
    background-color: #fff;
    font-size: .3rem;
    color: #5f6678;
    height: 100%;
    padding: 0;
    display: block;
  }
  .platformSummary-container nav button a{
    display: flex;
    width: 1.4rem;
    height: 100%;
    align-items: center;
    margin: 0 auto;
    justify-content: center;
  }
  .platformSummary-container nav button.active a{
    border-bottom: 2px solid #4e8cef;
  }
  .platformSummary-container .wrap{
    padding-top: .8rem;
  }
</style>
