// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MaintenancePage from'./components/maintenancePage';
import Navibar from './components/Navibar';
import Footer from './components/Footer';
import Inicio from './components/Inicio';
import InfoG from './components/InfoG'; // Importa tu componente InfoG
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navibar />
        <Routes>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/acerca" element={<InfoG />} /> {/* Ruta para InfoG */}
          {/* Puedes añadir más rutas aquí */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

