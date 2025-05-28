import React from 'react';
import { Link } from 'react-router-dom';

function Juegos() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>🎮 Juegos</h1>
      <ul>
        <li>
          <Link to="/snake" style={{ color: '#4CAF50', fontWeight: 'bold' }}>
            🐍 Jugar Snake
          </Link>
        </li>
        {/* Aquí puedes agregar más juegos después */}
      </ul>
    </div>
  );
}

export default Juegos;