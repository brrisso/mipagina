import { useEffect, useState, useCallback } from 'react';
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
  const [intentos, setIntentos] = useState(1);
  const [puntuacion, setPuntuacion] = useState(0);
  const [mejoresPuntuaciones, setMejoresPuntuaciones] = useState([]);

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
}, [intentos]); // Se actualiza cada vez que se reinicia el juego

  const generarComidaValida = useCallback((snakeActual) => {
    const esValida = (pos) =>
      !snakeActual.some(seg => seg.x === pos.x && seg.y === pos.y);

    let nueva = generarComida();
    while (!esValida(nueva)) {
      nueva = generarComida();
    }
    return nueva;
  }, []);

  const moverSnake = useCallback (() => {
    const nuevaCabeza = {
      x: snake[0].x + direccion.x,
      y: snake[0].y + direccion.y,
    };

    if (
      nuevaCabeza.x < 0 || nuevaCabeza.x >= TAMANO ||
      nuevaCabeza.y < 0 || nuevaCabeza.y >= TAMANO ||
      snake.some(seg => seg.x === nuevaCabeza.x && seg.y === nuevaCabeza.y)
    ) {
      setGameOver(true);
      return;
    }

    let nuevaSnake = [nuevaCabeza, ...snake];

    if (nuevaCabeza.x === comida.x && nuevaCabeza.y === comida.y) {
      const nuevaSnake = [nuevaCabeza, ...snake];
      setComida(generarComidaValida(nuevaSnake));
      setPuntuacion(prev => prev + 1);
    } else {
      nuevaSnake.pop();
    }

    setSnake(nuevaSnake);
  }, [snake, direccion, comida, generarComidaValida]);

  useEffect(() => {
    if (gameOver) return;
    const intervalo = setInterval(moverSnake, 200);
    return () => clearInterval(intervalo);
  }, [moverSnake, gameOver]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const teclas = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
      if (teclas.includes(e.key)) {
        e.preventDefault(); // Evita que la página se mueva tecleando
      }
      switch (e.key) {
        case 'ArrowUp': if (direccion.y !== 1) setDireccion({ x: 0, y: -1 }); break;
        case 'ArrowDown': if (direccion.y !== -1) setDireccion({ x: 0, y: 1 }); break;
        case 'ArrowLeft': if (direccion.x !== 1) setDireccion({ x: -1, y: 0 }); break;
        case 'ArrowRight': if (direccion.x !== -1) setDireccion({ x: 1, y: 0 }); break;
        default: break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direccion]);

  const reiniciarJuego = async () => {
  const nombre = prompt("¿Cuál es tu nombre?");
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
  setIntentos(intentos + 1);
  setPuntuacion(0);
};

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>🐍 Snake Game</h2>
      <p>Intento #{intentos}</p>
      {gameOver && (
        <>
        <p style={{ color: 'red' }}>💀 ¡Game Over!</p> 
        <p>Has Conseguido {puntuacion} puntos!!</p>
        </>)}
      <div className="tablero" style={{ margin: '0 auto' }}>
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
      <div>
      {gameOver && (
        <button
          onClick={reiniciarJuego}
          style={{
            marginTop: '1rem',
            padding: '0.6rem 1.2rem',
            fontSize: '1rem',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          🔄 Reiniciar
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

