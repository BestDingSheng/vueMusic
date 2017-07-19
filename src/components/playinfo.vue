<template>
    <div class="palyinfo" :style="">

      <div class="title">
        <i class="iconfont icon-xia" id="back-icon" @click="ShowPlayInfo"></i>

       <div class="text-title">{{nowSong.name}}----{{nowSong.singer}}</div>
         <i class="iconfont icon-liebiao liebiao" @click="switchprop"></i>
      </div>
      <div class="lyrics">

        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide data-swiper-autoplay="3000">
            <div class="swiperBox" id="gequBox">
              <ul class="lyc">
                <li v-for="(val,index) in lyric" :class="{nowLyc:index<=parseInt(currentTime)}" >
                  {{val}}
                 </li>
              </ul>
            </div>
          </swiper-slide>
          <swiper-slide data-swiper-autoplay="3000">
            <div class="swiperBox">
                <div class="imgBox" ref="imgBox">
                  <img :src="songImg" alt="">
                </div>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="jindu">
       <span>{{ currentTime | date }}</span>
        <mu-slider v-model="jindu" @change="moveChange" class="demo-slider progress" />
      <span>{{duration | date}}</span>


      </div>
      <div class="foot">

        <i class="iconfont icon-icon-shangyishou" @click="beforemusic"></i>
        <i :class="{'iconfont':true,'icon-icon-bofang':!playState,
      'icon-icon-zanting':playState}"  @click="switchplay"></i>
        <i class="iconfont icon-icon-xiayishou" @click="nextmusic"></i>

        <!--<i class="iconfont icon-liebiao right" @click="nextmusic"></i>-->
        <!--<i class="iconfont icon-liebiao" @click="switchprop"></i>-->

      </div>

    </div>
