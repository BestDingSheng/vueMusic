<template>
  <div class="toplist" :style="backgroundUrl">
    <div class="goraking" :style="'color:#fff'">
      <div class="positon" :style="backgroundCor"></div>
      <div class="text-positon">
        <i class="iconfont icon-fanhui" @click="back"></i>
        返回排行榜
       </div>
    </div>

    <ul class="gequlist" :style="'color:#fff;'">
      <div class="opty">
        <h1 class="title-text" :style="backgroundCor">

        </h1>
        <p>巅峰榜流行指数</p>
      </div>
      <li v-for="(val,index) in toplist.list" :style="backgroundCor" @click="sendMusic(val)">
        <h2 class="xuhao">{{index + 1}}</h2>
        <div class="border">
          <p>{{val.name}}</p>
          <span>{{val.singer}}</span>


        </div>
      </li>
    </ul>


  </div>


</template>
<script>
  import jsonp from 'jsonp'
  import {mapGetters,mapActions} from 'vuex'
  export default{

    data(){
      return {
        toplist: {
          color: '',
          img: '',
          title: '',
          list: [],
          top:document.body.scrollTop
        }
      }
    },

    created: function () {

    },
    mounted: function () {

    },
    activated: function () {
      this.hotlist()
    },
    deactivated: function () {
        this.toplist.list=[];
    },
    methods: {
        back(){
          this.$router.back(1)
        },
      ...mapActions(['delmusic','selectmusic','sendMusic']),
      hotlist(){
        let vm = this;
        let id = this.$route.params.topid;
        let url = "https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=" + id + "&_=1492910996732";
        jsonp(url, {param: 'jsonpCallback',}, function (err, res) {
//
          let data = res;
          vm.toplist.title = data.topinfo.ListName;

          vm.toplist.img = data.topinfo.pic_album;

          vm.toplist.color = '#' + data.color.toString(16);
          if (vm.toplist.color.length<7){
            for(let i =vm.toplist.color.length;i<7;i++ ){
              vm.toplist.color+="9"
            }
          }

          data.songlist.forEach(val => {
            vm.toplist.list.push({
              name: val.data.songname,
              img: "https://y.gtimg.cn/music/photo_new/T002R150x150M000" + val.data.albummid + ".jpg?max_age=2592000",
              songid: val.data.songid,
              singer: val.data.singer[0].name
            })
          });


        })
      },

    },
    computed: {
      backgroundUrl(){
        return "background-image:url(" + this.toplist.img + ") ;"
      },
      backgroundCor(){
        return "background-color:" + this.toplist.color + ";"
      },
      ...mapGetters([''])//actions.js里有注释功能
    }

  }
</script>
<style>
  .opty{
    position: relative;
  }
.opty h1{
   height: 40px;
}
  .opty p{
    font-size :16px;
    height: 40px;
    line-height: 40px;
    top :0;
    padding-left :20px;
    position: absolute;
  }
  .goraking{
    line-height: 40px;
    font-size :16px;
    position: fixed;
    width :100%;
    max-width: 633px;
  }
  .goraking i{
    font-size: 20px;
    vertical-align: -1px;
  }
  .toplist
  {
    text-align        : left;
    width             : 100%;
    height            : 100%;
    background-size   : contain;
    background-repeat : no-repeat;
    overflow          : auto;
  }
  .gequlist
  {
    padding-top : 200px;

  }
  .positon{
    height: 41px;
    opacity: .6;
  }
  .text-positon{
    position: absolute;
    top :0;
    padding-left:15px;
    width :100%;
  }
  .border
  {
    flex            : 1;
    border-bottom   : 1px solid #fff;
    height          : 40px;
    display         : flex;
    flex-direction  : column;
    justify-content : space-around;
  }
  .border p
  {
    font-size : 14px;
  }
  .border span{
    font-size: 12px;
  }
  .xuhao
  {
    width      : 50px;
    text-align : center;
    font-size  : 18px;
  }
  .gequlist li
  {
    display     : flex;
    align-items : center;
  }
  .title-text
  {
    line-height : 40px;
    opacity     : 0.6;
    margin:0;
    /*position: relative;*/

  }
  .title-text p{
    /*position: absolute;*/
    left :0;
    font-size: 18px;
  }
</style>
