import { useState } from 'react';
import { motion } from 'framer-motion';
import './LaberintoJedi.css';
import FinalLaberinto from './FinalLaberinto';
import { useEffect } from 'react';

const mapaInicial = [
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
];

const droidePregunta = {
  x: 5,
  y: 5,
  pregunta: "¿Cuál es el color del sable de Mace Windu?",
  opciones: ["Rojo", "Azul", "Púrpura", "Verde"],
  correcta: "Púrpura",
};

export default function LaberintoJedi() {
  const [pos, setPos] = useState({ x: 1, y: 0 });
  const [bloqueado, setBloqueado] = useState(true);
  const [mostrarPregunta, setMostrarPregunta] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const calcularZoom = () => {
      const ancho = window.innerWidth;
      const alto = window.innerHeight;
      const columnas = mapaInicial[0].length;
      const filas = mapaInicial.length;
      const zoomX = ancho / (columnas * 22);
      const zoomY = (alto - 120) / (filas * 22);
      const zoom = Math.min(zoomX, zoomY, 0.95);
      document.documentElement.style.setProperty('--zoom', zoom);
    };

    calcularZoom();
    window.addEventListener('resize', calcularZoom);
    return () => window.removeEventListener('resize', calcularZoom);
  }, []);

  const mover = (dx, dy) => {
    const nuevoX = pos.x + dx;
    const nuevoY = pos.y + dy;
    if (mapaInicial[nuevoY][nuevoX] === 0) {
      if (nuevoX === droidePregunta.x && nuevoY === droidePregunta.y && bloqueado) {
        setMostrarPregunta(true);
      } else if (!(bloqueado && nuevoX === droidePregunta.x && nuevoY === droidePregunta.y)) {
        setPos({ x: nuevoX, y: nuevoY });
      }
    }
  };

  if (pos.x === 19 && pos.y === 20) {
    return <FinalLaberinto />;
  }

  const responder = (opcion) => {
    if (opcion === droidePregunta.correcta) {
      setBloqueado(false);
      setMensaje("✔ Acceso concedido");
      setMostrarPregunta(false);
      setPos({ x: droidePregunta.x, y: droidePregunta.y });
    } else {
      setMensaje("✖ Respuesta incorrecta");
    }
  };

  return (
    <div
      style={{
        background: 'black',
        minHeight: 'calc(100vh - 80px)',
        color: 'yellow',
        fontFamily: 'monospace',
        paddingTop: '10px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        boxSizing: 'border-box',
        overflowX: 'auto',
        padding: '8px 0',
      }}
    >
      <h1 style={{ fontSize: '1.5rem', margin: '10px 0 0 0' }}>Laberinto Jedi</h1>
      <div

        id="laberinto-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${mapaInicial[0].length}, 18px)`,
          transform: 'scale(var(--zoom, 1))',
          transformOrigin: 'top left',
          gap: '2px',
          Width: 'fit-content',
          margin: '0 auto',
        }}
      >
        {mapaInicial.flatMap((fila, y) =>
          fila.map((celda, x) => (
            <div
              key={`${x}-${y}`}
              style={{
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #111',
                ...(pos.x === x && pos.y === y
                  ? {
                    background: 'radial-gradient(circle, lime 40%, #0f0 70%, transparent 100%)',
                    boxShadow: '0 0 6px 2px lime',
                    animation: 'pulse 1.5s ease-in-out infinite',
                  }
                  : droidePregunta.x === x && droidePregunta.y === y && bloqueado
                    ? {
                      background: 'radial-gradient(circle, crimson 50%, darkred 100%)',
                      boxShadow: '0 0 4px 2px crimson',
                      animation: 'parpadeo 1s infinite alternate',
                    }
                    : celda === 1
                      ? {
                        background: 'repeating-linear-gradient(to bottom, #2a2a2a 0px, #2a2a2a 2px, #1c1c1c 2px, #1c1c1c 4px)',
                        animation: 'scanline 4s linear infinite',
                        backgroundSize: '100% 20px',
                      }
                      : {
                        background: 'radial-gradient(circle at center, #555 0%, #222 100%)',
                      }),
              }}
            >
              {droidePregunta.x === x && droidePregunta.y === y && bloqueado ? '🤖' : ''}
            </div>
          ))
        )}
      </div>
      <div style={{ flexGrow: 1 }} />

      {/* CONTROLES DE MOVIMIENTO */}
      <div
        style={{
          position: 'fixed',
          bottom: 10,
          right: 10,
          backgroundColor: '#111',
          border: '1px solid #444',
          borderRadius: '10px',
          padding: '6px',
          zIndex: 99,
          display: 'grid',
          gridTemplateAreas: `
      ". up ."
      "left . right"
      ". down ."
    `,
          gap: '4px',
          width: '96px',
        }}
      >
        <button style={{ gridArea: 'up' }} onClick={() => mover(0, -1)}>↑</button>
        <button style={{ gridArea: 'left' }} onClick={() => mover(-1, 0)}>←</button>
        <button style={{ gridArea: 'right' }} onClick={() => mover(1, 0)}>→</button>
        <button style={{ gridArea: 'down' }} onClick={() => mover(0, 1)}>↓</button>
      </div>



      {/* PREGUNTA */}
      {mostrarPregunta && (
        <motion.div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #111 0%, #222 100%)',
              color: '#00ffff',
              padding: '20px',
              borderRadius: '10px',
              maxWidth: '90vw',
              width: '360px',
              boxShadow: '0 0 10px #00ffff88',
              fontFamily: 'monospace',
              border: '1px solid #00ffff55',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
            }}
          >
            <p style={{ marginBottom: '12px' }}>{droidePregunta.pregunta}</p>
            {droidePregunta.opciones.map((op, i) => (
              <button
                key={i}
                style={{
                  display: 'block',
                  margin: '10px auto',
                  padding: '10px 15px',
                  background: 'transparent',
                  color: '#00ffff',
                  border: '2px solid #00ffff',
                  borderRadius: '6px',
                  fontFamily: 'monospace',
                  cursor: 'pointer',
                  boxShadow: '0 0 6px #00ffff88',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) => {
                  e.target.style.background = '#00ffff22';
                  e.target.style.color = '#fff';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#00ffff';
                }}
                onClick={() => responder(op)}
              >
                {op}
              </button>
            ))}


            {mensaje && (
              <p
                style={{
                  marginTop: '12px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  color: mensaje.includes('✔') ? '#00ff88' : '#ff5555',
                  textShadow: '0 0 4px currentColor',
                }}
              >
                {mensaje}
              </p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
