import React, {useEffect, useState} from 'react'
import AgregarChofer from './AgregarChofer';
import ChoferTable from './ChoferTable';

const ChoferTableActions = () => {
  const [showForm, setShowForm] = useState(false);

  const handleAgregarClick = () => {
    setShowForm(true);
  };

  return (
    <div>
    <div className="relative flex items-center justify-between mt-8">
      {showForm && <AgregarChofer onClose={() => setShowForm(false)} />}
      {showForm && (
        <div className="absolute inset-0 bg-white opacity-100  z-20"></div>
      )}
       {/**TODO: QUE SE VEA MEJOR LA PARTE DE ATRAS. */}
      <div>
        <button
          className="py-2 px-4 rounded text-white font-semibold transition-all bg-green-400 hover:bg-green-700"
          onClick={handleAgregarClick}
        >
          Agregar Chofer
        </button>
      </div>
      <div className="flex-auto text-center mr-60">
        <h2 className="text-xl font-semibold">Chofer</h2>
      </div>
      </div>
    <ChoferTable />
    </div>
  );
};

export default ChoferTableActions