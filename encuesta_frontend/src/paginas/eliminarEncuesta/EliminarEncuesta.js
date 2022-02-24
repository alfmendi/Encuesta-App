import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { generarMensajeError } from "../../errores/generarMensajeError";

import SelectorNota from "../../components/selectorNota/SelectorNota";

import { eliminarEncuesta } from "../../redux/encuestasSlice";

import "./eliminarEncuesta.css";

const EliminarEncuesta = () => {
  const parametros = useParams();
  const timerRef = useRef();
  const navegar = useNavigate();
  const encuesta = useSelector((state) =>
    state.encuestas.comentarios.find(
      (comentario) => comentario.id === parametros.id
    )
  );
  const dispatch = useDispatch();
  const [comentario, setComentario] = useState(encuesta?.comentario);
  const [nota, setNota] = useState(Number(encuesta?.nota));
  const [mensajeError, setMensajeError] = useState({});

  // UseEffect para desmontar el timer que muestra los mensajes de error.
  // Se hace porque puede darse el caso de que pulse el botón de cancelar
  // antes de que se haya cumplido el tiempo que permanece el mensaje mostrandose.
  // Esto genera un problema, ya que el componente se ha desmontado antes de que haya acabado.
  useEffect(() => {
    const timeoutId = timerRef.current;
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const borrarEncuesta = (e) => {
    e.preventDefault();
    dispatch(eliminarEncuesta(parametros.id)).then((res) => {
      if (!res.error) {
        navegar("/");
      } else {
        let objetoError = {};
        generarMensajeError(res.payload.mensaje, objetoError);
        setMensajeError(objetoError);
        const id = setTimeout(() => setMensajeError(null), 3000);
        timerRef.current = id;
      }
    });
  };

  return (
    <div className="formularioEliminarContainer">
      <form className="formularioEliminarCard" onSubmit={borrarEncuesta}>
        <h3>Elimine la valoración sobre sus prácticas</h3>
        <SelectorNota
          nota={nota}
          seleccionarNota={(valor) => setNota(valor)}
          deshabilitado={true}
        />
        <div className="formularioEliminarError">
          {mensajeError && <p className="entradaTexto">{mensajeError.nota}</p>}
        </div>
        <div className="formularioEliminarComentario">
          <textarea
            rows="2"
            placeholder="Escriba aquí su comentario..."
            onChange={(e) => setComentario(e.target.value)}
            value={comentario}
            disabled
          ></textarea>
          <button type="submit">Eliminar</button>
        </div>
        <div className="formularioEliminarError">
          {mensajeError && (
            <p className="entradaTexto">{mensajeError.comentario}</p>
          )}
        </div>
      </form>
      <div className="formularioEliminarBoton">
        <Link to="/" className="cancelarBoton">
          Cancelar
        </Link>
      </div>
    </div>
  );
};

export default EliminarEncuesta;
