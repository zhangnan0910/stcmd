import React, { Component, Fragment } from 'react'
import { Modal,Input,Button,message,Tooltip } from 'antd';
import Http from "@/utils/http"
import {CopyTxt} from "@/common/js/index"
import Tabs from '../../components/Tabs/index'
import './style.less'
export default class ExperienceRoom extends Component {
  constructor(){
    super()
    this.state = {
      visible : false,
      roomId:'', // 我的房间号
      otherRoom:'', // 他人房间号
      roomUrl:'', // 我的房间跳转地址
      mytips : '您可以分享自己的房间号，邀请其他人进入房间一起体验',
      othertips:'您可输入他人的房间号，点击进入他人房间一起体验',
      tabVal:['我的房间','他人房间'],
      tabFlag:0,
    }
  }
  render() {
    return (
      <Fragment>
        <Tooltip placement="right" title={<p>体验房间</p>}>
          <li
            onClick={() => {
              this.showModal()
              this.props.changeActive(3)
            }}
          >
          <span 
          className = {`courseListicon${this.props.activeClass===3?' ExperienceRoomicon':' ExperienceRoomicons'}`}
          ></span></li>
        </Tooltip>
        
        <Modal
          width='340px'
          visible={this.state.visible}
          footer={false}
          onCancel={this.hideModal}
        >
          <Tabs tabVal={this.state.tabVal} tabChange = {this.tabChange}/>
          <div className='ExperienceRoom-content'>
            <div className='ExperienceRoom'>
              <span>房间ID :</span>
              {this.state.tabFlag===0?<Fragment>
                <input type="text" ref='inputVal' value={this.state.roomId} onChange={() => { }} />
                <span onClick={() => {
                  CopyTxt(this.refs.inputVal)
                }}>复制</span>
              </Fragment> :<input type="text" 
                onFocus={(a)=>{a.target.classList.add("bgColor")}} 
                onBlur={(a)=>{a.target.classList.remove("bgColor")}}  
                value={this.state.otherRoom} onChange={(e) => {
                //className={bgColor}
                this.setState({
                  otherRoom: e.target.value
                })
             }} />}
            </div>
            <div className='ExperienceRoom'>
              <span>提示 :</span>
              <p>{this.state.tabFlag===0?this.state.mytips:this.state.othertips}</p>
            </div>
          </div>
          <span className='get-into-room'
            onClick={() => {
              this.hadelChang()
            }}>
          <span className='courseListicon icon-infoclick'></span>进入体验</span>
        </Modal>
      </Fragment>
    )
  }
  tabChange = (e) =>{
    this.setState({
      tabFlag : e,
    })
  }
  hadelChang = () => {
    let {otherRoom,roomUrl,roomId,tabFlag} = this.state
    // 我的房间直接跳转
    if(tabFlag===0){
      window.open(roomUrl)
      this.setState({
        visible:false
      })
    }else{
      if(roomId===otherRoom){
        message.destroy()
        message.error('请输入他人房间号')
      }else if(!!otherRoom){
        var newWin = window.open('/loading');
        Http.post('/course/get-share-room-url',{
          classId:otherRoom
        }).then(res=>{
          if(res.error_info.errno==1){
            newWin.location.replace(res.data);
          }else{
            message.destroy()
            message.error('请输入正确的房间号')
          }
        }).catch ((error)=> {})
      }else{
        message.destroy()
        message.error('请输入他人房间号')
      }
    }
  }
  showModal = () => {
    this.setState({visible: true,})
    Http.post('/course/create-experience-class').then(res=>{
        this.setState({
          roomId:res.data.classId,
          roomUrl:res.data.room_url
        });
    }).catch ((error)=> {})
}
hideModal = () => {
  this.setState({
    visible: false,
  });
}
componentWillUnmount = () => {
  this.setState = (state,callback)=>{
    return;
  };
}
}
