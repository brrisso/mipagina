import React, { useEffect, useState } from 'react';
import './Home.css';

const Twitch = () => <span role="img" aria-label="Twitch">🎮</span>;

const Home = () => {
  const [live, setLive] = useState(false);

  useEffect(() => {
    const checkLiveStatus = async () => {
      try {
        const response = await fetch('/api/twitch-status');
        const data = await response.json();
        setLive(data.isLive);
      } catch (error) {
        console.error('Error fetching Twitch status:', error);
      }
    };

    checkLiveStatus();
    const interval = setInterval(checkLiveStatus, 60000); // Actualiza cada 60 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      <header className="header">
        <h1 className="logo">Pepepow</h1>
        <nav className="nav">
          <a href="#about">About</a>
          <a href="#juegos">Juegos</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <button className="live-button">
          <Twitch />
          {live ? <span className="live-dot">🔴 En Vivo</span> : 'Offline'}
        </button>
      </header>

      <main className="main">
        <section className="section" id="about">
          <h2>¡Bienvenido a Pepepow!</h2>
          <p>
            Aquí mezclamos diversión, desarrollo y creatividad. 🎮 Explora nuestros proyectos, juegos, retos y más.
          </p>
        </section>

        <section id="juegos" className="section">
          <h3>Juegos y retos</h3>
          <ul>
            <li>🐍 Snake personalizado</li>
            <li>🎯 Juegos interactivos del stream</li>
            <li>🔒 Escape rooms virtuales</li>
          </ul>
        </section>

        <section id="contacto" className="section">
          <h3>¿Quieres colaborar?</h3>
          <p>¡Conectemos en redes o durante un stream!</p>
        </section>
      </main>
    </div>
  );
};

export default Home;
