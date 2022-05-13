import {
    DEVICE_SET_SUCCEED,
    DEVICE_SET_DEVICES,
    DEVICE_SET_PRELOADER,
    DEVICE_SET_ADD_FORM,
    DEVICE_CLEAR_ADD_FORM
  } from "../actions/deviceActions"
  
  export function deviceSetSucceed(data){
    return {
      type: DEVICE_SET_SUCCEED,
      data
    }
  }
  
  export function deviceSetPreloader (isLoading) {
    return {
      type: DEVICE_SET_PRELOADER,
      data: isLoading
    }
  }
  
  export function deviceSetDevices(data) {
    return {
      type: DEVICE_SET_DEVICES,
      data
    }
  }
  
  export function deviceLoadDevices() {
    return async(dispatch) => {
      dispatch(deviceSetPreloader(true))
  
      const method = 'GET'
      const headers = {'Content-Type': 'application/json'}
      const responce = await fetch("/api/devices/", {method, headers})

      const data = await responce.json()
      if (responce.ok) {
        dispatch(deviceSetDevices(data))
      }
  
      dispatch(deviceSetPreloader(false))
    }
  }
  
  export function deviceSetAddForm(name, value) {
    return {
      type: DEVICE_SET_ADD_FORM,
      data: {name, value}
    }
  }
  
  export function deviceClearAddForm () {
    return {
      type: DEVICE_CLEAR_ADD_FORM
    }
  }
  
  export function deviceAdd(form){
    return async(dispatch) => {
      dispatch(deviceSetPreloader(true))
      
      const method = 'POST'
      const headers = {'Content-Type': 'application/json'}
      const body = JSON.stringify({...form})
      const responce = await fetch("/api/devices", {method, body, headers})
  
      if (responce.ok) {
        dispatch(deviceSetSucceed(true))
        dispatch(deviceClearAddForm())
      }
  
      dispatch(deviceSetPreloader(false))
    }
  }
  
  export function deviceDelete(deviceId) {
    return async(dispatch) => {
      dispatch(deviceSetPreloader(true))
  
      const method = 'DELETE'
      const headers = {'Content-Type': 'application/json'}
      const responce = await fetch("/api/devices/" + deviceId, {method, headers})
  
      if (responce.ok) {
        dispatch(deviceLoadDevices())
      }
  
      dispatch(deviceSetPreloader(false))
    }
  }