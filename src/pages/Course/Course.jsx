import React, { Component } from 'react'
import CourseCenter from '@/pages/Course/CourseTab/CourseCenter'
import CourseCalendar from '@/pages/Course/CourseCalendar'
import './Course.less'
export default class Cousre extends Component {
  constructor(){
    super()
    this.state = {
      days:''
    }
  }
  propsData = (e)=>{
    this.setState({
      days:e
    })
  }
  render() {
    return (
      <div className='Zcourse-box'>
          <div className='Zcourse-center'>
            <CourseCenter days={this.state.days}/>
          </div>
          <div className='Zcourse-right'>
            <CourseCalendar propsData={this.propsData}/>
          </div>
      </div> 
    )
  }
}
