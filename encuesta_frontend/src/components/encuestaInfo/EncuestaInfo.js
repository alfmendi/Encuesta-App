import { useSelector } from "react-redux";

import "./encuestaInfo.css";

const EncuestaInfo = () => {
  const encuestas = useSelector((state) => state.encuestas.comentarios);
  const total = encuestas.reduce((acc, elemento) => acc + elemento.nota, 0);
  const media = (total / encuestas.length).toFixed(1).replace(/[.,]0$/, "");
  return (
    <div className="infoContainer">
      <div className="infoCard">
        <div className="infoTotal">
          <p>Número de valoraciones</p>
          <p className="valor">{encuestas.length}</p>
        </div>
        <div className="infoMedia">
          <p>Media</p>
          <p className="valor">{isNaN(media) ? 0 : media}</p>
        </div>
      </div>
    </div>
  );
};

export default EncuestaInfo;
