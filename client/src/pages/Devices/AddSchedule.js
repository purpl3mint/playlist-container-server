import './AddDevice.css'
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { deviceSetGroupScheduleForm, deviceAddGroupScheduleRecord, deviceClearGroupScheduleForm } from "../../store/actionCreators/deviceActionCreator"
import { useMessage } from '../../hooks/message.hook';

export const AddSchedule = (props) => {
    const {chosenGroup} = props
  const dispatch = useDispatch()
  const message = useMessage()
  const form = useSelector(state => state.deviceReducer.groupScheduleForm)

  const changeHandler = useCallback( (e) => {
      dispatch(deviceSetGroupScheduleForm(e.target.name, e.target.value))
  }, [dispatch])

  const createHandler = useCallback( () => {
      if (!form.idPlaylist){
          message("Ошибка: не задан плейлист")
          return
      }
      if (!form.timeStart && !form.timeEnd){
          message("Ошибка: время задано не корректно")
          return
      }

      dispatch(deviceAddGroupScheduleRecord(form))
      dispatch(deviceClearGroupScheduleForm())

      props.onCreate()
  }, [dispatch, form, props, message])

  const closeHandler = useCallback( () => {
    props.onClose()
  }, [props])

  const initializeHandler = useCallback(() => {
    dispatch(deviceSetGroupScheduleForm("idDevices", chosenGroup))
  }, [dispatch, chosenGroup])

  useEffect(() => {initializeHandler()}, [initializeHandler])

  if (!props.show) {
    return null
  }
  
  return (
    <div className='modal'>
      <div className="row modal-content">

        <h1>Создание новой записи в расписании</h1>
        <span>* - обязательное поле</span><br />
        <div className="col s12">

          <div className="row">
            <div className="input-field col s6">
              <input id="idPlaylist" name="idPlaylist" type="text" value={form.idPlaylist} onChange={changeHandler} />
              <span className="helper-text">ID плейлиста*</span>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input id="timeStart" name="timeStart" type="time" value={form.timeStart} onChange={changeHandler} />
              <span className="helper-text">Время начала*</span>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input id="timeEnd" name="timeEnd" type="time" value={form.timeEnd} onChange={changeHandler} />
              <span className="helper-text">Время завершения*</span>
            </div>
          </div>

          <button className="btn blue-grey darken-1" onClick={createHandler}>Создать</button>
          <button className="btn blue-grey darken-1 btn-close" onClick={closeHandler}>Закрыть</button>

        </div>

      </div>
    </div>
    
  )
  
}