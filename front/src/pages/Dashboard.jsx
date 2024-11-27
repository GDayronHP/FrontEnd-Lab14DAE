import React, { useEffect, useState } from "react";
import axios from 'axios';
import Cuadro from "../components/AdminComponents/Cuadro";
import Barra from "../components/AdminComponents/Barra";

const Dashboard = () => {

  const [role, setRole] = useState(null);

  useEffect(() => {
    // Obtener el usuario desde el almacenamiento local
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (userInfo && userInfo.rol === "admin") {
      setRole(userInfo.rol); // Solo si el rol es "admin"
    }
  }, []);

  if (!role) {
    return <div>No tienes acceso a esta área. Inicia sesión con el rol adecuado.</div>;
  }

  return (
    <>
      <main className="flex flex-col  w-full bg-primary h-screen p-5">
        <div className="grid grid-cols-3 gap-1">
          <Cuadro estilo="bg-secondary hover:bg-secondaryHover " cantidad="4" titulo="Pagar" />
          <Cuadro estilo="bg-secondary hover:bg-secondaryHover " cantidad="4" titulo="Cobrar" />
          <Cuadro estilo="bg-red-700 hover:bg-secondaryHover " cantidad="4"  titulo="Fa. Vencidas" />

          <Cuadro estilo="bg-secondary hover:bg-secondaryHover " cantidad="4" titulo="Pagar" />
          <Cuadro estilo="bg-secondary hover:bg-secondaryHover " cantidad="4" titulo="Cobrar" />
          <Cuadro estilo="bg-red-700 hover:bg-secondaryHover " cantidad="4"  titulo="Fa. Vencidas" />
          
        </div>

        <div className="flex flex-col h-[70%]">
          
          <div className="mb-3 h-[50%] flex flex-col">
            <h1 className="uppercase text-slate-400 font-semibold ml-2 mb-2">Montos agrupados por mes: CLIENTE</h1>
            <div className="bg-secondary rounded-2xl flex-1 flex flex-row justify-around items-end">
            <Barra mes="Enero" cantidad="60" estilo="bg-green-500" />
              <Barra mes="Febrero" cantidad="80" estilo="bg-blue-500" />
              <Barra mes="Marzo" cantidad="10" estilo="bg-red-500" />
              <Barra mes="Abril" cantidad="30" estilo="bg-yellow-500" />
              <Barra mes="Mayo" cantidad="50" estilo="bg-purple-500" />
              <Barra mes="Febrero" cantidad="80" estilo="bg-blue-500" />
              <Barra mes="Marzo" cantidad="10" estilo="bg-red-500" />
              <Barra mes="Abril" cantidad="30" estilo="bg-yellow-500" />
              <Barra mes="Mayo" cantidad="50" estilo="bg-purple-500" />
              <Barra mes="Febrero" cantidad="80" estilo="bg-blue-500" />
              <Barra mes="Marzo" cantidad="10" estilo="bg-red-500" />
              <Barra mes="Abril" cantidad="30" estilo="bg-yellow-500" />
              <Barra mes="Mayo" cantidad="50" estilo="bg-purple-500" />
              <Barra mes="Febrero" cantidad="80" estilo="bg-blue-500" />
              <Barra mes="Marzo" cantidad="10" estilo="bg-red-500" />
              <Barra mes="Abril" cantidad="30" estilo="bg-yellow-500" />
              <Barra mes="Mayo" cantidad="50" estilo="bg-purple-500" />
              <Barra mes="Febrero" cantidad="80" estilo="bg-blue-500" />
              <Barra mes="Marzo" cantidad="10" estilo="bg-red-500" />
              <Barra mes="Abril" cantidad="30" estilo="bg-yellow-500" />
              <Barra mes="Mayo" cantidad="50" estilo="bg-purple-500" />
              <Barra mes="Febrero" cantidad="80" estilo="bg-blue-500" />
              <Barra mes="Marzo" cantidad="10" estilo="bg-red-500" />
              <Barra mes="Abril" cantidad="30" estilo="bg-yellow-500" />
              <Barra mes="Mayo" cantidad="50" estilo="bg-purple-500" />
              <Barra mes="Febrero" cantidad="80" estilo="bg-blue-500" />
              <Barra mes="Marzo" cantidad="10" estilo="bg-red-500" />
              <Barra mes="Abril" cantidad="30" estilo="bg-yellow-500" />
              <Barra mes="Mayo" cantidad="50" estilo="bg-purple-500" />
              <Barra mes="Febrero" cantidad="80" estilo="bg-blue-500" />
              <Barra mes="Marzo" cantidad="10" estilo="bg-red-500" />
              <Barra mes="Abril" cantidad="30" estilo="bg-yellow-500" />
              <Barra mes="Mayo" cantidad="50" estilo="bg-purple-500" />
              <Barra mes="Febrero" cantidad="80" estilo="bg-blue-500" />
              <Barra mes="Marzo" cantidad="10" estilo="bg-red-500" />
              <Barra mes="Abril" cantidad="30" estilo="bg-yellow-500" />
              <Barra mes="Mayo" cantidad="50" estilo="bg-purple-500" />
              <Barra mes="Febrero" cantidad="80" estilo="bg-blue-500" />
              <Barra mes="Marzo" cantidad="10" estilo="bg-red-500" />
              <Barra mes="Abril" cantidad="30" estilo="bg-yellow-500" />
              <Barra mes="Mayo" cantidad="50" estilo="bg-purple-500" />
              <Barra mes="Febrero" cantidad="80" estilo="bg-blue-500" />
              <Barra mes="Marzo" cantidad="10" estilo="bg-red-500" />
              <Barra mes="Abril" cantidad="30" estilo="bg-yellow-500" />
              <Barra mes="Mayo" cantidad="50" estilo="bg-purple-500" />
              <Barra mes="Febrero" cantidad="80" estilo="bg-blue-500" />
              <Barra mes="Marzo" cantidad="10" estilo="bg-red-500" />
              <Barra mes="Abril" cantidad="30" estilo="bg-yellow-500" />
              <Barra mes="Mayo" cantidad="50" estilo="bg-purple-500" />
              <Barra mes="Febrero" cantidad="80" estilo="bg-blue-500" />
              <Barra mes="Marzo" cantidad="10" estilo="bg-red-500" />
              <Barra mes="Abril" cantidad="30" estilo="bg-yellow-500" />
              <Barra mes="Mayo" cantidad="50" estilo="bg-purple-500" />
              <Barra mes="Febrero" cantidad="80" estilo="bg-blue-500" />
              <Barra mes="Marzo" cantidad="10" estilo="bg-red-500" />
              <Barra mes="Abril" cantidad="30" estilo="bg-yellow-500" />
              <Barra mes="Mayo" cantidad="50" estilo="bg-purple-500" />
              <Barra mes="Febrero" cantidad="80" estilo="bg-blue-500" />
              <Barra mes="Marzo" cantidad="10" estilo="bg-red-500" />
              <Barra mes="Abril" cantidad="30" estilo="bg-yellow-500" />
              <Barra mes="Mayo" cantidad="50" estilo="bg-purple-500" />
              <Barra mes="Febrero" cantidad="80" estilo="bg-blue-500" />
              <Barra mes="Marzo" cantidad="10" estilo="bg-red-500" />
              <Barra mes="Abril" cantidad="30" estilo="bg-yellow-500" />
              <Barra mes="Mayo" cantidad="50" estilo="bg-purple-500" />

       
            </div>
          </div>

          <div className="h-[50%] flex flex-col">
            <h1 className="uppercase text-slate-400 font-semibold ml-2 mb-2">Montos agrupados por mes: PROVEEDOR</h1>
            <div className="bg-secondary rounded-2xl flex-1 flex flex-row justify-around items-end">
              <div className="h-[50%] w-full mr-1 rounded bg-purple-500"></div>
              <div className="h-[70%] w-full mr-1 rounded bg-purple-500"></div>
              <div className="h-[30%] w-full mr-1 rounded bg-purple-500"></div>
              <div className="h-[20%] w-full mr-1 rounded bg-purple-500"></div>
              <div className="h-[50%] w-full mr-1 rounded bg-purple-500"></div>
              <div className="h-[70%] w-full mr-1 rounded bg-purple-500"></div>
              <div className="h-[30%] w-full mr-1 rounded bg-purple-500"></div>
              <div className="h-[20%] w-full mr-1 rounded bg-purple-500"></div>
                 
            </div>
          </div>

        </div>
      </main>
    </>
  );
};

export default Dashboard;
