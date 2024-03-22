import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
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
import GestionarInfo from "./components/Admin_screens/GestionarInfo";
import GestionCarrusel from "./components/Admin_screens/GestionCarrusel";
import GestionOrden from "./components/Admin_screens/GestionOrdenes";
import Chatcito from "./components/General_screens/Chatcito";

function App() {
  const verifAdmin = localStorage.getItem("IsAdmin");
  const verifEmployee = localStorage.getItem("IsEmployee");
  const tipoUser = localStorage.getItem("userType");

  return (
    <Router>
      <div className="App">
        {verifAdmin === "true" || verifEmployee === "true" ? (
          <Admin />
        ) : (
          <Navibar />
        )}
        <Routes>
          <Route
            path="/"
            element={
              verifAdmin === "true" ? (
                <PGAdmin />
              ) : verifEmployee === "true" ? (
                <GestionPW />
              ) : (
                <Inicio />
              )
            }
          />
          <Route
            path="/inicio"
            element={
              verifAdmin === "true" ? (
                <PGAdmin />
              ) : verifEmployee === "true" ? (
                <GestionPW />
              ) : (
                <Inicio />
              )
            }
          />
          <Route
            path="/privacidad"
            element={
              verifAdmin === "true" ? (
                <GestionCarrusel />
              ) : verifEmployee === "true" ? (
                <GestionPW />
              ) : (
                <Politicas />
              )
            }
          />
          <Route
            path="/quejas"
            element={
              verifAdmin === "true" ? (
                <GestionCarrusel />
              ) : verifEmployee === "true" ? (
                <GestionPW />
              ) : (
                <Quejas />
              )
            }
          />
          <Route
            path="/acerca"
            element={
              verifAdmin === "true" ? (
                <GestionCarrusel />
              ) : verifEmployee === "true" ? (
                <GestionPW />
              ) : (
                <InfoG />
              )
            }
          />
          <Route
            path="/editar"
            element={
              verifAdmin === "true" ? (
                <GestionCarrusel />
              ) : verifEmployee === "true" ? (
                <GestionPW />
              ) : (
                <EditarPerfil />
              )
            }
          />{" "}
          <Route
            path="/preguntas"
            element={
              verifAdmin === "true" ? (
                <GestionCarrusel />
              ) : verifEmployee === "true" ? (
                <GestionPW />
              ) : (
                <Fa />
              )
            }
          />
          <Route
            path="/compra"
            element={
              verifAdmin === "true" ? (
                <GestionCarrusel />
              ) : verifEmployee === "true" ? (
                <GestionPW />
              ) : (
                <ProcederCompra />
              )
            }
          />{" "}
          <Route
            path="/carrito"
            element={
              verifAdmin === "true" ? (
                <GestionCarrusel />
              ) : verifEmployee === "true" ? (
                <GestionPW />
              ) : (
                <Carrito />
              )
            }
          />{" "}
          <Route
            path="/favoritos"
            element={
              verifAdmin === "true" ? (
                <GestionCarrusel />
              ) : verifEmployee === "true" ? (
                <GestionPW />
              ) : (
                <Verfav />
              )
            }
          />
          <Route
            path="/pago"
            element={
              verifAdmin === "true" ? (
                <GestionCarrusel />
              ) : verifEmployee === "true" ? (
                <GestionPW />
              ) : (
                <Pago />
              )
            }
          />
          <Route
            path="/pagoP"
            element={
              verifAdmin === "true" ? (
                <GestionCarrusel />
              ) : verifEmployee === "true" ? (
                <GestionPW />
              ) : (
                <PagoP />
              )
            }
          />
          <Route
            path="/GestionarInfo"
            element={
              verifAdmin === "true" ? (
                <GestionarInfo />
              ) : verifEmployee === "true" ? (
                <GestionPW />
              ) : (
                <Navigate to="/inicio" />
              )
            }
          />
          <Route
            path="/gestion-carrusel"
            element={
              verifAdmin === "true" ? (
                <GestionCarrusel />
              ) : verifEmployee === "true" ? (
                <GestionPW />
              ) : (
                <Navigate to="/inicio" />
              )
            }
          />
          <Route
            path="/adminGeneral"
            element={
              verifAdmin === "true" ? (
                <PGAdmin />
              ) : verifEmployee === "true" ? (
                <GestionPW />
              ) : (
                <Navigate to="/inicio" />
              )
            }
          />
          <Route
            path="/ventas"
            element={
              verifAdmin === "true" ? (
                <Ventas />
              ) : verifEmployee === "true" ? (
                <GestionPW />
              ) : (
                <Navigate to="/inicio" />
              )
            }
          />
          <Route
            path="/adminempleados"
            element={
              verifAdmin === "true" ? (
                <AdminEmpleados />
              ) : verifEmployee === "true" ? (
                <GestionPW />
              ) : (
                <Navigate to="/inicio" />
              )
            }
          />
          <Route
            path="/gestionpw"
            element={
              verifAdmin === "true" ? (
                <GestionPW />
              ) : verifEmployee === "true" ? (
                <GestionPW />
              ) : (
                <Navigate to="/inicio" />
              )
            }
          />
          <Route
            path="/gestionordenes"
            element={
              verifAdmin === "true" ? (
                <GestionOrden />
              ) : verifEmployee === "true" ? (
                <GestionOrden />
              ) : (
                <Navigate to="/inicio" />
              )
            }
            /*element={
              tipoUser === "+" ? <GestionOrden /> : <Navigate to={"/gestionpw"} />
            }*/
          />
          <Route
            path="/modificarp"
            element={
              verifAdmin === "true" ? (
                <GestionCarrusel />
              ) : verifEmployee === "true" ? (
                <GestionPW />
              ) : (
                <ModificarP />
              )
            }
          />
          <Route
            path="/agregarp"
            element={
              verifAdmin === "true" ? (
                <GestionCarrusel />
              ) : verifEmployee === "true" ? (
                <GestionPW />
              ) : (
                <AgregarP />
              )
            }
          />
          <Route
            path="/historial-orden"
            element={
              verifAdmin === "true" ? (
                <GestionCarrusel />
              ) : verifEmployee === "true" ? (
                <GestionPW />
              ) : (
                <HOrden />
              )
            }
          />
          <Route
            path="/producto-filtro"
            element={
              verifAdmin === "true" ? (
                <GestionCarrusel />
              ) : verifEmployee === "true" ? (
                <GestionPW />
              ) : (
                <ProductoFiltro />
              )
            }
          />
          <Route
            path="/info-producto"
            element={
              verifAdmin === "true" ? (
                <GestionCarrusel />
              ) : verifEmployee === "true" ? (
                <GestionPW />
              ) : (
                <InfoProductos />
              )
            }
          />
        </Routes>
        {verifAdmin !== "true" && verifEmployee !== "true" && (
          <ConditionalComponents />
        )}
      </div>
    </Router>
  );
}
function ConditionalComponents() {
  const verifAdmin = localStorage.getItem("IsAdmin") === "true";
  const verifEmployee = localStorage.getItem("IsEmployee") === "true";
  const location = useLocation();
  const hideOnRoutes = ["/pago", "/pagoP", "/compra"];

  // El chat se mostrará si el usuario no es administrador ni empleado,
  // y si la ruta actual no está en la lista de hideOnRoutes
  const showChatcito =
    !verifAdmin && !verifEmployee && !hideOnRoutes.includes(location.pathname);

  return (
    <>
      {showChatcito && <Chatcito />}
      <Footer />
    </>
  );
}

export default App;
