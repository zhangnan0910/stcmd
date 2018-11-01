import React, { Component,Fragment } from 'react'
import {
    Input
} from 'antd'
const Search = Input.Search;
export default class CloudDisktop extends Component {
  constructor(){
    super()
    this.state = {
      connect:'',
      httpFlag:true
    }
  }
  render() {
    return (
   
          <div>
          {
            !!this.props.fileName?<Fragment>
              <span className='color-title' onClick={()=>{
                this.props.refreshData(this.props.fileName)
              }}>返回上一级</span> <span>&nbsp;|&nbsp;</span>
              <span>{this.props.fileName}</span>
            </Fragment>:<span>全部文件</span>
          }
          </div>
    )
  }
}