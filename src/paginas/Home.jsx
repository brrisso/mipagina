import React from 'react';
import { motion } from 'framer-motion';
import './Home.css';
import MiLogoImg from '../assets/MiLogo.jpeg';

export default function Home() {
  return (
    <main className="home">
      <motion.h1
        className="title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Pepepow
      </motion.h1>

      <motion.p
        className="subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Una experiencia de creatividad, juegos y código
      </motion.p>

      <motion.img
        src={MiLogoImg}
        className="avatar"
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
        💤 Offline
      </motion.div>

      <motion.a
        href="https://www.twitch.tv/pepethereal"
        target="_blank"
        rel="noreferrer"
        className="btn-twitch"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        Ver canal de Twitch
      </motion.a>
    </main>
  );
}
