import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./FinalLaberinto.css";

export default function PuertaFinal() {
  const [abierto, setAbierto] = useState(false);
  const audioRef = useRef(null);
  const [reproduciendo, setReproduciendo] = useState(false);


  useEffect(() => {
    const timeout = setTimeout(() => {
      setAbierto(true);
      audioRef.current.play();
    setReproduciendo(true);
    audioRef.current.onended = () => setReproduciendo(false);

    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  const repetirAudio = () => {
  if (audioRef.current) {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setReproduciendo(true);
  }
};


  return (
    <div className="pantalla-final">
      <AnimatePresence>
        {!abierto && (
          <>
            <motion.div
              className="puerta izquierda"
              initial={{ x: 0 }}
              animate={{ x: "-100%" }}
              exit={{ x: "-100%" }}
              transition={{ duration: 2 }}
            />
            <motion.div
              className="puerta derecha"
              initial={{ x: 0 }}
              animate={{ x: "100%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 2 }}
            />
          </>
        )}
      </AnimatePresence>

      <audio ref={audioRef} src="/sounds/audio_final_escape_room.mp3" preload="auto" />

      {abierto && (
        <motion.div
          className="mensaje-holograma"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <p className="aurebesh">
            𝓑𝓾𝓼𝓬𝓪 𝓭𝓮𝓷𝓽𝓻𝓸 𝓭𝓮 𝓵𝓪 𝓬𝓪𝓳𝓪 𝓭𝓮 𝓶𝓮𝓭𝓲𝓬𝓲𝓷𝓪...
          </p>
          {reproduciendo && (
  <div className="ondas-sonido">
    <div className="onda" />
    <div className="onda" />
    <div className="onda" />
  </div>
)}

          <button onClick={repetirAudio} style={{
            marginTop: '20px',
            backgroundColor: '#111',
            color: 'cyan',
            padding: '8px 16px',
            border: '1px solid cyan',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            🔊 Repetir mensaje
          </button>
        </motion.div>
      )}
    </div>
  );
}
