import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Contacto.css';

export default function Contacto() {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      nombre: form.nombre.value,
      email: form.email.value,
      mensaje: form.mensaje.value
    };

    await fetch('https://formspree.io/f/mwpbvdgd', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    setEnviado(true);
    form.reset();
  };

  return (
    <motion.div 
      className="contacto-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="contacto-title">Contáctame</h2>
      {!enviado ? (
        <motion.form 
          className="contacto-form" 
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <input name="nombre" type="text" placeholder="Nombre" required />
          <input name="email" type="email" placeholder="Email" required />
          <textarea name="mensaje" placeholder="Mensaje" required></textarea>
          <motion.button 
            type="submit" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            💬 Enviar
          </motion.button>
        </motion.form>
      ) : (
        <motion.p 
          className="mensaje-enviado"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          ✅ ¡Gracias por tu mensaje! Te responderé pronto.
        </motion.p>
      )}
    </motion.div>
  );
}

