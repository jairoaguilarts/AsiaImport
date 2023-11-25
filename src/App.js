// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MaintenancePage from "./components/maintenancePage";
import Navibar from "./components/Navibar";
import Footer from "./components/Footer";
import Inicio from "./components/Inicio";
import InfoG from "./components/InfoG"; // Importa tu componente InfoG
import Admin from "./components/AdminPage";
import Fa from "./components/Fa"; // Importa tu componente InfoG
import ProcederCompra from "./components/ProcederCompra";
import Carrito from "./components/Carrito";
import PGAdmin from "./components/PGeneralAdmin";
import "bootstrap/dist/css/bootstrap.min.css";
import EditarPerfil from "./components/EditarPerfil";
import Ventas from "./components/Ventas";
import AdmiNav from "./components/AdmiNav";
import Login from "./components/Login";
import AdminEmpleados from "./components/AdminEmpleados";

function App() {
  const userType = localStorage.getItem("IsAdmin");

  return (
    <Router>
      <div className="App">
        {userType === "false" && <Navibar />}
        {userType === "true" && <Admin />}

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/acerca" element={<InfoG />} />
          <Route path="/editar" element={<EditarPerfil />} />{" "}
          <Route path="/preguntas" element={<Fa />} />
          <Route path="/compra" element={<ProcederCompra />} />{" "}
          <Route path="/carrito" element={<Carrito />} />{" "}
          <Route path="/adminGeneral" element={<PGAdmin />} />{" "}
          <Route path="/ventas" element={<Ventas />} />{" "}
          <Route path="/adminempleados" element={<AdminEmpleados />} />{" "}
          {/* Ruta para AdminEmpleados */}
          {/* Puedes añadir más rutas aquí */}
        </Routes>
        {!userType && <Footer />}
      </div>
    </Router>
  );
}

export default App;
