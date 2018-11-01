import React, { Component } from 'react'
import "./index.less"
import {
  Form,
  Checkbox,
  message
} from 'antd';
import Http from "@/utils/http"
import Userlogin from './Userlogin';

const FormItem = Form.Item;
class index extends Component {
  constructor() {
    super()
    this.state = {
      flagActive: 1,
    }
  }
  // 实现tab切换样式
  changeTab(e) {
    this.setState({
      flagActive: e
    })
  }
  render() {
    let { flagActive} = this.state
    return (
      <div className="education-login">
        <img className="education-logo" src={require("../../assets/imgs/login/logo_.3tclass.cn.png")} alt="Logo" />
        <div className="education-login-left-wrap">
          <div className="education-login-left-mask">
            <div className="education-login-left">
              <div className="education-login-title-wrap">
                <h1 className="education-login-title">为教育的每一点进步而努力!</h1>
              </div>
              <ul className="education-download-list">
                <div className="education-download-group">
                  <li className="education-download-item">
                    <div className="education-download-item_icon icon-ios"></div>
                    <img className="education-download-item_qrCode" src={require("../../assets/imgs/login/qrcode_ios_.3tclass.cn.png")} alt="qrcode" />
                    <a className="education-download-btn-wrap" href="https://www.pgyer.com/3T_Class_ios" target="_Blank">
                      <button className="education-download-item_btn">
                        iOS
                          </button>
                    </a>
                    <a className="education-download-item_a" href="http://3ttech.cn/static/3tclass/3tclass2yd.pdf" download="" target="_Blank">使用手册&gt;</a>
                  </li>
                  <li className="education-download-item">
                    <div className="education-download-item_icon icon-android"></div>
                    <img className="education-download-item_qrCode" src={require("../../assets/imgs/login/qrcode_android_.3tclass.cn.png")} alt="qrcode" />
                    <a className="education-download-btn-wrap" href="https://www.pgyer.com/3T_Class_Android" target="_Blank">
                      <button className="education-download-item_btn">
                        Android
                            </button>
                    </a>
                    <a className="education-download-item_a" href="http://3ttech.cn/static/3tclass/3tclass2yd.pdf" download="" target="_Blank">使用手册&gt;</a>
                  </li>
                </div>
                <div className="education-download-group">
                  <li className="education-download-item">
                    <div className="education-download-item_icon icon-web"></div>
                    <img className="education-download-item_qrCode" src={require("../../assets/imgs/login/windows.png")} alt="qrcode" />
                    <button onClick={this.focusInput} className="education-download-item_btn">
                      Web
                      </button>
                    <a className="education-download-item_a" href="http://3ttech.cn/static/3tclass/3tclass2web.pdf" download="" target="_Blank">使用手册&gt;</a>
                  </li>
                  <li className="education-download-item">
                    <div className="education-download-item_icon icon-windows"></div>
                    <img className="education-download-item_qrCode" src={require("../../assets/imgs/login/browser.png")} alt="qrcode" />
                    <a className="education-download-btn-wrap" href="http://3ttech.cn/static/3tclass/3tclass2.exe" download="">
                      <button className="education-download-item_btn">
                        Windows
                            </button>
                    </a>
                    <a className="education-download-item_a" href="http://3ttech.cn/static/3tclass/3tclass2pc.pdf" download="" target="_Blank">使用手册&gt;</a>
                  </li>
                </div>
              </ul>
            </div>
          </div>
          
        </div>

        <div className="education-login-right-wrap">
          <div className="education-login-right">
            <div className="education-login-con">
                <Userlogin {...this.props} />
            </div>
          </div>
          <div className="education-copyright">Copyright © 2017 北京三体云联科技有限公司 版权所有</div>
        </div>
      </div>
    )
  }

}
export default Form.create()(index)
