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
  [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
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
  x: 4,
  y: 5,
  pregunta: "¿Cuál es el color del sable de Mace Windu?",
  opciones: ["Rojo", "Azul", "Púrpura", "Verde"],
  correcta: "Púrpura",
};

export default function LaberintoJedi() {
  const [pos, setPos] = useState({ x: 1, y: 1 });
  const [bloqueado, setBloqueado] = useState(true);
  const [mostrarPregunta, setMostrarPregunta] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const calcularZoom = () => {
      const ancho = window.innerWidth;
      const alto = window.innerHeight;
      const columnas = mapaInicial[0].length;
      const filas = mapaInicial.length;
      const zoomX = ancho / (columnas * 30);
      const zoomY = (alto - 120) / (filas * 20); 
      const zoom = Math.min(zoomX, zoomY, 1); 
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

  if (pos.x === 6 && pos.y === 7) {
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
        minHeight: '100vh',
        color: 'yellow',
        fontFamily: 'monospace',
        padding: '20px',
        textAlign: 'center',
        overflowY: 'auto',
        paddingBottom: '0px',
      }}
    >
      <h1 style={{ fontSize: '2rem', marginBottom: '0px' }}>Laberinto Jedi</h1>

      {/* CONTENEDOR SCROLLEABLE */}
      <div
        style={{
          overflowX: 'auto',
          width: '100%',
          margin: '0 auto',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${mapaInicial[0].length}, 1fr)`,
            width: 'fit-content',
            transform: 'scale(var(--zoom, 1))',
            transformOrigin: 'top center',
            gap: '2px',
            margin: '0 auto',
          }}
          id="laberinto-grid"
        >
          {mapaInicial.flatMap((fila, y) =>
            fila.map((celda, x) => (
              <div
                key={`${x}-${y}`}
                style={{
                  backgroundColor:
                    pos.x === x && pos.y === y
                      ? 'lime'
                      : droidePregunta.x === x && droidePregunta.y === y && bloqueado
                        ? 'darkred'
                        : celda === 1
                          ? '#333'
                          : '#555',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #111',
                }}
              >
                {droidePregunta.x === x && droidePregunta.y === y && bloqueado ? '🤖' : ''}
              </div>
            ))
          )}
        </div>
     

      {/* CONTROLES DE MOVIMIENTO */}
      <div
        style={{
          marginTop: '0px',
          touchAction: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <button onClick={() => mover(0, -1)}>↑</button>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => mover(-1, 0)}>←</button>
          <button onClick={() => mover(1, 0)}>→</button>
        </div>
        <button onClick={() => mover(0, 1)}>↓</button>
      </div>
     </div>
      {/* PREGUNTA */}
      {mostrarPregunta && (
        <motion.div
          style={{
            backgroundColor: '#222',
            color: 'white',
            padding: '20px',
            borderRadius: '8px',
            marginTop: '20px',
            maxWidth: '300px',
            margin: 'auto',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p>{droidePregunta.pregunta}</p>
          {droidePregunta.opciones.map((op, i) => (
            <button
              key={i}
              style={{
                display: 'block',
                margin: '10px auto',
                padding: '5px 10px',
                backgroundColor: '#444',
                color: 'white',
                border: '1px solid #777',
                borderRadius: '4px',
              }}
              onClick={() => responder(op)}
            >
              {op}
            </button>
          ))}
        </motion.div>
      )}

      {mensaje && <p style={{ color: 'orange', marginTop: '10px' }}>{mensaje}</p>}
    </div>
  );
}
