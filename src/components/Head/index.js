import React, { PureComponent } from 'react'
import './style.less'
export default class Header extends PureComponent {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div className="education__header">
        <div className="education__header-left">
          <div className="education__header_logo"/>
          <span>用户注册</span>
        </div>
        <div className="education__header-right">
          已有账号， 
          <a href="/login">去登录</a>
        </div>
      </div>
    )
  }
}