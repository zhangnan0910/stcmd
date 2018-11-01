import {getCookie,delCookie,setCookie} from '@/utils/cookies'
import Http from "@/utils/http"
import {message} from 'antd'
let unCode = JSON.parse(unescape(unescape(getCookie("login-personal-token"))))
export let getcookie = ()=>{
    if(getCookie('login-personal-token')){
        let {
            UID,
            safeKey,
            timeStamp
        } = JSON.parse(unescape(unescape(getCookie("login-personal-token"))))
        return {
            UID,
            safeKey,
            timeStamp
        }  
    }
} 
// 判断环境域名
export const baseUrl = () => {
    let url = '';
    if (process.env.API_ENV == 'development') {
        // 真实路径
         url = "https://devapi3tclass.3ttech.cn"
    } else if (process.env.API_ENV == 'preproduction') {
         url = 'https://preapi3tclass.3ttech.cn'
    } else {
         url = 'https://api3tclass.3ttech.cn'
    }
    return url;
}
// 
export const BackstageUrl = () => {
    let url = ''
    if (process.env.API_ENV == 'development') {
        // 真实路径
         url = "http://dev.3tclassbackend.3ttech.cn"
    } else if (process.env.API_ENV == 'preproduction') {
         url = "http://pre.3tclassbackend.3ttech.cn"
    } else {
         url = "http://api.3tclassbackend.3ttech.cn"
    }
    return url
}
// 分享地址
export const Share = () => {
    let url = ''
    //https://devapi3tclass.3ttech.cn/edu/room-share?id=
    if (process.env.API_ENV == 'development') {
        // 真实路径
         url = "https://devapi3tclass.3ttech.cn/edu/room-share?id="
    } else if (process.env.API_ENV == 'preproduction') {
         url = "https://preapi3tclass.3ttech.cn/edu/room-share?id="
    } else {
         url = "https://apiapi3tclass.3ttech.cn/edu/room-share?id="
    }
    return url
}
// 刷新safekey
export let safeKeyRefresh = ()=>{
    let unCode = JSON.parse(unescape(unescape(getCookie("login-personal-token"))))
    let current = parseInt(new Date().getTime()/1000)
    if(getCookie('login-personal-token')){
        let diff = +unCode.timeStamp+ +unCode.expires_in-current
        if(diff<=1200&&diff>0){
            console.log('刷新safeKey')
            Http.post('/edu/refresh-safe-key').then(data=>{
                setCookie("login-personal-token", JSON.stringify({UID:unCode.UID,userInfo:unCode.userInfo,...data.data}))
            }).catch ((error)=> {})
        }else if(diff<0){
            console.log('safeKey过期,请登录')
            delCookie('login-personal-token')
            message.destroy()
            message.error('登录已过期,请重新登录')
            location.href='http://'+location.hostname + '/login'  
        }
        }
    }
// 复制 (仅限input框)
export let CopyTxt = (tag) => {
    const input: any = tag;
    input.select();
    if (document.execCommand && document.execCommand('copy')) {
        message.destroy()
        message.info('复制成功');
        input.blur();
    } else {
        message.destroy()
        message.info('复制失败，请手动复制');
    }
}
// 开始结束时间
export let getTime = (data) =>{
    let start = (new Date(Date.parse(data.replace(/-/g, "/")))).getTime() / 1000
    let end = new Date().setTime(Date.parse(data.replace(/-/g, "/")) / 1000 + 24 * 60 * 60 - 1)
    return {
        start,
        end
    }
}
// 判断文件大小
export let getFileSize = (fileByte) => {
    var fileSizeByte = fileByte;
    var fileSizeMsg = "";
    if (fileSizeByte < 1048576) fileSizeMsg = (fileSizeByte / 1024).toFixed(2) + "KB";
    else if (fileSizeByte == 1048576) fileSizeMsg = "1MB";
    else if (fileSizeByte > 1048576 && fileSizeByte < 1073741824) fileSizeMsg = (fileSizeByte / (1024 * 1024)).toFixed(2) + "MB";
    else if (fileSizeByte > 1048576 && fileSizeByte == d) fileSizeMsg = "1GB";
    else if (fileSizeByte > 1073741824 && fileSizeByte < 1099511627776) fileSizeMsg = (fileSizeByte / (1024 * 1024 * 1024)).toFixed(2) + "GB";
    else fileSizeMsg = "文件超过1TB";
    return fileSizeMsg;
  }
// 判断文件类型
export function iconControl(row) {
    let seat = row.lastIndexOf(".");
    let ext = row.substr(seat).toLowerCase();
    let url = ``;
    if (ext === `.pptx` || ext === `.ppt`) {
        url = '/static/imgs/icons/ic_file_ppt.png';
    } else if (ext === `.jpg` || ext === `.png` || ext === `.gif` || ext === `.jpeg` || ext === `.bmp`) {
        url = '/static/imgs/icons/ic_file_img.png'
    } else if (ext === `.mp3` || ext === `.wma`) {
        url = '/static/imgs/icons/ic_file_music.png'
    } else if (ext === `.mp4` || ext === `.rmvb` || ext === `.avi`) {
        url = '/static/imgs/icons/ic_file_video.png'
    } else if (ext === ".pdf") {
        url = '/static/imgs/icons/ic_file_pdf.png'
    } else if (ext === ".doc" || ext === ".docx") {
        url = '/static/imgs/icons/ic_file_doc.png'
    } else if (ext === ".xlsx" || ext === `.xls`) {
        url = '/static/imgs/icons/ic_file_excel.png'
    } else if (ext === ".txt") {
        url = '/static/imgs/icons/ic_file_txt.png'
    } else {
        url = '/static/imgs/icons/ic_file_folder.png'
    }
    return url;
  }
