import './AddDevice.css'
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { deviceSetAddForm, deviceAdd } from "../../store/actionCreators/deviceActionCreator"
import { useMessage } from '../../hooks/message.hook';

export const AddDevice = (props) => {
  const dispatch = useDispatch()
  const message = useMessage()
  const form = useSelector(state => state.deviceReducer.addForm)
  const URL = process.env.REACT_APP_URL || window.location.href;
  const basePath = URL + '/api/show/'

  console.log(URL);

  const changeHandler = useCallback( (e) => {
      dispatch(deviceSetAddForm(e.target.name, e.target.value))
      dispatch(deviceSetAddForm("url", basePath + e.target.value))
  }, [dispatch, basePath])

  const createHandler = useCallback( () => {
      if (!form.name){
          message("Ошибка: не задано имя группы устройств")
          return
      }
      if (!form.url){
          message("Ошибка: не задана ссылка для группы устройств")
          return
      }

      dispatch(deviceAdd(form))

      props.onCreate()
  }, [dispatch, form, props, message])

  const closeHandler = useCallback( () => {
    props.onClose()
  }, [props])

  const initializeHandler = useCallback(() => {
    dispatch(deviceSetAddForm("url", basePath))
  }, [dispatch, basePath])

  useEffect(() => {initializeHandler()}, [initializeHandler])

  if (!props.show) {
    return null
  }
  
  return (
    <div className='modal'>
      <div className="row modal-content">

        <h1>Создание новой группы устройств</h1>
        <span>* - обязательное поле</span><br />
        <div className="col s12">

          <div className="row">
            <div className="input-field col s6">
              <input id="name" name="name" type="text" value={form.name} onChange={changeHandler} />
              <span className="helper-text">Имя группы устройств*</span>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <input id="url" name="url" type="text" value={form.url} onChange={changeHandler} disabled="true"/>
              <span className="helper-text">Ссылка</span>
            </div>
          </div>

          <button className="btn blue-grey darken-1" onClick={createHandler}>Создать</button>
          <button className="btn blue-grey darken-1 btn-close" onClick={closeHandler}>Закрыть</button>

        </div>

      </div>
    </div>
    
  )
  
}