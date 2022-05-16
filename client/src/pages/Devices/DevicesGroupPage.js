import React, { useCallback, useEffect, useState } from "react"
import { Preloader } from "../../components/Preloader";
import { useDispatch, useSelector } from 'react-redux';
import { deviceLoadGroupSchedule, deviceSetSucceed, deviceSetChosenGroup, deviceLoadDevices } from "../../store/actionCreators/deviceActionCreator";
import { ScheduleCard } from './ScheduleCard'
import { AddSchedule } from './AddSchedule'

export const DevicesGroupPage = () => {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)

    const loading = useSelector(state => state.deviceReducer.preloader)
    const chosenGroup = useSelector(state => state.deviceReducer.chosenGroup)
    const chosenGroupData = useSelector(state => {
        const dataRaw = state.deviceReducer.devices
        const chosenGroupId = state.deviceReducer.chosenGroup - 0
        const data = dataRaw.filter(item => item.id === chosenGroupId)
        
        if (data)
            return data[0]

        return null
    })

    const schedules = useSelector(state => {
        const scheduleRaw = state.deviceReducer.chosenGroupSchedule

        const schedule = scheduleRaw.map(s => 
            <ScheduleCard 
                name={s.name}
                key={s.schedule.id}
                idGroup={s.schedule.devicesId}
                idSchedule={s.schedule.id}
                timeStart={s.schedule.timeStart}
                timeEnd={s.schedule.timeEnd}
            />)

        return schedule
    })


    const initializeHandler = useCallback( () => {
        const path = window.location.href.split('/')
        const id = path[path.length - 1]
        dispatch(deviceLoadDevices())
        dispatch(deviceSetChosenGroup(id))
        dispatch(deviceLoadGroupSchedule(id))
        dispatch(deviceSetSucceed(false))
    }, [dispatch])
    
    useEffect(() => { initializeHandler() }, [initializeHandler])



    return (
        <div className="row">
            <h1>Группа устройств: {(chosenGroupData && chosenGroupData.name) || chosenGroup || "неизвестно"}</h1>

            {loading && <Preloader />}

            {!loading &&

            <div>
                <span style={{fontSize: "20px"}}>Ссылка на текущий плейлист: <span style={{color: "red"}}>{(chosenGroupData && chosenGroupData.url) || "http://192.168.0.1/test"}</span></span>
                <button 
                    key="new" 
                    className="waves-effect waves-light btn" 
                    style={{display: "flex", width: '130px'}}
                    onClick={ () => setShowModal(true)}
                >
                    <i className="material-icons">add</i>
                    <span>Добавить</span>
                </button>
                    
                <AddSchedule 
                    show={showModal} 
                    onCreate={() => {
                        setShowModal(false)
                        initializeHandler()
                    }}
                    onClose={() => {
                    setShowModal(false)
                    }}
                    chosenGroup={chosenGroup}
                />

                <div className="collection" style={{border: "0px"}}>
                    { schedules }
                </div>

            </div>

            }

            
            

        </div>
    )
}