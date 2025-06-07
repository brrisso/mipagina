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

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 }
    })
  };

  const secciones = [
    {
      id: "about",
      title: "¿Qué es Pepepow?",
      text: "Un laboratorio creativo donde exploro desarrollo web, diseño, comunicación digital y creación de contenido. Busco generar valor desde una mirada profesional y entretenida."
    },
    {
      id: "projects",
      title: "En qué estoy trabajando",
      customList: [
        "Página web de Pepepow: Plataforma digital con herramientas, ideas y proyectos personales.",
        "Contenido en Twitch: Streams de gaming, conversación y desarrollo de ideas.",
        "Aprendizaje continuo: Explorando desarrollo front-end, diseño UX y herramientas de IA."
      ]
    },
    {
      id: "games",
      title: "Juegos",
      text: "Estoy desarrollando ideas de juegos interactivos, como \"Emissary Clash\", que combinan estrategia y gacha con elementos narrativos únicos."
    },
    {
      id: "blog",
      title: "Blog",
      text: "Aquí compartiré aprendizajes, proyectos y comedia."
    },
    {
      id: "contact",
      title: "Contacto",
      text: "¿Te interesa colaborar o simplemente saludar?",
      isContact: true
    }
  ];

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

      {secciones.map((section, i) => (
        <motion.section
          key={section.id}
          id={section.id}
          className={`section section-${i % 2 === 0 ? 'even' : 'odd'}`}
          custom={i + 1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <h2 className="section-title">{section.title}</h2>
          {section.text && <p className="section-text">{section.text}</p>}
          {section.customList && (
            <ul className="section-list">
              {section.customList.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          )}
          {section.isContact && (
            <a href="mailto:brunorissoosorio@gmail.com" className="btn-contact">💬 ¡Hablemos!</a>
          )}
        </motion.section>
      ))}
    </main>
  );
}
