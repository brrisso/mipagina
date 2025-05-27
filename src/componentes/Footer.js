import React from 'react';

function Footer() {
  return (
    <footer style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f1f1f1' }}>
      <p>© {new Date().getFullYear()} Bruno Risso | pepethereal.dev</p>
    </footer>
  );
}

export default Footer;
