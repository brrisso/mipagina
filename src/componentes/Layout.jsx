import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '80px' }}>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
