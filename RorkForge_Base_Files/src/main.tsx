import React from "react";
import ReactDOM from "react-dom/client";
import App from "../app";           // eftersom app.tsx ligger i roten
import "./index.css";               // tailwind/reset (valfritt)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);