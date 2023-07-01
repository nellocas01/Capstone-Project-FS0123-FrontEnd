import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartPage from "./component/StartPage";
import LoginPage from "./component/LoginPage";
import RegisterPage from "./component/RegisterPage";
import HomePage from "./component/HomePage";
import FooterComponent from "./component/FooterComponent";
import NavbarComponent from "./component/NavbarComponent";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
