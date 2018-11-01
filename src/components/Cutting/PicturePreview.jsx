import React, { Component } from 'react'

export default class PicturePreview extends Component {
  render() {
    return (
        <div className='PersonalModel-box-right'>
            <h3>头像预览</h3>
            <div className='PersonalModel-small cropper-small'></div> 
            <div className='PersonalModel-big cropper-small'></div> 
        </div>
    )
  }
}
