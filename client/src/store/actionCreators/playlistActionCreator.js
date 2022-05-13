import {
    PLAYLIST_SET_SUCCEED,
    PLAYLIST_SET_PLAYLISTS,
    PLAYLIST_SET_PRELOADER,
    PLAYLIST_SET_ADD_FORM,
    PLAYLIST_CLEAR_ADD_FORM
} from "../actions/playlistActions"
  
export function playlistSetSucceed(data){
    return {
        type: PLAYLIST_SET_SUCCEED,
        data
    }
}
  
export function playlistSetPreloader (isLoading) {
    return {
        type: PLAYLIST_SET_PRELOADER,
        data: isLoading
    }
}
  
export function playlistSetPlaylists(data) {
    return {
        type: PLAYLIST_SET_PLAYLISTS,
        data
    }
}
  
export function playlistLoadPlaylists() {
    return async(dispatch) => {
        dispatch(playlistSetPreloader(true))
    
        const method = 'GET'
        const headers = {'Content-Type': 'application/json'}
        const responce = await fetch("/api/playlist", {method, headers})

        const data = await responce.json()
        if (responce.ok) {
            dispatch(playlistSetPlaylists(data))
        }
    
        dispatch(playlistSetPreloader(false))
    }
}
  
export function playlistSetAddForm(name, value) {
    return {
        type: PLAYLIST_SET_ADD_FORM,
        data: {name, value}
    }
}
  
export function playlistClearAddForm () {
    return {
        type: PLAYLIST_CLEAR_ADD_FORM
    }
}
  
export function playlistAdd(form){
    return async(dispatch) => {
        dispatch(playlistSetPreloader(true))
        
        const data = new FormData()
        data.append("name", form.name)
        data.append("file", form.file)

        const XHRRequest = new XMLHttpRequest()
        XHRRequest.open("POST", "/api/playlist")
        XHRRequest.send(data)

        XHRRequest.onload = function() {
            if (XHRRequest.status === 200) {
                dispatch(playlistSetSucceed(true))
                dispatch(playlistClearAddForm())
            }
        }

        dispatch(playlistSetPreloader(false))
    }
}
  
export function playlistDelete(playlistId) {
    return async(dispatch) => {
        dispatch(playlistSetPreloader(true))
    
        const method = 'DELETE'
        const headers = {'Content-Type': 'application/json'}
        const responce = await fetch("/api/playlist/" + playlistId, {method, headers})
    
        if (responce.ok) {
            dispatch(playlistLoadPlaylists())
        }
    
        dispatch(playlistSetPreloader(false))
    }
}