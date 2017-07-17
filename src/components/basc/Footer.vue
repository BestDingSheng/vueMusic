<template>
<div class="footer">
  <transition enter-active-class="animated zoomIn" leave-active-class="animated fadeOutDown">
    <div class="fixdBox" v-show="playlist">
      <h1>播放列表</h1>

        <span @click="test()">关闭</span>

    </div>
  </transition>

  <ul class="palyBox">
    <li class="left" @click="ShowPlayInfo">
      <img :src="songImg" width="50px" alt="">
    </li>
    <li class="center">
      <span>{{nowSong.name}}</span>
      <p>{{nowSong.singer}}</p>
    </li>
    <li class="right">

      <i :class="{'iconfont':true,'icon-icon-bofang':!playState,
      'icon-icon-zanting':playState}"  @click="switchplay"></i>
      <!--<i class="iconfont icon-icon-zanting" v-if="playState" @click="switchplay"></i>-->

      <i class="iconfont icon-liebiao" @click="openplaylist()"></i>
    </li>
  </ul>
</div>
</template>
<script>
  import {mapGetters,mapActions} from 'vuex'
  export default{
     data(){
         return{
           status:true
         }
     },
    computed:{
      ...mapGetters(['playlist','getmusicList','songImg','nowSong','playState'])//actions.js里有注释功能

    },
    methods:{
      ...mapActions(['closeplaylist','openplaylist','ShowPlayInfo','switchplay']),
      test(){
          this.closeplaylist()
      }

    },
  }

</script>
<style scoped>

  .fixdBox{
    height: 200px;
    width: 100%;
    position: fixed;
    bottom: 0;
    background: #333;
    opacity: 0.8;
    z-index : 2;
  }

  .footer{
    width :100%;
  }
  .palyBox{
    display : flex;
    align-items: center;
    width :100%;
    justify-content: space-around;
  }
  .left{
    width :40px;
    height :40px;
    border-radius: 50%;
    overflow: hidden;
  }
  .left img{
    width :100%;
  }
  .center{
    font-size :14px;
    width :140px;
    text-align: left;
  }
  .center p{
    font-size :12px;
  }
  .center span{
    font-size :16px;
  }
  .right .iconfont{
    font-size :35px;
  }
</style>
