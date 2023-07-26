import React, { useState } from 'react';
import AgregarCliente from './AgregarCliente';
import ClienteTable from './ClienteTable';

const ClienteTableActions = () => {
  const [showForm, setShowForm] = useState(false);

  const handleAgregarClick = () => {
    setShowForm(true);
  };

  return (
    <div>
      <div className="relative flex items-center justify-between mt-8">
        {showForm && <AgregarCliente onClose={() => setShowForm(false)} />}
        {showForm && <div className="absolute inset-0 bg-white z-20"></div>}
        {/**TODO: QUE SE VEA MEJOR LA PARTE DE ATRAS. */}
        <div>
          <button
            className="py-2 px-4 rounded text-white font-semibold transition-all bg-green-400 hover:bg-green-700"
            onClick={handleAgregarClick}
          >
            Agregar Cliente
          </button>
        </div>
        <div className="flex-auto text-center mr-60">
          <h2 className="text-4xl font-semibold">Clientes</h2>
        </div>
      </div>
      <ClienteTable />
    </div>
  );
};

export default ClienteTableActions;