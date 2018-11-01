import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { delCookie } from '@/utils/cookies'
import Random from '@/utils/random'
import Http from "@/utils/http"
import {connect} from 'react-redux'
import {
    Tooltip
} from 'antd'
import ExperienceRoom from '@/pages/ExperienceRoom/ExperienceRoom'
import {
    Popover
} from 'antd'
class PersonalLeft extends Component {
    constructor() {
        super()
        this.state = {
            activeClass: sessionStorage.getItem('personallLeftTab') ? +sessionStorage.getItem('personallLeftTab') : 1
        }
    }
    componentDidMount() {
        this.getData()
    }
    render() {
        const content = (
            <ul className='Zpersonal-settings'>
                <li onClick={() => {
                    delCookie("login-personal-token")
                    this.props.history.replace('/login')
                }}>退出登录</li>
            </ul>
        )
        let { activeClass } = this.state
        return (
            <div className='Zpersonal-left'>
                <div>
                    <Link to='/personal' onClick={() => {
                        this.changeActive(0)
                    }}><img src={this.props.imgUrl?this.props.imgUrl:this.state.avatar} alt="" /></Link>
                </div>
                <ul >
                    <Tooltip placement="right" title={<p>课程</p>}>
                        <Link onClick={() => {
                            this.changeActive(1)
                        }} to='/course'><li
                            className={`courseListiconbig ${activeClass === 1 ? ' courseicon' : ' courseicons'}`}
                        ></li></Link>
                    </Tooltip>
                    <Tooltip placement="right" title={<p>云盘</p>}>
                        <Link onClick={() => {
                            this.changeActive(2)
                        }} to='/cloudDisk'><li
                            className={`courseListiconbig ${activeClass === 2 ? ' cloudDiskicon' : ' cloudDiskicons'}`}
                        ></li></Link>
                    </Tooltip>

                </ul>
                <ol className='settingsOl'>
                    <ExperienceRoom changeActive={this.changeActive} activeClass={activeClass} />
                    <Popover trigger="click" content={content}><li
                        onClick={() => {
                            this.changeActive(4)
                        }}
                    ><span
                        className={`courseListicon${activeClass === 4 ? ' settingicon' : ' settingicons'}`}
                    ></span></li></Popover>
                </ol>
            </div>
        )
    }
    getData = () => {
        Http.post('/edu/get-user-info')
            .then(res => {
                if (res.error_info.errno === 1) {
                    let avatar = res.data.avatar ? res.data.avatar : Random(res.data.userId)
                    this.setState({
                        avatar
                    })
                }
            }).catch((error) => { })
    }
    changeActive = (val) => {
        sessionStorage.setItem('personallLeftTab', val)
        this.setState({
            activeClass: val
        })
    }
}
  function mapStateToprops(state) {
    return {
      imgUrl:state.imgChange
    }
  }
export default connect(mapStateToprops)(PersonalLeft)
