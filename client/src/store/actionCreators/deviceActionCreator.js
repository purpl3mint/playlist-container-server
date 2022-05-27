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
    DEVICE_CLEAR_GROUP_SCHEDULE_FORM,
    DEVICE_SET_PLAYLISTS
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
        dispatch(deviceLoadDevices())
        dispatch(deviceClearAddForm())
        dispatch(deviceSetSucceed(true))
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

export function deviceSetChosenGroup(id) {
  return {
    type: DEVICE_SET_CHOSEN_GROUP,
    data: id
  }
}

export function deviceSetGroupSchedule(data) {
  return {
    type: DEVICE_SET_GROUP_SCHEDULE,
    data
  }
}

export function deviceClearGroupSchedule() {
  return {
    type: DEVICE_CLEAR_GROUP_SCHEDULE
  }
}

export function deviceLoadGroupSchedule(id) {
  return async(dispatch) => {
    dispatch(deviceSetPreloader(true))

    const method = 'GET'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/devices/playlist/" + id, {method, headers})

    const data = await responce.json()
    if (responce.ok && data) {
      dispatch(deviceSetGroupSchedule(data))
    }

    dispatch(deviceSetPreloader(false))
  }
}

export function deviceDeleteGroupScheduleRecord(idGroup, idSchedule) {
  return async(dispatch) => {
    dispatch(deviceSetPreloader(true))

    const method = 'DELETE'
    const headers = {'Content-Type': 'application/json'}
    const responce = await fetch("/api/devices/playlist/" + idGroup + "/" + idSchedule, {method, headers})

    if (responce.ok) {
      deviceLoadGroupSchedule(idGroup)
    }

    dispatch(deviceSetPreloader(false))
  }
}

export function deviceSetGroupScheduleForm(name, value) {
  return {
    type: DEVICE_SET_GROUP_SCHEDULE_FORM,
    data: {name, value}
  }
}

export function deviceClearGroupScheduleForm () {
  return {
    type: DEVICE_CLEAR_GROUP_SCHEDULE_FORM
  }
}

export function deviceAddGroupScheduleRecord(form) {
  return async(dispatch) => {
    dispatch(deviceSetPreloader(true))

    const method = 'POST'
    const headers = {'Content-Type': 'application/json'}
    const body = JSON.stringify({...form})
    const responce = await fetch("/api/devices/playlist/", {method, body, headers})

    await responce.json()
    if (responce.ok) {
      deviceClearGroupScheduleForm()
      deviceLoadGroupSchedule(form.idDevices)
    }

    dispatch(deviceSetPreloader(false))
  }
}

export function deviceSetPlaylists(playlists) {
  return {
    type: DEVICE_SET_PLAYLISTS,
    playlists
  }
}

export function deviceLoadPlaylists() {
  return async(dispatch) => {
    dispatch(deviceSetPreloader(true))

    /*
    const method = 'GET'
    const headers = {'Content-Type': 'application/json'}
    */
   
    /* WTF */
    //const responce = await fetch("/api/playlist/", {method, headers})

    /*
    const data = await responce.json()
    if (responce.ok) {
      dispatch(deviceSetPlaylists(data))
    }
    */

    dispatch(deviceSetPreloader(false))
  }
}