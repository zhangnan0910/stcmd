import {createStore,applyMiddleware} from "redux"
import reducers from "./reducer";
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
// import rootSaga from '@/stores/reducer/sagas'
const sagaMiddleware = createSagaMiddleware()  ;      // 执行
const store = createStore(reducers,
    // applyMiddleware(sagaMiddleware) // 中间件，加载sagaMiddleware
    applyMiddleware(thunk)
)
// 类似于事件监听
// sagaMiddleware.run(rootSaga)
export default store