import {BrowserRouter, Routes, Route } from  'react-router-dom'
import { useCookies } from 'react-cookie'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import OnBoarding from './pages/OnBoarding'
import './index.css'

const App=()=> {
  const [cookie, setCookies] = useCookies(['user'])

  const authToken = cookie.authToken

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/> 
        { authToken && <>
            <Route path='/dashboard' element={<Dashboard/>}/> 
            <Route path='/onboarding' element={<OnBoarding/>}/> 
          </>
        }
      </Routes>

    </BrowserRouter>
  );
}

export default App
