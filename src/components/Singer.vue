<template>

<div>
  我是body
</div>
</template>

<script>
  import jsonp from 'jsonp'

  export default{
      data(){
          return{

          }
      },
    mounted(){
        this.test();
    },
    methods:{
        test(){

          let url ='https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=jsonp&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1492177982521'

          jsonp(url,{param:'jsonpCallback',
           prefix:'',
        },function(err,data){
              console.log(data.data.slider);

          })

        }
    }
  }


</script>
<style>

</style>
