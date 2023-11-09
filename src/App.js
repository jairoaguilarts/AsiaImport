import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Inicio from './components/Inicio';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Inicio />
      <Footer />
    </div>
  );
}

export default App;
