import { useNavigate } from "react-router-dom";

import { FaTimes, FaEdit } from "react-icons/fa";

import "./encuestaElemento.css";

const EncuestaElemento = ({ elemento }) => {
  const navigate = useNavigate();

  const editarEncuesta = () => {
    navigate(`/actualizarEncuesta/${elemento.id}`);
  };

  const eliminarEncuesta = () => {
    navigate(`/eliminarEncuesta/${elemento.id}`);
  };
  return (
    <div className="elementoListaCard">
      <span className="elementoListaNota">{elemento.nota}</span>
      <p>{elemento.comentario}</p>
      <button className="editar" onClick={editarEncuesta}>
        <FaEdit color="#009688" />
      </button>
      <button className="cerrar" onClick={eliminarEncuesta}>
        <FaTimes color="#e91e63" />
      </button>
    </div>
  );
};

export default EncuestaElemento;
