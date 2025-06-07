import React, { useState, useEffect } from 'react';
import { FaTwitch, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Home.css';
import MiLogoImg from '../assets/MiLogo.jpeg';

export default function Home() {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const live = Math.random() > 0.5;
    setIsLive(live);
  }, []);

  return (
    <main id="top">
      <motion.h1
        className="title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        PepePow
      </motion.h1>

      <motion.p
        className="subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Pepepow, un proyecto personal por Bruno Risso
      </motion.p>

      <motion.img
        src={MiLogoImg}
        className="avatar"
        alt="Logo"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      />

      <motion.div
        className="status"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        {isLive ? '🔴 EN VIVO AHORA' : '🟢 Offline - Próximo stream pronto'}
      </motion.div>

      <motion.div
        className="social-links"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <a href="https://twitch.tv/pepethereal" target="_blank" rel="noopener noreferrer" className="social"><FaTwitch /></a>
        <a href="https://www.instagram.com/peperisso_/" target="_blank" rel="noopener noreferrer" className="social"><FaInstagram /></a>
        <a href="https://www.linkedin.com/in/bruno-risso-1668a1224/" target="_blank" rel="noopener noreferrer" className="social"><FaLinkedin /></a>
        <a href="https://github.com/brrisso" target="_blank" rel="noopener noreferrer" className="social"><FaGithub /></a>
      </motion.div>

      <section id="about" className="section">
        <h2 className="section-title">¿Qué es Pepepow?</h2>
        <p className="section-text">
          Un laboratorio creativo donde exploro desarrollo web, diseño, comunicación digital y creación de contenido. Busco generar valor desde una mirada profesional y entretenida.
        </p>
      </section>

      <section id="projects" className="section">
        <h2 className="section-title">En qué estoy trabajando</h2>
        <ul className="section-list">
          <li><strong>Página web de Pepepow</strong>: Plataforma digital con herramientas, ideas y proyectos personales.</li>
          <li><strong>Contenido en Twitch</strong>: Streams de gaming, conversación y desarrollo de ideas.</li>
          <li><strong>Aprendizaje continuo</strong>: Explorando desarrollo front-end, diseño UX y herramientas de IA.</li>
        </ul>
      </section>

      <section id="games" className="section">
        <h2 className="section-title">Juegos</h2>
        <p className="section-text">
          Estoy desarrollando ideas de juegos interactivos, como "Emissary Clash", que combinan estrategia y gacha con elementos narrativos únicos.
        </p>
      </section>

      <section id="blog" className="section">
        <h2 className="section-title">Blog</h2>
        <p className="section-text">
          Aquí compartiré aprendizajes, proyectos y comedia.
        </p>
      </section>

      <section id="contact" className="section">
        <h2 className="section-title">Contacto</h2>
        <p className="section-text">¿Te interesa colaborar o simplemente saludar?</p>
        <a href="mailto:brunorissoosorio@gmail.com" className="btn-contact">💬 ¡Hablemos!</a>
      </section>
    </main>
  );
}
