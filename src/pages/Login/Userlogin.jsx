import React, { Component } from 'react'
import {BackstageUrl} from '@/common/js/index'
import {
  Form,
  Checkbox,
  message
} from 'antd';
import moment from 'moment'
import Http from "@/utils/http"
import { setCookie } from "@/utils/cookies"
import { Link } from 'react-router-dom'
const FormItem = Form.Item;
class Userlogin extends Component {
  constructor() {
    super()
    this.state = {
      username: "",
      pwd: "",
      msg: "",
      tip: "",
      pwdtip:'',
      type: 1,
      disableFlag:false,
      errorText: "请输入正确的账号和密码",
    }
  }
  // 实现
  handleChange(e) {
    let name = e.target.name
    this.setState({
      [name]: e.target.value
    })
    // let tel = /^[1][3,4,5,7,8]\d{9}$/;
    let tel = /^\d{11}$/
    // 验证账号
    if (name == 'username') {
      if (tel.test(removeSpace(e.target.value)) ){
        this.setState({
          tip: ""
        })
      } else {
        this.setState({
          tip: "请输入正确的账号"
        })
      }
    }else if(name == 'pwd'){ // 验证密码
        if(e.target.value.length<=0){
          this.setState({
            pwdtips:'密码不能为空'
          })
        }else if(e.target.value.length<6||e.target.value.length>20){
          this.setState({
            pwdtips:'请输入6-20个字符'
          })
        }else{
          this.setState({
            pwdtips:''
          })
        }
      }
  }
  onSubmit = () => {
    let { username, pwd, type } = this.state
    // let tel = /^[1][3,4,5,7,8]\d{9}$/;
    let tel = /^\d{11}$/
    sessionStorage.setItem('personallLeftTab',1)
    if (!tel.test(removeSpace(username))) {
      this.setState({
        msg: "请输入正确的手机号和密码"
      })
      message.destroy();
      message.error("请输入正确的账号")
      return false
    }else if(pwd.length<6||pwd.length>20){
      message.destroy();
      message.error("请输入正确的密码")
      return false
    } else {
      this.setState({disableFlag:true})
      Http.post('/user/login',
        {
          userName: username,
          password: pwd,
          rememberMe: 0,
          type
        }
      ).then(data => {
        if (data.error_info.errno == "1") {
          setCookie("login-personal-token", JSON.stringify(data.data))
          message.destroy()
          message.success("登录成功")
          sessionStorage.setItem('zTimer',moment().format('YYYY-MM-DD'))
          if(sessionStorage.getItem('redirectClassId')){
            Http.post('/course/get-share-room-url',{
              classId: sessionStorage.getItem('redirectClassId'),
            }).then((res)=>{
                sessionStorage.removeItem('redirectClassId')
                location.href = res.data
            }).catch(e=>{})
          }else{
            setTimeout(() => {
              this.props.history.replace('/course')
            }, 2000)
          }
          
        } else {
          this.setState({disableFlag:false})
          message.destroy()
          message.error(data.error_info.error)
        }
      }).catch(()=>{this.setState({disableFlag:false})})
    }
  }
  render() {
    let { username, pwd } = this.state
    return (
      <Form className="login-form">
        <FormItem 
          label="手机号"
          help={this.state.tip}
        >
          <input
            type="text"
            name='username'
            value={username}
            autoComplete="off"
            style={{ height: 38 }}
            placeholder="请输入账号"
            className="ant-input"
            onChange={this.handleChange.bind(this)} />
        </FormItem>
        <FormItem 
          label="密码"
          help={this.state.pwdtips}
        >
          <input
            type="password"
            name='pwd'
            value={pwd}
            autoComplete="off"
            style={{ height: 38 }}
            placeholder="请输入密码"
            className="ant-input"
            onChange={this.handleChange.bind(this)} />
        </FormItem>
        <FormItem>
          {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: false,
            })(
              <Checkbox>七天免登陆</Checkbox>
            )}
            <a className="login-form-forgot" href="" style={{ color: "#0091F0" }}>忘记密码</a>
          </div> */}
          <button
            style={{ marginTop: 15 ,width:'100%'}}
            className="ant-btn login-form-button ant-btn-primary"
            onClick={this.onSubmit}
            disabled = {this.state.disableFlag}
          >登录</button>
          <div style={{ display:'flex',justifyContent:'space-between',marginTop:10 }}>
            <span onClick = {()=>{
              window.open(BackstageUrl())
            }} style={{ color: "#0091F0",cursor:'pointer' }}>机构管理后台登录</span>
            <Link to="register" style={{ color: "#0091F0" }}>个人注册</Link>
          </div>
        </FormItem>
      </Form>
    )
  }
}
function removeSpace(str){
  if(!str){
      return "";
  }
  return str.replace(/^\s+|\s+$/g,"");
}

export default Form.create()(Userlogin)