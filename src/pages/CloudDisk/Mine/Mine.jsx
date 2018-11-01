import React, { Component, Fragment } from 'react'
import Http from "@/utils/http"
import { baseUrl, getcookie, iconControl, getFileSize } from '@/common/js/index'
import {Tooltip} from 'antd'
import NoData from '@/pages/NoData/NoData'
import {
  Table,
  Button,
  Upload,
  message,
  Input,
  Modal
} from 'antd'
let timer = null;
import Dialog from '@/components/Dialog'
const Search = Input.Search;
export default class Mine extends Component {
  constructor() {
    super()
    this.state = {
      fileId: '',
      file: [],
      fileFlow: [],
      loading: false,
      fileConcatData: [],
      file_name: '上传课件',
      page: 1,
      pageSize: 6,
      total: 6,
      uploadval: '',
      connect:'',// 搜索内容
      visible: false,
      convert:'0',// 大文件转码
      rowId:'',
      rows:{},// 点击删除按钮的数据的id
      // 初始数据接口
      initUrl: "/netdisk/get-dir-list"
    }
  }

  componentDidMount() {
    this.getData(this.state.initUrl)
  }
  onPreview = (record) => {
    this.dialog.setData(record)
  }
  render() {
    this.state.fileConcatData.map(res=>{
      if(res.id===this.state.rowId){
        if(res.convert==='1'){
          this.onPreview(res)
        }
      }
    })
    return (
      <Fragment>
        <div className='myCloud'>
          <div>
          <Upload
            name='file[]'
            action={baseUrl() + '/netdisk/upload-one-file'}
            showUploadList={false}
            data={(file) => {
              return { ...getcookie(), folderId: this.state.fileId }
            }}
            beforeUpload={(file) => {this.beforeUpload(file)}}
            onChange={(info) => {this.onChange(info)}}
          >
            <Button type="primary" style={{ marginBottom: 10}}>{this.state.file_name}</Button></Upload>
          {this.state.uploadval && <Button loading style={{marginLeft:15}}>{this.state.uploadval}</Button>}
          </div>
          <Search
            placeholder="请搜索文件名称"
            onSearch={value => this.setState({connect:value},()=>{
              if(value){
                this.getSearch('/netdisk/netdisk-search')
              }else{
                this.getData(this.state.initUrl)
              }
            })}
            style={{ width: 200 ,marginBottom:10,borderRadius:4}}
          />
        </div>
        <Table
            columns={this.columns()}
            dataSource={this.state.fileConcatData}
            rowKey='id'
            locale = {
              {emptyText:'暂无文件'}
            }
            pagination={{ pageSize: this.state.pageSize }}
          />
        <Dialog ref={c => this.dialog = c} />
        <Modal
          title="提示"
          visible={this.state.visible}
          onOk={this.handleOk}
          width={300}
          okText="确认"
          cancelText="取消"
          onCancel={this.handleCancel}
        >
          <p style={{color:'red',fontSize:16}}>你确定要删除此课件吗？</p>
        </Modal>

      </Fragment>
    )
  }
  handleOk = () =>{
    this.getData("/netdisk/del-one-file", this.state.rows, 'fileId')
    this.getData(this.state.initUrl)
    this.setState({
      visible:false
    })
  }
  handleCancel = () =>{
    this.setState({
      visible:false
    })
    
  }
  // 获取初始数据
  getData = (url, folderId, fileId) => {
    Http.post(url, {
      [fileId ? 'fileId' : 'folderId']: folderId,
    }).then(data => {
      if (data.error_info.errno === 1) {
        let datas = data.data.user ? data.data.user : data.data
        let fileConcatData = [...datas.file, ...datas.folder]
        this.setState({
          fileId: datas.topFolderId ? datas.topFolderId : folderId,
          file: datas.file,
          fileFlow: datas.folder,
          fileConcatData,
          total: fileConcatData.length,
        })
      }
    }).catch(() => { })
  }
  // 搜索接口
  getSearch = (url)=>{
    Http.post(url, {
      connect:this.state.connect,
      type:'user'
    }).then(data=>{
      if (data.error_info.errno === 1) {
        // let fileConcatData = [...data.data.file_list, ...data.data.folder_list]
        this.setState({
          fileConcatData:data.data.file_list
        })
      }
    }).catch ((error)=> {})
  }
  // 上传
  beforeUpload = (file) => {
    let xx = ['docx', 'doc', 'pptx', 'ppt', 'pdf', 'gif', 'jpg', 'jpeg', 'bmp', 'png']
    if (xx.indexOf(file.name.slice(file.name.lastIndexOf(".") + 1)) < 0) {
      message.destroy()
      message.error('上传文件格式错误')
      return false
    }
  }
  // 上传
  onChange = (info) =>{
    let xx = ['docx', 'doc', 'pptx', 'ppt', 'pdf', 'gif', 'jpg', 'jpeg', 'bmp', 'png']
    if (xx.indexOf(info.file.name.slice(info.file.name.lastIndexOf(".") + 1)) >-1) {
      if (info.file.status === 'uploading') {
        this.setState({
          uploadval: '正在上传',
          loading: true,
        })
      } else if (info.file.status === 'done') {
        this.setState({
          uploadval: '',
          loading: false,
        })
        message.destroy()
        message.success(`${info.file.name} 上传成功！`);
        this.getData(this.state.initUrl)
      } else if (info.file.status === 'error') {
        message.destroy()
        message.error(`${info.file.name} 上传失败！`);
      }
    }
    
  }
  columns = () => {
    return [{
      title: '课程名称',
      dataIndex: 'file_name',
      render: (value, row) => {
        if (!row.folderName) {
          return <span className='institution-name'>
            <img src={iconControl(row.file_name)} alt="" />
            <Tooltip placement="topLeft" title={value}>{value}</Tooltip>
          </span>
        } else {
          return <span className='institution-name' onClick={() => {
            // 获取文件夹下文件接口/netdisk/get-cloudslist
            this.getData("/netdisk/get-cloudslist", row.id)
          }}>
            <img src="/static/imgs/icons/ic_file_folder.png" alt="" />
            <Tooltip placement="topLeft" title={row.folderName}>{row.folderName}</Tooltip>
          </span>
        }

      }
    }, {
      title: '大小',
      align: 'center',
      dataIndex: 'file_size',
      render: (value, row) => {
        if (row.file_size) {
          return <span>{getFileSize(value)}</span>
        } else {
          return <span>- - -</span>
        }
      }
    }, {
      title: '时间',
      dataIndex: 'times',
      align: 'center',
    }, {
      title: '操作',
      align: 'center',
      render: (value, row) => {
        if (!row.folderName) {
          return <div className='operation'>
            <span className='courseListicon See' onClick={() => {
              let xx = ['docx', 'doc', 'pptx', 'ppt', 'pdf']
              if (xx.indexOf(value.file_name.slice(value.file_name.lastIndexOf(".") + 1)) > -1) {
                if(value.convert==="0"){
                  this.getData(this.state.initUrl)
                  message.destroy()
                  message.error('正在转码中，暂时不可预览')
                }else if(value.convert==="1"){
                  this.onPreview(value)
                }else{
                  message.destroy()
                  message.error('转码失败')
                }
              }else{
                this.onPreview(value)
              }
            }} />
            <span className='courseListicon delete' onClick={() => {
              // 删除接口
              this.setState({
                visible:true,
                rows:row.id
              })
            }} />
          </div>
        }
      }
    }];
  }
  componentWillUnmount = () => {
    this.setState = (state,callback)=>{
      return;
    };
  }
}
