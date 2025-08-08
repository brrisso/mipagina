import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './LaberintoJedi.css';
import FinalLaberinto from './FinalLaberinto';
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
    x:5,
    y:1,
    pregunta:"¿Quién mató a Jango Fett?",
    opciones:["Obi-Wan Kenobi","Mace Windu","Anakin Skywalker","Kit Fisto"],
    correcta: "Mace Windu",
    id: 0
  },
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
    opciones: ["Mace Windu", "Obi-Wan","Qui-Gon", "Yoda"],
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
  {
    id: 13,
    x: 4,
    y: 9,
    pregunta: "¿Qué tipo de nave es el Halcón Milenario?",
    opciones: ["Corellian YT-1300f","Firespray-31","CR90 Corvette","Lambda-class Shuttle"],
    correcta: "Corellian YT-1300f"
  },
  {
    id: 14,
    x: 13,
    y: 1,
    pregunta: "¿Quién es el maestro de Qui-Gon Jinn?",
    opciones: ["Yoda","Conde Dooku","Mace Windu","Sifo-Dyas"],
    correcta: "Conde Dooku"
  },
  {
    id: 15,
    x: 1,
    y: 12,
    pregunta: "¿Cómo se llama el droide traductor de Jabba el Hutt?",
    opciones: ["EV-9D9","TC-14","C-3PO","8D8"],
    correcta: "8D8"
  }
];

