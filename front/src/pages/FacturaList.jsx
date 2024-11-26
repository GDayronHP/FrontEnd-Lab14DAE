import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import importIcon from "../assets/import.svg";
import excelIcon from "../assets/exportExcel.svg";
import pdfIcon from "../assets/exportPdf.svg";
import searchIcon from "../assets/search.svg";
import { motion } from "framer-motion";

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
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex justify-between items-center mb-4"
      >
        <h1 className="text-3xl font-header font-bold">Lista de Facturas</h1>
        <div className="flex space-x-2 items-center font-body text-md ">
          <label
            htmlFor="import-excel"
            className="flex btn-primary cursor-pointer p-1 hover:bg-gray-50 hover:bg-opacity-15 transition-all rounded-sm border-white border-[1px] border-opacity-50 px-2 py-1"
          >
            <img className="pr-2 ml-1" src={importIcon} />

            <p>Importar</p>
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
            <img className="mr-1" src={excelIcon} />
            <p>Exportar todo</p>
          </button>
          <button
            className="flex items-center btn-primary bg-red-500 hover:bg-red-600 px-2 py-1 rounded-sm transition-all"
            onClick={exportToPDF}
          >
            <img className="mr-1" src={pdfIcon} />
            <p>Exportar todo</p>
          </button>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: 0.1,
        }}
        className="flex space-x-2 my-5 w-full outline-none border-none"
      >
        <input
          className="text-sm border-[1px] focus:bg-secondaryHover  bg-secondary border-white border-opacity-15 focus:border-opacity-50 outline-none font-body w-full rounded-sm h-10 p-2"
          type="text"
          placeholder="Buscar por cliente o por código..."
        />
        <img className="border-[1px] bg-tertiary hover:bg-tertiaryHover cursor-pointer border-white border-opacity-15 focus:border-opacity-50 outline-none font-body rounded-sm h-10 p-2" src={searchIcon} />
      </motion.div>
      {mensaje && <p className="text-red-500">{mensaje}</p>}
      <motion.table
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          delay: 0.2,
        }}
        className="text-white w-full bg-secondary  shadow rounded-sm overflow-hidden font-body "
      >
        <thead className="bg-tertiary border-b border-opacity-15 border-white hover:bg-tertiaryHover text-left ">
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
              className="transition-all border-b border-opacity-15 border-white hover:bg-secondaryHover"
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

              <td className="px-4 py-2">${factura.monto}</td>
              <td className="px-4 py-2">{formatDate(factura.fecha)}</td>
              <td className="px-4 py-2">{factura.cliente_nombre}</td>
              <td className="px-4 py-2 text-center relative">
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
                  className={`flex flex-col absolute -translate-x-1/2 -translate-y-1/2 z-10 left-0 bg-black p-2 rounded-sm w-48  text-sm space-y-2 shadow-lg shadow-[rgba(255,255,255,0.1)] duration-150 transform origin-top-left ${
                    exportationState === index
                      ? "animate-fadeIn"
                      : "animate-fadeOut"
                  }`}
                >
                  <button
                    className="flex transition-all text-start p-1 rounded-sm hover:bg-white hover:bg-opacity-15 "
                    title="Exportar como PDF"
                    onClick={exportToPDF}
                  >
                    <img className="mr-1" src={pdfIcon} />
                    Exportar como PDF
                  </button>
                  <button
                    className="flex transition-all text-start p-1 rounded-sm hover:bg-white hover:bg-opacity-15"
                    title="Exportar como Excel"
                    onClick={exportToExcel}
                  >
                    <img className="mr-1" src={excelIcon} />
                    Exportar como Excel
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </motion.table>
    </div>
  );
};

export default FacturaList;
