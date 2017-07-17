import * as types from './types'

export default {
  [types.OPENPLAYLIST](state,playlist){
    state.playlist=true
  },
  [types.CLOSEPLAYLIST](state,playlist){
    state.playlist=false
  },
  [types.SHOWPLAYINFO](state){
    state.isShowPlayInfo=!state.isShowPlayInfo
  },
  [types.SENDAUDIO](state,obj){
    state.dom=obj
  },
  [types.SENDMUSIC](state,obj){

    state.musicList.push(obj);
    state.musicPlace=state.musicList.length-1;
    state.dom.src="http://ws.stream.qqmusic.qq.com/"+state.musicList[state.musicPlace].songid+".m4a?fromtag=46";

    // console.log(state.dom.currentSrc)
    setTimeout(function(){
      console.log(state.dom.paused); // 判断音乐资源是否有效
      if(state.dom.paused){
        alert('加载失败换歌试试吧')
        state.playState=false;

      }else{
        state.playState=true;
      }
    },2000)

    },
  [types.SWITCHPLAY](state){
    if(state.playState){
      state.playState=false;
      state.dom.pause()
    }else{
      state.playState=true;
      state.dom.play()
    }
  },
  [types.SETCURTIME](state,val){
    state.dom.currentTime=val;
  },
  [types.DELMUSIC](state,index){
    state.musicList.splice(index,1)
    state.dom.src='';
  },
  [types.SELECTMUSIC](state,index){
    // state.
    state.musicPlace=index;
    state.dom.src="http://ws.stream.qqmusic.qq.com/"+state.musicList[index].songid+".m4a?fromtag=46";
  },
  [types.NEXTMUSIC](state,index){
    let mlength=state.musicList.length
    let weizhi = state.musicPlace+1
    if(weizhi>=mlength){
      state.musicPlace=0
    }else{
      state.musicPlace=weizhi;
    }
    console.log(state.musicPlace)
    console.log(weizhi)
    state.dom.src="http://ws.stream.qqmusic.qq.com/"+state.musicList[state.musicPlace].songid+".m4a?fromtag=46";
  },
  [types.BEFOREMUSIC](state,index){
    let mlength=state.musicList.length
    let weizhi = state.musicPlace-1
    if(weizhi<0){
      state.musicPlace=mlength-1
    }else{
      state.musicPlace=weizhi;
    }

    console.log(state.musicPlace);

    state.dom.src="http://ws.stream.qqmusic.qq.com/"+state.musicList[state.musicPlace].songid+".m4a?fromtag=46";
  },

}
