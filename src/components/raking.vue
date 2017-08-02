<template>
  <ul class="rakingList">
    <router-link @click="test"  tag="li" class="raking" v-for="(val,index) in list"
                  :to="{ name: 'toplist', params: { topid: val.id }}" :key="val.id">
      <img class="rakingImg" :src="val.picUrl" alt="">
      <div class="rakingBox">
        <h1 class="rakingTitle">{{val.topTitle}}</h1>
        <p v-for="(value,index) in val.songList">
          <b class="rakingSongName">{{index+1}}.{{value.songname}}</b>
          <span class="rakingSingerName"> -{{value.singername}}</span>
        </p>
      </div>
    </router-link>
  </ul>
</template>
<script>
  import jsonp from 'jsonp'
  export default{
    data(){
      return{
        list:[]
      }
    },
    mounted(){
      let vm = this;
      let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?format=jsonp&g_tk=5381&uin=0&format=jsonp&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1492853417073';
      jsonp(url,{
        param: 'jsonpCallback',
      },function(err,res){
        vm.list=res.data.topList;
      })
    },
    methods:{
        test(){
            alert(1111)
        }
    }
  }
</script>
<style scoped>
  .rakingList{
    height:77vh;
    overflow: auto;
    text-align: left;
  }
  .raking{
    display: flex;
    height: 15vh;
    margin: 2vh auto;
    width: 94%;
    background: #eee;
  }
  .rakingImg{
    display: block;
    height:15vh;
  }
  .rakingBox{
    margin-left: 15px;
    width: 60%;
    overflow: hidden;
    display : flex;
    flex-direction: column;
    justify-content: space-around;

  }
  .rakingTitle{
    margin:0;
    font-size: 1.4rem;
    color: #665757;
  }
  .rakingBox p{
    white-space: nowrap;
    font-size: 1rem;
  }
  .rakingSongName{
    font-weight: normal;
    color: #549688;
  }
  .rakingSingerName{
    color: #48c0a3;
  }
</style>
