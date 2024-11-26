import React, { useState, useEffect } from "react";
import axios from "axios";
import FacturaService from "../services/FacturaService";
import { motion } from "framer-motion";

const FacturaForm = () => {
  const [facturas, setFacturas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState("");
  const [numeroFactura, setNumeroFactura] = useState("");
  const [estado, setEstado] = useState("pendiente");
  const [monto, setMonto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [usuario, setUsuario] = useState(null);

  const token = localStorage.getItem("access");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const response = await FacturaService.getFacturas();
        setFacturas(response.data);
      } catch (error) {
        setMensaje("Hubo un error al cargar las facturas.");
      }
    };

    const fetchClientes = async () => {
      try {
        const response = await FacturaService.getClientes(token);
        setClientes(response.data);
      } catch (error) {
        setMensaje("Hubo un error al cargar los clientes.");
      }
    };

    const fetchUsuario = async () => {
      try {
        const response = await FacturaService.getUserLogued(token);
        setUsuario(response.data);
      } catch (error) {
        setMensaje("Hubo un error al cargar el usuario logueado.");
      }
    };

    if (token) {
      fetchFacturas();
      fetchClientes();
      fetchUsuario();
    } else {
      setMensaje("No se encontró el token de acceso.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cliente || !monto || !numeroFactura) {
      setMensaje("Por favor complete todos los campos.");
      return;
    }

    const factura = {
      cliente,
      monto,
      estado,
      descripcion,
      numero_factura: numeroFactura,
      usuario: usuario ? usuario.id : null,
    };

    try {
      const response = await FacturaService.setFactura(factura, token);
      if (response.status === 201) {
        setMensaje("Factura generada exitosamente");
        setCliente("");
        setMonto("");
        setEstado("pendiente");
        setDescripcion("");
        setNumeroFactura("");
      } else {
        setMensaje("Error al generar la factura.");
      }
    } catch (error) {
      setMensaje("Hubo un error al generar la factura.");
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-primary">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.7,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="bg-secondary text-white p-6 rounded-sm shadow-md w-1/2 "
      >
        <h1 className="text-2xl font-bold mb-4">Crear Nueva Factura</h1>
        {mensaje && <p className="text-yellow-400 mb-4">{mensaje}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Cliente</label>
            <select
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              className="w-full bg-tertiary text-white rounded-sm p-2"
              required
            >
              <option value="">Seleccione un cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Número de Factura
            </label>
            <input
              type="text"
              value={numeroFactura}
              onChange={(e) => setNumeroFactura(e.target.value)}
              className="w-full bg-tertiary text-white rounded-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Estado</label>
            <select
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="w-full bg-tertiary text-white rounded-sm p-2"
              required
            >
              <option value="pendiente">Pendiente</option>
              <option value="pagada">Pagada</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Monto</label>
            <input
              type="number"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              className="w-full bg-tertiary text-white rounded-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Descripción
            </label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full bg-tertiary text-white rounded-sm p-2"
            />
          </div>
          <button
            type="submit"
            className="transition-all w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-sm"
          >
            Generar Factura
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default FacturaForm;
