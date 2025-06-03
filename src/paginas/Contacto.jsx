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
      <button class="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3">Submit</button>
    </form>
  </div>
  );
}

export default Contacto;