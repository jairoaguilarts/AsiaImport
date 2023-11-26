// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
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
import AdminPage from "./components/AdminPage";

function App() {
  const userType = localStorage.getItem("IsAdmin");

  return (
    <Router>
      <div className="App">
        {(userType === "true") ? <Admin /> : <Navibar />}

        <Routes>
          <Route path="/" element={(userType === "true") ? <PGAdmin /> : <Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/acerca" element={<InfoG />} />
          <Route path="/editar" element={<EditarPerfil />} />{" "}
          <Route path="/preguntas" element={<Fa />} />
          <Route path="/compra" element={<ProcederCompra />} />{" "}
          <Route path="/carrito" element={<Carrito />} />{" "}
          <Route path="/adminGeneral" element={(userType === "true") ? <PGAdmin /> : <Navigate to="/inicio" />} />{" "}
          <Route path="/ventas" element={(userType === "true") ? <Ventas /> : <Navigate to="/inicio" />} />{" "}
          <Route path="/adminempleados" element={userType === "true" ? <AdminEmpleados /> : <Navigate to="/inicio" />} />
        </Routes>
        {userType !== "true" && <Footer />}
      </div>
    </Router>
  );
}

export default App;
