import React from "react"
import { Routes, Route } from 'react-router-dom'
import { AuthPage } from "./pages/Auth/AuthPage"
import { Sidebar } from "./components/Sidebar"

import { CabinetPage } from "./pages/Cabinet/CabinetPage"
import { OperatorsPage } from "./pages/Operators/OperatorsPage"
import { DevicesPage } from "./pages/Devices/DevicesPage"
import { PlaylistsPage } from "./pages/Playlists/PlaylistPage"
import { DevicesGroupPage } from "./pages/Devices/DevicesGroupPage"

export const useRoutes = (isAuthenticated) => {

    return (
        <div className="row">
          
                { isAuthenticated && <Sidebar />  }
    
                {!isAuthenticated && 
                <Routes>
                    <Route path="/*" element={<AuthPage />} />
                </Routes>
                }
  
                { 
                
                isAuthenticated &&
                <Routes>
                    <Route index element={<CabinetPage />} />
                    <Route path="/">
                        <Route path="*" element={<CabinetPage />} />
                        <Route path="operators" element={<OperatorsPage />} />
                        <Route path="devices">
                            <Route index element={<DevicesPage />} />
                            <Route path=":id" element={<DevicesGroupPage />}/>
                        </Route>
                        <Route path="playlists" element={<PlaylistsPage />} />
                    </Route>
                </Routes>
                
                }
        </div>
    )
  }