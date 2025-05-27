import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '10px 20px', backgroundColor: '#222', color: '#fff' }}>
      <Link to="/" style={{ color: '#fff', marginRight: '15px' }}>Inicio</Link>
      <Link to="/about" style={{ color: '#fff', marginRight: '15px' }}>Sobre mí</Link>
      <Link to="/proyectos" style={{ color: '#fff', marginRight: '15px' }}>Proyectos</Link>
      <Link to="/juegos" style={{ color: '#fff', marginRight: '15px' }}>Juegos</Link>
      <Link to="/blog" style={{ color: '#fff', marginRight: '15px' }}>Blog</Link>
      <Link to="/contacto" style={{ color: '#fff' }}>Contacto</Link>
    </nav>
  );
}

export default Navbar;
