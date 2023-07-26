import React, { useEffect, useState } from 'react';

const CamionTable = () => {
  const [camiones, setCamiones] = useState([]);
  const [camionAgregado, setCamionAgregado] = useState('');

  const fetchCamionesData = () => {
    // Obtener el token JWT del localStorage (reemplaza 'NOMBRE_DEL_TOKEN' con el nombre correcto)
    const token = localStorage.getItem('token');

    // Realizar la solicitud a la API con el token JWT en el encabezado de autorización
    fetch('http://mugiwaras.mooo.com/api/camion/find-all', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => { 
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }
        return response.json();
      })
      .then(data => setCamiones(data))
      .catch(error => console.error('Error al obtener los datos:', error));
  };

  useEffect(() => {
    // Obtener los datos al montar el componente
    fetchCamionesData();

    // Llamar a fetchCamionesData cada 5 minutos (300,000 milisegundos)
    const intervalId = setInterval(fetchCamionesData, 300000);

    // Limpiar el intervalo cuando el componente se desmonte para evitar fugas de memoria
    return () => clearInterval(intervalId);
  }, []);

  const handleAgregar = (codigo) => {
    setCamionAgregado(codigo);
    localStorage.setItem('camion', codigo);
  };

  const handleCancelar = () => {
    setCamionAgregado('');
    localStorage.removeItem('camion');
  };
  const tableStyle = {
    backgroundColor: '#ffffff', // Cambia este color por el que desees
  };

  return (
    <div className="px-4 py-8">
      <table className="w-full border" style={tableStyle}>
        <thead>
          <tr>
            <th className="bg-gray-200 border p-2">Patente</th>
            <th className="bg-gray-200 border p-2">Descripcion</th>
            <th className="bg-gray-200 border p-2">Capacidad Total</th>
            <th className="bg-gray-200 border p-2">Codigo</th>
            <th className="bg-gray-200 border p-2"></th>
          </tr>
        </thead>
        <tbody>
          {camiones.map(camion =>(
            <tr key={camion.patente}>
              <td className="border p-2">{camion.patente}</td>
              <td className="border p-2">{camion.descripcion}</td>
              <td className="border p-2">{camion.totalCisterna}</td>
              <td className="border p-2">{camion.code}</td>
              <td className="border p-2">
                {camionAgregado === camion.code ? (
                  <button className='py-1 px-2 mt-1 rounded text-white font-semibold transition-all bg-green-400 hover:bg-green-700'>
                    Agregado
                  </button>
                ) : (
                  <>
                    <button
                      className='py-1 px-2 mt-1 rounded text-white font-semibold transition-all bg-green-400 hover:bg-green-700'
                      onClick={() => handleAgregar(camion.code)}
                    >
                      Agregar a orden
                    </button>
                    {localStorage.getItem('camion') === camion.code && (
                      <button
                        className='py-1 px-2 mt-1 rounded text-white font-semibold transition-all bg-red-500 hover:bg-red-700 ml-2'
                        onClick={handleCancelar}
                      >
                        Cancelar
                      </button>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CamionTable;