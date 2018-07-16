<!--简介组件-->
<template>
  <div class="summaryCompontent-container">
    {{result.orgProfile}}
  </div>
</template>

<script>
    export default {
        name: "summaryComponent",
        props:['result']
    }
</script>

<style scoped>
  .summaryCompontent-container{
    padding: .3rem;
    font-size: 16px;
    color: #5f6678;
    line-height: 1.84;
  }
</style>
