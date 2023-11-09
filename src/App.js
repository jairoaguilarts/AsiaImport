import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        {/* No hay contenido visible aquí */}
      </div>
      <Footer />
    </div>
  );
}

export default App;
