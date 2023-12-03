import React, { useState, useEffect } from "react";
import "./ProductoFiltro.css";
import audifonosProduct1 from "../../assets/edifierPlus.png";
import audifonosProduct2 from "../../assets/Srhythm.png";
import originIcon from "../../assets/maneki-neko.png";
import { useNavigate, useLocation } from "react-router-dom";

const AudifonoFiltro = () => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedRating, setSelectedRating] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const location = useLocation();
  const categoria = location.state?.categoria;

  // Estados y constantes existentes
  const brands = ["Sony", "Samsung", "Srythm", "Panasonic", "Papas"];
  const sorts = [
    "Precio: Descendente a Ascendente",
    "Precio: Ascendente a Descendente",
    "Relevancia",
    "El más nuevo",
  ];
  const ratings = [5, 4, 3, 2, 1];
  const colors = [
    "#000000",
    "#808080",
    "#FFFFFF",
    "#A52A2A",
    "#FF0000",
    "#FFFF00",
    "#008000",
    "#0000FF",
  ];

  // Nuevo estado para almacenar los productos de la API
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      console.log("categoria: " + categoria);
      try {
        const response = await fetch(
          `https://importasia-api.onrender.com/buscarProductoCategoria?Nombre=${categoria.trim()}`,
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
        } else {
          setProducts(responseData);
        }
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    };

    fetchProducts();
  }, [categoria]);

  // Funciones existentes
  const toggleSelection = (item, list, setList) => {
    const currentIndex = list.indexOf(item);
    const newSelected = [...list];

    if (currentIndex === -1) {
      newSelected.push(item);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setList(newSelected);
  };

  const clearAllFilters = () => {
    setSelectedBrands([]);
    setSelectedSort("");
    setSelectedRating([]);
    setSelectedColors([]);
  };

  const navigate = useNavigate();

  const handleSubmit = (modelo) => {
    localStorage.setItem("Modelo", modelo);
    navigate("/info-producto");
  };

  return (
    <div className="main-container">
      {products.length === 0 ? (
        <div className="noproduct-found">
          <h1>No hay productos que coincidan con la búsqueda</h1>
          <img src={originIcon} alt="gatito" />
        </div>
      ) : (
        <>
          <div className="filter-container">
            <div className="filter-header">
              <h2>Filtros</h2>
              <button onClick={clearAllFilters}>Clear All</button>
            </div>

            <div className="filter-section">
              <h3>Ordenar por:</h3>
              {sorts.map((sort) => (
                <div
                  key={sort}
                  className={`filter-option ${
                    selectedSort === sort ? "selected" : ""
                  }`}
                  onClick={() => setSelectedSort(sort)}
                >
                  <span
                    className={`checkbox ${
                      selectedSort === sort ? "checked" : ""
                    }`}
                  ></span>
                  {sort}
                </div>
              ))}
            </div>

            {/* Otros bloques de filtro que puedas necesitar */}
          </div>

          <div className="product-list-container">
            {products.map((product, index) => (
              <div className="product-container" key={index}>
                <button
                  className="product-image-btn"
                  onClick={() => handleSubmit(product.Modelo)}
                >
                  <img src={product.ImagenID[0]} alt={product.Nombre} />
                </button>
                <div className="product-details">
                  <h3>{product.Nombre}</h3>
                  <p>Modelo: {product.Modelo}</p>
                  <p>{product.Descripcion}</p>
                  <p className="price">L.{product.Precio}</p>
                  <button className="btn-add-to-cart">AÑADIR AL CARRITO</button>
                  <button className="btn-add-to-favorites">
                    AGREGAR A FAVORITOS
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AudifonoFiltro;