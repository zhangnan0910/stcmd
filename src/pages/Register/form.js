import React, { Component } from 'react'
import request from '@/utils/http'
import {
  Input,
  Button,
  Form,
  Checkbox, 
  message
} from 'antd'

@Form.create()
export default class RegisterForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timing: 0
    }
  }
   // 校验账号是否注册15711262197
   validatorAccount = async (rule, value, callback) => {
    let result = await request.post('/user/verify-account',{ 
      userName: value
    })
    if (result.error_info.errno == 1) {
      callback('该手机号已注册')
    } else {
      callback()
    }
  }
  // 手机号格式校验
  validatorFormat = ( rule, value, callback) => {
    this.timer = 0
    if (!(/^1[34578]\d{9}$/.test(value))) {
      callback('手机号格式不正确') 
    } else {
      callback()
    }
  }
  // 提交注册参数
  onSubmit = (e) => {
    e.preventDefault();
    const { onSuccess } = this.props
    const { validateFieldsAndScroll } = this.props.form
    //18050202020
    validateFieldsAndScroll((err, values) => {
      console.log(values)
      if (!err&&values.agreement) {
        request.post('/user/register',values)
        .then(res => {
          if (res.error_info && res.error_info.errno == 1) {
            onSuccess()
          } else {
            message.destroy()
            message.error(res.error_info.error)
          }
        })
      }
    })
  }
 
  onCaptcha = async () => {
    try {
      let result = await this.requestCaptcha()
      this.setState({ timing: 60 }, () => {
        this.interval = setInterval(() => {
          if (this.state.timing > 0) {
            this.setState({ timing: this.state.timing - 1 })
          }
        }, 1000)
      })
   
    } catch (error) {
      message.error(error)
    }

  }

  requestCaptcha(validate = 'telephone', key = 'mobile') {
    const { validateFields } = this.props.form
    return new Promise((resolve, reject) => {
      validateFields([validate], (err, value) => {
        if (!err) {
          let data = { [key]: value[validate] }
          request.post('/user/get-mobile-captcha',data)
          .then(res => {
            if (res.error_info && res.error_info.errno == 1) {
              resolve(res.error_info.error)
            } else {
              reject(res.error_info.error || 'error')
            }
          })
        } else {
          reject('输入不正确')
        }
      })
    })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入密码不相同');
    } else {
      callback();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }
  render() {
    const { getFieldDecorator } = this.props.form
    let { timing } = this.state
    // let text = timing === true ? '' : '重新发送验证码'
    let suffix = (
      <Button onClick={this.onCaptcha} disabled={timing !== 0}>
        {timing === 0 ? '发送验证码' : `${timing}s`}
      </Button>
    )
    return (
      <Form layout="vertical">
        <Form.Item label="手机号" >
          {
            getFieldDecorator('telephone', {
              validateTrigger: 'onBlur',
              validateFirst: true,
              rules: [
                { required: true,  message: '必须输入手机号' },
                { validator: this.validatorFormat }, 
                { validator: this.validatorAccount } 
              ]
            })(
              <Input placeholder="请输入手机号码" onBlur={this.onVerifyAccount}/>
            )
          }
          
        </Form.Item>
        <Form.Item label="验证码" >
          {
            getFieldDecorator('code', {
              rules: [
                { required: true,  message: '验证码输入不能为空' },
              ]
            })(
              <Input
                
                placeholder="请输入验证码"
                suffix={suffix}
              />
            )
          }
          
        </Form.Item>
        <Form.Item label="密码" >
          {
            getFieldDecorator('password', {
              rules: [
                { required: true,  message: '密码输入不能为空' },
              ]
            })(
              <Input type="password" placeholder="请输入6~32位新密码" />
            )
          }
          
        </Form.Item>
        <Form.Item label="确认密码" >
          {
            getFieldDecorator('confirm', {
              rules: [
                { required: true,  message: '确认密码不能为空' },
                { validator: this.compareToFirstPassword }
              ]
            })(
              <Input type="password" placeholder="请输入确认密码" />
            )
          }
        
        </Form.Item>
        <Form.Item>
          { getFieldDecorator('agreement', {
            valuePropName: 'checked',
            rules: [
                { required: true,  message: '请阅读并勾选协议' },
              ]
          })(
            <Checkbox>阅读并接受 <a href="https://devapi3tclass.3ttech.cn/index/server-clause" target="__blank">《三体云用户协议》</a></Checkbox>
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={this.onSubmit}>提交</Button>
        </Form.Item>
      </Form>
    )
  }
}