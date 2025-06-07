import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Navbar.css';

const navVariants = {
  hidden: { y: -40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Navbar({ darkMode, setDarkMode }) {
  return (
    <motion.nav
      className="navbar"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="navbar-logo">PEPEPOW</div>
      <ul className="nav-links">
        <li><a href="/">Inicio</a></li>
        <li><a href="/about">Sobre mí</a></li>
        <li><a href="/proyectos">Proyectos</a></li>
        <li><a href="/juegos">Juegos</a></li>
        <li><a href="/blog">Blog</a></li>
        <li><a href="/contacto">Contacto</a></li>
      </ul>
      <button onClick={() => setDarkMode(!darkMode)} className="toggle-theme">
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>
    </motion.nav>
  );
}

