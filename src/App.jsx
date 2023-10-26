import { useState } from 'react'
import {Navigate, Routes, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import Library from './pages/Library'
import Calendar from './pages/Calendar'
import Account from './pages/Account'
import WelcomePage from './authentication/WelcomePage'
import { AuthContextProvider } from './authentication/context/AuthContext'
import { UserAuth } from './authentication/context/AuthContext'

function App() {

  const ProtectedRoute = ({children}) => {
    const{user} = UserAuth();
    if(!user) {
      return <Navigate to="/"/>
    }
    return children;
  }

  return (
    <>
    <AuthContextProvider>
          <Routes>
            <Route path="/" element={<WelcomePage/>}/>
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
            <Route path="/library" element={<ProtectedRoute><Library/></ProtectedRoute>}/>
            <Route path="/calendar" element={<ProtectedRoute><Calendar/></ProtectedRoute>}/>
            <Route path="/account" element={<ProtectedRoute><Account/></ProtectedRoute>}/>
          </Routes>
    </AuthContextProvider>
      
    </>
  )
}

export default App
