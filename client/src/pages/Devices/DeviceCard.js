import React, { useCallback } from "react"
import { NavLink } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { deviceDelete } from "../../store/actionCreators/deviceActionCreator"

export const DeviceCard = (props) => {
  const {name, url, id} = props
  const dispatch = useDispatch()

  const deleteHandler = useCallback(() => {
    dispatch(deviceDelete(id))
  }, [dispatch, id])

  return (
    <div className="row">
      <div className="col s10">
        <NavLink
          to={"" + id}
          className="collection-item card" 
          style={{marginBottom: "25px", border: "1px solid grey"}}
        >
          Название группы устройств: {name}<br/>
          Ссылка: <span style={{color: "red"}}>{url}</span><br/>
        </NavLink>
      </div>

      <button name={id} className="btn" onClick={deleteHandler}>
        <i className="material-icons">delete</i>
      </button>
    </div>
  )
}