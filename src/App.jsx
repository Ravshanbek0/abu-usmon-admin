import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import SignIn from './pages/Sign/SignIn'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/' element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
