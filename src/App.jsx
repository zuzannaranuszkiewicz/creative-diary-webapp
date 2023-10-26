import { useState } from 'react'
import {Routes, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import Library from './pages/Library'
import Calendar from './pages/Calendar'
import Account from './pages/Account'
import WelcomePage from './authentication/WelcomePage'

function App() {
  const [user, setUser] = useState(null);




  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/library" element={<Library/>}/>
        <Route path="/calendar" element={<Calendar/>}/>
        <Route path="/account" element={<Account/>}/>
      </Routes>
    </>
  )
}

export default App
