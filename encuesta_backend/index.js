// Necesario para importar las variables de entorno definidas en el fichero .env
require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Realiza la conexión a la base de datos directamente
require("./db/conectarDB");

const encuestasRouter = require("./routes/encuestas");

const rutaNoValida = require("./middleware/rutaNoValida");
const manejadorErrores = require("./middleware/manejadorErrores");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static("build"));

// Rutas
app.use("/api/encuestas", encuestasRouter);

// Middleware
app.use(rutaNoValida);
app.use(manejadorErrores);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutandose en el puerto ${PORT}`);
});
