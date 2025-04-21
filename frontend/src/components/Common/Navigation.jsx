import React, { useEffect } from 'react'; // ✅ Tambahkan useEffect
import { NavLink, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  useEffect(() => {
    function loadScript(src) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    }

    loadScript('./assets/js/mobilenav.js').catch((e) =>
      console.error("Failed to load script:", e)
    );
  }, []);

  const handleNavClick = (event, path) => {
    event.preventDefault(); // Mencegah navigasi default dari React Router
    setTimeout(() => {
      window.location.href = path; // Pindah halaman
    }, 100); // Tunggu 100ms agar perubahan terjadi sebelum reload
  };

  return (
    <ul className="nav navbar-nav">
      <li className={location.pathname === '/' ? 'active' : ''}>
        <NavLink to="/" onClick={(e) => handleNavClick(e, "/")}>Home</NavLink>
      </li>
      <li className={location.pathname === '/destinasi' ? 'active' : ''}>
        <NavLink to="/destinasi" onClick={(e) => handleNavClick(e, "/destinasi")}>Destinasi</NavLink>
      </li>
      <li className={location.pathname === '/kreasi-lokal' ? 'active' : ''}>
        <NavLink to="/kreasi-lokal" onClick={(e) => handleNavClick(e, "/kreasi-lokal")}>Kreasi Lokal</NavLink>
      </li>
      <li className={location.pathname === '/akomodasi' ? 'active' : ''}>
        <NavLink to="/akomodasi" onClick={(e) => handleNavClick(e, "/akomodasi")}>Akomodasi</NavLink>
      </li>
      <li className={location.pathname === '/acara' ? 'active' : ''}>
        <NavLink to="/acara" onClick={(e) => handleNavClick(e, "/acara")}>Acara</NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
