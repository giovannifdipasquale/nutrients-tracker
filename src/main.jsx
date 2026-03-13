import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.jsx";
import { FoodProvider } from "@/context/FoodContext";
import { AuthProvider } from "@/context/AuthProvider";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <FoodProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FoodProvider>
  </AuthProvider>,
);
