import React, { useState } from 'react';
import OrderTable from './OrderTable';
import AgregarOrden from './AgregarOrden';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 


const OrderTableActions = () => {
  const [showForm, setShowForm] = useState(false);
  

  const handleAgregarClick = () => {
    let camion=localStorage.getItem("camion")
    let cliente=localStorage.getItem("cliente")
    let chofer=localStorage.getItem("chofer")
    let producto=localStorage.getItem("producto")

    if(camion !=null &&cliente !=null && chofer !=null &&producto !=null){
      setShowForm(true);
    }else{
      toast.warn('Seleccione todos los items necesarios.'); 
        }
    
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mt-8">
        {showForm && <AgregarOrden onClose={handleCloseForm}  />}
        {showForm && <div className="absolute inset-0 bg-white z-20"></div>}
        <div>
          <button
            className="py-2 px-4 rounded text-white font-semibold transition-all bg-green-400 hover:bg-green-700 "
            onClick={handleAgregarClick}
          >
            Agregar
          </button>
        </div>
        <h1 className="mr-40 text-4xl font-semibold">Ordenes</h1>
        <div>
          <button className="py-2 px-4 rounded text-white font-semibold ml-2 transition-all bg-blue-500 hover:bg-blue-600">
            Cambiar Estado
          </button>
        </div>
      </div>
      <OrderTable />
    </div>
     
  );
};

export default OrderTableActions;