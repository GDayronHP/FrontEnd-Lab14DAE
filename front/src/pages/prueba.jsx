import React, { useState } from "react";
import axios from "axios";

const Prueba = () => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [resultados, setResultados] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fechaInicio || !fechaFin) {
      setMensaje("Por favor, proporciona ambas fechas.");
      return;
    }

    try {
      const token = localStorage.getItem("access");
      const response = await axios.get(
        "http://127.0.0.1:8000/api/auth/proyeccion-flujo-caja/",
        {
          params: {
            fecha_inicio: fechaInicio,
            fecha_fin: fechaFin,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResultados(response.data);
      setMensaje("");
    } catch (error) {
      console.error("Error al obtener la proyección de flujo de caja:", error);
      setMensaje("Hubo un error al obtener la proyección de flujo de caja.");
    }
  };

  return (
    <div className="ml-[10rem] bg-primary h-screen flex justify-center items-center">
      <div className="bg-secondary border-[1px] border-white border-opacity-15 text-white p-8 rounded-md shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6 font-header">
          Proyección de Flujo de Caja
        </h1>

        {mensaje && <p className="text-red-500 text-center mb-4">{mensaje}</p>}

        <form onSubmit={handleSubmit} className="space-y-6 font-body">
          <div>
            <label className="block text-sm font-medium">Fecha de Inicio</label>
            <input
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              required
              className="w-full mt-2 p-3 rounded-lg bg-tertiary border border-secondary text-white focus:outline-none focus:ring-2 "
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Fecha de Fin</label>
            <input
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              required
              className="w-full mt-2 p-3 rounded-lg bg-tertiary border border-secondary text-white focus:outline-none focus:ring-2 "
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all"
          >
            Obtener Proyección
          </button>
        </form>

        {resultados && (
          <div className="mt-8 bg-tertiary p-4 rounded-lg shadow-md">
            <h2 className="text-xl text-center text-green-400 mb-4 font-header">
              Resultados
            </h2>
            <div className="font-body">
              <p>Ingresos: {resultados.ingresos}</p>
              <p>Egresos: {resultados.egresos}</p>
              <p>Flujo de Caja: {resultados.flujo_caja}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Prueba;
