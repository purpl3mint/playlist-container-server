import {
    DEVICE_SET_SUCCEED,
    DEVICE_SET_DEVICES,
    DEVICE_SET_PRELOADER,
    DEVICE_SET_ADD_FORM,
    DEVICE_CLEAR_ADD_FORM,
    DEVICE_SET_CHOSEN_GROUP,
    DEVICE_SET_GROUP_SCHEDULE,
    DEVICE_CLEAR_GROUP_SCHEDULE,
    DEVICE_SET_GROUP_SCHEDULE_FORM,
    DEVICE_CLEAR_GROUP_SCHEDULE_FORM
} from "../actions/deviceActions"
  
const initialState = {
    isSucceed: false,
    devices: [],
    preloader: false,
    addForm: {
        name: "",
        url: ""
    },
    chosenGroup: 0,
    chosenGroupSchedule: [],
    groupScheduleForm: {
        idDevices: 0,
        idPlaylist: 0,
        timeStart: "00:00:00",
        timeEnd: "00:00:00"
    }
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
        case DEVICE_SET_CHOSEN_GROUP:
            return { ...state, chosenGroup: action.data }
        case DEVICE_SET_GROUP_SCHEDULE:
            return { ...state, chosenGroupSchedule: action.data }
        case DEVICE_CLEAR_GROUP_SCHEDULE:
            return { ...state, chosenGroupSchedule: initialState.chosenGroupSchedule }
        case DEVICE_SET_GROUP_SCHEDULE_FORM: {
            let newGroupScheduleForm = {...state.groupScheduleForm, [action.data.name]: action.data.value}
            return { ...state, groupScheduleForm: newGroupScheduleForm }
        }
        case DEVICE_CLEAR_GROUP_SCHEDULE_FORM:
            return { ...state, groupScheduleForm: initialState.groupScheduleForm }
    
        default: 
            return state
    }
}

export default deviceReducer