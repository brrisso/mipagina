import React from 'react';

const proyectos = [
  { nombre: 'Snake', descripcion: 'jueguito que estoy armando', link: '/snake' },
];

function Proyectos(){
  return(
  <div>
    <h2>Mis Proyectos</h2>
    <ul>
      {proyectos.map((p, i) => (
        <li key={i}>
          <strong>{p.nombre}</strong>: {p.descripcion} <a href={p.link}>[Ver]</a>
        </li>
      ))}
    </ul>
  </div>
  );
}

export default Proyectos;