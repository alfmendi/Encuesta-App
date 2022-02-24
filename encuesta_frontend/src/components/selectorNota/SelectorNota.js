import "./selectorNota.css";

const SelectorNota = ({ nota, seleccionarNota, deshabilitado }) => {
  const cambiarNota = (e) => {
    seleccionarNota(Number(e.currentTarget.value));
  };
  return (
    <ul className="selectorNota">
      <li className={deshabilitado ? `selectorNotaDisabled` : undefined}>
        <input
          type="radio"
          id="num1"
          name="nota"
          value="1"
          onChange={cambiarNota}
          checked={nota === 1}
        />
        <label htmlFor="num1">1</label>
      </li>
      <li className={deshabilitado ? `selectorNotaDisabled` : undefined}>
        <input
          type="radio"
          id="num2"
          name="nota"
          value="2"
          onChange={cambiarNota}
          checked={nota === 2}
        />
        <label htmlFor="num2">2</label>
      </li>
      <li className={deshabilitado ? `selectorNotaDisabled` : undefined}>
        <input
          type="radio"
          id="num3"
          name="nota"
          value="3"
          onChange={cambiarNota}
          checked={nota === 3}
        />
        <label htmlFor="num3">3</label>
      </li>
      <li className={deshabilitado ? `selectorNotaDisabled` : undefined}>
        <input
          type="radio"
          id="num4"
          name="nota"
          value="4"
          onChange={cambiarNota}
          checked={nota === 4}
        />
        <label htmlFor="num4">4</label>
      </li>
      <li className={deshabilitado ? `selectorNotaDisabled` : undefined}>
        <input
          type="radio"
          id="num5"
          name="nota"
          value="5"
          onChange={cambiarNota}
          checked={nota === 5}
        />
        <label htmlFor="num5">5</label>
      </li>
      <li className={deshabilitado ? `selectorNotaDisabled` : undefined}>
        <input
          type="radio"
          id="num6"
          name="nota"
          value="6"
          onChange={cambiarNota}
          checked={nota === 6}
        />
        <label htmlFor="num6">6</label>
      </li>
      <li className={deshabilitado ? `selectorNotaDisabled` : undefined}>
        <input
          type="radio"
          id="num7"
          name="nota"
          value="7"
          onChange={cambiarNota}
          checked={nota === 7}
        />
        <label htmlFor="num7">7</label>
      </li>
      <li className={deshabilitado ? `selectorNotaDisabled` : undefined}>
        <input
          type="radio"
          id="num8"
          name="nota"
          value="8"
          onChange={cambiarNota}
          checked={nota === 8}
        />
        <label htmlFor="num8">8</label>
      </li>
      <li className={deshabilitado ? `selectorNotaDisabled` : undefined}>
        <input
          type="radio"
          id="num9"
          name="nota"
          value="9"
          onChange={cambiarNota}
          checked={nota === 9}
        />
        <label htmlFor="num9">9</label>
      </li>
      <li className={deshabilitado ? `selectorNotaDisabled` : undefined}>
        <input
          type="radio"
          id="num10"
          name="nota"
          value="10"
          onChange={cambiarNota}
          checked={nota === 10}
        />
        <label htmlFor="num10">10</label>
      </li>
    </ul>
  );
};

SelectorNota.defaultProps = {
  deshabilitado: false,
};

export default SelectorNota;
