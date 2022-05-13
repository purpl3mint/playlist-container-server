import {
    PLAYLIST_SET_SUCCEED,
    PLAYLIST_SET_PLAYLISTS,
    PLAYLIST_SET_PRELOADER,
    PLAYLIST_SET_ADD_FORM,
    PLAYLIST_CLEAR_ADD_FORM
  } from "../actions/playlistActions"
  
const initialState = {
    isSucceed: false,
    playlists: [],
    preloader: false,
    addForm: {
        name: "",
        file: {}
    },
}
  
function playlistReducer (state = initialState, action) {
    switch(action.type){
        case PLAYLIST_SET_SUCCEED:
            return { ...state, isSucceed: action.data }
        case PLAYLIST_SET_PLAYLISTS:
            return { ...state, playlists: action.data }
        case PLAYLIST_SET_PRELOADER:
            return { ...state, preloader: action.data}
        case PLAYLIST_SET_ADD_FORM: {
            let newAddForm = {...state.addForm, [action.data.name]: action.data.value}
            return { ...state, addForm: newAddForm }
        }
        case PLAYLIST_CLEAR_ADD_FORM:
            return { ...state, addForm: initialState.addForm }
    
        default: 
            return state
    }
}

export default playlistReducer