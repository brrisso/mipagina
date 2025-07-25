import { useState } from 'react';
import { motion } from 'framer-motion';
import './LaberintoJedi.css';
import FinalLaberinto from './FinalLaberinto';
import { useEffect } from 'react';
const sonidoError = new Audio('/sounds/error.mp3');
const sonidoCorrect = new Audio('/sounds/correctAnswer.mp3');
const sonidoCheckpoint = new Audio('/sounds/checkpoint.mp3');

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

const preguntas = [
  {
    x: 5,
    y: 5,
    pregunta: "¿Cuál es el color del sable de Mace Windu?",
    opciones: ["Rojo", "Azul", "Púrpura", "Verde"],
    correcta: "Púrpura",
    id: 1
  },
  {
    x: 11,
    y: 8,
    pregunta: "¿Quién entrenó a Luke Skywalker?",
    opciones: ["Mace Windu", "Obi-Wan", "Yoda", "Qui-Gon"],
    correcta: "Yoda",
    id: 2
  },
  {
    id: 3,
    x: 10,
    y: 11,
    pregunta: "¿Cómo se llama el planeta natal de Chewbacca?",
    opciones: ["Naboo", "Endor", "Kashyyyk", "Tatooine"],
    correcta: "Kashyyyk"
  },
  {
    id: 4,
    x: 5,
    y: 18,
    pregunta: "¿Qué especie es Yoda?",
    opciones: ["Desconocida", "Togruta", "Rodiano", "Kaminoano"],
    correcta: "Desconocida"
  },
  {
    id: 5,
    x: 14,
    y: 7,
    pregunta: "¿Qué planeta fue destruido por la Estrella de la Muerte en 'Una Nueva Esperanza'?",
    opciones: ["Alderaan", "Yavin 4", "Scarif", "Corellia"],
    correcta: "Alderaan"
  },
  {
    id: 6,
    x: 3,
    y: 15,
    pregunta: "¿Cuál es el nombre del mineral necesario para construir sables de luz?",
    opciones: ["Beskar", "Kyber", "Durasteel", "Baryon"],
    correcta: "Kyber"
  },
  {
    id: 7,
    x: 19,
    y: 11,
    pregunta: "¿Qué planeta alberga el templo Jedi en la trilogía original?",
    opciones: ["Coruscant", "Dagobah", "Yavin 4", "Ahch-To"],
    correcta: "Yavin 4"
  },
  {
    id: 8,
    x: 17,
    y: 6,
    pregunta: "¿Qué planeta es el origen del ejército clon?",
    opciones: ["Kamino", "Geonosis", "Naboo", "Mustafar"],
    correcta: "Kamino"
  },
  {
    id: 9,
    x: 5,
    y: 13,
    pregunta: "¿Qué senador propuso otorgar poderes de emergencia a Palpatine?",
    opciones: ["Mon Mothma", "Bail Organa", "Jar Jar Binks", "Mas Amedda"],
    correcta: "Jar Jar Binks"
  },
  {
    id: 10,
    x: 8,
    y: 17,
    pregunta: "¿Cuál es el nombre real de Darth Sidious?",
    opciones: ["Sheev Palpatine", "Sifo-Dyas", "Wilhuff Tarkin", "Dooku"],
    correcta: "Sheev Palpatine"
  },
  {
    id: 11,
    x: 18,
    y: 17,
    pregunta: "¿Qué planeta sirve de escondite para Yoda tras la Orden 66?",
    opciones: ["Naboo", "Dagobah", "Endor", "Dantooine"],
    correcta: "Dagobah"
  },
  {
    id: 12,
    x: 15,
    y: 15,
    pregunta: "¿Qué le promete Darth Vader al Emperador sobre Luke?",
    opciones: ["Convertirlo al Lado Oscuro", "Destruirlo", "Capturarlo", "Usarlo como espía"],
    correcta: "Convertirlo al Lado Oscuro"
  },
];

export default function LaberintoJedi() {
  const [pos, setPos] = useState({ x: 1, y: 0 });
  const [bloqueado, setBloqueado] = useState(true);
  const [mostrarPregunta, setMostrarPregunta] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [errorAnim, setErrorAnim] = useState(false);
  const [droidePregunta, setDroidePregunta] = useState(null);
  const [preguntasRespondidas, setPreguntasRespondidas] = useState([]);
  const [checkpoint, setCheckpoint] = useState({ x: 1, y: 0 }); // el inicial
  const [checkpointGuardado, setCheckpointGuardado] = useState(false);


  const checkpoints = [
    { x: 11, y: 3 },
    { x: 15, y: 5 },
    { x: 1, y: 9 },
    { x: 13, y: 17 },
    // puedes agregar más
  ];

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
      const pregunta = preguntas.find(o => o.x === nuevoX && o.y === nuevoY && !preguntasRespondidas.includes(o.id));
      if (pregunta && !preguntasRespondidas.includes(pregunta.id)) {
        setMostrarPregunta(true);
        setDroidePregunta(pregunta);
      } else if (!(bloqueado && pregunta)) {
        setPos({ x: nuevoX, y: nuevoY });
        // Revisa si es un checkpoint
        if (checkpoints.some(c => c.x === nuevoX && c.y === nuevoY)) {
          sonidoCheckpoint.play();
          setCheckpoint({ x: nuevoX, y: nuevoY });
          setCheckpointGuardado(true);
          setTimeout(() => setCheckpointGuardado(false), 2000);
        }
      }
    }
  };

  if (pos.x === 19 && pos.y === 20) {
    return <FinalLaberinto />;
  }

  const responder = (opcion) => {
    if (!droidePregunta) return;
    if (opcion === droidePregunta.correcta) {
      sonidoCorrect.play();
      setBloqueado(false);
      setMensaje("✔ Acceso concedido");
      setPreguntasRespondidas((prev) => [...prev, droidePregunta.id]);

      // Espera 1.5 segundos antes de cerrar el modal y mover al jugador
      setTimeout(() => {
        setMostrarPregunta(false);
        setPos({ x: droidePregunta.x, y: droidePregunta.y });
        setMensaje(""); // Limpia el mensaje
        setDroidePregunta(null);
      }, 1000);
    } else {
      sonidoError.play();
      setMensaje("✖ Respuesta incorrecta");
      setBloqueado(true);
      setErrorAnim(true);
      // Opcional: borrar el mensaje luego de unos segundos
      setTimeout(() => {
        setMensaje("");
        setMostrarPregunta(false);
        setPos(checkpoint);
        setDroidePregunta(null);
        setTimeout(() => setErrorAnim(false), 500);
      }, 1000);
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
                  : droidePregunta && droidePregunta.x === x && droidePregunta.y === y && bloqueado

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
              {preguntas.some(o => o.x === x && o.y === y && !preguntasRespondidas.includes(o.id)) ? '🤖' : ''}
              {checkpoints.some(c => c.x === x && c.y === y) ? '🔵' : ''}

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
              animation: errorAnim ? 'shake 0.5s' : 'none',
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
      {checkpointGuardado && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: -50 }}
          transition={{ duration: 2 }}
          style={{
            position: 'absolute',
            top: '60px',
            zIndex: 1000,
            background: '#111',
            padding: '10px 20px',
            borderRadius: '8px',
            color: '#00ffcc',
            fontSize: '1.2rem',
            fontFamily: 'monospace',
            border: '1px solid #00ffcc',
            boxShadow: '0 0 8px #00ffcc88',
          }}
        >
          ✔ Checkpoint guardado
        </motion.div>
      )}
    </div>
  );
}
