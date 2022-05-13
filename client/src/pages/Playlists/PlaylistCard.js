import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
import { playlistDelete } from "../../store/actionCreators/playlistActionCreator"

export const PlaylistCard = (props) => {
  const {name, id} = props
  const dispatch = useDispatch()

  const deleteHandler = useCallback(() => {
    dispatch(playlistDelete(id))
  }, [dispatch, id])

  return (
    <div className="row" style={{marginLeft: "2px"}}>
      <div className="col s10">
        <div
          className="collection-item card" 
          style={{marginBottom: "25px", border: "1px solid grey"}}
        >
            Название медиаплана: {name}<br/>
        </div>
      </div>

      <button name={id} className="btn" onClick={deleteHandler}>
        <i className="material-icons">delete</i>
      </button>
    </div>
  )
}