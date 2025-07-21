import { useState } from 'react';
import { motion } from 'framer-motion';
import './LaberintoJedi.css';
import FinalLaberinto from './FinalLaberinto';


const mapaInicial = [
  [1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,1,0,0,0,1,0,0,0,1],
  [1,0,1,1,1,1,0,1,0,1,0,1],
  [1,0,0,0,0,1,0,0,0,1,0,1],
  [1,1,1,1,0,1,1,1,0,1,1,1],
  [1,0,0,1,0,0,0,1,0,0,0,1],
  [1,0,1,1,1,1,0,1,1,1,0,1],
  [1,0,1,0,0,0,0,0,0,1,0,1],
  [1,0,1,0,1,1,1,1,0,1,0,1],
  [1,0,0,0,1,0,0,1,0,1,0,1],
  [1,1,1,1,1,1,0,1,1,1,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1],
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
    <div style={{
      background: 'black',
      minHeight: '100dvh',
        overflowY: 'auto', // 👈 esto permite scroll vertical
        paddingBottom: '80px', // 👈 espacio extra para que se vean los controles
      color: 'yellow',
      fontFamily: 'monospace',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Laberinto Jedi</h1>

      <div
  style={{
    display: 'grid',
    gridTemplateColumns: `repeat(${mapaInicial[0].length}, clamp(25px, 6vw, 50px))`,
    gap: '2px',
    justifyContent: 'center',
    maxWidth: '95vw',
    maxHeight: '75vh',
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
          width: 'clamp(25px, 6vw, 50px)',
          height: 'clamp(25px, 6vw, 50px)',
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


    <div
    style={{
    marginTop: '20px',
    touchAction: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    fontSize: '2rem',           // 👈 botones más grandes
    userSelect: 'none',
  }}

>
  <button onClick={() => mover(0, -1)}>↑</button>
  <div style={{ display: 'flex', gap: '10px' }}>
    <button onClick={() => mover(-1, 0)}>←</button>
    <button onClick={() => mover(1, 0)}>→</button>
  </div>
  <button onClick={() => mover(0, 1)}>↓</button>
</div>




      {mostrarPregunta && (
        <motion.div
          style={{
            backgroundColor: '#222',
            color: 'white',
            padding: '20px',
            borderRadius: '8px',
            marginTop: '20px',
            maxWidth: '300px',
            margin: 'auto'
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
