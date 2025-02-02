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

  return (
    <ul className="nav navbar-nav">
      <li className={location.pathname === '/' ? 'active' : ''}>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li className={location.pathname === '/destinasi' ? 'active' : ''}>
        <NavLink to={"/destinasi"}>Destinasi</NavLink>
      </li>
      <li className={location.pathname === '/kreasi-lokal' ? 'active' : ''}>
        <NavLink to={"/kreasi-lokal"}>Kreasi Lokal</NavLink>
      </li>
      <li className={location.pathname === '/akomodasi' ? 'active' : ''}>
        <NavLink to={"/akomodasi"}>Akomodasi</NavLink>
      </li>
      <li className={location.pathname === '/acara' ? 'active' : ''}>
        <NavLink to={"/acara"}>Acara</NavLink>
      </li>
      <li>
        <NavLink to={""}>Tentang Kami</NavLink>
        <ul className="sub-menu">
            <li><NavLink to={"/tentang-kami"}>Profil</NavLink></li>
            <li><NavLink to={""}>Visi Misi</NavLink></li>
        </ul>
      </li>
    </ul>
  );
};

export default Navigation;
