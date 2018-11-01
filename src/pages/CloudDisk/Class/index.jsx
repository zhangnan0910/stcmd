import React, { Component,Fragment } from 'react'
import Http from "@/utils/http"
import {Tooltip} from 'antd'
import { url,iconControl,getFileSize } from '@/common/js/index'
import Dialog from '@/components/Dialog'
import CloudDiskTitle from '../../../pages/CloudDisk/Institution/CloudDiskTitle'
import NoData from '@/pages/NoData/NoData'
import {
  Table
} from 'antd'
export default class Index extends Component {
  constructor(){
    super()
    this.state = {
      data:[],
      flie_name:'',
      pageSize:6
    }
  }
  componentDidMount(){
    this.getData()
  }
  
  render() {
    let {data} = this.state
      return (
        <Fragment>
            <CloudDiskTitle 
              fileName = {this.state.flie_name}
              refreshData = {this.refreshData}
              searchHide = {true}
            />
           <Table 
                columns={this.columns()} 
                dataSource={data}  
                rowKey='id'
                style = {{height:'100%'}}
                locale = {
                  {emptyText:'暂无文件'}
                }
                pagination={{ pageSize: this.state.pageSize }}
                rowKey={record => record.id}
              />
            <Dialog ref={c => this.dialog = c }/>
        </Fragment>
    )
  }
  refreshData = (e) => {
    this.setState({
      flie_name : false
    })
    this.getData()
  }
  getData = () =>{
    Http.post("/netdisk/get-dir-list").then(data=>{
      if(data.error_info.errno===1){
        let datas = data.data['3Tclass']
        let fileConcatData = [...datas.file_list, ...datas.folder_list]
        this.setState({
          data:fileConcatData
        })
      }
    }).catch ((error)=> {})
  }
  onPreview = (record) => {
    this.dialog.setData(record)
  }
  columns(){
    return [{
      title: '课程名称',
      dataIndex: 'folderName',
      width:'40%',
      render: (value,row)=>{
        if(!!row.file_name){
          return <span className='institution-name'>
            <img src={iconControl(row.file_name)} alt=""/>
            <Tooltip placement="topLeft" title={row.file_name}>{row.file_name}</Tooltip>
          </span>
        }else{
          return <span className='institution-name' onClick={()=>{
            let data = row.file_list.map(res=>{
              return {
                ...res,
                folderName:res.file_name,
              }
            })
            this.setState({
              data,
              flie_name:value
            })
          }}>
            <img src="/static/imgs/icons/ic_file_folder.png" alt=""/>
            <Tooltip placement="topLeft" title={value}>{value}</Tooltip>
          </span>
        }
        
      } 
    }, {
      title: '大小',
      dataIndex: 'file_size',
      align:'center',
      render: (value,row)=>{
        if(row.file_size){
          return <span>{getFileSize(value)}</span>
        }else{
          return <span>- - -</span>
        }
        
      } 
    }, {
      title: '时间',
      dataIndex: 'times',
      align:'center',
    }, {
      title: '操作',
      align:'center',
      render:(value,row)=>{
        if(row.file_size){
          return <div className='operation'>
            <span className='courseListicon See' onClick={() => this.onPreview(value)}></span>
          </div>
        }
      }
    }] 
  }
  componentWillUnmount = () => {
    this.setState = (state,callback)=>{
      return;
    };
  }
}