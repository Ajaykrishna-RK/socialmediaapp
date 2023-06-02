import { useState } from 'react'
import { BrowserRouter,Navigate ,Routes,Route } from 'react-router-dom'
import HomePage from "./scenes/homePage/index"
import ProfilePage from './scenes/profilePage/index'
import LoginPage from './scenes/loginPage/index'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { CssBaseline,ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { themeSettings } from './themes'
import AdminLogin from './scenes/loginPage/AdminLogin'
import AdminPage from './admin/AdminPage'
import UpdateUser from './scenes/loginPage/UpdateUser'

function App() {
  
const mode = useSelector((state)=>state.mode)
const theme = useMemo(()=>createTheme(themeSettings(mode)),[mode])
const isAuth = Boolean(useSelector((state)=>state.token))
const isAdmin = Boolean(useSelector((state)=>state.adminToken))

  return (
   <>
<BrowserRouter>
<ThemeProvider theme={theme}>
  <CssBaseline/>
<Routes>
<Route path='/' element={!isAuth ? <LoginPage/>: <Navigate to='/home'/> }/>
<Route path='/home' element={isAuth ? <HomePage/> : <Navigate to="/"/>} />
<Route path='/profile/:userId' element={isAuth ? <ProfilePage/> : <Navigate to="/"/>}/>
<Route path='/profile/:userId/user' element={isAuth ? <UpdateUser/> : <Navigate to="/"/>}/>
<Route path='/admin/login' element={<AdminLogin/>}/>
<Route path='/admin/page' element={isAdmin ? <AdminPage/> : <Navigate to="/admin/login"/>}/>
</Routes>
</ThemeProvider>


</BrowserRouter>
   </>
  )
}

export default App
