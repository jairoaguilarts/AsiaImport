// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navibar from "./components/General_screens/Navibar";
import Footer from "./components/General_screens/Footer";
import Inicio from "./components/Client_screens/Inicio";
import InfoG from "./components/Informative_screens/InfoG";
import Admin from "./components/Admin_screens/AdminPage";
import Fa from "./components/Informative_screens/Fa";
import ProcederCompra from "./components/Client_screens/ProcederCompra";
import Carrito from "./components/Client_screens/Carrito";
import PGAdmin from "./components/Admin_screens/PGeneralAdmin";
import "bootstrap/dist/css/bootstrap.min.css";
import EditarPerfil from "./components/Client_screens/EditarPerfil";
import Ventas from "./components/Admin_screens/Ventas";
import AdminEmpleados from "./components/Admin_screens/AdminEmpleados";
import GestionPW from "./components/Admin_screens/GestionPW";
import ModificarP from "./components/modalesProductos/ModificarP";
import AgregarP from "./components/modalesProductos/AgregarP";
import ProductoFiltro from "./components/Client_screens/ProductoFiltro";
import InfoProductos from "./components/Client_screens/InfoProducto";
import Politicas from "./components/General_screens/Politicas";
import Quejas from "./components/General_screens/quejas";
import Verfav from "./components/Client_screens/Verfav";
import Pago from "./components/Client_screens/Pago";

function App() {
  const userType = localStorage.getItem("IsAdmin");

  return (
    <Router>
      <div className="App">
        {userType === "true" ? <Admin /> : <Navibar />}

        <Routes>
          <Route
            path="/"
            element={userType === "true" ? <PGAdmin /> : <Inicio />}
          />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/privacidad" element={<Politicas />} />
          <Route path="/quejas" element={<Quejas />} />
          <Route path="/acerca" element={<InfoG />} />
          <Route path="/editar" element={<EditarPerfil />} />{" "}
          <Route path="/preguntas" element={<Fa />} />
          <Route path="/compra" element={<ProcederCompra />} />{" "}
          <Route path="/carrito" element={<Carrito />} />{" "}
          <Route path="/favoritos" element={<Verfav />} />
          <Route path="/pago" element={<Pago />} />
          <Route
            path="/adminGeneral"
            element={
              userType === "true" ? <PGAdmin /> : <Navigate to="/inicio" />
            }
          />{" "}
          <Route
            path="/ventas"
            element={
              userType === "true" ? <Ventas /> : <Navigate to="/inicio" />
            }
          />{" "}
          <Route
            path="/adminempleados"
            element={
              userType === "true" ? (
                <AdminEmpleados />
              ) : (
                <Navigate to="/inicio" />
              )
            }
          />
          <Route
            path="/gestionpw"
            element={
              userType === "true" ? <GestionPW /> : <Navigate to="/inicio" />
            }
          />
          <Route path="/modificarp" element={<ModificarP />} />
          <Route path="/agregarp" element={<AgregarP />} />
          <Route path="/producto-filtro" element={<ProductoFiltro />} />
          <Route path="/info-producto" element={<InfoProductos />} />
        </Routes>
        {userType !== "true" && <Footer />}
      </div>
    </Router>
  );
}

export default App;
