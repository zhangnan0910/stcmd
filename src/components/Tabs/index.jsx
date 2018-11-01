import React, { Component } from 'react'
import './style.less'
export default class index extends Component {
  constructor(){
    super()
    this.state = {
      activeFlag : 0,
    }
  }
  render() {
    let { activeFlag } = this.state
    let { tabVal,tabChange } = this.props
    return (
        <div className='components-tab'>
          {tabVal.map((val,index)=>{
            return <span key={index} className={index===activeFlag?'active':''} onClick = {()=>{
              tabChange(index)
              this.setState({activeFlag:index})
            }}>{val}</span>
          })}
        </div>
    )
  }
  flagChange = (e) => {
    this.setState({
      activeFlag : e
    })
  }
}
