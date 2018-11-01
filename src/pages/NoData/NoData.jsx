import React, { Component } from 'react'
import './index.less'
export default class NoData extends Component {
  render() {
    return (
     <div className='no-data'>
        <img src={this.props.src} alt="" />
        <p>{this.props.text}</p>
        {/* <img src='/static/imgs/icons/img_cloud.png' alt="" />
        <p>暂无文件</p> */}
      </div>
    )
  }
}
