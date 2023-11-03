import {Navigate, Routes, Route } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/Dashboard'
import Library from './pages/Library'
import Calendar from './pages/Calendar'
import Account, { SecurityPrivacy, Settings, Subscription } from './pages/Account'
import WelcomePage from './authentication/WelcomePage'
import { AuthContextProvider } from './authentication/context/AuthContext'
import { UserAuth } from './authentication/context/AuthContext'
import { BrainDump, ChooseInputType, CreativityBooster, DailyChallenge } from './pages/components/EntryTypes'
import { GroupPage, ProjectPage, ProjectsGroupPage, TagsPage } from './pages/GroupAndProjectPage'
import { EntryEdit } from './pages/EntryEdit'

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
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}>
                <Route path="BrainDump" element={<ProtectedRoute><BrainDump/></ProtectedRoute>}/>
                <Route path="DailyChallenge" element={<ProtectedRoute><DailyChallenge/></ProtectedRoute>}/>
                <Route path="CreativityBooster" element={<ProtectedRoute><CreativityBooster/></ProtectedRoute>}/>
                <Route path="ChooseEntryType" element={<ProtectedRoute><ChooseInputType/></ProtectedRoute>}/>
            </Route>
            <Route path="/group/:inputType" element={<ProtectedRoute><GroupPage/></ProtectedRoute>}/>
            <Route path="/tags/:tagID/:tagName?" element={<ProtectedRoute><TagsPage/></ProtectedRoute>}/>
            <Route path="/projects" element={<ProtectedRoute><ProjectsGroupPage/></ProtectedRoute>}/>
            <Route path="/projects/:projectName/:projectID" element={<ProtectedRoute><ProjectPage/></ProtectedRoute>}/>
            <Route path="/library" element={<ProtectedRoute><Library/></ProtectedRoute>}/>
            <Route path="/calendar" element={<ProtectedRoute><Calendar/></ProtectedRoute>}/>
            <Route path="/account" element={<ProtectedRoute><Account/></ProtectedRoute>}>
                <Route path="settings" element={<ProtectedRoute><Settings/></ProtectedRoute>}/>
                <Route path="subscription" element={<ProtectedRoute><Subscription/></ProtectedRoute>}/>
                <Route path="security" element={<ProtectedRoute><SecurityPrivacy/></ProtectedRoute>}/>
            </Route>
            <Route path=":entryID" element={<ProtectedRoute><EntryEdit/></ProtectedRoute>}/>
          </Routes>
    </AuthContextProvider>
      
    </>
  )
}

export default App
