<template>

  <div class="header">
    <!--<i class="iconfont icon-liebiao" @click="switchprop"></i>-->
    我叫播放器
    <span></span>

    <mu-popup position="left" popupClass="demo-popup-left" id="left-pop" :open="leftstate" @close="switchprop">
      <div class="leftMuH">
        <div>播放列表({{total}})首</div>
        <ul>
          <li v-for="(val,index) in getmusicList" @click="selectmusic(index)" :class="{'cur':getMusicPlace==index}">
            <span>{{index+1}}</span>
            <p>{{val.name}}</p>
            <a @click="delmusic(index)">删除</a>

          </li>

        </ul>
      </div>
    </mu-popup>
  </div>

</template>
<script>
  import {
    mapActions,
    mapGetters
  } from 'vuex'
export default {
      data(){
          return{
            'leftPopup':false
          }
      },
  computed:{
    ...mapGetters(['playlist','getmusicList','total','getMusicPlace','leftstate'])//actions.js里有注释功能

  },
  methods:{
    ...mapActions(['delmusic','selectmusic','switchprop']),
    open (position) {
      this[position + 'Popup'] = true
    },
    close (position) {
      this[position + 'Popup'] = false
    }

  },
  mounted(){
//      let vm = this;
//      document.addEventListener('click',function(){
//          vm.switchprop()
//      })
  }




}

</script>
<style scoped>

  .mu-popup-left{
    width :70%!important;
    height: 100%;
    background:rgba(127, 36, 31,.5);
  }
  .leftMuH{
    color: #fff;
  }
  .leftMuH li{
    line-height: 35px;
    color: #fff;
    display: flex;
  }
  .leftMuH li p{
    flex:1;
  }
  .leftMuH li span{
    width :40px;
    text-align: center;
  }
  .leftMuH div{
    line-height: 40px;
    text-align: center;
    font-size :16px;
    border-bottom: 2px solid #fff;
  }

  .leftMuH .cur{
    color :yellow;
  }
</style>
