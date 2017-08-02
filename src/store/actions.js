import  * as types from './types';

export default {

  openplaylist({commit,state},playlist){
    commit(types.OPENPLAYLIST,playlist)
  },
  closeplaylist({commit,state},playlist){
    commit(types.CLOSEPLAYLIST,playlist)
  },
  ShowPlayInfo({commit,state}){
    commit(types.SHOWPLAYINFO)
  },
  sendAudio({commit,state},obj){
    commit(types.SENDAUDIO,obj)
  },
  sendMusic({commit,state},obj){//添加音乐
    commit(types.SENDMUSIC,obj)
  },
  getcurrentTime({state}){
    state.currentTime=state.dom.currentTime
  },
  getDuration({state}){
    console.log('开始了22222')
    state.duration=state.dom.duration;
  },
  switchplay({commit,state}){
    commit(types.SWITCHPLAY)
  },
  setCurrentTime({commit,state},val){
      commit(types.SETCURTIME,val);
  },
  delmusic({commit,state},index){
    commit(types.DELMUSIC,index)
  },
  selectmusic({commit,state},index){
    commit(types.SELECTMUSIC,index)
  },
  nextmusic({commit,state}){
    commit(types.NEXTMUSIC)
  },
  beforemusic({commit,state}){
    commit(types.BEFOREMUSIC)
  },
  switchprop({commit,state}){
      commit(types.SWITCHPROP)
  },
  playend({commit,state}){
    commit(types.PLAYEND)
  }


}
