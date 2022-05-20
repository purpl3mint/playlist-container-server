import React, { useCallback, useEffect, useState } from "react";
import { Preloader } from "../../components/Preloader";
import { useDispatch, useSelector } from 'react-redux';
import { PlaylistCard } from "./PlaylistCard";
import { AddPlaylist } from "./AddPlaylist";
import { playlistLoadPlaylists,playlistSetSucceed } from "../../store/actionCreators/playlistActionCreator";

export const PlaylistsPage = () => {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)

    const loading = useSelector(state => state.playlistReducer.preloader)
    const playlists = useSelector(state => {
        const playlistsRaw = state.playlistReducer.playlists
        const playlists = playlistsRaw.map(u => 
          <PlaylistCard name={u.name} id={u.id} key={u.id} />
        )
    
        return playlists
      })

    const initializeHandler = useCallback( () => {
        dispatch(playlistLoadPlaylists())
        dispatch(playlistSetSucceed(false))
      }, [dispatch])
    
      useEffect(() => { initializeHandler() }, [initializeHandler])

    return (
        <div className="col s9">
            <h1>Медиапланы</h1>

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
                
                <AddPlaylist 
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
                    { playlists }
                </div>

                </div>
            }

        </div>
    )
}