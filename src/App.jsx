import { useState } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Landing from './Pages/LandingPage/Landing'
import SignUp from './Pages/SignUp/SignUp'
import Login from './Pages/Login/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/landing' element={<Landing/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login'element={<Login/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
