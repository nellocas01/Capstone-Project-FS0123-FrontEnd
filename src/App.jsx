import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartPage from "./component/StartPage";
import LoginPage from "./component/LoginPage";
import RegisterPage from "./component/RegisterPage";
import HomePage from "./component/HomePage";
import Campi from "./component/Campi";
import AddCampiForm from "./component/AddCampi";
import Prenotazioni from "./component/Prenotazioni";
import AddPrenotazioneForm from "./component/AddPrenotazioni";
import ProfilePage from "./component/ProfilePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profilo" element={<ProfilePage />} />
          <Route path="/campi" element={<Campi />} />
          <Route path="/prenotazioni" element={<Prenotazioni />} />
          <Route path="/add-campo" element={<AddCampiForm />} />
          <Route path="/add-prenotazioni" element={<AddPrenotazioneForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
