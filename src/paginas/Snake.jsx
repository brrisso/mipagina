import { useEffect, useState, useCallback, useRef } from 'react';
import './Snake.css';
import { db } from "../firebase";
import { collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";

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
  const musicaFondo = useRef(null);
  const sonidoComer = useRef(null);
  const [volumen, setVolumen] = useState(0.3);
  const [mute, setMute] = useState(false);
  const [ganaste, setGanaste] = useState(false);
  const [recompensaMostrada, setRecompensaMostrada] = useState(false);
  const audioRecompensa = useRef(null);
  const intervaloRef = useRef(200);
  const colaDirecciones = useRef([]);
  const direccionRef = useRef({ x: 0, y: -1 });
const juegoIniciadoRef = useRef(false);



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
    const siguiente = colaDirecciones.current.shift();
  if (siguiente) {
  const opuesta = direccionRef.current.x === -siguiente.x && direccionRef.current.y === -siguiente.y;
  if (!opuesta) {
    direccionRef.current = siguiente;
    setDireccion(siguiente);
  }
}

    const nuevaCabeza = {
  x: snake[0].x + direccionRef.current.x,
  y: snake[0].y + direccionRef.current.y,
};


    // 💀 Detectar colisión = Game Over
    if (
      nuevaCabeza.x < 0 || nuevaCabeza.x >= TAMANO ||
      nuevaCabeza.y < 0 || nuevaCabeza.y >= TAMANO ||
      snake.some(seg => seg.x === nuevaCabeza.x && seg.y === nuevaCabeza.y)
    ) {
      setAnimacionMuerte(true);
      setGameOver(true);
      sonidoGameOver.current?.play();

      // 🛑 Detener la música
      musicaFondo.current?.pause();
      musicaFondo.current.currentTime = 0;

      return;
    }

    if (snake.length + 1 === TAMANO * TAMANO) {
      setGameOver(true);
      setAnimacionMuerte(false);
      musicaFondo.current?.pause();
      musicaFondo.current.currentTime = 0;
      setGanaste(true);
      return;
    }

    let nuevaSnake = [nuevaCabeza, ...snake];

    if (nuevaCabeza.x === comida.x && nuevaCabeza.y === comida.y) {
      if (sonidoComer.current) {
        sonidoComer.current.currentTime = 0;
        sonidoComer.current.play();
      }
      setComida(generarComidaValida(nuevaSnake));
      // Acelera el juego (pero no menos de 60ms)
      intervaloRef.current = Math.max(60, intervaloRef.current - 2);
      setPuntuacion(prev => prev + 1);
    } else {
      nuevaSnake.pop();
    }

    setSnake(nuevaSnake);
    //setPuedeCambiarDireccion(true);
  }, [snake, direccion, comida, generarComidaValida]);

  useEffect(() => {
    if (gameOver || !juegoIniciado) return;
    const intervalo = setInterval(moverSnake, intervaloRef.current);
    return () => clearInterval(intervalo);
  }, [moverSnake, gameOver, juegoIniciado]);

  useEffect(() => {
    musicaFondo.current = new Audio('/sounds/video-game-music-loop-27629.mp3');
    sonidoGameOver.current = new Audio('/sounds/game-over-arcade-6435.mp3');
    sonidoComer.current = new Audio('/sounds/game-start-317318.mp3');
    musicaFondo.current.loop = true;
    musicaFondo.current.volume = volumen;
    sonidoComer.current.volume = volumen;
    sonidoGameOver.current.volume = volumen;
  }, []);

  useEffect(() => {
    const volumenReal = mute ? 0 : volumen;

    if (musicaFondo.current) musicaFondo.current.volume = volumenReal;
    if (sonidoGameOver.current) sonidoGameOver.current.volume = volumenReal;
    if (sonidoComer.current) sonidoComer.current.volume = volumenReal;
  }, [volumen, mute]);

  useEffect(() => {
  juegoIniciadoRef.current = juegoIniciado;
  }, [juegoIniciado]);


  useEffect(() => {
    const handleKeyDown = (e) => {
      if(!juegoIniciadoRef.current) return;
      const teclas = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'];
      if (teclas.includes(e.key)) e.preventDefault();

      if (!puedeCambiarDireccionRef.current) return;

      let nuevaDireccion = null;

      switch (e.key) {
      case 'ArrowUp':
      case 'w':
        nuevaDireccion = { x: 0, y: -1 };
        break;
      case 'ArrowDown':
      case 's':
        nuevaDireccion = { x: 0, y: 1 };
        break;
      case 'ArrowLeft':
      case 'a':
        nuevaDireccion = { x: -1, y: 0 };
        break;
      case 'ArrowRight':
      case 'd':
        nuevaDireccion = { x: 1, y: 0 };
        break;
      default:
        break;
    }

      if (nuevaDireccion) {
        colaDirecciones.current.push(nuevaDireccion);
        //setPuedeCambiarDireccion(false); // bloquea hasta el próximo movimiento
      }

    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
  direccionRef.current = direccion;
}, [direccion]);

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

    setGanaste(false);
    setSnake([{ x: 5, y: 5 }]);
    setDireccion({ x: 0, y: -1 });
    setComida(generarComida());
    setGameOver(false);
    setPuntuacion(0);
    setJuegoIniciado(false);
    setMostrarTableroAnimado(false);
    setAnimacionMuerte(false);
    intervaloRef.current = 200;
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
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#111',
        borderRadius: '8px',
        boxShadow: '0 0 15px rgba(0,0,0,0.3)',
        overflow: 'hidden',
        margin: 'auto',
        width: 'min(90vw, 320px)', // se adapta al ancho de pantalla pero con máximo
      }}>
        <div
          className="barra-superior-tablero"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#1e1e1e',
            padding: '0.4rem 0.8rem',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px',
            borderBottom: '2px solid #333',
            color: 'white',
            fontSize: '0.85rem',
          }}
        >
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ minWidth: '100px', display: 'inline-block', fontWeight: 'bold', color: '#a855f7' }}>
              🏅 Puntos: {puntuacion}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label htmlFor="volumen">🎵</label>
            <input
              id="volumen"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volumen}
              onChange={(e) => setVolumen(parseFloat(e.target.value))}
              style={{ height: '4px' }}
            />
            <button
              onClick={() => setMute(!mute)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
              title={mute ? "Reanudar sonido" : "Mutear"}
            >
              {mute ? '🔇' : '🔊'}
            </button>
          </div>
        </div>
        {gameOver && !ganaste && (
          <div className="overlay"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              padding: '1rem',
              borderRadius: '10px',
              boxShadow: '0 0 20px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(2px)',
            }}>
            <p style={{ color: 'red', fontSize: '1.0rem' }}>💀 ¡Game Over!</p>
            <p style={{ fontWeight: 'bold' }}>Has conseguido {puntuacion} puntos!!</p>

            {puntuacion >= 30 && (
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

            {puntuacion < 30 && (
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

        <div
          className={`tablero ${mostrarTableroAnimado ? 'animado' : ''} ${animacionMuerte ? 'muerte' : ''}`}
        >
          {[...Array(TAMANO * TAMANO)].map((_, index) => {
            const x = index % TAMANO;
            const y = Math.floor(index / TAMANO);
            const esCabeza = snake[0].x === x && snake[0].y === y;
            const esCuerpo = snake.slice(1).some(seg => seg.x === x && seg.y === y);
            const esComida = comida.x === x && comida.y === y;

            return (
              <div
                key={index}
                className={
                  esCabeza ? 'celda cabeza' :
                    esCuerpo ? 'celda cuerpo' :
                      esComida ? 'celda comida' :
                        'celda'
                }
              />
            );
          })}

          {ganaste && (
            <div className="recompensa"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 20,
              }}
            >
              <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>🎉 ¡Lo lograste! ¡Completaste el juego!</p>
              {!recompensaMostrada ? (
                <img
                  src="/images/cofre-cerrado.png"
                  alt="Cofre cerrado"
                  onClick={() => {
                    setRecompensaMostrada(true);
                    audioRecompensa.current?.play();
                  }}
                  style={{ cursor: 'pointer', width: '100px', marginTop: '1rem' }}
                />
              ) : (
                <img
                  src="/images/Homero.gif"
                  alt="Cofre abierto"
                  style={{ width: '200px', marginTop: '0rem', marginBottom: '2rem' }}
                />
              )}
              <audio ref={audioRecompensa} src="/sounds/homero-gimiendo.mp3" />
              <button
                className="btn-play"
                style={{
                  marginTop: '1rem',
                  transition: 'all 0.2s ease',
                  position: 'absolute',
                  top: '86%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  padding: '0.8rem 1.5rem',
                  fontSize: '0.7rem',
                  backgroundColor: '#a855f7',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  zIndex: 10,
                  boxShadow: '0 0 10px rgba(0,0,0,0.5)'
                }}
                onClick={() => {
                  reiniciarJuego(nombreJugador);
                  setRecompensaMostrada(false);
                }}
              >
                🔁 Volver a jugar
              </button>
            </div>
          )}
        </div>

        {!juegoIniciado && !gameOver && (
          <button className={`btn-play ${ocultandoPlay ? 'fade-out' : ''}`}
            onClick={() => {
              setOcultandoPlay(true);
              musicaFondo.current?.play();

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
