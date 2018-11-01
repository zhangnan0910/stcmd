import React, { Component, Fragment } from 'react'
import {
  Calendar,
  message
} from 'antd';
import {connect} from 'react-redux'
import 'moment/locale/zh-cn';
import moment from 'moment'
import Http from "@/utils/http"
import {
  GET_CHANGDATE_START
} from '@/stores/reducer/variable'
let myDate = new Date()
let myYear = myDate.getFullYear();
let myMonth = (myDate.getMonth() + 1) < 10 ? '0' + (myDate.getMonth() + 1) : (myDate.getMonth() + 1);
let myDay = myDate.getDate(); //获取当前日(1-31)
let myDates = myYear +''+ myMonth

class CourseCalendar extends Component {
  constructor(){
    super()
    this.state = {
      monthData:[],
      myDates:myYear +''+ myMonth
    }
  }
  componentDidMount(){
    this.getMonthData(this.state.myDates)
  }
  render() {
    return (
      <Fragment>
        <span>课程日历</span>
        <div style={{ width: '100%', border: '1px solid #ddd' }}>
          <Calendar
            fullscreen={false}
            onChange = {this.onChange}
            // onPanelChange={this.onPanelChange}
            dateFullCellRender={this.dateCellRender}
          />
        </div>
        <div className='coursebox'>
          <span className='CourseCalendarspan'></span>
          <span>有课提醒</span></div>
      </Fragment>
    )
  }
  getMonthData = (myDates) => {
    //myDates?myDates:this.state.myDates
    Http.post('/course/get-month-class-date',{
        month:myDates
      }
    ).then(data=>{
      //?myDates:this.state.myDates
      if(data.error_info.errno===1){
        sessionStorage.setItem('monthData',JSON.stringify(data.data))
        this.setState({
          monthData:data.data,
          myDates:myDates
        })
      }else if(data.error_info.errno===106){
        this.setState({
          monthData:[],
          myDates:myDates
        })
      }else{
        message.error(data.error_info.error)
      }
    }).catch(e=>{})
  }
  
  onChange=(value, mode)=> {
    let xx = value.format('YYYY-MM-DD').split('-')
    this.getMonthData(xx[0]+ '' +xx[1])
    this.props.getChangeDate(value.format('YYYY-MM-DD'))
    sessionStorage.setItem('zTimer',value.format('YYYY-MM-DD'))
  }
  // 重新渲染日历
  dateCellRender=(val)=> {
    let {myDates,monthData} = this.state
    let day = moment(val).format().split('T')[0].slice(-2)
    let month = moment(val).format().split('T')[0].slice(5, 7)
    if(monthData[0]){
      if (monthData.indexOf(day * 1) > -1 && month == myDates.slice(-2)) {
        return (
          <div className="ant-fullcalendar-date">
            {myDay==day?<div className="ant-fullcalendar-value">{day}</div>:<div className="ant-fullcalendar-value" style={{ background: '#FFECEB', border: '1px solid #FFC2BF' }}>{day}</div>}
          </div>
        )
      } else {
        return (
          <div className="ant-fullcalendar-date">
            <div className="ant-fullcalendar-value">{day}</div>
          </div>
        )
      }
    }else{
      return (
        <div className="ant-fullcalendar-date">
          <div className="ant-fullcalendar-value">{day}</div>
        </div>
      )
    }
  }
  componentWillUnmount(){
    sessionStorage.setItem('zTimer',moment().format('YYYY-MM-DD'))
  }
  // 请求有课程日期
  // onPanelChange=(value) =>{
  //   let val = moment(value).format().split('T')[0].split('-')
  //   Http.post(
  //     {
  //       month:val[0]+val[1]
  //     },'/course/get-month-class-date"'
  //   ).then(data=>{
  //     if(data.error_info.errno===1){
  //       this.setState({
  //         monthData:data.data,
  //         myDates:val[0]+val[1]
  //       })
  //     }
  //   })
  // }
}
function mapDispatchToProps(dispatch) {
  return {
    getChangeDate(val){
      dispatch({
        type: GET_CHANGDATE_START,
        payload: val
      })
    }
  }
}
function mapStateToprops(state) {
  return {
    getMouth:state.getCourse
  }
}
export default connect(mapStateToprops, mapDispatchToProps)(CourseCalendar)