import React, { useState, useEffect } from 'react';
import './InfoG.css';

import iconMission from '../../assets/mission.png';
import iconVision from '../../assets/visionary.png';
import iconHistoria from '../../assets/history-book.png';
import iconInnovation from '../../assets/innovation.png';
import iconL from '../../assets/leadership.png';
import iconR from '../../assets/hand-shake.png';
import iconS from '../../assets/charity.png';
import iconJ from '../../assets/balance.png';

const InfoG = () => {
  const [expandedInfo, setExpandedInfo] = useState({});
  const [empresaInfo, setEmpresaInfo] = useState({
    mision: "",
    vision: "",
    historia: ""
  });

  const toggleExpansion = (key) => {
    setExpandedInfo(prevState => ({
      ...prevState,
      [key]: !prevState[key]
    }));
  };

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

      if (data) {
        setEmpresaInfo({
          mision: data.mision,
          vision: data.vision,
          historia: data.historia
        });
      }
    } catch (error) {
      console.error("Error al cargar la información", error);
    }
  };

  useEffect(() => {
    cargarInformacionEmpresa();
  }, []);

  const renderCard = (key, title, icon) => (
    <div key={key} className="card">
      <img src={icon} alt={title} className="card-icon" />
      <div className="card-title">{title}</div>
      <div className="card-description">
        {expandedInfo[key] ? empresaInfo[key] : empresaInfo[key].substring(0, 250) + '...'}
        <div className="link-container">
          <a href="#!" className="card-link" onClick={(e) => {
            e.preventDefault();
            toggleExpansion(key);
          }}>
            {expandedInfo[key] ? 'Ver menos' : 'Ver más'}
          </a>
        </div>
      </div>
    </div>
  );
  

  const valuesData = [
    {
      title: 'Innovación',
      icon: iconInnovation
    },
    {
      title: 'Liderazgo',
      icon: iconL
    },
    {
      title: 'Responsabilidad',
      icon: iconR
    },
    {
      title: 'Solidaridad',
      icon: iconS
    },
    {
      title: 'Justicia',
      icon: iconJ
    }
  ];

  return (
    <div className="information-container">
      <div className="information-header">INFORMACION</div>
      <hr className="linea-divisora-blue-large" />
      <div className="cards-container">
        {renderCard('mision', 'Misión', iconMission)}
        {renderCard('vision', 'Visión', iconVision)}
        {renderCard('historia', 'Historia', iconHistoria)}
      </div>
      <div className="values-container">
        {valuesData.map((value, index) => (
          <div key={index} className="value">
            <img src={value.icon} alt="" className="value-icon" />
            <div className="value-title">{value.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoG;