</template>
<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'//vue-awesome-swiper用法具体可以看文档那里比我说的详细
  import {mapActions, mapGetters} from 'vuex'
  import jsonp from 'jsonp'
  import Base64 from 'common/js/base64';
  import parseLyric from 'common/js/lyc';
  import Vue from 'vue'
  import $ from 'jquery'


  Vue.filter('date', function (input) {
    let time = new Date();
    time.setTime(input * 1000);
    let seconds = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds();
    return time.getMinutes() + '.' + seconds;
  });


  export default{
    data(){
        return{
          swiperOption: {//配置轮播图（参数和swiper的一样）
            notNextTick: true,
//            autoplay: 3000,
            loop: true,
            autoplayDisableOnInteraction: false,
            direction: 'horizontal',
            grabCursor: true,
            setWrapperSize: true,
            autoHeight: false,
            pagination: '.swiper-pagination',
            paginationClickable: true,
            mousewheelControl: true,
            observeParents: true,
            debugger: true
          },
          lyric:[],
          time:'100',
          jindu:0,
          time:0,
        }

    },
    mounted(){
      this.test();
      this.$refs.imgBox.style.webkitAnimationPlayState = "paused";

      if(this.playState){
        this.$refs.imgBox.style.webkitAnimationPlayState = "running";
      }else{
        this.$refs.imgBox.style.webkitAnimationPlayState = "paused";
      }


    },
    computed: {
      swiper() {
          console.log(this.$refs.mySwiper.swiper)
        return this.$refs.mySwiper.swiper
      },
      ...mapGetters(['showplay','songImg','nowSong','playState','currentTime','duration']),
      background(){
          return "background:url(" + this.songImg + ") no-repeat; "

      }
    },
    methods:{
      ...mapActions(['ShowPlayInfo','openplaylist','switchplay','setCurrentTime',
      'nextmusic','beforemusic','switchprop'
      ]),

      test(){
          let vm =this;
          let url =`https://api.darlin.me/music/lyric/${vm.nowSong.songid}/?`;
          jsonp(url,function(err,res){

            if(res.lyric){
              let base = new Base64();
              let result2 = base.decode(res.lyric);
              vm.lyric = parseLyric(result2);
            }

          })
      },
      movejindu(){
         this.jindu=parseInt((this.currentTime/this.duration)*100)
      },
      moveChange(){
          setTimeout(()=>{
//            console.log(this.jindu);
//            console.log(this.duration)
//            console.log()
            this.setCurrentTime(this.jindu*this.duration/100)
          },20);

//        let scroll = setTimeout(()=>{
//          clearTimeout(scroll);
//          let nowLyc= document.getElementsByClassName('nowLyc');
//          let scrH =0;
//          for (let i=0;i<nowLyc.length;i++){
//            scrH+=nowLyc[i].offsetHeight;
//          }
//          $('#gequBox').scrollTop(scrH);
//        },10)

      }

    },
    watch:{
      playState(val,odl){
        if(val){
          this.$refs.imgBox.style.webkitAnimationPlayState = "running";
        }else{
          this.$refs.imgBox.style.webkitAnimationPlayState = "paused";
        }
      },
      currentTime(val){
        this.time = parseInt(this.currentTime)
      },
      time(){
        if (this.lyric[this.time]){
          let nowLyc= document.getElementsByClassName('nowLyc');
          let scrH =0;
          for (let i=0;i<nowLyc.length;i++){
            scrH+=nowLyc[i].offsetHeight;
          }
          $('#gequBox').animate({scrollTop:scrH-50});
        }
        this.jindu=(this.currentTime/this.duration).toFixed(4)*100

      }
    },
    components: {
      swiper,
      swiperSlide
    }


}
</script>
<style scoped>

  .positon{
    position: absolute;
    /*background:#000;*/
    top :0;
    bottom: 0;
    right: 0;
    left :0;
    z-index: -1;
    opacity: .5;
    background-size: 100% 80% !important;
    filter: blur(32px) !important;
    background-position: center !important;
  }
  #back-icon{
   position: absolute;
    left :10px;
  }
  .lyc li{
    margin-top :10px;
    color : #fff;
  }
  .foot{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 13vh;

  }
  .foot .iconfont{
    font-size:40px;
    padding :0 10px;
    color : #fff;
  }
  .foot .right{
    flex:0;
  }
  .jindu span{
    color: #fff;
  }
  .swiper-container{
    height: 100%;
  }
  .swiper-container-autoheight{
    height: 100%;
  }
  .swiperBox{
    width :100%;
    height: 100%;
    overflow: auto;
  }
  .palyinfo{
    width :100%;
    height :100%;
    background-color : #8e5252 !important;
    background-position: center !important;
    background-size:100% 100% !important;
    position:absolute;
    top :0;
    left: 0;
    bottom: 0;
    right :0;
    z-index: 1;
  }
  .imgBox{
    width :200px;
    height: 200px;
    /*background: rebeccapurple;*/
    position: absolute;
    border-radius: 50%;
    right: 0;
    left: 0;
    top: 0;
    /*border:solid 10px red;*/
    bottom: 0;
    margin: auto;
    -webkit-animation: music_disc 20s linear infinite;
    animation: music_disc 20s linear infinite;
    overflow: hidden;
  }
  .imgBox img{
    width :100%;
  }
  .title{
    width :100%;
    height: 7vh;
    line-height: 7vh;
    font-size: 16px;
    color : #fff;
    /*background : yellow;*/
  }
  .lyrics{
    width :100%;
    height: 75vh;
    overflow: auto;
    /*background : greenyellow;*/
  }
  .nowLyc{
    color :yellow !important;
  }
  .jindu{
    width :100%;
    height: 5vh;
    /*background: deeppink;*/
    display: flex;
    align-items:center;
    justify-content: space-around;
    padding-top:20px;
  }
  .mu-slider{
    width :70%;
    top :8px;
  }
.liebiao{
  position: absolute;
  right: 10px;
  font-size: 20px;
  top :0;

}
.text-title{
  width :80%;
  margin: 0 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
  @-webkit-keyframes music_disc {
    0% {
      -webkit-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);

    }
    100% {
      -webkit-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

</style>
