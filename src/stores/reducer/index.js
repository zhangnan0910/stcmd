import {combineReducers} from "redux"
import {getCookie} from '@/utils/cookies'
import {
    GET_COURSE_START,
    GET_COURSE_SUCCESS,
    GET_CHANGDATE_START,
    GET_IMGCHANGE_SUCCESS, // 头像路径
    GET_USER_SUCCESS, // 个人信息
} from '@/stores/reducer/variable'
// 课节列表
// function getCourse(state=[],action){
//     console.log(action.type)
//     switch (action.type) {
//         case GET_COURSE_START:
//             return 'loading'
//             break;
//         case GET_COURSE_SUCCESS:
//             return action.payload
//             break;
//         default:
//             return state
//             break;
//     }
// }
function getChangeDate(state=[],action){
    
    switch (action.type) {
        
        case GET_COURSE_START:
            return 'loading'
            break;
        case GET_CHANGDATE_START:
            return action.payload
            break;
        default:
            return state
            break;
    }
}
function imgChange(state='',action){
    switch (action.type) {
        case GET_IMGCHANGE_SUCCESS:
            return action.payload
            break;
        default:
            return state
            break;
    }
}
function userData(state=[],action){
    switch (action.type) {
        case GET_USER_SUCCESS:
            return action.payload
            break;
        default:
            return state
            break;
    }
}
const reducer =  combineReducers({
    // getCourse,
    getChangeDate,
    imgChange,
    userData
})
    

export default reducer