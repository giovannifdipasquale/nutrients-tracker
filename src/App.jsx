// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Routes, Route, Link } from 'react-router';
import './App.css'
import Search from './components/Search/Search.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ResetButton from './components/ResetButton/ResetButton.jsx'
import FoodBadges from './components/FoodBadges/FoodBadges.jsx'
import PortionModal from './components/PortionModal/PortionModal.jsx'
function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="sticky top-0 z-50 bg-white shadow-md w-full">
        <div className="w-full bg-white p-4 flex justify-end gap-4 items-center">
          <Link to="/" className="text-slate-600 hover:text-slate-900 px-3 py-2 font-medium">Home</Link>
          <Link to="/dashboard" className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700 transition">Dashboard</Link>
          <ResetButton />
        </div>
        <FoodBadges />
        <PortionModal />
      </div>
      <Routes>
        <Route path="/" element={
          <div className="p-6 bg-white flex flex-col items-center justify-center flex-grow">
            <Search />
          </div>
        } />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App
