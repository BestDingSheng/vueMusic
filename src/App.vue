<template>
  <div id="app">
    <!--loading插件-->
    <v-loading v-show="isloading"></v-loading>
    <!--头部插件-->
    <!--<v-header v-show="headerShow"></v-header>-->
    <div class="box">
      <div class="header" v-show="showHeader">
        <v-header></v-header>
      </div>
      <div class="nav" v-show="showNav">
        <v-bar></v-bar>
      </div>
      <div class="body">
        <transition enter-active-class="animated bounceInUp">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>

      </div>
      <div class="footer">

        <v-footer></v-footer>
      </div>

      <!--<div class="palyinfo"></div>-->
      <transition enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
        <playinfo v-if="showplay"></playinfo>
      </transition>

    </div>
    <audio src="" ref="audio" autoplay="autoplay" @canplaythrough="test" @ended="playend" @timeupdate="getcurrentTime" @canplay="getDuration"></audio>


    <!--<router-view></router-view>-->
  </div>
</template>

<script>
  import Loading from '@/components/basc/Loading.vue'
  import Header from '@/components/basc/Header.vue'
  import Bar from '@/components/basc/Bar.vue'
  import Footer from '@/components/basc/Footer.vue'
  import playinfo from '@/components/playinfo.vue'

  import {mapActions, mapGetters} from 'vuex'
  export default {
    name: 'app',
    data(){
      return {
        isloading:false,
        showHeader:true,
        showNav:true,
        showPlay:true,
      }
    },
    mounted(){
      this.$store.dispatch('sendAudio', this.$refs.audio); //在模板编译完成后把audio元素发送给action
    },
    methods:{
        test(){
            console.log('开始了1111')
//          this.$refs.audio.pause();
//          this.$refs.audio.play();

        },
        changePath(path){
            if(path.indexOf('toplist')>0){
              this.showHeader=false;
              this.showNav=false;
            }else{
              this.showHeader=true;
              this.showNav=true;
            }
        },
      ...mapActions(['ShowPlayInfo','getcurrentTime','getDuration','playend']),
    },
    components: {
      'v-loading': Loading,
      'v-header': Header,
      'v-bar': Bar,
      'v-footer': Footer,
      'playinfo':playinfo
    },
    watch: {
      $route (to, from) {
        // 执行ajax请求，但只希望在进入时请求，离开时不希望进行请求。
//        this.getData()
          this.changePath(to.path);
          this.isloading=true;
          let vm =this;
          setTimeout(()=>{
              vm.isloading=false;
          },100)

      }
    },
    computed:{
      ...mapGetters(['showplay'])//actions.js里有注释功能

    },
  }
</script>

<style>



  .palyBox
  {
    display         : flex;
    align-items     : center;
    width           : 100%;
    justify-content : space-around;
  }
  #app
  {
    font-family             : 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing  : antialiased;
    -moz-osx-font-smoothing : grayscale;
    text-align              : center;
    color                   : #2c3e50;
    /*margin-top: 60px;*/
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
    height      : 40px;
    line-height : 40px;
    color       : #fff;
    background  : #d43c33;
    font-size: 1.2rem;
  }
  .body
  {
    width    : 100%;
    flex     : 10;
    position : relative;
    overflow : auto;
  }
  .nav
  {
    width : 100%;
  }
  .footer
  {
    width           : 100%;
    /*flex:2;*/
    /*height          : 50px;*/
    /*line-height: 50px;*/
    background      : #000;
    color           : #fff;
    display         : flex;
    justify-content : space-between;
    align-items     : center;
  }


</style>
