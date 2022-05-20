import React, { useCallback, useEffect, useState } from "react";
import { Preloader } from "../../components/Preloader";
import { useDispatch, useSelector } from 'react-redux';
import { DeviceCard } from "./DeviceCard";
import { AddDevice } from "./AddDevice";
import { deviceLoadDevices, deviceSetSucceed } from "../../store/actionCreators/deviceActionCreator";

export const DevicesPage = () => {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)

    const loading = useSelector(state => state.deviceReducer.preloader)
    const devices = useSelector(state => {
        const devicesRaw = state.deviceReducer.devices
        const devices = devicesRaw.map(d => 
          <DeviceCard name={d.name} url={d.url} id={d.id} key={d.id} />
        )
    
        return devices
    })

    const initializeHandler = useCallback( () => {
        dispatch(deviceLoadDevices())
        dispatch(deviceSetSucceed(false))
    }, [dispatch])
    
    useEffect(() => { initializeHandler() }, [initializeHandler])

    return (
        <div className="col s9">
            <h1>Группы устройств</h1>

            {loading && <Preloader />}

            {!loading && 
                <div>
                    <button 
                        key="new" 
                        className="waves-effect waves-light btn" 
                        style={{display: "flex", width: '130px'}}
                        onClick={ () => setShowModal(true)}
                    >
                        <i className="material-icons">add</i>
                        <span>Добавить</span>
                    </button>
                    
                    <AddDevice 
                        show={showModal} 
                        onCreate={() => {
                            setShowModal(false)
                            initializeHandler()
                        }}
                        onClose={() => {
                        setShowModal(false)
                        }}
                    />

                    <div className="collection" style={{border: "0px"}}>
                        { devices }
                    </div>

                </div>
            }

        </div>
    )
}