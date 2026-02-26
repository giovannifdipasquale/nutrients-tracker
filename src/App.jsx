// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Routes, Route, Link } from 'react-router';
import './App.css'
import Search from './components/Search/Search.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ResetButton from './components/ResetButton/ResetButton.jsx'
import PortionModal from './components/PortionModal/PortionModal.jsx'
import Summary from './components/Summary/Summary.jsx'
function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-50 bg-white shadow-md w-full">
        <div className="w-full p-4 flex justify-end gap-4 items-center">
          <Summary />
          <Link to="/" className="text-slate-600 hover:text-slate-900 px-3 py-2 font-medium">Home</Link>
          <Link to="/dashboard" className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700 transition">Dashboard</Link>
          <ResetButton />
        </div>
        <PortionModal />
      </div>
      <Routes>
        <Route path="/" element={
          <div className="p-6 flex flex-col items-center justify-center flex-grow">
            <Search />
          </div>
        } />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App
