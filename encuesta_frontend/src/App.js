import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Navbar from "./components/navbar/Navbar";
import Formulario from "./components/formulario/Formulario";
import EncuestaInfo from "./components/encuestaInfo/EncuestaInfo";
import EncuestaLista from "./components/encuestaLista/EncuestaLista";

import Acerca from "./paginas/acerca/Acerca";
import ActualizarEncuesta from "./paginas/actualizarEncuesta/ActualizarEncuesta";
import EliminarEncuesta from "./paginas/eliminarEncuesta/EliminarEncuesta";

import { conseguirEncuestas } from "./redux/encuestasSlice";

import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(conseguirEncuestas());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="app__contenedor">
              <Navbar />
              <Formulario />
              <EncuestaInfo />
              <EncuestaLista />
            </div>
          }
        />
        <Route
          path="/actualizarEncuesta/:id"
          element={<ActualizarEncuesta />}
        />
        <Route path="/eliminarEncuesta/:id" element={<EliminarEncuesta />} />
        <Route path="/acerca" element={<Acerca />} />
      </Routes>
    </Router>
  );
}

export default App;
