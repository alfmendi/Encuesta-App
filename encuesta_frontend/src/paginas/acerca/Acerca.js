import { Link } from "react-router-dom";

import "./acerca.css";

const Acerca = () => {
  return (
    <>
      <header className="header">
        <h3>Información</h3>
      </header>
      <div className="acercaContainer">
        <div className="acercaCard">
          <p>
            Aplicación que permite llevar un registro de las valoraciones
            enviadas por los estudiantes sobre las prácticas de una asignatura.
            Consta de una aplicación cliente desarrollada con React y un
            servidor basado en una API RESTful desarrollado con NodeJs y
            express. Para el almacenamiento de la información se ha empleado
            MongoDB. Las diferentes tecnologías empleadas para su desarrollo
            son:
          </p>
          <h3>Front End</h3>
          <ul>
            <li>React</li>
          </ul>
          <h3>Back End</h3>
          <ul>
            <li>NodeJs</li>
            <li>Express</li>
            <li>MongoDB</li>
          </ul>
          <div className="acercaCardBoton">
            <Link to="/" className="boton">
              Volver
            </Link>
          </div>
        </div>
      </div>
      <footer className="footer">
        <p>© 2022 - alfonsoauzmendia@gmail.com</p>
      </footer>
    </>
  );
};

export default Acerca;
