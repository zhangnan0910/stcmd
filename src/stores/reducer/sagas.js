
import {
    GET_COURSE_START,
    GET_COURSE_SUCCESS,
    GET_CHANGDATE_START
  } from '@/stores/reducer/variable'
import Http from "@/utils/http"
import {call, put, takeEvery} from 'redux-saga/effects'; 
function* getMonthData(action){    // 参数是action创建函数返回的action
   try {
    // 请求数据,返回data数据
    let data = yield call (Http.post,'/course/get-month-class-date',{month:action.payload})
    yield put({
        type:GET_COURSE_SUCCESS,
        payload:data.data
    })
   } catch (error) {
       
   } 
        
} 
function* rootSaga() { // 在store.js中，执行了 sagaMiddleware.run(rootSaga) 
    yield takeEvery(GET_COURSE_START, getMonthData) // 如果有对应type的action触发，就执行getMonthData()函数 
} 
export default rootSaga; // 导出rootSaga，被store.js文件import 


