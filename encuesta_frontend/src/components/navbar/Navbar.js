import { useState } from "react";
import { Link } from "react-router-dom";

import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

import "./navbar.css";

const Navbar = () => {
  const [mostrarIconoMenu, setMostrarIconoMenu] = useState(false);

  return (
    <div className="navbarContainer">
      <div className="navbarLogo">
        <h3>App Encuesta</h3>
      </div>
      <div className="navbarMenu">
        <div className="enlaces">
          <p>
            <Link to="/acerca">Acerca de</Link>
          </p>
        </div>
        <div className="enlacesMovil">
          {mostrarIconoMenu ? (
            <RiCloseLine
              color="#eee"
              size={16}
              onClick={() => setMostrarIconoMenu(false)}
            />
          ) : (
            <RiMenu3Line
              color="#eee"
              size={16}
              onClick={() => setMostrarIconoMenu(true)}
            />
          )}
          {mostrarIconoMenu && (
            // <div className="menuMovil">
            <div className="enlacesMovilMenu">
              <p>
                <Link to="/acerca">Acerca de</Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
