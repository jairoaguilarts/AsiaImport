import React, { useState, useRef, useEffect } from "react";
import "./GestionPW.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import iconEdit from "../../assets/edit .png";
import iconDelete from "../../assets/delete.png";
import { Link } from "react-router-dom";
import searchIcon from "../../assets/lupa.png";
import estrellaVacia from "../../assets/estrella.png";
import estrellaLlena from "../../assets/estrella-llena.png";
import CustomAlert from "../Informative_screens/CustomAlert";
import Pagination from "../Client_screens/Pagination";

const GestionPW = () => {
  const [showEliminarConfirmar, setShowEliminarConfirmar] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [searched, setSearched] = useState(false);
  const [productosDestacados, setProductosDestacados] = useState([]);

  const mostrarAlerta = (message, variant) => {
    setAlertVariant(variant);
    setAlertMessage(message);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 2400);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (!searched) {
      fetch("https://importasia-api.onrender.com/productosP")
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);

          // Inicializa el estado de los checkboxes y productos destacados
          const newSelectedProducts = {};
          const initialProductosDestacados = [];
          data.forEach((product) => {
            newSelectedProducts[product.Modelo] = product.Destacado;

            if (product.Destacado) {
              initialProductosDestacados.push(product.Modelo);
            }
          });

          setSelectedProducts(newSelectedProducts);
          setProductosDestacados(initialProductosDestacados);
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [searched]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("white");

  const nuestrosProductosRef = useRef(null);
  const [showModalModificarP, setShowModalModificarP] = useState(false);
  const [modalState, setModalState] = useState({
    showModal: false,
    productToEdit: null,
  });

  const [busqueda, setBusqueda] = useState("");
  const userType = localStorage.getItem("userType");

  const handleModelSubmit = (Modelo) => {
    localStorage.setItem("Modelo", Modelo);
  };

  const handleShowEliminarConfirmar = (Modelo) => {
    setProductoSeleccionado(Modelo);
    setShowEliminarConfirmar(true);
  };

  const handleCloseEliminarConfirmar = () => {
    setShowEliminarConfirmar(false);
  };

  const handleEliminar = async () => {
    if (!productoSeleccionado) {
      mostrarAlerta("No se ha seleccionado ningun producto", "danger");
      return;
    }
    const datoEliminar = {
      userDeletingType: userType,
    };
    try {
      const response = await fetch(
        `https://importasia-api.onrender.com/eliminarProducto?Modelo=${productoSeleccionado}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datoEliminar),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message || response.status}`);
      }
      mostrarAlerta("Producto eliminado exitosamente", "info");
      setProducts(
        products.filter((product) => product.Modelo !== productoSeleccionado)
      );
    } catch (error) {
      mostrarAlerta("Error al eliminar el Producto", "danger");
    }

    setShowEliminarConfirmar(false);
    setProductoSeleccionado(null);
  };

  const sinonimos = {
    audífonos: "AURICULARES",
    audifonos: "AURICULARES",
    audifono: "AURICULARES",
    audífono: "AURICULARES",
    cascos: "AURICULARES",
    auricular: "AURICULARES",
    termo: "BOTES",
    termos: "BOTES",
    bote: "BOTES",
    botellas: "BOTES",
    cargador: "CARGADORES",
    protector: "COBERTORES",
    protectores: "COBERTORES",
    cobertor: "COBERTORES",
    vidrio: "VIDRIO TEMPLADO",
    vidrios: "VIDRIO TEMPLADO",
    "vidrio templado": "VIDRIO TEMPLADO",
    parlante: "PARLANTE",
    altavoz: "PARLANTE",
    altavoces: "PARLANTE",
    bocina: "PARLANTE",
    bocinas: "PARLANTE",
    radio: "PARLANTE",
    radios: "PARLANTE",
    reloj: "SMARTWATCH",
    relojes: "SMARTWATCH",
    "relojes inteligentes": "SMARTWATCH",
    smartwatches: "SMARTWATCH",
  };

  const buscarConSinonimos = (termino) => {
    const palabraSinonimo = sinonimos[termino.toLowerCase()];
    return palabraSinonimo || termino;
  };

  const handleSearch = async () => {
    if (busqueda.trim() === "") {
      mostrarAlerta("No se ingresó ningún término de búsqueda", "danger");
      return;
    }

    const terminoBusqueda = buscarConSinonimos(busqueda.trim());
    const urls = [
      `https://importasia-api.onrender.com/buscarProductoCategoria?Nombre=${terminoBusqueda}`,
      `https://importasia-api.onrender.com/buscarProductoNombre?Nombre=${terminoBusqueda}`,
      `https://importasia-api.onrender.com/buscarProductoModeloVariante2?Modelo=${terminoBusqueda}`,
    ];

    try {
      setProducts([]); // Limpia la lista de productos

      const responses = await Promise.all(urls.map((url) => fetch(url)));
      const resultados = await Promise.all(responses.map((res) => res.json()));

      const productosEncontrados = resultados
        .filter((res) => res.length > 0)
        .flat();

      if (productosEncontrados.length === 0) {
        mostrarAlerta("No se encontraron productos", "danger");
      } else {
        mostrarAlerta("Productos encontrados", "success");
        setSearched(true);

        setCurrentPage(1);

        setProducts(productosEncontrados);
      }
    } catch (error) {
      mostrarAlerta("Error en la búsqueda", "danger");
    }
  };

  const handleCheckboxChange = async (modelo) => {
    setSelectedProducts((prevState) => ({
      ...prevState,
      [modelo]: !prevState[modelo],
    }));

    if (productosDestacados.includes(modelo)) {
      await fetch("https://importasia-api.onrender.com/destacarProducto?Modelo=" + modelo, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Destacado: false }),
      });

      setProductosDestacados((prev) => prev.filter((prod) => prod !== modelo));
    } else {
      setProductosDestacados((prev) => [...prev, modelo].slice(0, 8));
    }
  };

  const [selectedProducts, setSelectedProducts] = useState({});
  const handleDestacado = async () => {
    try {
      const requests = productosDestacados.map((Modelo) => {
        return fetch(
          "https://importasia-api.onrender.com/destacarProducto?Modelo=" +
            Modelo,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ Destacado: true }),
          }
        );
      });

      await Promise.all(requests);
      mostrarAlerta("Productos destacados actualizados", "success");
    } catch (error) {
      mostrarAlerta("Error al actualizar productos destacados", "danger");
    }
  };

  return (
    <div className="gestion-wrapper">
      {/* Barra de navegación */}
      
      <div className="tabla-productos">
        {/* Sección Nuestros Productos */}
        <div ref={nuestrosProductosRef} className="section">
          <div className="title-bar"></div>
          <div className="editar-informacion-title">
            <h1 className="title">Nuestros Productos</h1>
          </div>
          <div className="gestion-container">
            <div className="top-bar">
              <Link to="/agregarp">
                <button className="add-product-btn">
                  Crear Nuevo Producto
                </button>
              </Link>
              <button className="add-product-btn" onClick={handleDestacado}>
                Actualizar Productos Destacados
              </button>
              <div className="search-container2">
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="search-bar2"
                  id="barraBuscar"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
                <button className="add-product-btn" onClick={handleSearch}>
                  <img src={searchIcon} alt="Buscar" className="icon" />
                </button>
              </div>
              {showAlert && (
                <CustomAlert
                  className="alerta"
                  message={alertMessage}
                  variant={alertVariant}
                  onClose={() => setShowAlert(false)}
                />
              )}
            </div>
            <div className="product-table">
              <div className="product-row header">
                <span>Modelo</span>
                <span>Categoría</span>
                <span>Nombre</span>
                <span>Imagen</span>
                <span>Editar</span>
              </div>
              {currentProducts.map((product) => (
                <div className="product-row" key={product.Modelo}>
                  <span className="product-model">{product.Modelo}</span>
                  <span className="product-category">{product.Categoria}</span>
                  <span className="product-name">{product.Nombre}</span>
                  <img
                    src={product.ImagenID[0]}
                    alt="Product"
                    className="product-image"
                  />
                  <div className="product-actions">
                    <Link to="/modificarp">
                      <button
                        className="edit-btn"
                        aria-label="Edit"
                        onClick={() => handleModelSubmit(product.Modelo)}
                      >
                        <img src={iconEdit} alt="Edit" />
                      </button>
                    </Link>
                    <button
                      className="delete-btn"
                      aria-label="Delete"
                      onClick={() =>
                        handleShowEliminarConfirmar(product.Modelo)
                      }
                    >
                      <img src={iconDelete} alt="Delete" />
                    </button>
                    <label className="delete-btn">
                      <input
                        type="checkbox"
                        checked={selectedProducts[product.Modelo]}
                        onChange={() => handleCheckboxChange(product.Modelo)}
                        style={{ display: "none" }}
                      />
                      <img
                        src={
                          selectedProducts[product.Modelo]
                            ? estrellaLlena
                            : estrellaVacia
                        }
                        alt={
                          selectedProducts[product.Modelo]
                            ? "Estrella llena"
                            : "Estrella vacía"
                        }
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        paginate={paginate}
        currentPage={currentPage}
      />

      {/* Modal para confirmación de eliminación */}
      <Modal
        className="modal-confirmar"
        show={showEliminarConfirmar}
        onHide={handleCloseEliminarConfirmar}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar este producto?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEliminarConfirmar}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleEliminar}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GestionPW;
