import React, { Component,Fragment } from 'react'
import Http from "@/utils/http"
import { url,iconControl,getFileSize } from '@/common/js/index'
import Dialog from '@/components/Dialog'
import CloudDiskTitle from '@/pages/CloudDisk/Institution/CloudDiskTitle'
import {Tooltip,Input} from 'antd'
import NoData from '@/pages/NoData/NoData'
const Search = Input.Search;
import {
  Table
} from 'antd'
export default class Institution extends Component {
  constructor(){
    super()
    this.state = {
      data:[],
      flie_name:'',
      pageSize:6,
      total:6,
      page:1,
      flag:true,
      connect:'',
      httpFlag:true
    }
  }
  componentDidMount(){
    this.getData()
  }
  
  render() {
    let {data} = this.state
      return (
        <Fragment>
          <div className='cloud-disk-title'>
            <CloudDiskTitle 
              refreshData = {this.refreshData}
              fileName = {this.state.flie_name}/>
            <Search
              placeholder="请搜索文件名称"
              onSearch={value => this.setState({connect:value,page:1},()=>{
                this.getSearch('/netdisk/netdisk-search')
              })}
              style={{ width: 200 ,marginBottom:10,borderRadius:4}}
            /> 
          </div>
            <Table 
                columns={this.columns()} 
                dataSource={data}  
                rowKey={recode=>{console.log(recode)}}
                style = {{height:'100%'}}
                locale = {
                  {emptyText:'暂无文件'}
                }
                pagination={{ 
                  pageSize: this.state.pageSize,
                  defaultCurrent:1,
                  onChange :this.pageChange,
                  total : this.state.total,
                  current:this.state.page
                 }}
                rowKey={record => record.userId}
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
    Http.post("/netdisk/get-dir-list",{
      page:this.state.page
    }).then(data=>{
      if(data.error_info.errno===1){
        this.setState({
          data:data.data.agency,
          total:+data.data.agency_count.count
        })
      }
    }).catch ((error)=> {})
  }
  pageChange = (cur) =>{
    this.setState({page:cur},()=>{
      this.state.flag?this.getData():this.getSearch('/netdisk/netdisk-search')
    })
  }
  onPreview = (record) => {
    this.dialog.setData(record)
  }
  // 搜索接口
  getSearch = (url)=>{
    if(!!this.state.connect){
      Http.post(url, {
        connect:this.state.connect,
        type:'agency',
        page:this.state.page
      }).then(data=>{
        if (data.error_info.errno === 1) {
          let fileConcatData = [...data.data.file_list, ...data.data.folder_list]
          this.setState({
            flag:false,
            data:fileConcatData,
            total:data.data.agency_count.count
          })
          // this.setState({httpFlag:true})
        }
      }).catch ((error)=> {})
    }else{
        this.getData()
    }
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
            <Tooltip placement="topLeft" title={value?value:row.file_name}>{value?value:row.file_name}</Tooltip>
          </span>
        }else if(row.file_list){
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
// {
//   file_name: "提测单-3TClass-web-4.0-20180925_测试(1).doc",
//     file_size: "52736",
//     folderId: "200075",
//     folderName: "提测单-3TClass-web-4.0-20180925_测试(1).doc",
//     htmlUrl: "", //ppt详情
//     id: "100018",
//     imgSrc: "http://3tdoc.oss-cn-beijing.aliyuncs.com/docs/2018/09/26/11/2923_1178-0.jpg", //图片封面 
//     // 图片集合,ppt,img
//     imgSrcData: "["http://3tdoc.oss-cn-beijing.aliyuncs.com/docs/2018/09/26/11/2923_1178-0.jpg","http://3tdoc.oss-cn-beijing.aliyuncs.com/docs/2018/09/26/11/2923_1178-1.jpg","http://3tdoc.oss-cn-beijing.aliyuncs.com/docs/2018/09/26/11/2923_1178-2.jpg"]"
//     // 下载路径
//     originalSrc: "https://3tdoc.oss-cn-beijing.aliyuncs.com/3tclass/2018/09/26/11/2920_4214.doc"
//     // 文件页数
//     page: "3"
//     pageNotes: "["","22",""]"
//     times: "2018-09-26 11:29:23"
//     // 文件类型
//     type: "1"
//     //文件类型  1:word 2:ppt 3:pdf  4:image  5:other
// }