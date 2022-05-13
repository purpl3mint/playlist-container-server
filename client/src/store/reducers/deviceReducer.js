import {
    DEVICE_SET_SUCCEED,
    DEVICE_SET_DEVICES,
    DEVICE_SET_PRELOADER,
    DEVICE_SET_ADD_FORM,
    DEVICE_CLEAR_ADD_FORM
} from "../actions/deviceActions"
  
const initialState = {
    isSucceed: false,
    devices: [],
    preloader: false,
    addForm: {
        name: "",
        url: ""
    },
}
  
function deviceReducer (state = initialState, action) {
    switch(action.type){
        case DEVICE_SET_SUCCEED:
            return { ...state, isSucceed: action.data }
        case DEVICE_SET_DEVICES:
            return { ...state, devices: action.data }
        case DEVICE_SET_PRELOADER:
            return { ...state, preloader: action.data}
        case DEVICE_SET_ADD_FORM: {
            let newAddForm = {...state.addForm, [action.data.name]: action.data.value}
            return { ...state, addForm: newAddForm }
        }
        case DEVICE_CLEAR_ADD_FORM:
            return { ...state, addForm: initialState.addForm }
    
        default: 
            return state
    }
}

export default deviceReducer