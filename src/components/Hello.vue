<template>
  <!-- <header>我是标题</header> -->

  <div class="box">
    <div class="header">
      <i class="iconfont icon-bofang"></i>

      正在播放--{{title}}
    </div>
    <div class="body">
      <div class="bg-img">
        <img :src="src" alt="">
      </div>
      <div :class="{'c3':true,'donghua':true }" id='rallback'>
        <img :src="src" alt="">
      </div>
    </div>
    <div class="footer">
      <span @click='playPause()'>暂停</span>
      <span @click='init()'>换一首</span>
    </div>
    <audio id="audio1" preload="auto" autoplay="autoplay" :src='audio'>
    </audio>

  </div>

</template>

<script>
  import {getSongList, getRecommend} from 'api/geshou'
  import axios from 'axios'

  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        src: '',
        musicData: [],
        num: 0,
        audio: '',
        title: '',
        status: false,
      }
    },
    mounted(){
      getRecommend().then(() => function () {

      })
      this.post();
      // this.init();
    },
    methods: {
      playPause(){
        var myAudio = document.getElementById('audio1');
        var rallback = document.getElementById('rallback');
        //旋转动画暂停


        if (myAudio.paused) {
          myAudio.play();
          rallback.style.webkitAnimationPlayState = "running";  //旋转动画暂停

        } else {
          myAudio.pause();
          rallback.style.webkitAnimationPlayState = "paused";

        }
      },
      post(){
        let vm = this;
        axios.get('../../static/test.json').then((res) => {
          let jsondata = res.data.data;
          for (let i = 0; i < jsondata.length; i++) {
            jsondata[i].songid = `http://ws.stream.qqmusic.qq.com/${jsondata[i].songid}.m4a?fromtag=46'`
          }
          vm.musicData = jsondata;
          // vm.num=parseInt(Math.random()*7);
          vm.init();
        })


      },
      init(){
        let num = parseInt(Math.random() * 7);
        this.src = this.musicData[num].img
        this.audio = this.musicData[num].songid
        this.title = this.musicData[num].name
        var myAudio = document.getElementById('audio1');
        this.status = myAudio.paused;
        // alert(this.musicData);
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  header
  {
    height      : 50px;
    line-height : 50px;
    background  : red;
  }
  .box
  {
    display        : flex;
    /*flex-direction: row | row-reverse | column | column-reverse;*/
    flex-direction : column;
    height         : 100%;
    width          : 100%;

  }
  .header
  {
    width       : 100%;
    /*flex:2;*/
    height      : 50px;
    line-height : 50px;
    color       : #fff;
    background  : #d43c33;
  }
  .body
  {
    width    : 100%;
    flex     : 10;
    position : relative;
  }
  .bg-img
  {
    position : absolute;
    top      : 0;
    bottom   : 0;
    left     : 0;
    right    : 0;
    /*  background: url('https://y.gtimg.cn/music/photo_new/T002R150x150M000001nd5rE0UOHo5.jpg?max_age=2592000') no-repeat ;
      background-size: 100% 100%;*/
    /*filter: blur(6px);*/
    z-index  : -1;
  }
  .bg-img img
  {
    filter  : blur(6px);
    z-index : -1;
    width   : 100%;
    height  : 100%;
  }
  .c3
  {
    position            : absolute;
    width               : 200px;
    height              : 200px;
    background          : red;
    border-radius       : 50%;
    margin              : auto;
    top                 : 0;
    left                : 0;
    bottom              : 0;
    right               : 0;
    z-index             : 1;
    overflow            : hidden;
    animation-fill-mode : forwards;

  }
  .c3 img
  {
    width  : 100%;
    height : 100%;
  }
  .footer
  {
    width           : 100%;
    /*flex:2;*/
    height          : 50px;
    /*line-height: 50px;*/
    background      : #000;
    color           : #fff;
    display         : flex;
    justify-content : space-between;
    align-items     : center;
  }
  .footer span
  {
    width       : 50px;
    height      : 50px;
    line-height : 50px;
    background  : red;

  }
  h1, h2
  {
    font-weight : normal;
  }
  ul
  {
    list-style-type : none;
    padding         : 0;
  }
  li
  {
    display : inline-block;
    margin  : 0 10px;
  }
  a
  {
    color : #42b983;
  }
  @keyframes rotate
  {
    0%
    {
      transform : rotate(0deg);
    }
    100%
    {
      transform : rotate(360deg);
    }
  }
  .donghua
  {

    animation : rotate 20s infinite linear;

  }


</style>
