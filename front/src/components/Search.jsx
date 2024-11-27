import React, { useState } from "react";

const Search = ({ elements, setFacturas }) => {
  const [search, setSearch] = useState({
    cliente: "",
    fecha: "",
    estado: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearch((prev) => ({ ...prev, [name]: value }));

    // Filtrar elementos
    const filtered = elements.filter((element) => {
      const clienteMatch = element.cliente
        .toLowerCase()
        .includes(value.toLowerCase());

      const fechaMatch = value
        ? element.fecha.includes(value) // Filtrar por fecha si hay valor
        : true;

      const estadoMatch = value
        ? element.estado.toLowerCase().includes(value.toLowerCase())
        : true;

      if (name === "cliente") return clienteMatch;
      if (name === "fecha") return fechaMatch;
      if (name === "estado") return estadoMatch;


      return true;
    });

    setFacturas(filtered);
  };

  return (
    <div className="flex space-x-4">
      <input
        type="text"
        name="cliente"
        value={search.cliente}
        onChange={handleChange}
        placeholder="Buscar por cliente"
        className="p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-500"
      />
      <input
        type="date"
        name="fecha"
        value={search.fecha}
        onChange={handleChange}
        placeholder="Buscar por fecha"
        className="p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-500"
      />
      <select
        name="estado"
        value={search.estado}
        onChange={handleChange}
        className="p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-500"
      >
        <option value="">Todos los estados</option>
        <option value="pagada">Pagada</option>
        <option value="pendiente">Pendiente</option>
      </select>
    </div>
  );
};

export default Search;
