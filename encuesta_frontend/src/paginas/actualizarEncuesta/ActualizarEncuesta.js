import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { generarMensajeError } from "../../errores/generarMensajeError";

import SelectorNota from "../../components/selectorNota/SelectorNota";

import { actualizarEncuesta } from "../../redux/encuestasSlice";

import "./actualizarEncuesta.css";

const ActualizarEncuesta = () => {
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

  const modificarEncuesta = (e) => {
    e.preventDefault();
    let objetoError = {};
    if (!comentario.trim() || !nota) {
      if (!comentario.trim()) {
        generarMensajeError(["Debe escribir un comentario"], objetoError);
        setComentario("");
      }
      if (!nota) {
        generarMensajeError(["Debe seleccionar una nota"], objetoError);
      }
      setMensajeError(objetoError);
      const id = setTimeout(() => setMensajeError(null), 3000);
      timerRef.current = id;
    } else {
      const encuestaModificada = {
        comentario,
        nota,
      };
      objetoError = {};
      dispatch(
        actualizarEncuesta({ id: parametros.id, encuestaModificada })
      ).then((res) => {
        if (!res.error) {
          navegar("/");
        } else {
          objetoError = {};
          generarMensajeError(res.payload.mensaje, objetoError);
          setMensajeError(objetoError);
          const id = setTimeout(() => setMensajeError(null), 3000);
          timerRef.current = id;
        }
      });
    }
  };

  return (
    <div className="formularioActualizarContainer">
      <form className="formularioActualizarCard" onSubmit={modificarEncuesta}>
        <h3>Actualice la valoración sobre sus prácticas</h3>
        <SelectorNota nota={nota} seleccionarNota={(valor) => setNota(valor)} />
        <div className="formularioActualizarError">
          {mensajeError && <p className="entradaTexto">{mensajeError.nota}</p>}
        </div>
        <div className="formularioActualizarComentario">
          <textarea
            rows="2"
            placeholder="Escriba aquí su comentario..."
            onChange={(e) => setComentario(e.target.value)}
            value={comentario}
            required
          ></textarea>
          <button type="submit">Actualizar</button>
        </div>
        <div className="formularioActualizarError">
          {mensajeError && (
            <p className="entradaTexto">{mensajeError.comentario}</p>
          )}
        </div>
      </form>
      <div className="formularioActualizarBoton">
        <Link to="/" className="cancelarBoton">
          Cancelar
        </Link>
      </div>
    </div>
  );
};

export default ActualizarEncuesta;