const areaVigilada = [
  { x: 19, y: 3 },
  { x: 19, y: 4 },
  { x: 19, y: 5 },
  { x: 19, y: 6 },
  { x: 19, y: 7 },
  { x: 19, y: 8 },
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
  const [activarPared, setActivarPared] = useState(false);
  const [activarPared2, setActivarPared2] = useState(false);
  const [emperadorObservando, setEmperadorObservando] = useState(false);
  const [reflejosProgreso, setReflejosProgreso] = useState(100); // porcentaje de barra
  const [reflejosActivo, setReflejosActivo] = useState(false);
  const [reflejosResultado, setReflejosResultado] = useState(null);
  const [intervaloReflejos, setIntervaloReflejos] = useState(null);
  const [minijuegosReflejos, setMinijuegosReflejos] = useState({
    '4-3': false,
    '7-9': false,
    '17-11': false,
    '15-19': false,
    '1-16': false,
    '11-2': false,
  });
  const [reflejosActivoClave, setReflejosActivoClave] = useState(null);
  const [tieneLlave, setTieneLlave] = useState(false);

  const llavePos = { x: 15, y: 11 };
  const puertaPos = { x: 19, y: 19 };

  const checkpoints = [
    { x: 11, y: 3 },
    { x: 15, y: 5 },
    { x: 1, y: 9 },
    { x: 13, y: 17 },
    { x: 11, y: 13 },
  ];

  useEffect(() => {
    const intervalo = setInterval(() => {
      setEmperadorObservando(prev => !prev);
    }, 3000);

    return () => clearInterval(intervalo);
  }, []);


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

  // 🔓 Abrir la puerta si se obtiene la llave
  useEffect(() => {
    if (tieneLlave) {
      mapaInicial[puertaPos.y][puertaPos.x] = 0; // Convierte la puerta en camino
    }
  }, [tieneLlave]);


  useEffect(() => {
    if (reflejosResultado === 'exito' && reflejosActivoClave) {
      setReflejosResultado(null);
      setMinijuegosReflejos(prev => ({
        ...prev,
        [reflejosActivoClave]: true,
      }));
      setReflejosActivoClave(null);
    }


    if (reflejosResultado === 'fallo') {
      setReflejosResultado(null);
      setTimeout(() => {
        setPos(checkpoint);
        setErrorAnim(true);
        setTimeout(() => setErrorAnim(false), 800);
      }, 500);
    }
  }, [reflejosResultado]);


  const iniciarReflejos = (clave) => {
    setReflejosActivo(true);
    setReflejosProgreso(100);
    setReflejosResultado(null);

    const intervalo = setInterval(() => {
      setReflejosProgreso(prev => {
        if (prev <= 0) {
          clearInterval(intervalo);
          setReflejosActivo(false);
          setReflejosResultado('fallo');
          sonidoError.play();
          setTimeout(() => setFalloReflejos(true), 300);
          return 0;
        }
        return prev - 4;
      });
    }, 50);

    setIntervaloReflejos(intervalo);

    // Guardar la clave activa para luego marcarla como completada
    setReflejosActivoClave(clave); // debes crear este estado
  };


  const manejarClickReflejo = () => {
    if (intervaloReflejos) clearInterval(intervaloReflejos);
    setReflejosActivo(false);
    setReflejosResultado('exito');
    sonidoCorrect.play();
  };

  const mover = (dx, dy) => {
    const nuevoX = pos.x + dx;
    const nuevoY = pos.y + dy;
    const clave = `${nuevoX}-${nuevoY}`;
    const esMinijuego = Object.keys(minijuegosReflejos).includes(clave);

    if (esMinijuego && !reflejosActivo && !minijuegosReflejos[clave]) {
      iniciarReflejos(clave);
      return;
    }

    const enZona = areaVigilada.some(c => c.x === nuevoX && c.y === nuevoY);
    if (enZona && emperadorObservando) {
      sonidoError.play();
      setErrorAnim(true);
      setTimeout(() => {
        setPos(checkpoint);
        setErrorAnim(false);
      }, 800);
      return;
    }

    if (reflejosResultado === 'fallo') return;

    // 📍 Activar obstáculo dinámico en (3, 6)
    if (nuevoX === 3 && nuevoY === 6 && !activarPared) {
      setActivarPared(true);
      // Convierte la celda en pared (1)
      mapaInicial[6][3] = 1;
      return; // No dejar pasar por ahí en el mismo movimiento
    }

    if (nuevoX === 7 && nuevoY === 18 && !activarPared2) {
      setActivarPared2(true);
      mapaInicial[18][7] = 1;
      mapaInicial[19][6] = 0;
      return;
    }

    // 🚪 Si intenta entrar a la puerta sin llave, se bloquea
    if (nuevoX === puertaPos.x && nuevoY === puertaPos.y && !tieneLlave) {
      sonidoError.play();
      setMensaje("🔒 Puerta cerrada. Necesitas una llave.");
      setTimeout(() => setMensaje(""), 2000);
      return;
    }
    // 🔑 Si encuentra la llave, la recoge
    if (nuevoX === llavePos.x && nuevoY === llavePos.y && !tieneLlave) {
      setTieneLlave(true);
      sonidoCorrect.play();
      setMensaje("🔑 ¡Has recogido la llave!");
      setTimeout(() => setMensaje(""), 2000);
    }


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
        position: 'relative',
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
        {checkpointGuardado && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 0, y: -60 }}
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
        {mapaInicial.flatMap((fila, y) =>
          fila.map((celda, x) => {
            const esZonaVigilada = areaVigilada.some(c => c.x === x && c.y === y);
            const estaObservando = emperadorObservando && esZonaVigilada;

            const styleBase = {
              width: '18px',
              height: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #111',
            };

            const styleFinal = {
              ...styleBase,
              ...(activarPared && x === 3 && y === 6
                ? {
                  backgroundColor: '#200',
                  animation: 'cerrar-obstaculo 0.6s ease-in-out',
                  boxShadow: '0 0 10px 3px darkred'
                }
                : {}),
              ...(activarPared2 && x === 7 && y === 18
                ? {
                  backgroundColor: '#200',
                  animation: 'cerrar-obstaculo 0.6s ease-in-out',
                  boxShadow: '0 0 10px 3px darkred'
                }
                : {}),
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
                  : esZonaVigilada
                    ? estaObservando
                      ? {
                        background: 'radial-gradient(circle, #800000 20%, #400000 100%)',
                        boxShadow: '0 0 5px 2px red',
                        animation: 'parpadeo 1s infinite alternate',
                      }
                      : {
                        background: 'radial-gradient(circle at center, #555 0%, #222 100%)',
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
            };

            return (
              <div key={`${x}-${y}`} style={styleFinal}>
                {preguntas.some(o => o.x === x && o.y === y && !preguntasRespondidas.includes(o.id)) ? '🤖' : ''}
                {checkpoints.some(c => c.x === x && c.y === y) ? '🔵' : ''}
                {Object.entries(minijuegosReflejos).some(([coord, completado]) => {
                  const [mx, my] = coord.split('-').map(Number);
                  return mx === x && my === y && !completado;
                }) ? '⚡' : ''}
                {(x === llavePos.x && y === llavePos.y && !tieneLlave) && '🔑'}
                {(x === puertaPos.x && y === puertaPos.y && !tieneLlave) && '🔒'}


                {/* 👁️ DROIDE DE VIGILANCIA en posición 18,6 */}
                {(x === 18 && y === 6) && (
                  <motion.div
                    animate={{ rotate: emperadorObservando ? 0 : 180 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      fontSize: '16px',
                      transformOrigin: 'center',
                      filter: emperadorObservando ? 'drop-shadow(0 0 4px red)' : 'drop-shadow(0 0 2px gray)',
                    }}
                  >
                    🎥
                  </motion.div>
                )}
              </div>

            );
          })
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
      {reflejosActivo && (
        <motion.div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#111',
            border: '2px solid #00ffff',
            borderRadius: '10px',
            padding: '20px',
            zIndex: 9999,
            width: '300px',
            textAlign: 'center',
            fontFamily: 'monospace',
            boxShadow: '0 0 12px #00ffffaa',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p>¡Presiona el botón antes que la barra llegue a cero!</p>
          <div
            style={{
              margin: '10px 0',
              height: '20px',
              background: '#333',
              border: '1px solid #555',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${reflejosProgreso}%`,
                height: '100%',
                background: reflejosProgreso > 30 ? '#00ff00' : '#ff0000',
                transition: 'width 0.1s linear',
              }}
            />
          </div>
          <button
            onClick={manejarClickReflejo}
            style={{
              padding: '10px 20px',
              background: '#00ffff22',
              border: '1px solid #00ffff',
              color: '#00ffff',
              borderRadius: '6px',
              marginTop: '10px',
              cursor: 'pointer',
            }}
          >
            Click
          </button>
        </motion.div>
      )}

    </div>

  );
}
