import React, { Component,Fragment } from 'react'

export default class RenderImg extends Component {
    constructor(){
        super()
        this.state = {
            key :0
        }
    }
  render() {
    return (
      <Fragment>
          {
                this.props.imgData.map((item, i) => {
                    if(this.props.length){
                        if (item <= this.props.length) {
                            let srcUrl = `https://userservice.oss-cn-beijing.aliyuncs.com/avatar/avator_${item}.png`
                            return <img key={i} className={i===this.state.key?'RenderImg-active':''} onClick = {(e)=>{
                                this.setState({key:i})
                                console.log(srcUrl)
                                this.props.srcUrl(srcUrl)

                            }
                            } src={srcUrl} />
                        }
                    }else{
                        let srcUrl = `https://userservice.oss-cn-beijing.aliyuncs.com/avatar/avator_${item}.png`
                        return <img key={i} className={i===this.state.key?'RenderImg-active':''} onClick = {(e)=>{
                            this.setState({key:i})
                            this.props.srcUrl(srcUrl)
                        }
                        } src={srcUrl} />
                    }
                    
                })
          }
      </Fragment>
    )
  }
}
