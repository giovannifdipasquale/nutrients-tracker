// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router';
import './App.css'
import Search from './components/Search/Search.jsx'
import Dashboard from './pages/Dashboard.jsx'
import SignUp from './pages/SignUp/SignUp.jsx'
import Login from './pages/Login/Login.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';


function App() {
  // const [count, setCount] = useState(0);



  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <div className="p-6 flex flex-col items-center justify-center flex-grow">
            <Search />
          </div>
        } />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App
