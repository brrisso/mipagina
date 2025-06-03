import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navbar.css';

const navVariants = {
  hidden: { y: -40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function Navbar() {
  return (
    <motion.nav
      className="navbar"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="logo">Pepepow</div>
      <ul className="nav-links">
        {['/', '/about', '/proyectos', '/juegos', '/blog', '/contacto'].map((ruta, i) => (
          <motion.li
            key={ruta}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
          >
            <Link to={ruta}>
              {ruta === '/' ? 'Inicio' :
               ruta === '/about' ? 'Sobre mí' :
               ruta.slice(1).charAt(0).toUpperCase() + ruta.slice(2)}
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  );
}
