import React, { Component, Fragment } from 'react'
import { Pagination,message,Tooltip } from 'antd';
import moment from 'moment'
import {timeDiff} from '@/common/js/index'
export default class Coursestandard extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      type: 1,
      pageSize: 4,
      total:4,
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
                  <h3><Tooltip placement="topLeft" title={res.course_name}>{res.course_name}</Tooltip></h3>
                  <p><Tooltip placement="topLeft" title={res.class_name}><span>{res.class_name}</span></Tooltip></p>
                  <span className='Preclass' style={styles}>{entryBtnTxt}</span>
                  <div className='courseList-box'>
                    <p><span>开始时间 : </span><span>{this.startTime(res.class_btime, res.role)}</span></p>
                    <p><span>结束时间 : </span><span>{this.endTime(res.class_etime, res.role)}</span></p>
                    <button className='courseListicon icon-noclick' style={imgPosition} 
                        // disabled={entryBtnDisabled}
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
            onChange={(page, pageSize) => {
              changePage(page)
            }} 
            total={total}
            pageSize={this.state.pageSize} />
            
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
}
