import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import { getCookie } from "@/utils/cookies";
import Http from "@/utils/http"
class RouteView extends Component {
    render() {
        return (
            <Switch>
                {
                    this.props.routes.map((res, index) => {
                        return <Route key={index} path={res.path} exact={res.exact || false} render={(e)=>{
                            // console.log(getCookie('login-personal-token'))
                            // 判断不在login页时在获取token字段
                            if (res.authRules === false || res.path == '/login' || getCookie('login-personal-token')){
                                return <res.component routes={res.children} {...e}/>
                            } else {
                                return <Redirect to='/login'></Redirect>
                            }
                        }}></Route>
                    })
                }
            </Switch>
        )
    }
    componentWillMount = () => {
        // console.log(11111)
        // console.log(location)
        // console.log(location.search)
        // console.log(location.pathname)
        if(location.search.indexOf('?redirect')>-1){
            if (getCookie('login-personal-token')){
                Http.post('/course/get-share-room-url',{
                    classId: location.search.split('=')[1],
                }).then((res)=>{
                    location.href = res.data
                }).catch(e=>{})
            }else{
                sessionStorage.setItem('redirectClassId', location.search.split('=')[1])
            }
        }
    }
}

export default RouteView