export const generarMensajeError = (arrayErrores, mensajeError) => {
  for (let elemento of arrayErrores) {
    if (
      elemento.includes("Debe seleccionar una nota") ||
      elemento.includes("El valor de nota debe estar entre 1 y 10")
    ) {
      mensajeError.nota = elemento;
    } else mensajeError.comentario = elemento;
  }
  return mensajeError;
};
