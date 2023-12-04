import React, { useState, useRef, useEffect } from "react";
import "./GestionPW.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import iconEdit from "../../assets/edit .png";
import iconDelete from "../../assets/delete.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import searchIcon from "../../assets/lupa.png";
import CustomAlert from "../Informative_screens/CustomAlert";
import ModificarP from "../modalesProductos/ModificarP";

const GestionPW = () => {
  const [showEliminarConfirmar, setShowEliminarConfirmar] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [searched, setSearched] = useState(false);

  const mostrarAlerta = (message, variant) => {
    setAlertVariant(variant);
    setAlertMessage(message);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 2400);
  };

  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (!searched) {
      fetch("https://importasia-api.onrender.com/productos")
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.error("Error:", error));
    }
  }, [searched]);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("white");

  const nuestrosProductosRef = useRef(null);
  const editarProductosDestacadosRef = useRef(null);
  const editarImagenesCarrouselRef = useRef(null);
  const editarInformacionRef = useRef(null);
  const [showModalModificarP, setShowModalModificarP] = useState(false);
  const [modalState, setModalState] = useState({
    showModal: false,
    productToEdit: null,
  });
  const [busqueda, setBusqueda] = useState("");

  const handleShowModalModificarP = (product) => {
    setModalState({ showModal: true, productToEdit: product });
  };

  const userType = localStorage.getItem("userType");

  const handleCloseModalModificarP = () => {
    setModalState({ showModal: false, productToEdit: null });
  };

  const toggleModal = () => {
    setShowModalModificarP(!showModalModificarP);
  };

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
        "https://importasia-api.onrender.com/eliminarProducto?Modelo=" +
        productoSeleccionado,
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

  const scrollToSection = (ref) => {
    window.scrollTo({ top: ref.current.offsetTop, behavior: "smooth" });
  };

  const handleActualizar = () => { };

  const handleUploadImage = (event) => {
    const file = event.target.files[0];
    console.log("Imagen para subir:", file);
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
    const buscar = {
      Nombre: buscarConSinonimos(busqueda.trim()),
    };

    try {
      if (busqueda === "") {
        mostrarAlerta("No se ingresó ningún parametro", "danger");
        return;
      }
      const response = await fetch(
        `https://importasia-api.onrender.com/buscarProductoCategoria?Nombre=${buscar.Nombre}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(`Error: ${responseData.message || response.status}`);
      } else if (responseData.length === 0) {
        mostrarAlerta(
          "No se encontraron productos para esa categoría",
          "danger"
        );
      } else {
        mostrarAlerta("Producto encontrado", "success");
        setProducts(responseData);
        setSearched(true);
      }
    } catch (error) {
      mostrarAlerta("Error en la busqueda", "danger");
    }
  };

  return (
    <div className="gestion-wrapper">
      {/* Barra de navegación */}
      <div className="navbar2">
        <button onClick={() => scrollToSection(nuestrosProductosRef)}>
          Nuestros Productos
        </button>
        <button onClick={() => scrollToSection(editarProductosDestacadosRef)}>
          Editar Productos Destacados
        </button>
        <button onClick={() => scrollToSection(editarImagenesCarrouselRef)}>
          Editar Imágenes Carrousel
        </button>
        <button onClick={() => scrollToSection(editarInformacionRef)}>
          Editar Información
        </button>
      </div>
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
                <span>Descripción</span>
                <span>Imagen</span>
                <span>Editar</span>
              </div>
              {products.map((product) => (
                <div className="product-row" key={product.Modelo}>
                  <span className="product-model">{product.Modelo}</span>
                  <span className="product-category">{product.Categoria}</span>
                  <span className="product-name">{product.Nombre}</span>
                  <span className="product-description">
                    {product.Descripcion}
                  </span>
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sección Editar Productos Destacados */}
      {/* <div ref={editarProductosDestacadosRef} className="section">
        <div className="editar-informacion-title">
          <h1 className="title">Editar Productos Destacados</h1>
        </div>
      </div> */}

      {/* Sección Editar Imágenes Carrousel */}
      {/*<div ref={editarImagenesCarrouselRef} className="section">
        <div className="editar-informacion-title">
          <h1 className="title">Editar Imágenes del Carrusel</h1>
        </div>
        <div className="editar-imagenes-carrousel-container">
          <div className="current-images-container">
            <h2>Imágenes Actuales</h2>
            
            <div className="current-images-display">
              
            </div>
          </div>
          <div className="image-upload-container">
            <h2>Subir Nueva Imagen</h2>
            
            <input type="file" multiple onChange={handleUploadImage} />
            <p>
              Selecciona una o varias imágenes y luego haz clic en 'Actualizar
              Imágenes' para subir.
            </p>
            <button className="editar-informacion-btn">
              Actualizar Imágenes
            </button>
          </div>
        </div>
      </div>*/}

      {/* Sección Editar Información */}
      {/* <div ref={editarInformacionRef} className="section">
        <div className="editar-informacion-title">
          <h1 className="title">Editar Informacion</h1>
        </div>
        <div ref={editarInformacionRef} className="section editar-informacion">
          <div className="editar-informacion-container">
            <div className="editar-informacion-field">
              <label htmlFor="mision">Misión</label>
              <textarea
                id="mision"
              ></textarea>
            </div>
            <div className="editar-informacion-field">
              <label htmlFor="vision">Visión</label>
              <textarea
                id="vision"
              ></textarea>
            </div>
            <div className="editar-informacion-field">
              <label htmlFor="historia">Historia</label>
              <textarea
                id="historia"
              ></textarea>
              <button
                className="editar-informacion-btn"
                onClick={handleActualizar}
              >
                Actualizar Información
              </button>
            </div>
          </div>
        </div>
      </div> */}

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
