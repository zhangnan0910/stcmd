import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
@withRouter
export default class RegisterSuccess extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.timer = setTimeout(() => {
      this.props.history.push('/login')
    }, 5000)
  }
  render() {
    return (
      <div className="education-register__success">
          <div className="education-register__success-icon"></div>
          <span className="t1">注册成功</span>
          <span className="t2">尊敬的用户，恭喜您成功注册3T Class账号</span>
          <Link to="/login">立即登录</Link>
          <span className="t3">5秒后自动登录</span>
      </div>
    )
  }
}