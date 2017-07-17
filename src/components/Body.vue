<template>
  <div class="body-banner">
    <v-banner></v-banner>

    <h1>推荐</h1>
    <ul class="recommended">
      <li v-for="(val,index) in arr">
        <a href="javascript:;" @click="sendMusic(val)">
          <img :src="val.img" :alt="val.name">
          <p class="songName">{{val.name}}</p>
          <p class="singer">{{val.singer}}</p>
        </a>
      </li>

    </ul>


  </div>


</template>
<style scoped>
  h1{
    text-align: left;
    font-size :16px;
    margin:10px 0;
  }
.recommended{
  display : flex;
  justify-content:flex-start;
  padding: 0 15px;

  flex-wrap:wrap;
  text-align: left;
}
.recommended li{
  margin-bottom:10px;
  width :30%;
  margin-right:5%;
}
  .recommended li:nth-child(3n){
    margin-right:0%;
  }
  .recommended li img{
    width :100%;
  }
.songName{
  color: #666;
  font-size: 12px;
}
.singer{
  color: #00e09e;
  font-size: 1rem;
}


</style>
<script>
  import banner from './banner.vue'
  import axios from 'axios'
  export default{
    data(){
      return {
          arr:[],
      }
    },
    mounted(){
      this.list();
    },
    methods:{
        list(){
            let vm = this;
            axios.get('../static/test.json').then((res)=>{
                vm.arr=res.data.data;
            })
        }
    },
    components: {
      "v-banner": banner
    }


  }

</script>
