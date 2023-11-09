import React, { useState } from 'react';

function DropDown() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className='categorias'>
      <button className="btnCategorias" >
        Parlantes

      </button>
      <button className="btnCategorias" >
        Audifonos

      </button>
      <button className="btnCategorias" >
        Botes Y Termos

      </button>
      <button className="btnCategorias">
        Cargadores para Movil

      </button>
      <button className="btnCategorias" >
        Relojes Inteligentes

      </button>
      <button className="btnCategorias" >
       Otros

      </button>
    
    </div>
  );
}

export default DropDown;
