import { createRoot } from "react-dom/client";
import React from 'react'
import App from "./App"
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
        <App />
        </BrowserRouter>
    </React.StrictMode>
)