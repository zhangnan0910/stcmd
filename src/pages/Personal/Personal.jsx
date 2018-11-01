import React, { Component, Fragment } from 'react'
import Http from "@/utils/http"

import './Personal.less'
import {
  Form,
  message,
  Modal,
  Button
} from 'antd';
import {
  GET_IMGCHANGE_SUCCESS, // 头像路径
} from '@/stores/reducer/variable'
import PersonalModel from '@/pages/Personal/PersonalModel'
const FormItem = Form.Item;
import Random from '@/utils/random'
import {connect} from 'react-redux'
class Personal extends Component {
  constructor() {
    super()
    this.state = {
      account: '',// 账号
      nickName: '',// 昵称
      institutionName: [],
      editNameFlag: true,
      flag: false,
      avatar: '',// 头像
      visible: false,
      footerVisible: false,
      content: <Button type="primary">保存头像</Button>,
      imgbtn:false
    }
  }
  componentDidMount() {
    Http.post('/edu/get-user-info')
      .then(res => {
        if (res.error_info.errno === 1) {
          let avatar = res.data.avatar ? res.data.avatar : Random(res.data.userId)
          this.setState({
            nickName: res.data.nickName,// 昵称
            account: res.data.userName,// 账号
            institutionName: res.data.schoolList,
            avatar
          })
        }
      }).catch((error) => { })

  }
  render() {
    let { institutionName, editNameFlag, nickName, account, avatar } = this.state
    // let imgUrl = sessionStorage.getItem('Personal-settings-img') ? sessionStorage.getItem('Personal-settings-img') : avatar
    // this.props.imgsData(imgUrl)
    // if(sessionStorage.getItem('Local-picture')){
    //   this.props.imgsData(sessionStorage.getItem('Personal-settings-img'))
    //     sessionStorage.removeItem('Local-picture')
     
    // }
    let imgUrl = avatar
    return (
      <div className='personal-home-page'>
        <div className='personal-home-imgbox'  
          onMouseEnter={()=>this.setState({ imgbtn: true })} 
          onMouseLeave={()=>{this.setState({ imgbtn: false })}}>
          <img src={imgUrl} ref={e => this.imgs = e}  
             alt="" />
            {this.state.imgbtn&&<div onClick={() => { this.setState({ visible: true }) }}>编 辑</div>}
        </div>
        <Form style={{ marginTop: 25 }}>
          <div
            onMouseLeave={() => { this.editChange() }}>
            <FormItem
              label="用户昵称"
              style={{ display: 'flex', padding: "20px 0", marginBottom: 0 }}>
              <div ref='nickName' style={{ display: 'flex', width: '100%' }}>
                {
                  editNameFlag ? <span>{nickName}</span> : <input
                    type="text"
                    placeholder="请输入课程标题"
                    className="ant-input ant-input-bgcolor"
                    value={nickName}
                    onChange={(e) => {
                      this.setState({
                        nickName: e.target.value
                      })
                    }} />
                }
                <span className='courseListicon editnameicon' onClick={() => {
                  this.setState({
                    editNameFlag: false,
                    flag: true
                  })
                }}></span>
              </div>
            </FormItem>
          </div>
          <FormItem
            label="机构名称"
            style={{ display: 'flex', }}>
            {institutionName[0] ? institutionName.map(res => {
              return <span className='tags' key={res.id}>{res.schoolName}</span>
            }) : <span className='tags' color='red'>暂时未加入任何机构</span>}
          </FormItem>
          <FormItem
            label="账号"
            style={{ display: 'flex', marginTop: 25 }}>
            <input
              type="text"
              placeholder="请输入课程标题"
              className="ant-input"
              value={account}
              disabled />
          </FormItem>
        </Form>
        <Modal
          visible={this.state.visible}
          width={748}
          footer={false}
          style={{ height: 532, overflow: 'hidden' }}
          onCancel={() => { this.setState({ visible: false }) }}>
          <PersonalModel
            // ref={(e) => this.PersonalModel = e}
            CustomHead = {this.CustomHead} 
            refData = {this.getImgData}
            visible={(e) => { this.setState({ visible: e }) }} />
        </Modal>

      </div>
    )
  }

  // 编辑昵称
  editChange = () => {
    let { flag, nickName } = this.state
    if (nickName.length <= 15 && nickName.length > 0) {
      if (flag) {
        Http.post('/edu/update-user-info', {
          nickName
        })
          .then(res => {
            if (res.error_info.errno === 1) {
              this.setState({
                editNameFlag: true,
                flag: false
              })
            }
          }).catch((error) => { })
      }
    } else {
      message.destroy()
      message.error('请输入1-15之间的字符')
    }
  }
  // 上传本地头像触发事件
  CustomHead = (e) =>{
    setTimeout(()=>{
      this.getImgData(sessionStorage.getItem('Personal-settings-img'))
    },1000)
  }
  // 编辑头像请求数据 
  getImgData = (e) =>{
    Http.post('/edu/update-user-info', {
      nickName: this.state.nickName,
      avatar: e
    })
      .then(res => {
        if (res.error_info.errno === 1) {
          this.props.imgsData(e)
          this.setState({
            avatar:e
          })
        }
      }).catch((error) => { })
  }
  componentWillUnmount() {
    if (sessionStorage.getItem('Personal-settings-img')) {
      Http.post('/edu/update-user-info', {
        nickName: this.state.nickName,
        avatar: sessionStorage.getItem('Personal-settings-img')
      })
        .then(res => {
          if (res.error_info.errno === 1) {
            sessionStorage.removeItem('Personal-settings-img')
          }
        }).catch((error) => { })
    }

  }
}
function mapDispatchToProps(dispatch) {
  return {
    imgsData(url){
      dispatch({
        type:GET_IMGCHANGE_SUCCESS,
        payload:url
      })
    }
  }
}
function mapStateToprops(state) {
  return {
     getMouth:state.imgChange
  }
}
export default connect(mapStateToprops, mapDispatchToProps)(Personal) 