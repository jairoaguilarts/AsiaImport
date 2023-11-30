import React, { useState } from 'react';
import './GestionPW.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import iconEdit from "../../assets/edit .png"; // Replace with the correct path to the edit icon image
import iconDelete from "../../assets/delete.png";// Replace with the correct path to the delete icon image
// import productImage1 from './product-image1.png'; // Replace with the correct path to product image
// import productImage2 from './product-image2.png'; // Replace with the correct path to product image
// import productImage3 from './product-image3.png'; // Replace with the correct path to product image

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
  
    const handleShowEliminarConfirmar = (productId) => {
      setProductToDelete(productId);
      setShowEliminarConfirmar(true);
    };
  
    const handleCloseEliminarConfirmar = () => {
      setShowEliminarConfirmar(false);
    };
  
    const handleEliminar = () => {
      // Here you would handle the actual deletion of the product
      console.log('Deleting product with id:', productToDelete);
      // After deletion logic is implemented, close the modal
      setShowEliminarConfirmar(false);
    };
  
    return (
      <div className="gestion-wrapper">
        <div className="title-bar">
          {/* Empty title bar used as a fixed header */}
        </div>
        <h1 className="title">Nuestros Productos</h1>
        <div className="gestion-container">
          <div className="top-bar">
            <button className="add-product-btn">Crear Nuevo Producto</button>
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
                {/* Replace 'product.image' with the actual image path */}
                <img src={product.image} alt="Product" className="product-image" />
                <div className="product-actions">
                  <button className="edit-btn" aria-label="Edit">
                    <img src={iconEdit} alt="Edit" />
                  </button>
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
        {/* Modal for delete confirmation */}
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
  }
  
  export default GestionPW;