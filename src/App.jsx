import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartPage from "./component/StartPage";
import LoginPage from "./component/User/LoginPage";
import RegisterPage from "./component/User/RegisterPage";
import HomePage from "./component/HomePage";
import Campi from "./component/Campi/Campi";
import Prenotazioni from "./component/Prenotazioni/Prenotazioni";
import AddPrenotazioneForm from "./component/Prenotazioni/AddPrenotazioneForm";
import ProfilePage from "./component/User/ProfilePage";
import EditPrenotazioni from "./component/Prenotazioni/EditPrenotazioni";

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
          <Route path="/edit-prenotazioni" element={<EditPrenotazioni />} />
          <Route path="/add-prenotazioni" element={<AddPrenotazioneForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
