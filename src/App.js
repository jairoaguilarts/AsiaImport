// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MaintenancePage from'./components/maintenancePage';
import Navibar from './components/Navibar';
import Footer from './components/Footer';
import Inicio from './components/Inicio';
import InfoG from './components/InfoG'; // Importa tu componente InfoG
import Fa from './components/Fa'; // Importa tu componente InfoG
import ProcederCompra from './components/ProcederCompra';
import Carrito from './components/Carrito';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditarPerfil from './components/EditarPerfil';

function App() {
  return (
    <Router>
      <div className="App">
        <Navibar />
        <Routes>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/acerca" element={<InfoG />} /> {/* Ruta para InfoG */}
          <Route path="/editar" element={<EditarPerfil />} /> {/* Ruta para InfoG */}
          <Route path="/preguntas" element={<Fa/>} /> {/* Ruta para InfoG */}
          <Route path="/compra" element={<ProcederCompra/>} /> {/* Ruta para InfoG */}
          <Route path="/carrito" element={<Carrito/>} /> {/* Ruta para InfoG */}
          {/* Puedes añadir más rutas aquí */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

