import React, { useState } from 'react';
import AgregarProducto from './AgregarProducto';
import ProductoTable from './ProductoTable';

const ProductoTableActions = () => {
  const [showForm, setShowForm] = useState(false);

  const handleAgregarClick = () => {
    setShowForm(true);
  };

  return (
    <div>
    <div className="relative flex items-center justify-between mt-8">
      {showForm && <AgregarProducto onClose={() => setShowForm(false)} />}
      {showForm && (
        <div className="absolute inset-0 bg-white z-20"></div>
      )}
      <div>
        <button
          className="py-2 px-4 rounded text-white font-semibold transition-all bg-green-400 hover:bg-green-700"
          onClick={handleAgregarClick}
        >
          Agregar Producto
        </button>
      </div>
      <div className="flex-auto text-center mr-60">
        <h2 className="text-4xl font-semibold">Productos</h2>
      </div>
      </div>
    <ProductoTable />
    </div>
  );
};

export default ProductoTableActions;