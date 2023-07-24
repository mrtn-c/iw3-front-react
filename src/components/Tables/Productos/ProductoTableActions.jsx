import React, { useState } from 'react';
import AgregarProducto from './AgregarProducto';

const ProductoTableActions = () => {
  const [showForm, setShowForm] = useState(false);

  const handleAgregarClick = () => {
    setShowForm(true);
  };

  return (
    <div className="relative flex items-center justify-between mt-8">
      {showForm && <AgregarProducto onClose={() => setShowForm(false)} />}
      {showForm && (
        <div className="absolute inset-0 bg-white opacity-80 z-10"></div>
      )}
      <div>
        <button
          className="py-2 px-4 rounded text-white font-semibold transition-all bg-green-400 hover:bg-green-700"
          onClick={handleAgregarClick}
        >
          Agregar
        </button>
        <button className="py-2 px-4 rounded text-white font-semibold ml-2 transition-all bg-red-400 hover:bg-red-700">
          Eliminar
        </button>
      </div>
      <div className="flex-auto text-center mr-60">
        <h2 className="text-xl font-semibold">Productos</h2>
      </div>
      <div></div>
    </div>
  );
};

export default ProductoTableActions;