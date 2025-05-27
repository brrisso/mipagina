import { useEffect, useState } from 'react';
import './Snake.css';

const TAMANO = 10;

const generarComida = () => ({
  x: Math.floor(Math.random() * TAMANO),
  y: Math.floor(Math.random() * TAMANO),
});

const Snake = () => {
  const [snake, setSnake] = useState([{ x: 5, y: 5 }]);
  const [direccion, setDireccion] = useState({ x: 0, y: -1 });
  const [comida, setComida] = useState(generarComida());
  const [gameOver, setGameOver] = useState(false);

  const moverSnake = () => {
    const nuevaCabeza = {
      x: snake[0].x + direccion.x,
      y: snake[0].y + direccion.y,
    };

    // Fin del juego
    if (
      nuevaCabeza.x < 0 || nuevaCabeza.x >= TAMANO ||
      nuevaCabeza.y < 0 || nuevaCabeza.y >= TAMANO ||
      snake.some(segmento => segmento.x === nuevaCabeza.x && segmento.y === nuevaCabeza.y)
    ) {
      setGameOver(true);
      return;
    }

    let nuevaSnake = [nuevaCabeza, ...snake];

    if (nuevaCabeza.x === comida.x && nuevaCabeza.y === comida.y) {
      setComida(generarComida());
    } else {
      nuevaSnake.pop(); // no comió, no crece
    }

    setSnake(nuevaSnake);
  };

  useEffect(() => {
    const intervalo = setInterval(() => {
      if (!gameOver) moverSnake();
    }, 200);
    return () => clearInterval(intervalo);
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
          setDireccion({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          setDireccion({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          setDireccion({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          setDireccion({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div>
      <h2>🐍 Snake Game</h2>
      {gameOver && <p style={{ color: 'red' }}>💀 ¡Game Over!</p>}
      <div className="tablero">
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
    </div>
  );
};

export default Snake;
