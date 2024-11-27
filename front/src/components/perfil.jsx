import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

function Perfil() {
  // Estado para controlar la visibilidad del menú
  const [menuVisible, setMenuVisible] = useState(false);
  
  // Referencia para el div del perfil (segundo div)
  const perfilRef = useRef(null);
  
  // Función para alternar la visibilidad del menú
  const toggleMenu = () => {
    setMenuVisible(prevState => !prevState);
  };

  // Función para cerrar el menú si se hace clic fuera de él
  const handleClickOutside = (event) => {
    if (perfilRef.current && !perfilRef.current.contains(event.target)) {
      setMenuVisible(false);
    }
  };

  // Redirigir al usuario
  const navigate = useNavigate();

  // Función de logout (eliminar token y redirigir)
  const handleLogout = () => {
    // Eliminar el token del localStorage (o sessionStorage, dependiendo de tu implementación)
    localStorage.removeItem('token'); // Si usas localStorage
    // sessionStorage.removeItem('token'); // Si usas sessionStorage

    // También puedes eliminar otro tipo de información como el historial de usuario, si es necesario
    localStorage.removeItem('user'); // Ejemplo de eliminar datos del usuario

    // Redirigir a la página principal o inicio
    navigate('/');
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='text-white w-full h-28 bg-transparent flex justify-center items-center'>
      <div
        ref={perfilRef}  
        className='bg-primary flex justify-center flex-col items-start w-[95%] h-20 rounded-xl duration-500 hover:translate-x-4 cursor-pointer hover:bg-primaryHover border border-slate-500 hover:border-slate-300'
        onClick={toggleMenu}
      >
        <h1 className='ml-3 text-sm mb-3'>Diego</h1>
        <p className='ml-3 text-sm'>diego@gmail.com</p>
      </div>

      {/* Menú pequeño que aparece cuando menuVisible es true */}
      {menuVisible && (
        <div
          className='absolute left-full ml-4 bottom-20 bg-primary hover:bg-primaryHover text-white p-4 rounded-lg shadow-lg'
        >
          <ul>
            <li className='mb-2'>
              <a href='/configurar' className='hover:text-slate-300'>Configurar</a>
            </li>
            <li>
              <a
                href='/salir'
                className='hover:text-slate-300'
                onClick={handleLogout} // Llamar a la función de logout al hacer clic
              >
                Salir
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Perfil;
