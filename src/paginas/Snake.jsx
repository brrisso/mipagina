import { useEffect, useState, useCallback, useRef } from 'react';
import './Snake.css';
import { db } from "../firebase";
import { collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";
import { p } from 'framer-motion/client';

const TAMANO = 10;
const COLECCION = "puntuaciones";
const SECRET_KEY = "clavesupersecreta123";

const generarComida = () => ({
  x: Math.floor(Math.random() * TAMANO),
  y: Math.floor(Math.random() * TAMANO),
});

const Snake = () => {
  const [snake, setSnake] = useState([{ x: 5, y: 5 }]);
  const [direccion, setDireccion] = useState({ x: 0, y: -1 });
  const [comida, setComida] = useState(generarComida());
  const [gameOver, setGameOver] = useState(false);
  const [puntuacion, setPuntuacion] = useState(0);
  const [mejoresPuntuaciones, setMejoresPuntuaciones] = useState([]);
  const juegoRef = useRef(null);
  const [juegoIniciado, setJuegoIniciado] = useState(false);
  const [mostrarTableroAnimado, setMostrarTableroAnimado] = useState(false);
  const [ocultandoPlay, setOcultandoPlay] = useState(false);
  const [animacionMuerte, setAnimacionMuerte] = useState(false);
  const sonidoGameOver = useRef(null);
  const [puedeCambiarDireccion, setPuedeCambiarDireccion] = useState(true);
  const puedeCambiarDireccionRef = useRef(true);
  const [nombreJugador, setNombreJugador] = useState("");
  const [mensajeError, setMensajeError] = useState("");


  useEffect(() => {
    const obtenerPuntuaciones = async () => {
      const q = query(
        collection(db, COLECCION),
        orderBy("puntuacion", "desc"),
        limit(10)
      );
      const querySnapshot = await getDocs(q);
      const resultados = querySnapshot.docs.map(doc => doc.data());
      setMejoresPuntuaciones(resultados);
    };

    obtenerPuntuaciones();
  }, []);


  const generarComidaValida = useCallback((snakeActual) => {
    const esValida = (pos) =>
      !snakeActual.some(seg => seg.x === pos.x && seg.y === pos.y);

    let nueva = generarComida();
    while (!esValida(nueva)) {
      nueva = generarComida();
    }
    return nueva;
  }, []);

  const moverSnake = useCallback(() => {
    const nuevaCabeza = {
      x: snake[0].x + direccion.x,
      y: snake[0].y + direccion.y,
    };

    if (
      nuevaCabeza.x < 0 || nuevaCabeza.x >= TAMANO ||
      nuevaCabeza.y < 0 || nuevaCabeza.y >= TAMANO ||
      snake.some(seg => seg.x === nuevaCabeza.x && seg.y === nuevaCabeza.y)
    ) {
      setAnimacionMuerte(true);
      setGameOver(true);
      sonidoGameOver.current?.play();
      return;
    }

    let nuevaSnake = [nuevaCabeza, ...snake];

    if (nuevaCabeza.x === comida.x && nuevaCabeza.y === comida.y) {
      setComida(generarComidaValida(nuevaSnake));
      setPuntuacion(prev => prev + 1);
    } else {
      nuevaSnake.pop();
    }

    setSnake(nuevaSnake);
    setPuedeCambiarDireccion(true);
  }, [snake, direccion, comida, generarComidaValida]);

  useEffect(() => {
    if (gameOver || !juegoIniciado) return;
    const intervalo = setInterval(moverSnake, 200);
    return () => clearInterval(intervalo);
  }, [moverSnake, gameOver, juegoIniciado]);

  useEffect(() => {
    sonidoGameOver.current = new Audio('/sounds/game-over-arcade-6435.mp3');
    const handleKeyDown = (e) => {
      const teclas = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
      if (teclas.includes(e.key)) e.preventDefault();

      if (!puedeCambiarDireccionRef.current) return;

      let nuevaDireccion = null;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          if (direccion.y !== 1) nuevaDireccion = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
        case 's':
          if (direccion.y !== -1) nuevaDireccion = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
        case 'a':
          if (direccion.x !== 1) nuevaDireccion = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
        case 'd':
          if (direccion.x !== -1) nuevaDireccion = { x: 1, y: 0 };
          break;
        default:
          break;
      }

      if (nuevaDireccion) {
        setDireccion(nuevaDireccion);
        setPuedeCambiarDireccion(false); // bloquea hasta el próximo movimiento
      }

    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direccion]);

  useEffect(() => {
  puedeCambiarDireccionRef.current = puedeCambiarDireccion;
  }, [puedeCambiarDireccion]);


  const reiniciarJuego = async (nombre) => {
    if (nombre && puntuacion >= 30) {
      try {
        await addDoc(collection(db, COLECCION), {
          nombre,
          puntuacion,
          fecha: new Date(),
          secretKey: SECRET_KEY
        });
      } catch (e) {
        console.error("Error al guardar puntuación:", e);
      }
    }


    setSnake([{ x: 5, y: 5 }]);
    setDireccion({ x: 0, y: -1 });
    setComida(generarComida());
    setGameOver(false);
    setPuntuacion(0);
    setJuegoIniciado(false);
    setMostrarTableroAnimado(false);
    setAnimacionMuerte(false);
  };

  return (
    <div
      className={`snake-wrapper ${animacionMuerte ? 'muerte-fondo' : ''}`}
      style={{
        outline: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center'
      }}
    >
      <h2>🐍 Snake Game</h2>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {gameOver && (
            <div className="overlay">
              <p style={{ color: 'red', fontSize: '1.0rem' }}>💀 ¡Game Over!</p>
              <p style={{ fontWeight: 'bold' }}>Has conseguido {puntuacion} puntos!!</p>

              {puntuacion>=30 && (
  <>
    <input 
      type="text"
      value={nombreJugador}
      onChange={(e) => setNombreJugador(e.target.value)}
      placeholder='Ingresa tu nombre' 
      style={{
        marginTop: '1rem',
        padding: '0.5rem',
        fontSize: '1rem',
        borderRadius: '6px',
        border: '1px solid #ccc',
        width: '100%'
      }}
    />
    <button
      onClick={() => {
        reiniciarJuego(nombreJugador);
        setNombreJugador("");
      }}
      className="btn-reiniciar"
    >
      💾 Guardar y reiniciar
    </button>
  </>
)}

{puntuacion<30 && (
  <>
    <p style={{ color: '#ffa500', fontSize: '0.9rem', marginTop: '0.5rem' }}>
      {"⚠️ No se guardará la puntuación porque es muy baja"}
    </p>
    <button
      onClick={() => {
        reiniciarJuego(nombreJugador);
        setNombreJugador("");
      }}
      className="btn-reiniciar"
    >
      🔁 Reiniciar sin guardar
    </button>
  </>
)}
            </div>
          )}
        <div className={`tablero ${mostrarTableroAnimado ? 'animado' : ''} ${animacionMuerte ? 'muerte' : ''}`}>
          {[...Array(TAMANO)].map((_, y) =>
            <div key={y} className="fila">
              {[...Array(TAMANO)].map((_, x) => {
                const esCabeza = snake[0].x === x && snake[0].y === y;
                const esCuerpo = snake.slice(1).some(seg => seg.x === x && seg.y === y);
                const esComida = comida.x === x && comida.y === y;
                return (
                  <div key={x} className={
                    esCabeza ? 'celda cabeza' :
                      esCuerpo ? 'celda cuerpo' :
                        esComida ? 'celda comida' :
                          'celda'
                  } />
                );
              })}
            </div>
          )}
        </div>
        {!juegoIniciado && !gameOver && (
          <button className={`btn-play ${ocultandoPlay ? 'fade-out' : ''}`}
            onClick={() => {
              setOcultandoPlay(true);

              setTimeout(() => {
                setJuegoIniciado(true);
                setMostrarTableroAnimado(true);
                setOcultandoPlay(false);
                setTimeout(() => juegoRef.current?.focus(), 10);
              }, 300);
            }}
            style={{
              transition: 'all 0.2s ease',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              padding: '0.8rem 1.5rem',
              fontSize: '1.4rem',
              backgroundColor: '#a855f7',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              zIndex: 10,
              boxShadow: '0 0 10px rgba(0,0,0,0.5)'
            }}
          >
            ▶ Play
          </button>
        )}
      </div>
      {mejoresPuntuaciones.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3>🏆 Mejores Puntuaciones</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {mejoresPuntuaciones.map((item, idx) => (
              <li key={idx}>
                <strong>{idx + 1}.</strong> {item.nombre || "Jugador"} — <b>{item.puntuacion} pts</b>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Snake;
