import React from "react"
import { Routes, Route } from 'react-router-dom'
import { AuthPage } from "./pages/Auth/AuthPage"
import { Sidebar } from "./components/Sidebar"

import { CabinetPage } from "./pages/Cabinet/CabinetPage"
import { OperatorsPage } from "./pages/Operators/OperatorsPage"

export const useRoutes = (isAuthenticated) => {

    return (
        <div className="row">
          
            <div className="col s12 m12 l12 xl12">
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
                    </Route>
                </Routes>
                
                }
            </div>
        </div>
    )
  }