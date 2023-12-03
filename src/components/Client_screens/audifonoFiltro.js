import React, { useState, useEffect } from 'react';
import './audifonoFiltro.css';
import audifonosProduct1 from "../../assets/edifierPlus.png";
import audifonosProduct2 from "../../assets/Srhythm.png";
import { useNavigate , useLocation } from 'react-router-dom'; // Importa useNavigate de react-router-dom

const AudifonoFiltro = () => {
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedSort, setSelectedSort] = useState('');
    const [selectedRating, setSelectedRating] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const location = useLocation();
    const categoria = location.state?.categoria;
    
    // Estados y constantes existentes
    const brands = ['Sony', 'Samsung', 'Srythm', 'Panasonic', 'Papas'];
    const sorts = ['Precio: Descendente a Ascendente', 'Precio: Ascendente a Descendente', 'Relevancia', 'El más nuevo'];
    const ratings = [5, 4, 3, 2, 1];
    const colors = ['#000000', '#808080', '#FFFFFF', '#A52A2A', '#FF0000', '#FFFF00', '#008000', '#0000FF'];

    // Nuevo estado para almacenar los productos de la API
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://importasia-api.onrender.com/productos');
                let data = await response.json();
                alert(categoria)
                if (categoria) {
                    data = data.filter(product => product.Categoria === categoria);
                }
    
                setProducts(data);
            } catch (error) {
                console.error('Error al cargar los productos:', error);
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
        setSelectedSort('');
        setSelectedRating([]);
        setSelectedColors([]);
    };

    const navigate = useNavigate();

    const handleProductClick = () => {
        navigate('/info-audifonos');
    };

    return  (
        <div className="main-container">
            <div className="filter-container">
                <div className="filter-header">
                    <h2>Filtros</h2>
                    <button onClick={clearAllFilters}>Clear All</button>
                </div>

                <div className="filter-section">
                    <h3>Marcas:</h3>
                    {brands.map((brand) => (
                        <div
                            key={brand}
                            className={`filter-option ${selectedBrands.includes(brand) ? 'selected' : ''}`}
                            onClick={() => toggleSelection(brand, selectedBrands, setSelectedBrands)}
                        >
                            <span className={`checkbox ${selectedBrands.includes(brand) ? 'checked' : ''}`}></span>
                            {brand}
                        </div>
                    ))}
                </div>

                <div className="filter-section">
                    <h3>Ordenar por:</h3>
                    {sorts.map((sort) => (
                        <div
                            key={sort}
                            className={`filter-option ${selectedSort === sort ? 'selected' : ''}`}
                            onClick={() => setSelectedSort(sort)}
                        >
                            <span className={`checkbox ${selectedSort === sort ? 'checked' : ''}`}></span>
                            {sort}
                        </div>
                    ))}
                </div>

                <div className="filter-section">
                    <h3>Colores:</h3>
                    <div className="color-section">
                        {colors.map((color) => (
                            <div
                                key={color}
                                className={`color-option ${selectedColors.includes(color) ? 'selected' : ''}`}
                                onClick={() => toggleSelection(color, selectedColors, setSelectedColors)}
                            >
                                <span className="color-circle" style={{ backgroundColor: color }}></span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="filter-section">
                    <h3>Clasificación:</h3>
                    {ratings.map((rating) => (
                        <div
                            key={rating}
                            className={`filter-option ${selectedRating.includes(rating) ? 'selected' : ''}`}
                            onClick={() => toggleSelection(rating, selectedRating, setSelectedRating)}
                        >
                            {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
                        </div>
                    ))}
                </div>
            </div>
            <div className="product-list-container">
                {products.map((product, index) => (
                    <div className="product-container" key={index}>
                        <button className="product-image-btn" onClick={handleProductClick}>
                            <img src={product.ImagenID[0]} alt={product.Nombre} />
                        </button>
                        <div className="product-details">
                            <h3>{product.Nombre}</h3>
                            <p>Modelo: {product.Modelo}</p>
                            <p>{product.Descripcion}</p>
                            <p className="price">L.{product.Precio}</p>
                            <button className="btn-add-to-cart">AÑADIR AL CARRITO</button>
                            <button className="btn-add-to-favorites">AGREGAR A FAVORITOS</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AudifonoFiltro;