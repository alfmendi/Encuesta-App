import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const conseguirEncuestas = createAsyncThunk(
  "/encuestas/conseguirTodas",
  async () => {
    const resultado = await axios.get("http://localhost:5000/api/encuestas");
    return resultado.data;
  }
);

export const crearEncuesta = createAsyncThunk(
  "encuestas/crear",
  async (encuesta, { rejectWithValue }) => {
    try {
      const respuesta = await axios.post(
        "http://localhost:5000/api/encuestas",
        encuesta
      );
      return respuesta.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const actualizarEncuesta = createAsyncThunk(
  "encuestas/actualizar",
  async ({ id, encuestaModificada }, { rejectWithValue }) => {
    try {
      const respuesta = await axios.patch(
        `http://localhost:5000/api/encuestas/${id}`,
        encuestaModificada
      );
      return respuesta.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const eliminarEncuesta = createAsyncThunk(
  "encuestas/eliminar",
  async (id, { rejectWithValue }) => {
    try {
      const respuesta = await axios.delete(
        `http://localhost:5000/api/encuestas/${id}`
      );
      return respuesta.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  comentarios: [],
  status: null,
};

export const encuestasSlice = createSlice({
  name: "encuestas",
  initialState,
  reducers: {},
  extraReducers: {
    [conseguirEncuestas.pending]: (state) => {
      state.status = "pendiente";
    },
    [conseguirEncuestas.fulfilled]: (state, action) => {
      state.comentarios = action.payload;
      state.status = "exito";
    },
    [conseguirEncuestas.rejected]: (state) => {
      state.status = "rechazado";
    },
    [crearEncuesta.pending]: (state) => {
      state.status = "pendiente";
    },
    [crearEncuesta.fulfilled]: (state, action) => {
      state.comentarios = state.comentarios
        .concat(action.payload)
        .sort(function (a, b) {
          if (a.updatedAt > b.updatedAt) {
            return -1;
          }
          if (a.updatedAt < b.updatedAt) {
            return 1;
          }
          // a must be equal to b
          return 0;
        });
      state.status = "exito";
      state.error = null;
    },
    [crearEncuesta.rejected]: (state, action) => {
      state.status = "rechazado";
      state.error = action.payload.mensaje;
    },
    [actualizarEncuesta.pending]: (state) => {
      state.status = "pendiente";
    },
    [actualizarEncuesta.fulfilled]: (state, action) => {
      state.comentarios = state.comentarios
        .map((comentario) =>
          comentario.id !== action.payload.id ? comentario : action.payload
        )
        .sort(function (a, b) {
          if (a.updatedAt > b.updatedAt) {
            return -1;
          }
          if (a.updatedAt < b.updatedAt) {
            return 1;
          }
          // a must be equal to b
          return 0;
        });
      state.status = "exito";
      state.error = null;
    },
    [actualizarEncuesta.rejected]: (state, action) => {
      state.status = "rechazado";
      state.error = action.payload.mensaje;
    },
    [eliminarEncuesta.pending]: (state) => {
      state.status = "pendiente";
    },
    [eliminarEncuesta.fulfilled]: (state, action) => {
      state.comentarios = state.comentarios.filter(
        (comentario) => comentario.id !== action.payload.id
      );
      state.status = "exito";
      state.error = null;
    },
    [eliminarEncuesta.rejected]: (state, action) => {
      state.status = "rechazado";
      state.error = action.payload.mensaje;
    },
  },
});

export default encuestasSlice.reducer;
