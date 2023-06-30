import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./component/LoginPage";
import HomePage from "./component/HomePage";
import RegisterPage from "./component/RegisterPage";

function App() {
  const [currentForm, setCurrentForm] = useState("login");

  const toggleForm = () => {
    setCurrentForm(currentForm === "login" ? "register" : "login");
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<StartPage />} /> */}
          <Route
            path="/login"
            element={<LoginPage onFormSwitch={toggleForm} />}
          />
          <Route
            path="/login"
            element={<RegisterPage onFormSwitch={toggleForm} />}
          />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
