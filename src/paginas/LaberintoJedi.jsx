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
                  backgroundColor:
                    pos.x === x && pos.y === y
                      ? 'lime'
                      : droidePregunta.x === x && droidePregunta.y === y && bloqueado
                        ? 'darkred'
                        : celda === 1
                          ? '#333'
                          : '#555',
                  width: '18px',
                  height: '18px',
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
