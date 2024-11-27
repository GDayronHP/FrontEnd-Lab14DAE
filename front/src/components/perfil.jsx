import React, { useState, useRef, useEffect } from 'react';

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
              <a href='/salir' className='hover:text-slate-300'>Salir</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Perfil;
