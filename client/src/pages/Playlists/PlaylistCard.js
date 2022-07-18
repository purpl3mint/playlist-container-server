import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
import { playlistDelete } from "../../store/actionCreators/playlistActionCreator"

export const PlaylistCard = (props) => {
  const {name, id, url} = props
  const dispatch = useDispatch()

  const deleteHandler = useCallback(() => {
    dispatch(playlistDelete(id))
  }, [dispatch, id])

  const URL = process.env.REACT_APP_URL || window.location.href;

  return (
    <div className="row">
      <div className="col s10">
        <div
          className="collection-item card" 
          style={{marginBottom: "25px", border: "1px solid grey"}}
        >
            Название медиаплана: {name}<br/>
            URL: {URL}/stat/{url}<br/>
        </div>
      </div>

      <button name={id} className="btn" onClick={deleteHandler}>
        <i className="material-icons">delete</i>
      </button>
    </div>
  )
}