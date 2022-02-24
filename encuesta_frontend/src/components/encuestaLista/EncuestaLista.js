import { useSelector } from "react-redux";

import EncuestaElemento from "../encuestaElemento/EncuestaElemento";

import "./encuestaLista.css";

const EncuestaLista = () => {
  const encuestas = useSelector((state) => state.encuestas.comentarios);

  return (
    <div className="listaContainer">
      {encuestas &&
        encuestas.map((elemento) => (
          <EncuestaElemento key={elemento.id} elemento={elemento} />
        ))}
    </div>
  );
};

export default EncuestaLista;
