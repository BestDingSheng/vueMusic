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
      return '/static/img/def-img.9aec4b8.jpg'
    }else {
      if (!state.musicList[state.musicPlace].img){
        return '../assets/img/def-img.jpg'
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
}


}
