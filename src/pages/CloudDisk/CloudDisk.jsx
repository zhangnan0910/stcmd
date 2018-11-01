import React, { Component,Fragment } from 'react'
import Institution from '@/pages/CloudDisk/Institution/Institution'
import Mine from '@/pages/CloudDisk/Mine/Mine'
import './index.less'
// import NoData from '@/pages/NoData/NoData'
import Class from '../../pages/CloudDisk/Class';
export default class CloudDisk extends Component {
  constructor(){
    super()
    this.state = {
        tabFlag:sessionStorage.getItem('cloudDiskTab')?sessionStorage.getItem('cloudDiskTab'):'0'
    }
}
  render() {
    let {tabFlag} = this.state
    return (
      <Fragment>
          <div className='cloud-disk-tab'>
              <span className={tabFlag==='0'?'active':''} onClick={()=>{this.changeTab('0')}}>3T Class</span>
              <span className={tabFlag==='1'?'active':''} onClick={()=>{this.changeTab('1')}}>机构云盘</span>
              <span className={tabFlag==='2'?'active':''} onClick={()=>{this.changeTab('2')}}>我的云盘</span>
          </div>
          <div className='CloudDisk-content'>
            {tabFlag==='0'?<Class />:null}
            {tabFlag==='1'?<Institution />:null}
            {tabFlag==='2'?<Mine />:null}
          </div>
      </Fragment>
    )
  }
  changeTab = (val) =>{
    sessionStorage.setItem('cloudDiskTab',val)
    this.setState({tabFlag:val})
  }
}
