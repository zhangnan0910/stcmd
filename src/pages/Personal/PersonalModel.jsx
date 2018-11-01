import React, { Component, Fragment } from 'react'
import {
    Upload,
    Tabs,
    Button,
} from 'antd';
// 截取加预览图片
import Cutting, { propsState } from '@/components/Cutting/Index'
// 预览图片组件
import PicturePreview from '@/components/Cutting/PicturePreview'
// 渲染img组件
import RenderImg from '@/pages/Personal/RenderImg';
const TabPane = Tabs.TabPane;
export default class PersonalModel extends Component {
    constructor() {
        super()
        let imgData = []
        for (let i = 1; i <= 32; i++) {
            imgData.push(i)
        }
        this.state = {
            imgData,
            tabActive: '1',
            // 控制遮罩显示隐藏
            editImageModalVisible: false,
            srcCropper: '',
            selectImgName: '', //文件名称
            selectImgSize: '', //文件大小
            selectImgSuffix: '', //文件类型
            flag: false,
            buttonFlag: false,
            okButton: '',
            srcUrl: ''
        }
    }
    render() {
        return (
            <div className='PersonalModel-content'>
                <Tabs activeKey={this.state.tabActive} onChange={(key) => {
                    this.setState({ tabActive: key })
                }}>
                    <TabPane tab="自定义头像" key="1">
                        <div className='PersonalModel-box'>
                            <div className='PersonalModel-box-left'>
                                <p>方法1：选择本地照片,上传编辑自己的头像</p>
                                <div className='PersonalModel-box-first'>
                                    <div className='react-upload'>
                                        <Upload
                                            accept="image/*" //文件类型
                                            beforeUpload={this.beforeUpload} //阻止自动上传
                                            showUploadList={false}
                                        >
                                            选择图片
                                        </Upload>
                                    </div>
                                    <span>支持jpg,jpeg,gif,png,bmp格式的图片</span>
                                </div>

                                <p>方法2：选择推荐头像,快速上传优质头像</p>
                                <div className='PersonalModel-box-two'>
                                    <RenderImg srcUrl={e => { this.setState({ srcUrl: e }) }} imgData={this.state.imgData} length={5} />
                                    <span onClick={() => this.setState({ tabActive: '2' })}>更多 &gt;</span>
                                </div>
                                <Cutting
                                    ref={(e) => { this.saveImg = e }}
                                    // 弹窗开关
                                    visible={(e) => { this.props.visible(e) }} data={this.state.flag ? this.state : null} />
                            </div>
                            <PicturePreview />

                        </div>
                        {
                            this.state.buttonFlag ?
                                <div className='PersonalModel-button'>
                                    <Button onClick={() => { 
                                        this.setState({ editImageModalVisible: false, buttonFlag: false }) 
                                    }}>重新选择</Button>
                                    <Button type="primary" onClick={() => {
                                         this.props.CustomHead(this.saveImg.saveImg())
                                         setTimeout(()=>{
                                            this.props.visible(false)
                                            this.setState({ editImageModalVisible: false , buttonFlag: false })
                                         },1000)
                                         
                                    }}>保存头像</Button>
                                </div> :
                                <div className='PersonalModel-button'>
                                    <Button type="primary" className='PersonalModel-button'
                                        onClick={() => {
                                            this.props.visible(false)
                                            let srcUrl = this.state.srcUrl?this.state.srcUrl:`https://userservice.oss-cn-beijing.aliyuncs.com/avatar/avator_1.png`
                                            this.props.refData(srcUrl)
                                            // sessionStorage.setItem('Personal-settings-img', srcUrl)
                                        }}
                                    >保存头像</Button>
                                </div>
                        }
                    </TabPane>
                    <TabPane tab="推荐头像" key="2" className='Custom'>
                        <div className='PersonalModel-box'>
                            <div className='PersonalModel-box-left scrollbar PersonalModel-box-img'>
                                <RenderImg srcUrl={e => { this.setState({ srcUrl: e }) }} imgData={this.state.imgData} />
                            </div>
                            <PicturePreview />
                        </div>
                        <div className='PersonalModel-button'>
                            <Button type="primary"  onClick={() => {
                                this.props.visible(false)
                                let srcUrl = this.state.srcUrl?this.state.srcUrl:`https://userservice.oss-cn-beijing.aliyuncs.com/avatar/avator_1.png`
                                this.props.refData(srcUrl)
                                // sessionStorage.setItem('Personal-settings-img', srcUrl)
                            }}>保存头像</Button>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
    // Upload上传之前函数
    beforeUpload = (file) => {
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) { //添加文件限制
            MsgBox.error({ content: '文件大小不能超过10M' });
            return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file); //开始读取文件
        // 因为读取文件需要时间,所以要在回调函数中使用读取的结果
        reader.onload = (e) => {
            this.setState({
                srcCropper: e.target.result, //cropper的图片路径
                selectImgName: file.name, //文件名称
                selectImgSize: (file.size / 1024 / 1024), //文件大小
                selectImgSuffix: file.type.split("/")[1], //文件类型
                editImageModalVisible: true, //打开控制裁剪弹窗的变量，为true即弹窗
                flag: true,
                buttonFlag: true
            })
        }
        return false;
    }

}
