import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import './index.css'
import App from './App.jsx'
import { FoodProvider } from '@/context/FoodContext';

createRoot(document.getElementById('root')).render(
  <FoodProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FoodProvider>
)
