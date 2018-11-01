import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import Loadable from 'react-loadable';
// 一级路由
import Login from '@/pages/Login';
// 注册路由
import Register from '@/pages/Register'

import Home from '@/pages/Home/Home';
//个人主页
import Personal from '@/pages/Personal/Personal'
// 课程
import Course from '@/pages/Course/Course'
// 云盘
import CloudDisk from '@/pages/CloudDisk/CloudDisk'
import Institution from '@/pages/CloudDisk/Institution/Institution'
import Mine from '@/pages/CloudDisk/Mine/Mine'
const router = {
    routes: [
        {
            path:'/',
            exact:true,
            component: () => <Redirect from='/' to='/course'/>,
            
        },
        {
            path: '/register',
            exact: true,
            authRules: false,
            component: Register
        },
        {
            path: '/login',
            exact: true,
            component: Login,
        }, {
            path:'/',
            component:Home,
            children:[
                {
                    path: '/personal',
                    name:Personal,
                    component: Personal,
                },{
                    path: '/course',
                    name:Course,
                    component: Course,
                },{
                    path: '/cloudDisk',
                    name:CloudDisk,
                    component: CloudDisk,
                    children:[
                        {
                            path: 'institution',
                            name:'Institution',
                            component: Institution,
                        },{
                            path: 'Mine',
                            name:'Mine',
                            component: Mine,
                        }
                    ]
                }
            ]
        }


    ]
}

const routes = router.routes
export {routes}
export default router