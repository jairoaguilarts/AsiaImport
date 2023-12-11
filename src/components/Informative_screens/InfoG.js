
import React, { useState, useEffect } from 'react';
import './InfoG.css';

import iconMission from '../../assets/mission.png';
import iconInnovation from '../../assets/innovation.png';
import iconVision from '../../assets/visionary.png';
import iconHistoria from '../../assets/history-book.png';
import iconL from '../../assets/leadership.png';
import iconR from '../../assets/hand-shake.png';
import iconS from '../../assets/charity.png';
import iconJ from '../../assets/balance.png';
const InfoG = () => {
  const [expandedInfo, setExpandedInfo] = useState({});
  const toggleExpansion = (index) => {
    setExpandedInfo(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };
  const [empresaInfo, setEmpresaInfo] = useState({
    mision: "",
    vision: "",
    historia: ""
  });
  const cargarInformacionEmpresa = async () => {
    try {
      const response = await fetch("http://localhost:3000/obtenerInformacion?id=65768fb8175690a253ab6b95", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message || response.status}`);
      }

      const data = await response.json();

      // Actualizar el estado con la información obtenida
      if (data) {
        setEmpresaInfo({
          mision: data.mision,
          vision: data.vision,
          historia: data.historia
        });
      }
    } catch (error) {
      // mostrarAlerta("Error al cargar la información", "danger");
    }
  };
  useEffect(() => {
    cargarInformacionEmpresa();
  }, []);

const [showFullDescription, setShowFullDescription] = useState({});


  const valuesData = [
    {
      title: 'Innovación',
      icon: iconInnovation, // This should be the path to your image
    },
    {
      title: 'Liderazgo',
      icon: iconL, // This should be the path to your image
    }, {
      title: 'Responsabilidad',
      icon: iconR, // This should be the path to your image
    }, {
      title: 'Solidaridad',
      icon: iconS, // This should be the path to your image
    }, {
      title: 'Justicia',
      icon: iconJ, // This should be the path to your image
    }
    // ... other values
  ];

  return (
    <div className="cards-container">
      <div key="mision" className="card">
        <img src={iconMission} alt="Misión" className="card-icon" />
        <div className="card-title">Misión</div>
        <div className="card-description">
          {empresaInfo.mision}
          {expandedInfo.mision && (
            <div className="additional-info">
              {empresaInfo.misionC}
            </div>
          )}
        </div>
        <a href="#!" className="card-link" onClick={(e) => {
          e.preventDefault();
          toggleExpansion("mision");
        }}>
          {expandedInfo.mision ? 'Ver menos' : 'Ver más'}
        </a>
      </div>
      <div key="vision" className="card">
        <img src={iconVision} alt="Visión" className="card-icon" />
        <div className="card-title">Visión</div>
        <div className="card-description">
          {empresaInfo.vision}
          {expandedInfo.vision && (
            <div className="additional-info">
              {empresaInfo.visionC}
            </div>
          )}
        </div>
        <a href="#!" className="card-link" onClick={(e) => {
          e.preventDefault();
          toggleExpansion("vision");
        }}>
          {expandedInfo.vision ? 'Ver menos' : 'Ver más'}
        </a>
      </div>
      <div key="historia" className="card">
        <img src={iconHistoria} alt="Historia" className="card-icon" />
        <div className="card-title">Historia</div>
        <div className="card-description">
          {empresaInfo.historia}
          {expandedInfo.historia && (
            <div className="additional-info">
              {empresaInfo.historiaC}
            </div>
          )}
        </div>
        <a href="#!" className="card-link" onClick={(e) => {
          e.preventDefault();
          toggleExpansion("historia");
        }}>
          {expandedInfo.historia ? 'Ver menos' : 'Ver más'}
        </a>
      </div>
    </div>

  );
};

export default InfoG;
