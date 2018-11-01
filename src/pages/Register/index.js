import React, { Component } from 'react'

import Head from '@/components/Head'
import RegisterForm from './form'
import RegisterSuccess from './success'

import './style.less'

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      success: false
    }
  }
 
  onSuccess = () => {
    this.setState({
      success: true
    })
  }

  render() {
    const { success } = this.state
    return (
      <div className="education-register">
        <Head />
        <div className="education-register__container">
          <div className="education-register-bg">
            用户注册
          </div>
          <div className="education-register-form">
            {
              success ? <RegisterSuccess /> : <RegisterForm onSuccess={this.onSuccess}/>
            }
          </div>
        </div>
      </div>
    )
  } 
}