import React from 'react'
import SignUpPage from './components/Signup'
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from './components/Login';
import Todo from './components/Todo';
const App = () => {
  return (
    <>
    <div
    className='min-h-screen bg-gradient-to-br
    from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'
    >
      {/* <SignUpPage/> */}
      {/* <SignUpPage/> */}
      <Routes>
        
      <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/add" element={<Todo />} />
      </Routes>
    </div>
    </>
  )
}

export default App