import React, { useState, useEffect } from 'react';

export default function Conciliacion({ id, onClose }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    // Hacer una solicitud GET a la API para obtener los datos de conciliación
    console.log(id);
    fetch(`http://mugiwaras.mooo.com/api/orden/conciliacion`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'NumeroOrden': id
      }
    })  
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
      }
      return response.json();
    })
    .then(data => setData(data))
    .catch(error => {
      console.error('Error al realizar la solicitud GET:', error);
    });
  }, []);

  const handleAceptar = () => {
    // Lógica para realizar cualquier acción al aceptar
    onClose(); // Cierra el componente
  };
    
  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-white flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Conciliacion</h2>
        {data && (
          <form>
            <div className="mb-4">
              <label htmlFor="pesaje_inicial" className="block text-gray-700">Pesaje Inicial: {data.pesaje_inicial}</label>           
            </div>
            <div className="mb-4">
              <label htmlFor="pesaje_final" className="block text-gray-700">Pesaje Final: {data.pesaje_final}</label>           
            </div>
            <div className="mb-4">
              <label htmlFor="producto_cargado" className="block text-gray-700">Producto Cargado: {data.producto_cargado}</label>
            </div>
            <div className="mb-4">
              <label htmlFor="neto_por_balanza" className="block text-gray-700">Neto Por Balanza: {data.neto_por_balanza}</label>
            </div>
            <div className="mb-4">
              <label htmlFor="promedio_temperatura" className="block text-gray-700">Promedio Temperatura: {data.promedio_temperatura}</label>
            </div>
            <div className="mb-4">
              <label htmlFor="promedio_densidad" className="block text-gray-700">Promedio Densidad: {data.promedio_densidad}</label>
            </div>
            <div className="mb-4">
              <label htmlFor="promedio_caudal" className="block text-gray-700">"Promedio Caudal": {data.promedio_caudal}</label>
            </div>
          </form>
        )}
        <button
          onClick={handleAceptar}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
