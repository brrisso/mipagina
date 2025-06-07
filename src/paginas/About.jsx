import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

export default function About() {
  return (
    <motion.div 
      id="about" 
      className="about-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2 
        className="about-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Sobre mí
      </motion.h2>

      <motion.p 
        className="about-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Me llamo Bruno Risso, soy ingeniero civil informático de Chile. Me interesa la tecnología, 
        la creatividad digital, los videojuegos, y el aprendizaje constante. También disfruto compartir 
        contenido en Twitch como Pepethereal. En mi tiempo libre voy al gimnasio, escucho música y 
        busco nuevas ideas para experimentar.
      </motion.p>

      <motion.p 
        className="about-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        Me gusta aprender cosas nuevas y ponerlas en práctica creando proyectos propios. A veces son ideas 
        útiles, otras veces son simplemente por diversión, pero siempre busco que me enseñen algo.
      </motion.p>

      <motion.p 
        className="about-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Este sitio es mi primer proyecto web, creado para compartir lo que voy explorando, probando y construyendo. 
        Todo lo que ves acá es parte de ese proceso.
      </motion.p>

      <motion.p 
        className="about-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Algunas de las herramientas que estoy usando o aprendiendo son: 
        HTML, CSS, React, Vite, Figma, Framer Motion, OBS Studio.
      </motion.p>
    </motion.div>
  );
}

