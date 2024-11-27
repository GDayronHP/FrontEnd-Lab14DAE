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
      // Filtrar por cliente
      const clienteMatch = element.cliente
        .toLowerCase()
        .includes(search.cliente.toLowerCase());

      // Filtrar por fecha
      const fechaMatch = search.fecha
        ? element.fecha.includes(search.fecha) // Filtrar por fecha si hay valor
        : true;

      // Filtrar por estado
      const estadoMatch = search.estado
        ? element.estado.toLowerCase().includes(search.estado.toLowerCase())
        : true;

      // Verificar que coincidan todos los filtros aplicados
      return clienteMatch && fechaMatch && estadoMatch;
    });

    setFacturas(filtered);
  };

  return (
    <div className="flex space-x-4 w-full">
      <input
        type="text"
        name="cliente"
        value={search.cliente}
        onChange={handleChange}
        placeholder="Buscar por cliente"
        className="p-2 w-1/2 bg-tertiary text-white rounded-sm border-white border-[1px] border-opacity-15 focus:border-opacity-50"
      />
      <input
        type="date"
        name="fecha"
        value={search.fecha}
        onChange={handleChange}
        placeholder="Buscar por fecha"
        className="p-2 bg-tertiary text-white rounded-sm border-white border-[1px] border-opacity-15 focus:border-opacity-50"
      />
      <select
        name="estado"
        value={search.estado}
        onChange={handleChange}
        className="p-2 bg-tertiary text-white rounded-sm border-white border-[1px] border-opacity-15 focus:border-opacity-50"
      >
        <option value="">Todos los estados</option>
        <option value="pagada">Pagada</option>
        <option value="pendiente">Pendiente</option>
      </select>
    </div>
  );
};

export default Search;
