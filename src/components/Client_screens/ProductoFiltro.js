import React, { useState, useEffect } from "react";
import "./ProductoFiltro.css";
import audifonosProduct1 from "../../assets/edifierPlus.png";
import audifonosProduct2 from "../../assets/Srhythm.png";
import originIcon from "../../assets/maneki-neko.png";
import { useNavigate, useLocation } from "react-router-dom";
import Pagination from "../Client_screens/Pagination";

const AudifonoFiltro = () => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedRating, setSelectedRating] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  const [products, setProducts] = useState([]);
  const [sortedAndPaginatedProducts, setSortedAndPaginatedProducts] = useState(
    []
  );

  //logica de paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  //productos para la pagina actual
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const categoria = location.state?.categoria;

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

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const terminoBusqueda = categoria.trim();
      const urls = [
        `http://localhost:3000/buscarProductoCategoria?Nombre=${terminoBusqueda}`,
        `http://localhost:3000/buscarProductoNombre?Nombre=${terminoBusqueda}`,
        `http://localhost:3000/buscarProductoModelo?Modelo=${terminoBusqueda}`
      ];
  
      try {
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const resultados = await Promise.all(responses.map(res => res.json()));
  
        const productosEncontrados = resultados.filter(res => res.length > 0).flat();
  
        setTimeout(() => {
          setProducts(productosEncontrados);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [categoria]);
  
  
  useEffect(() => {
    let sortedProducts = [...products];

    if (selectedSort === "Precio: Descendente a Ascendente") {
      sortedProducts.sort((a, b) => a.Precio - b.Precio);
    } else if (selectedSort === "Precio: Ascendente a Descendente") {
      sortedProducts.sort((a, b) => b.Precio - a.Precio);
    }

    // Aquí aplicamos la paginación
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const paginatedProducts = sortedProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );

    setSortedAndPaginatedProducts(paginatedProducts);
  }, [selectedSort, products, currentPage]);

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
      {loading ? (
        <div className="noproduct-found">
          <h1>Cargando productos...</h1>
          <img src={originIcon} alt="gatito" />
        </div>
      ) : products.length === 0 ? (
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
          </div>

          <div className="product-list-container">
            {sortedAndPaginatedProducts.map((product, index) => (
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
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={products.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  );
};

export default AudifonoFiltro;
