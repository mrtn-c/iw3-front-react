import React from 'react'
import { useState } from 'react';

const TabsButtons = ({selectedButton, setSelectedButton}) => {
  
 
    const handleButtonClick = (button) => {
      setSelectedButton(button);
    };
    
    /**1 = ORDENES
     * 2 = CAMIONES
     * 3 = CHOFERES
     * 4 = CLIENTES
     * 5 = PRODUCTOS
     */


    return (
      <div className="flex items-center">
        <div>
          <button className={`py-2 px-4 rounded text-white font-semibold  transition-all  ${
              selectedButton === 1 ? 'bg-blue-700 ' : 'bg-blue-400  hover:bg-blue-700'} `}
            onClick={() => handleButtonClick(1)}
          >
            Ordenes
          </button>
          <button className={`py-2 px-4 rounded text-white font-semibold ml-2 transition-all  ${
              selectedButton === 2 ? 'bg-blue-700 ' : 'bg-blue-400  hover:bg-blue-700'} `}
            onClick={() => handleButtonClick(2)}
          >
            Camiones
          </button>
          <button className={`py-2 px-4 rounded text-white font-semibold ml-2 transition-all  ${
              selectedButton === 3 ? 'bg-blue-700 ' : 'bg-blue-400  hover:bg-blue-700'} `}
            onClick={() => handleButtonClick(3)}
          >
            Choferes
          </button>
          <button className={`py-2 px-4 rounded text-white font-semibold ml-2 transition-all  ${
              selectedButton === 4 ? 'bg-blue-700 ' : 'bg-blue-400  hover:bg-blue-700'} `}
            onClick={() => handleButtonClick(4)}
          >
            Clientes
          </button>
          <button className={`py-2 px-4 rounded text-white font-semibold ml-2 transition-all  ${
              selectedButton === 5 ? 'bg-blue-700 ' : 'bg-blue-400  hover:bg-blue-700'} `}
            onClick={() => handleButtonClick(5)}
          >
            Productos
          </button>
        </div>
        <div className="ml-auto">
          <button className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded">
            Cerrar Sesion
          </button>
        </div>
      </div>
    );
  };

export default TabsButtons