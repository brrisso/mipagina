import React from 'react';
import { Link } from 'react-router-dom';
import snakeImg from '../assets/snake-preview.jpg';

function Juegos() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>🎮 Zona de Juegos</h1>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        marginTop: '2rem'
      }}>
        <div style={{
          width: '200px',
          border: '1px solid #ccc',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          textAlign: 'center',
          backgroundColor: '#fff'
        }}>
          <img
            src={snakeImg}
            alt="Snake Preview"
            style={{ width: '100%', height: '150px', objectFit: 'cover' }}
          />
          <div style={{ padding: '1rem' }}>
            <h3>🐍 Snake</h3>
            <Link to="/snake" style={{
              display: 'inline-block',
              marginTop: '0.5rem',
              padding: '0.4rem 0.8rem',
              backgroundColor: '#4CAF50',
              color: '#fff',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}>
              Jugar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Juegos;