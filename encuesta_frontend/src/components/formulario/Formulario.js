import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { generarMensajeError } from "../../errores/generarMensajeError";

import { crearEncuesta } from "../../redux/encuestasSlice";

import SelectorNota from "../selectorNota/SelectorNota";

import "./formulario.css";

const Formulario = () => {
  const timerRef = useRef();
  const dispatch = useDispatch();
  const [comentario, setComentario] = useState("");
  const [nota, setNota] = useState(null);
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

  // Función para enviar la encuesta al servidor
  const enviarEncuesta = (e) => {
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
      const objeto = {
        comentario,
        nota,
      };
      objetoError = {};
      dispatch(crearEncuesta(objeto)).then((res) => {
        if (!res.error) {
          setComentario("");
          setNota(null);
        } else {
          let objetoError = {};
          generarMensajeError(res.payload.mensaje, objetoError);
          setMensajeError(objetoError);
          const id = setTimeout(() => setMensajeError(null), 3000);
          timerRef.current = id;
        }
      });
    }
  };

  return (
    <div className="formularioContainer">
      <form className="formularioCard" onSubmit={enviarEncuesta}>
        <h3>Escriba una valoración sobre sus prácticas</h3>
        <SelectorNota nota={nota} seleccionarNota={(valor) => setNota(valor)} />
        <div className="formularioError">
          {mensajeError && <p className="entradaTexto">{mensajeError.nota}</p>}
        </div>
        <div className="formularioComentario">
          <textarea
            rows="2"
            placeholder="Escriba aquí su comentario..."
            onChange={(e) => setComentario(e.target.value)}
            value={comentario}
            required
          ></textarea>
          <button type="submit">Enviar</button>
        </div>
        <div className="formularioError">
          {mensajeError && (
            <p className="entradaTexto">{mensajeError.comentario}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Formulario;
