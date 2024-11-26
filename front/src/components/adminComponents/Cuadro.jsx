import React from "react";

// Componente que recibe cantidad y titulo como props
const Cuadro = ({ cantidad, titulo }) => {
  return (
    <div className="bg-white p-4 border rounded shadow-md">
      <h2 className="text-xl font-semibold">{titulo}</h2>
      <p className="text-lg">{cantidad} elementos</p>
    </div>
  );
};

export default Cuadro;
