import React, { Component,Fragment } from 'react'
import CourseList from '@/pages/Course/CourseTab/CourseList';
import CourseComplete from '@/pages/Course/CourseTab/CourseComplete'
export default class CourseCenter extends Component {
  constructor(){
    super()
    this.state = {
      courseFlag:1,
    }
  }
  
  courseFlagtab=(e)=>{
    this.setState({courseFlag:e})
  }
  render() {
    let {courseFlag} = this.state
    return (
      <Fragment>
          {/* <Tabs courseFlag = {courseFlag} courseFlagtab={this.courseFlagtab}/> */}
          <div className='course-tab'>
            <span className={courseFlag===1?'active':''} onClick={()=>{this.courseFlagtab(1)}}>正在参与</span>
            <span className={courseFlag===2?'active':''} onClick={()=>{this.courseFlagtab(2)}}>已完成</span>
          </div>
          <div className='course-content'>
              {
                courseFlag===1?
                <CourseList ></CourseList>:
                <CourseComplete ></CourseComplete>
              }
          </div>
      </Fragment>
    )
  }
}

