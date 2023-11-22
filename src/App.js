// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MaintenancePage from'./components/maintenancePage';
import Navibar from './components/Navibar';
import Footer from './components/Footer';
import Inicio from './components/Inicio';
import InfoG from './components/InfoG'; // Importa tu componente InfoG
import Admin from './components/AdminPage'
import Fa from './components/Fa'; // Importa tu componente InfoG
import ProcederCompra from './components/ProcederCompra';
import Carrito from './components/Carrito';
import PGAdmin from './components/PGeneralAdmin';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditarPerfil from './components/EditarPerfil';
import Ventas from './components/Ventas';
import Login from './components/Login';
import AdminEmpleados from './components/AdminEmpleados';
import { UserProvider } from './components/UserContext';

function App() {
  return (
    <Router>
      <UserProvider>
        <div className="App">
          <Navibar />
          {/*<Admin />*/}
          <Routes>
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/acerca" element={<InfoG />} /> {/* Ruta para InfoG */}
            <Route path="/editar" element={<EditarPerfil />} /> {/* Ruta para InfoG */}
            <Route path="/preguntas" element={<Fa/>} /> {/* Ruta para InfoG */}
            <Route path="/compra" element={<ProcederCompra/>} /> {/* Ruta para InfoG */}
            <Route path="/carrito" element={<Carrito/>} /> {/* Ruta para InfoG */}
            <Route path="/adminGeneral" element={<PGAdmin/>} /> {/* Ruta para PGeneralAdmin */}
            <Route path="/ventas" element={<Ventas/>} /> {/* Ruta para PGeneralAdmin */}
            <Route path="/adminempleados" element={<AdminEmpleados/>} /> {/* Ruta para AdminEmpleados */}
            {/* Puedes añadir más rutas aquí */}
          </Routes>
          <Footer />
        </div>
      </UserProvider>
    </Router>
  );
}

export default App;

