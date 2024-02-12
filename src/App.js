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
import PagoP from "./components/Client_screens/PagoP";
import HOrden from "./components/Client_screens/HistorialOrden";
import GestionarInfo from "./components/Admin_screens/GestionarInfo"
import GestionCarrusel from "./components/Admin_screens/GestionCarrusel";
import GestionOrden from "./components/Admin_screens/GestionOrdenes";
import Chatcito from "./components/General_screens/Chatcito";

function App() {
  const verifAdmin = localStorage.getItem("IsAdmin");
  const tipoUser = localStorage.getItem("userType");

  return (
    <Router>
      <div className="App">
        {verifAdmin === "true" ? <Admin /> : <Navibar />}

        <Routes>
          <Route
            path="/"
            element={verifAdmin === "true" ? <PGAdmin /> : <Inicio />}
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
          <Route path="/pagoP" element={<PagoP />} />
          <Route path="/GestionarInfo" element={<GestionarInfo />} />
          <Route path="/gestion-carrusel" element={<GestionCarrusel />} />
          <Route
            path="/adminGeneral"
            element={
              verifAdmin === "true" ? <PGAdmin /> : <Navigate to="/inicio" />
            }
          />{" "}
          <Route
            path="/ventas"
            element={
              verifAdmin === "true" ? <Ventas /> : <Navigate to="/inicio" />
            }
          />{" "}
          <Route
            path="/adminempleados"
            element={
              verifAdmin === "true" ? (
                <AdminEmpleados />
              ) : (
                <Navigate to="/inicio" />
              )
            }
          />
          <Route
            path="/gestionpw"
            element={
              verifAdmin === "true" ? <GestionPW /> : <Navigate to="/inicio" />
            }
          />
          <Route
            path="/gestionordenes"
            element={<GestionOrden/>}
            /*element={
              tipoUser === "+" ? <GestionOrden /> : <Navigate to={"/gestionpw"} />
            }*/
          />
          <Route path="/modificarp" element={<ModificarP />} />
          <Route path="/agregarp" element={<AgregarP />} />
          <Route path="/historial-orden" element={<HOrden />} />
          <Route path="/producto-filtro" element={<ProductoFiltro />} />
          <Route path="/info-producto" element={<InfoProductos />} />
        </Routes>
        {verifAdmin !== "true" && <Chatcito />}
        {verifAdmin !== "true" && <Footer />}
      </div>
    </Router>
  );
}

export default App;
