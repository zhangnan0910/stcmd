import React, {Component,Fragment} from 'react'
import './home.less'
import PersonalLeft from '@/pages/Home/PersonalLeft'
import RouterView from '@/router/router';
export default class Home extends Component {
    render() {
        return (
            <div className='personal-box'>
                <div className='Zpersonal'>
                    <Fragment>
                        <PersonalLeft {...this.props}/>
                        <div className='Zpersonal-content'>
                            <RouterView routes={this.props.routes}/>
                        </div>
                    </Fragment>
                </div>
                <div className="education-copyright" style={{color:'#ccc',bottom:30}}>Copyright © 2018 北京三体云联科技有限公司 版权所有</div>
            </div>
        )
        
    }
}
