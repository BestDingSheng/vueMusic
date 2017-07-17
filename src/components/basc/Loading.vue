<template>
  <div class="loading">
    <img src="../../assets/img/loading1.gif" alt="">
    <p>正在加载中...</p>
  </div>
</template>
<script>

  export default {


  }

</script>
<style scoped>
  .loading{
    position: fixed;
    top:0;
    left: 0;
    right:0;
    bottom:0;
    margin: auto;
    z-index: 3;
    width: 100%;
    max-width: 633px;
    height: 100vh;
    background: #e1e2fe;
  }
  .loading img{
    width:60%;
    position: absolute;
    top:30%;
    left: 0;
    right:0;
    margin: 0 auto;
  }
  .loading p{
    position: absolute;
    width :100%;
    text-align: center;
    top :55%;
    color: #999;
    font-size: 1.2rem;

  }
</style>
