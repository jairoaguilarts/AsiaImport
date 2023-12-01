import React, { useState, useRef, useEffect } from 'react';
import './GestionPW.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import iconEdit from "../../assets/edit .png";
import iconDelete from "../../assets/delete.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CustomAlert from '../Informative_screens/CustomAlert';
import ModificarP from '../modalesProductos/ModificarP';

const GestionPW = () => {
  const [showEliminarConfirmar, setShowEliminarConfirmar] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  

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
    fetch('https://importasiahn.netlify.app/productos')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("white");

  const nuestrosProductosRef = useRef(null);
  const editarProductosDestacadosRef = useRef(null);
  const editarImagenesCarrouselRef = useRef(null);
  const editarInformacionRef = useRef(null);
  const [showModalModificarP, setShowModalModificarP] = useState(false);
  const [modalState, setModalState] = useState({ showModal: false, productToEdit: null });
  const handleShowModalModificarP = (product) => {
    setModalState({ showModal: true, productToEdit: product });
  };

  const userType = localStorage.getItem("userType");

  // Maneja el cierre del modal de ModificarP
  const handleCloseModalModificarP = () => {
    setModalState({ showModal: false, productToEdit: null });
  };

  const toggleModal = () => {
    setShowModalModificarP(!showModalModificarP);
  };

  const handleModelSubmit = (Modelo) => {
    localStorage.setItem("Modelo", Modelo);
  }

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
    alert(userType);
    try {
      const response = await fetch('https://importasiahn.netlify.app/eliminarProducto?Modelo=' + productoSeleccionado,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(datoEliminar),
        }
      );
      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message || response.status}`);
      }
      mostrarAlerta("Producto eliminado exitosamente", "info");
      setProducts(products.filter((product) => product.Modelo !== productoSeleccionado));
    } catch (error) {
      mostrarAlerta("Error al eliminar el Producto", "danger");
    }

    setShowEliminarConfirmar(false);
    setProductoSeleccionado(null);
  };

  const scrollToSection = (ref) => {
    window.scrollTo({ top: ref.current.offsetTop, behavior: 'smooth' });
  };

  return (
    <div className="gestion-wrapper">
      {/* Barra de navegación */}
      <div className="navbar2">
        <button onClick={() => scrollToSection(nuestrosProductosRef)}>Nuestros Productos</button>
        <button onClick={() => scrollToSection(editarProductosDestacadosRef)}>Editar Productos Destacados</button>
        <button onClick={() => scrollToSection(editarImagenesCarrouselRef)}>Editar Imágenes Carrousel</button>
        <button onClick={() => scrollToSection(editarInformacionRef)}>Editar Información</button>
      </div>

      {/* Sección Nuestros Productos */}
      <div ref={nuestrosProductosRef} className="section">
        <div className="title-bar">
          {/* Empty title bar used as a fixed header */}
        </div>
        <h1 className="title">Nuestros Productos</h1>
        <div className="gestion-container">
          <div className="top-bar">
            <Link to="/agregarp">
              <button className="add-product-btn">Crear Nuevo Producto</button>
            </Link>
            <div className="search-container2">
              <input type="text" placeholder="Buscar..." className="search-bar2" />
            </div>
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
            {products.map(product => (
              <div className="product-row" key={product.Modelo}>
                <span className="product-model">{product.Modelo}</span>
                <span className="product-category">{product.Categoria}</span>
                <span className="product-name">{product.Nombre}</span>
                <span className="product-description">{product.Descripcion}</span>
                <img src={product.ImagenID[0]} alt="Product" className="product-image" />
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
                    onClick={() => handleShowEliminarConfirmar(product.Modelo)}
                  >
                    <img src={iconDelete} alt="Delete" />
                  </button>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* Sección Editar Productos Destacados */}
      <div ref={editarProductosDestacadosRef} className="section">
        <h2>Editar Productos Destacados</h2>
        {/* Contenido para Editar Productos Destacados */}
      </div>

      {/* Sección Editar Imágenes Carrousel */}
      <div ref={editarImagenesCarrouselRef} className="section">
        <h2>Editar Imágenes Carrousel</h2>
        {/* Contenido para Editar Imágenes Carrousel */}
      </div>

      {/* Sección Editar Información */}
      <div ref={editarInformacionRef} className="section">
        <h2>Editar Información</h2>
        {/* Contenido para Editar Información */}
      </div>

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
