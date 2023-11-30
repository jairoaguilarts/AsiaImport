import React, { useState, useRef } from 'react';
import './GestionPW.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import iconEdit from "../../assets/edit .png";
import iconDelete from "../../assets/delete.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ModificarP from '../modalesProductos/ModificarP';
const products = [
  {
    id: 1,
    model: 'IK92L',
    category: 'Audífonos',
    name: 'Srhhythm NiceComfort',
    description: 'Los audífonos inalámbricos WH-CH520, diseñados con la comodidad para...',
    // image: productImage1
  },
  {
    id: 2,
    model: 'IK92L',
    category: 'Audífonos',
    name: 'Edifier W820NB Plus',
    description: 'Los audífonos inalámbricos WH-CH520 plus, diseñados con la comodidad para...',
    // image: productImage2
  },
  {
    id: 3,
    model: 'IK92L',
    category: 'Audífonos',
    name: 'Tozo HT2 Hybrid',
    description: 'Los audífonos inalámbricos WH-CH520 plus, diseñados con la comodidad para...',
    // image: productImage3
  }
];

const GestionPW = () => {
  const [showEliminarConfirmar, setShowEliminarConfirmar] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const nuestrosProductosRef = useRef(null);
  const editarProductosDestacadosRef = useRef(null);
  const editarImagenesCarrouselRef = useRef(null);
  const editarInformacionRef = useRef(null);
  const [showModalModificarP, setShowModalModificarP] = useState(false);
  const [modalState, setModalState] = useState({ showModal: false, productToEdit: null });
  const handleShowModalModificarP = (product) => {
    setModalState({ showModal: true, productToEdit: product });
  };

  // Maneja el cierre del modal de ModificarP
  const handleCloseModalModificarP = () => {
    setModalState({ showModal: false, productToEdit: null });
  };

  const toggleModal = () => {
    setShowModalModificarP(!showModalModificarP);
  };


  const handleShowEliminarConfirmar = (productId) => {
    setProductToDelete(productId);
    setShowEliminarConfirmar(true);
  };

  const handleCloseEliminarConfirmar = () => {
    setShowEliminarConfirmar(false);
  };

  const handleEliminar = () => {
    console.log('Deleting product with id:', productToDelete);
    setShowEliminarConfirmar(false);
  };

  const scrollToSection = (ref) => {
    window.scrollTo({ top: ref.current.offsetTop, behavior: 'smooth' });
  };

  return (
    <div className="gestion-wrapper">
      {/* Barra de navegación */}
      <div className="navbar">
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
            <div className="search-container">
              <input type="text" placeholder="Buscar..." className="search-bar" />
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
              <div className="product-row" key={product.id}>
                <span className="product-model">{product.model}</span>
                <span className="product-category">{product.category}</span>
                <span className="product-name">{product.name}</span>
                <span className="product-description">{product.description}</span>
                <img src={product.image} alt="Product" className="product-image" />
                <div className="product-actions">
                <Link to="/modificarp">
                  <button
                    className="edit-btn"
                    aria-label="Edit"
                  >
                    <img src={iconEdit} alt="Edit" />
                  </button>
                  </Link>
                  <button
                    className="delete-btn"
                    aria-label="Delete"
                    onClick={() => handleShowEliminarConfirmar(product.id)}
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
