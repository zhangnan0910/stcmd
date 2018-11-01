import React, { Component, Fragment } from 'react'
import { getTime,timeDiff,Share } from "@/common/js/index"
import { Pagination,message ,Tooltip,Modal,Button,Input} from 'antd';
import {CopyTxt} from "@/common/js/index"
import moment from 'moment'
import { constants } from 'os';
export default class Coursestandard extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      type: 0,
      page: 1,
      pageSize: 4,
      total:4,
      newDate:new Date(),
      visible:false,
      shareUrl:'',
      timer:getTime(moment().format('YYYY-MM-DD'))
    }
  }
  render() {
    let {data,total,changePage} = this.props
      return (
        <Fragment>
          <ul className='courseList'>
            {
              data.map((res, index) => {
                const {entryBtnDisabled, entryBtnTxt,styles,imgPosition} = timeDiff(res);
                return <li key={index}>
                  <h3>
                    <Tooltip placement="topLeft" title={res.course_name}>{res.course_name}</Tooltip>
                    <button className='courseListicon shareicon' onClick={()=>{
                        if(entryBtnTxt==='已完成'){
                          message.destroy()
                          message.error('课节'+entryBtnTxt+',不可分享')
                        }else{
                          this.setState({visible:true})
                          //https://devapi3tclass.3ttech.cn/edu/room-share?id=400938
                          // window.open(Share()+res.class_id)
                          this.setState({shareUrl:Share()+res.class_id}) 
                        }
                    }}></button>
                  </h3>
                  <p><Tooltip placement="topLeft" title={res.class_name}><span>{res.class_name}</span></Tooltip></p>
                  <span className='Preclass' style={styles}>{entryBtnTxt}</span>
                  <div className='courseList-box'>
                    <p><span>开始时间 : </span><span>{this.startTime(res.class_btime, res.role)}</span></p>
                    <p><span>结束时间 : </span><span>{this.endTime(res.class_etime, res.role)}</span></p>
                    <button className='courseListicon icon-noclick' style={imgPosition} 
                        onClick={() => { 
                          message.destroy()
                          entryBtnDisabled?message.error('课节'+entryBtnTxt+',不可进入'):window.open(res.room_url) 
                        }}
                    ></button>
                  </div>
                </li>
              })
            }
          </ul>
          <Pagination 
            defaultCurrent={1} 
            onChange={(page) => {
              changePage(page)
            }} 
            total={total}
            pageSize={4} />
            <Modal 
              title='课节分享'
              visible={this.state.visible}
              footer = {null}
              width = {454}
              onCancel={()=>this.setState({visible:false})}
            >
              <div className='modal-content'>
                <span>课节地址</span>
                <input className='ant-input' ref='inputVal' onChange={()=>{}} style={{borderRadius:4}} value={this.state.shareUrl}/>
                <span onClick={() => {
                  CopyTxt(this.refs.inputVal)
                }}>复制</span>
              </div>
            </Modal>
        </Fragment>
      )
  }
  // 开始时间
  startTime = (date, role) => {
    return moment(moment.unix(date)).format('YYYY-MM-DD HH:mm')
  }
  // 结束时间
  endTime = (date) => {
    return moment(moment.unix(date)).format('YYYY-MM-DD HH:mm')
  }
  Jump = (classId,b) => {
    window.open(url)
  }
}
