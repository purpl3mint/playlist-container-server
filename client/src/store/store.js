import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import authReducer from './reducers/authReducer'
import cabinetReducer from './reducers/cabinetReducer'
import operatorReducer from './reducers/operatorReducer'
import deviceReducer from './reducers/deviceReducer'
import playlistReducer from './reducers/playlistReducer'

const rootReducer = combineReducers({
    authReducer,
    cabinetReducer,
    operatorReducer,
    deviceReducer,
    playlistReducer
})

const store = createStore(rootReducer, compose(
    applyMiddleware(thunk)
))
  
export default store