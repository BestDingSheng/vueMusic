let img = require('../assets/img/def-img.jpg')

export default {
  playlist(state){
    return state.playlist
  },
  showplay(state){
    return state.isShowPlayInfo
  },
  getmusicList(state){
    return state.musicList
  },
  songImg(state){
    if (state.musicList.length==0){
      // return '/static/img/def-img.jpg'
      return img
    }else {
      if (!state.musicList[state.musicPlace].img){
        return img
      }else {
        return state.musicList[state.musicPlace].img
      }
    }
  },
  nowSong(state){
    if(state.musicPlace == -1){
      return {songid:-1,name:'歌名',singer:'歌手'}
    }else {
      return state.musicList[state.musicPlace]
    }
  },
  currentTime(state){
    return state.currentTime
  },
  duration(state){
    return state.duration
  },
  playState(state){
    return state.playState
  },
  total(state){
    return state.musicList.length;
  },
  getMusicPlace(state){
    return state.musicPlace
},
  leftstate(state){
    return state.leftPopup
  }


}
