import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./component/login/LoginPage";
//import HomePage from "./HomePage";

function App() {
  return (
    <div>
      <LoginPage />
    </div>
  );
}

export default App;
