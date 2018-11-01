import React, { Component,Fragment } from 'react'
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import lrz from 'lrz'
import {Button} from 'antd';
import { dataUrlToFile, uploadFile, getcookie,baseUrl} from '@/common/js/index'

export default class Index extends Component {
  constructor(){
      super()
      this.state = {
        // 选择图片弹出图片显示框
        editImageModalVisible: false,
        // srcCropper: '',
        // selectImgName: '', //文件名称
        // selectImgSize: '', //文件大小
        // selectImgSuffix: '', //文件类型
        flag:true
      }
  }

  render() {
    if(this.props.data){
       let {
           editImageModalVisible,
           srcCropper
        } = this.props.data
        return (
            <Fragment>
                {editImageModalVisible && <Fragment>
                        <div className='PersonalModel-box-mark'>
                            {/* Cropper图片裁剪器 */}
                                <Cropper
                                    src={srcCropper} //图片路径，即是base64的值，在Upload上传的时候获取到的
                                    ref="cropper"
                                    preview = '.cropper-small'
                                    className="company-logo-cropper"
                                    viewMode={1} //定义cropper的视图模式
                                    zoomable={false} //是否允许放大图像
                                    aspectRatio={1 / 1} //image的纵横比
                                    guides={false} //显示在裁剪框上方的虚线
                                    background={false} //是否显示背景的马赛克
                                    rotatable={false} //是否旋转
                                    center = {true}
                                />
                        </div>
                  </Fragment>}
                  
            </Fragment>
          )
    }else{
        return <div></div>
    }
    
  }
  //点击保存的函数，需要在这里进行压缩
  saveImg = () => {
    // lrz压缩
    // this.refs.cropper.getCroppedCanvas().toDataURL() 为裁剪框的base64的值
    lrz(this.refs.cropper.getCroppedCanvas().toDataURL(), { quality: 0.6 }).then((results) => {
        // results为压缩后的结果
        let data = { //uploadImgByBase64为连接后台的接口
            imgbase: dataUrlToFile(results.base64), //取base64的值传值
            imgsize: results.fileLen, //压缩后的图片大下
            suffix: this.state.selectImgSuffix, //文件类型
            filename: this.state.selectImgName, //文件名
        }
        uploadFile(baseUrl(), getcookie(), {Filedata: dataUrlToFile(results.base64)});
    }).then(()=>{
        this.props.visible(false)
    })
}
}
