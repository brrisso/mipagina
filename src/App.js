import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import About from './paginas/About';
import Proyectos from './paginas/Proyectos';
import Juegos from './paginas/Juegos';
import Contacto from './paginas/Contacto';
import Blog from './paginas/Blog';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/juegos" element={<Juegos />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </Router>
  );
}

export default App;

