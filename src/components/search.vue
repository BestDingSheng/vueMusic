<template>
  <div>

    <div class="searchBox">
      <div class="btnSearch">
        <input type="text" v-model="searcKey" placeholder="歌手/歌名/专辑/歌词" @keyup.enter="search(searcKey)">
        <i class="iconfont icon-sousuo btn-icon"> </i>
      </div>


        <transition enter-active-class="animated bounceInUp">
          <div class="block" v-if="hotListState">
              <h1>热门</h1>
              <ul class="hotlist">
                <li v-for="(val,index) in arr" @click="search(val.k)">{{val.k}}</li>
              </ul>
          </div>
        </transition>



      <transition enter-active-class="animated bounceInUp">
        <div class="searchListBox" v-if="searchListState">
          <i class="iconfont icon-fanhui" id="back" @click="back"></i>
          <ul class="searchList">
            <li v-for="(val,index) in searchList" @click="sendMusic(val)">
              <div><img :src="val.img" alt=""></div>
              <div>
                <h1>{{val.name}}</h1>
                <p>{{val.singer}}</p>
              </div>
            </li>
          </ul>
        </div>
      </transition>


    </div>

  </div>


</template>
<script>
  import jsonp from 'jsonp'
  import {mapGetters,mapActions} from 'vuex'
  export default{

    data(){
      return {
        arr: [],
        searchList: [],
        searcKey: '',
        hotListState:true,
        searchListState:false,

      }
    },
    computed:{
      ...mapGetters([''])
    },
    mounted(){
      this.hotlist()

    },
    methods: {
      ...mapActions(['sendMusic']),
      back(){

          this.hotListState=true
          this.searchListState=false
      },
      hotlist(){
        let vm = this;
        let url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?format=jsonp'
        jsonp(url, {param: 'jsonpCallback',}, function (err, res) {
//            vm.arr = res.data.hotkey;
          console.log(res);

          res.data.hotkey.forEach((val, index) => {
            index < 10 ? vm.arr.push(val) : false;
          });
        })
      },
      search(key){

        let url = `https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?format=jsonp&n=20&w=${key}`
        let vm = this;
        jsonp(url, {param: 'jsonpCallback'}, function (err, res) {

          if (res.data.song.list != []) {
            vm.hotListState=false;
            vm.searchListState=true;
            vm.searchList = [];
            res.data.song.list.forEach(val => {
              vm.searchList.push({
                name: val.songname,
                img: "https://y.gtimg.cn/music/photo_new/T002R300x300M000" + val.albummid + ".jpg?max_age=2592000",
                songid: val.songid,
                singer: val.singer[0].name
              })
            });
          } else {
            this.notFound = true
          }

        })

      }

    }
  }
</script>
<style>
  #back{
    padding:10px;
    /*margin-right :10px;*/
    font-size :20px;
  }
  .searchBox
  {
    text-align : left;
    width      : 85%;
    margin : 10px auto;

  }
  h1
  {
    font-size  : 16px;
    margin-top : 10px;
  }
  .btnSearch
  {
    width         : 100%;
    /*margin:0 auto;*/
    height        : 30px;
    /*background : red;*/
    border-radius : 20px;
    border        : 1px solid #ccc;
    overflow      : hidden;
    position      : relative;
  }
  .btnSearch .btn-icon
  {
    position  : absolute;
    top       : 1px;
    font-size : 20px;
    left      : 10px;

  }
  .btnSearch input
  {
    width        : 100%;
    height       : 30px;
    font-size    : 14px;
    box-sizing   : border-box;
    padding-left : 30px;

  }
  .hotlist
  {
    display   : flex;
    flex-wrap : wrap;

  }
  .hotlist li
  {
    padding       : 2px 10px;
    border        : 1px solid #000;
    border-radius : 20px;
    margin-right  : 10px;
    margin-bottom    : 10px;
    font-size: 12px;

  }
  .searchListBox
  {
    display         : flex;
    justify-content : space-between;
    align-items     : flex-start;
    margin-top      : 10px;
  }
  .searchListBox > button
  {
    font-size    : 2rem;
    margin-right : 10px;
  }
  .searchList
  {
    overflow : auto;
    height   : 67vh;
    flex     : 1;
  }
  .searchList li
  {
    border-bottom : 1px #ccc solid;
    display       : flex;
    overflow      : hidden;
    align-items: center;
  }
  .searchList li img
  {
    width  : 50px;
    margin : 2px 0;
  }
  .searchList li h1,
  .searchList li p
  {
    margin       : .5rem 0;
    padding-left : 1rem;
  }
  .searchList li h1
  {
    font-size : 1.2rem;
  }

</style>
