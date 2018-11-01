import React, { Component } from 'react'
import { Modal, Carousel, Button} from 'antd'
import { parseURL } from './utils'
// import {  } from 'antd/lib/radio';
export default class Dialog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      iframs: false,
      url: null,
      images: [],
    }
  }
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyPress)
  }
  onKeyPress = (e) => {
    if (e.keyCode === 39 || e.keyCode === 40) {
      this.onNext()
    } else if (e.keyCode === 37 || e.keyCode === 38) {
      this.onPrev()
    }
  }
  // 下一个操作
  onNext() {
    this.refs.carousel && this.refs.carousel.next()
  }
  // 上一个操作
  onPrev() {
    this.refs.carousel && this.refs.carousel.prev()
  }

  setData(data) {
    let images = data.imgSrcData != '' ? JSON.parse(data.imgSrcData) : []
    this.setState({
      visible: true,
      url: data.originalSrc,
      iframs: data.type == 2 ? data.htmlUrl : false ,
      images,
    })
  }
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  setControl(type, data) {
    var sArgName = "type=" + type + "&data=" + data;
    this.exec_iframe(sArgName);
  }
   exec_iframe(sArgName) {
    var myURL = parseURL(document.getElementById('ifr').getAttribute('src'));
    var url = myURL.protocol + "://" + myURL.host + '/execSetControl.html?' + sArgName + "&r=" + Math.random();
    if (typeof(exec_obj) == 'undefined') {
        exec_obj = document.createElement('iframe');
        exec_obj.name = 'tmp_frame';
        exec_obj.src = url;
        exec_obj.style.display = 'none';
        document.body.appendChild(exec_obj);
    } else {
        exec_obj.src = url;
    }
  }
  componentWillMount() {
    window.removeEventListener('keydown', this.onKeyPress)
  }
  render() {
    const { visible, images, iframs, url } = this.state
    let element = (
      <div>
        <Button 
          type="primary" 
          icon="download" 
          href={`http://dev.api.3tclass.3ttech.cn/netdisk/download?fileUrl=${url}`}>
          点击下载
        </Button>
      </div>
    )
    return (
      <Modal
        title='查看文件'
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={element}
        centered={true}
      >
       <div style={{ width: 470, height: 300, overflow: 'scroll'}}>
         {
           iframs ? (
               <iframe 
                 id="ifr" 
                 style={{width: '100%', height: '100%'}} 
                 frameBorder="0" 
                 scrolling="no"
                 name="myframe" 
                 src={iframs}/>
               ) 
               : (
                 <Carousel effect="fade" ref="carousel">
                 {
                   images.map((d, i) => <img src={d} key={i} style={{ width: 450, height: 'auto' }}/>)
                 }
             </Carousel>
           )
         }

       </div>
      </Modal>
    )
  }
}