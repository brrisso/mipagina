import React from 'react';
import { Link } from 'react-router-dom';

function Juegos() {
  return (
    <div>
      <h1>Juegos</h1>
      <Link to="/snake" style={{ color: '#fff', marginRight: '15px' }}>Snake</Link>
    </div>
  );
}

export default Juegos;