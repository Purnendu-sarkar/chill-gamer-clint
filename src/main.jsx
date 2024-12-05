import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from './App.jsx'
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </AuthProvider>
  </StrictMode>
);
