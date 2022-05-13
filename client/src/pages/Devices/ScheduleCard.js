import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
import { deviceDeleteGroupScheduleRecord } from "../../store/actionCreators/deviceActionCreator"

export const ScheduleCard = (props) => {
  const {name, idGroup, idSchedule, timeStart, timeEnd} = props
  const dispatch = useDispatch()

  const deleteHandler = useCallback(() => {
    dispatch(deviceDeleteGroupScheduleRecord(idGroup, idSchedule))
  }, [dispatch, idGroup, idSchedule])

  return (
    <div className="row" style={{marginLeft: "2px"}}>
      <div className="col s10">
        <div
          className="collection-item card" 
          style={{marginBottom: "25px", border: "1px solid grey"}}
        >
          Название медиаплана: {name}<br/>
          Начало воспроизведения: <span style={{color: "red"}}>{timeStart}</span><br/>
          Конец воспроизведения: <span style={{color: "red"}}>{timeEnd}</span><br/>
        </div>
      </div>

      <button name={idSchedule} className="btn" onClick={deleteHandler}>
        <i className="material-icons">delete</i>
      </button>
    </div>
  )
}