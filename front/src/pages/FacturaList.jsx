import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import * as pdfjsLib from "pdfjs-dist/build/pdf";

// Configurar el worker para pdf.js
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.15.349/pdf.worker.min.js";

import FacturaService from "../services/FacturaService";

const FacturaList = () => {
  const [facturas, setFacturas] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [exportationState, setExportationState] = useState(null);

  // Obtener el token del almacenamiento local
  const token = localStorage.getItem("access");

  // Configurar Axios para incluir el token en las solicitudes
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleExportationOptions = (index) => {
    if (exportationState === index) {
      setExportationState(null); // Oculta las opciones si ya están visibles
    } else {
      setExportationState(index); // Muestra las opciones para la fila seleccionada
    }
  };

  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const response = await FacturaService.getFacturas();
        if (response.data.length > 0) {
          const storedFacturas =
            JSON.parse(localStorage.getItem("importedFacturas")) || [];
          setFacturas([...response.data, ...storedFacturas]);
        } else {
          setMensaje("No se encontraron facturas.");
        }
      } catch (error) {
        console.error("Error al obtener facturas:", error);
        setMensaje("Hubo un error al cargar las facturas.");
      }
    };

    if (token) {
      fetchFacturas();
    } else {
      setMensaje("No se encontró el token de acceso.");
    }
  }, [token]);

  // Función para exportar todas las facturas a PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Lista de Facturas", 20, 10);
    doc.autoTable({
      head: [["Número de Factura", "Estado", "Monto", "Fecha", "Cliente"]],
      body: facturas.map((factura) => [
        factura.numero_factura,
        factura.estado,
        factura.monto,
        formatDate(factura.fecha),
        factura.cliente_nombre,
      ]),
    });
    doc.save("facturas.pdf");
  };

  // Función para exportar todas las facturas a Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      facturas.map((factura) => ({
        "Número de Factura": factura.numero_factura,
        Estado: factura.estado,
        Monto: factura.monto,
        Fecha: formatDate(factura.fecha),
        Cliente: factura.cliente_nombre,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Facturas");
    XLSX.writeFile(workbook, "facturas.xlsx");
  };

  return (
    <div className="w-full p-10 sm:p-6 bg-black text-white  ">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-header font-bold">Lista de Facturas</h1>
        <div className="flex space-x-2 items-center font-body text-md ">
          <label
            htmlFor="import-excel"
            className="flex btn-primary cursor-pointer p-1 hover:bg-gray-50 hover:bg-opacity-15 transition-all rounded-sm border-white border-[1px] border-opacity-50 px-2 py-1"
          >
            <svg
              className="pr-2 ml-1"
              fill="#ffffff"
              width="22px"
              height="22px"
              viewBox="0 0 35 35"
              data-name="Layer 2"
              id="bdd05811-e15d-428c-bb53-8661459f9307"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#ffffff"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"></path>
                <path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"></path>
                <path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"></path>
              </g>
            </svg>
            Importar
          </label>
          <input
            id="import-excel"
            type="file"
            accept=".xlsx"
            onChange={(e) => console.log(e.target.files[0])}
            className="hidden"
          />
          <button
            className="flex items-center  btn-primary bg-green-500 hover:bg-green-600 px-2 py-1 rounded-sm transition-all"
            onClick={exportToExcel}
          >
            <svg
              className="mr-1"
              width="18px"
              height="18px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.29289 1.29289C9.48043 1.10536 9.73478 1 10 1H18C19.6569 1 21 2.34315 21 4V9C21 9.55228 20.5523 10 20 10C19.4477 10 19 9.55228 19 9V4C19 3.44772 18.5523 3 18 3H11V8C11 8.55228 10.5523 9 10 9H5V20C5 20.5523 5.44772 21 6 21H7C7.55228 21 8 21.4477 8 22C8 22.5523 7.55228 23 7 23H6C4.34315 23 3 21.6569 3 20V8C3 7.73478 3.10536 7.48043 3.29289 7.29289L9.29289 1.29289ZM6.41421 7H9V4.41421L6.41421 7ZM19 12C19.5523 12 20 12.4477 20 13V19H23C23.5523 19 24 19.4477 24 20C24 20.5523 23.5523 21 23 21H19C18.4477 21 18 20.5523 18 20V13C18 12.4477 18.4477 12 19 12ZM11.8137 12.4188C11.4927 11.9693 10.8682 11.8653 10.4188 12.1863C9.96935 12.5073 9.86526 13.1318 10.1863 13.5812L12.2711 16.5L10.1863 19.4188C9.86526 19.8682 9.96935 20.4927 10.4188 20.8137C10.8682 21.1347 11.4927 21.0307 11.8137 20.5812L13.5 18.2205L15.1863 20.5812C15.5073 21.0307 16.1318 21.1347 16.5812 20.8137C17.0307 20.4927 17.1347 19.8682 16.8137 19.4188L14.7289 16.5L16.8137 13.5812C17.1347 13.1318 17.0307 12.5073 16.5812 12.1863C16.1318 11.8653 15.5073 11.9693 15.1863 12.4188L13.5 14.7795L11.8137 12.4188Z"
                  fill="#ffffff"
                ></path>{" "}
              </g>
            </svg>
            <p>Exportar todo</p>
          </button>
          <button
            className="flex items-center btn-primary bg-red-500 hover:bg-red-600 px-2 py-1 rounded-sm transition-all"
            onClick={exportToPDF}
          >
            <svg
              className="mr-1"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              style={{ fill: "rgba(255, 255, 255, 1)" }}
            >
              <path d="M19.074,9.998C20.326,9.275,21,8.059,21,6.621C21,4.019,18.21,2,14.909,2H7v2H5v7H3v10c0,0.553,0.447,1,1,1h2h1h10.768 c0.737,0,1.371-0.513,1.544-1.232l2.055-8.81c0.153-0.657,0.031-1.36-0.324-1.932C19.826,10.274,19.456,10.097,19.074,9.998z M17.641,20.966L7,21v-2h9.859c0.469,0,0.844-0.435,0.75-0.903L16.179,9H19c1.025,0,1.889,0.489,1.951,1.511L17.641,20.966z"></path>
            </svg>
            <p>Exportar todo</p>
          </button>
        </div>
      </div>
      <div className="my-4 w-full outline-none border-none">
        <input
          className="text-sm border-[1px]  font-body w-full rounded-sm h-10 p-2"
          type="text"
          placeholder="Buscar por cliente o por código..."
        />
      </div>
      {mensaje && <p className="text-red-500">{mensaje}</p>}
      <table className="text-white w-full bg-[#0f0f0f]  shadow rounded-sm overflow-hidden font-body ">
        <thead className="bg-black text-left ">
          <tr>
            <th className="px-4 py-2 text-center">Código</th>
            <th className="px-4 py-2 text-center">Estado</th>
            <th className="px-4 py-2 text-center">Monto</th>
            <th className="px-4 py-2 text-center">Fecha</th>
            <th className="px-4 py-2 text-center">Cliente</th>
            <th className="px-4 py-2 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {facturas.map((factura, index) => (
            <tr
              key={index}
              className="transition-all border-b hover:bg-[#141414] border-white"
            >
              <td className="px-4 py-2">{factura.numero_factura}</td>
              <td className="px-4 py-2">
                <div className="flex justify-center items-center h-full">
                  <span
                    className={`px-3 py-1 text-white rounded-full text-sm ${
                      factura.estado === "pagada"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {factura.estado}
                  </span>
                </div>
              </td>

              <td className="px-4 py-2 text-center">${factura.monto}</td>
              <td className="px-4 py-2 text-center">
                {formatDate(factura.fecha)}
              </td>
              <td className="px-4 py-2 text-center">
                {factura.cliente_nombre}
              </td>
              <td className="px-4 py-2 text-center">
                <button
                  className="text-blue-500 hover:underline p-2 hover:bg-white hover:bg-opacity-15 rounded-full transition-all"
                  onClick={() => handleExportationOptions(index)}
                >
                  <svg
                    width="22px"
                    height="22px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ffffff"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <circle cx="12" cy="6" r="1.5" fill="#ffffff"></circle>
                      <circle cx="12" cy="12" r="1.5" fill="#ffffff"></circle>
                      <circle cx="12" cy="18" r="1.5" fill="#ffffff"></circle>
                    </g>
                  </svg>
                </button>

                <div
                  className={`flex flex-col absolute -tranblack/2 -tranblack/2  ${
                    exportationState === index ? "block" : "hidden"
                  }`}
                >
                  <button
                    className="text-start"
                    title="Exportar como PDF"
                    onClick={exportToPDF}
                  >
                    Exportar como PDF
                  </button>
                  <button
                    className="text-start"
                    title="Exportar como Excel"
                    onClick={exportToExcel}
                  >
                    Exportar como Excel
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FacturaList;
