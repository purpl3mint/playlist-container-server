import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import authReducer from './reducers/authReducer'
import cabinetReducer from './reducers/cabinetReducer'
import operatorReducer from './reducers/operatorReducer'

const rootReducer = combineReducers({
  authReducer,
  cabinetReducer,
  operatorReducer
})

const store = createStore(rootReducer, compose(
    applyMiddleware(thunk)
))
  
export default store