// 时间差判断
export let timeDiff = (val) => {
    // val.role==1?1200:600 判断是教师还是学生
    let role = 1200
    let dq = parseInt(new Date().getTime()/1000)
    let diff = val.class_btime-dq
    let entryBtnTxt ,
        entryBtnDisabled = true,
        styles,
        imgPosition;
    if(diff>role){
      entryBtnTxt='未开始'
      styles = {background: '#F3F3F3',color:'#CFCFCF'}
    }else if(diff<role&&diff>0){
      entryBtnTxt = '预课中'
      styles = {background: '#5AC0DF',borderColor:'#3FB0D3'}
      entryBtnDisabled = false;
      imgPosition = {backgroundPosition:'-30px -144px'}
    }else if(diff<0 && val.class_etime-dq>0){
      entryBtnTxt = '正在进行'
      entryBtnDisabled = false;
      imgPosition = {backgroundPosition:'-30px -144px'}
      styles = {background: '#D9534F',borderColor:'#D43E3A'}
    }else if(val.class_etime-dq>-role && val.class_etime-dq<0){
      entryBtnTxt = '已结束'
      entryBtnDisabled = false;
      imgPosition = {backgroundPosition:'-30px -144px'}
      styles = {background: '#F3F3F3',borderColor:'#EDEDED',color:'#CFCFCF'}
    }else if(val.class_etime-dq<-role){
      entryBtnTxt = '已完成'
      styles = {background: '#F3F3F3',borderColor:'#EDEDED',color:'#CFCFCF'}
    }
    return {
      entryBtnTxt,
      entryBtnDisabled,
      styles,
      imgPosition
    }
  }

// 转二进制
export let dataUrlToFile = (dataUrl) => {
    // 这里使用二进制方式处理dataUrl
    const binaryString = window.atob(dataUrl.split(',').pop());
    const arrayBuffer = new ArrayBuffer(binaryString.length);
    const intArray = new Uint8Array(arrayBuffer);
    // const imgFile = this.imgFile;

    for (let i = 0, j = binaryString.length; i < j; i++) {
        intArray[i] = binaryString.charCodeAt(i);
    }

    const data = [intArray];

    let blob;

    try {
        blob = new Blob(data, { type: 'image/png' });
    } catch (error) {
        window.BlobBuilder = window.BlobBuilder ||
            window.WebKitBlobBuilder ||
            window.MozBlobBuilder ||
            window.MSBlobBuilder;
        if (error.name === 'TypeError' && window.BlobBuilder) {
            const builder = new window.BlobBuilder();
            builder.append(arrayBuffer);
            blob = builder.getBlob('image/png');
        } else {
            console.error('dataUrlToFile failed');
            throw new Error('dataUrlToFile failed');
        }
    }
    // blob 转file
    const fileOfBlob = new File([blob], Date.now() + '.png' );
  
    return fileOfBlob;
}
export function uploadFile(api = '', ...params) {
    const formData = new FormData();
    params.forEach(item => {
        for (const property in item) {
            if (item.hasOwnProperty(property)) {
                const key = property;
                const value = item[property];
                formData.append(key, value);
            }
        }
    });
    const xhr = new XMLHttpRequest();
    // 进度监听
    xhr.upload.addEventListener('progress', (e) => { console.log(e.loaded / e.total); }, false);
    // 加载监听
    // xhr.addEventListener('load', () => { console.log('加载中'); }, false);
    // 错误监听
    // xhr.addEventListener('error', () => { Toast.fail('上传失败！', 2, undefined, false); }, false);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            const result = JSON.parse(xhr.responseText);
            if (xhr.status === 200) {
                // console.log('555555', result);
                if(result.error_info.errno===1){
                    sessionStorage.setItem('Personal-settings-img',result.data.url)
                }else{
                    message.destroy()
                    message.error(result.error_info.error)
                }
                // 上传成功
            } else {
                // console.log('666666', result);
                // 上传失败
            }
        }
    };
    xhr.open('POST', 'https://devapi3tclass.3ttech.cn/edu/upload-pic', true);
    xhr.send(formData);
}
// 伪善
export function getUrlParam(code) {
    if (!location.search) {
        return '';
    }
    const reg = new RegExp('(^|&)' + code + '=([^&]*)(&|$)');
    const r = location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    }
    return '';
}

//URL地址的拼接
export let jiontUrl  = (data,url) =>{
    return `${url}?i=${data.UID}&k=${data.safeKey}&t=${data.timeStamp}&r=${data.classId}`
} 
