import React, { Component, Fragment } from 'react'
import { Tabs, Pagination } from 'antd';
const TabPane = Tabs.TabPane;
import Nodata from '@/pages/NoData/NoData'
import moment from 'moment'
import Http from "@/utils/http"
import { getTime } from "@/common/js/index"
import Courseopen from "@/components/CourseTab/Courseopen";
import Coursestandard from "@/components/CourseTab/Coursestandard";
export default class CourseList extends Component {
    constructor() {
        super()
        let sessItem = sessionStorage.getItem('zTimer')
        let timer = sessItem?getTime(sessItem):getTime(moment().format('YYYY-MM-DD'))
        let sessCoursType = sessionStorage.getItem('courseItem')
        let type = sessCoursType?+sessCoursType:0
        this.state = {
            type,
            data: [],
            page:1,
            pageSize:4,
            monthData:[],
            CourseopenData:[],
            Courseopentotal:4,
            Coursestandardtotal:4,
            CoursestandardData:[],
            timer
        }
    }
    componentDidMount() {
        this.getData()
        setInterval(()=>{
            this.setState({
              newDate:new Date()
            })
          },1000)
        this.setState({
            monthData:JSON.parse(sessionStorage.getItem('monthData'))
        })
    }
    render() {
        let {
            CoursestandardData,
            CourseopenData,
            Courseopentotal,
            Coursestandardtotal,
        } = this.state
        return (
            <Tabs defaultActiveKey={this.state.type+''} onChange={(val) => {
                sessionStorage.setItem('courseItem',val)
                this.setState({
                    type : val
                },()=>{
                    this.getData()
                })
            }}>
                <TabPane tab={<span className='courseTab'><span className='iconImg1'></span>标准课</span>} key="1">
                    {CoursestandardData[0] ? <Coursestandard 
                        data={CoursestandardData}
                        total = {Coursestandardtotal}
                        changePage = {e=>{
                            this.getData(e)
                        }}
                    />:<Nodata src='/static/imgs/icons/img_class.png' text='暂无课程'/>}
                </TabPane>
                <TabPane tab={<span className='courseTab'><span className='iconImg2'></span>公开课</span>} key="0">
                    {CourseopenData[0] ? <Courseopen  
                        data={CourseopenData}
                        total = {Courseopentotal}
                        changePage = {e=>{
                            this.getData(e)
                        }}
                    ></Courseopen>:<Nodata src='/static/imgs/icons/img_class.png' text='暂无课程'/>}
                </TabPane>
            </Tabs>
        )

    }
    getData(page) {
        let {timer,type} = this.state
        Http.post( "/course/get-account-course-class",{
                beginTime: timer.start,
                endTime: timer.end,
                type: type,
                status: 2,
                page: page?page:this.state.page,
                pageSize: this.state.pageSize
            }
        ).then(data => {
        
            let datas = data.data.list?data.data.list:data.data
            let total = data.data.totalCount?data.data.totalCount:[]
            if(data.error_info.errno===1){
                this.setState({
                    CourseopenData:type==0?datas:[],
                    CoursestandardData:type==1?datas:[],
                    Courseopentotal:type==0?total:4,
                    Coursestandardtotal:type==1?total:4,
                })
            }else if(data.error_info.errno===106){
                this.setState({
                    CourseopenData:[],
                    CoursestandardData:[],
                })
            }else{
                message.destroy()
                message.error(data.error_info.error)
            }
        }).catch ((error)=> {})
    }
    componentDidUpdate(newProps,newState){
        let sessItem = sessionStorage.getItem('zTimer')
        let timers = sessItem?getTime(sessItem):getTime(moment().format('YYYY-MM-DD'))
        if(JSON.stringify(newState.timer)!==JSON.stringify(timers)){
            this.setState({
                timer:timers
            },()=>{this.getData()})
        } 
    }
    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
          return;
        };
      }
}