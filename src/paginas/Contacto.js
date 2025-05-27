import React from 'react';

function Contacto() {
  return(
  <div>
    <h2>Contáctame</h2>
    <form>
      <input placeholder="Nombre" required />
      <br />
      <input type="email" placeholder="Email" required />
      <br />
      <textarea placeholder="Mensaje" required />
      <br />
      <button type="submit">Enviar</button>
    </form>
  </div>
  );
}

export default Contacto;