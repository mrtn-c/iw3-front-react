import React, { useEffect, useState } from 'react';

const CamionTable = () => {
  const [camiones, setCamiones] = useState([]);
  const [camionAgregado, setCamionAgregado] = useState(null);

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
    const intervalId = setInterval(fetchCamionesData, 60000);

    // Limpiar el intervalo cuando el componente se desmonte para evitar fugas de memoria
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Actualizar el estado camionAgregado al montar el componente
    const codigoCamionAgregado = localStorage.getItem('camion');
    setCamionAgregado(codigoCamionAgregado);
  }, []);

  const handleAgregar = (codigo) => {
    // Si ya está agregado, eliminarlo del localStorage y el estado
    if (camionAgregado === codigo) {
      localStorage.removeItem('camion');
      setCamionAgregado(null);
    } else {
      // Si no está agregado, guardarlo en el localStorage y el estado
      localStorage.setItem('camion', codigo);
      setCamionAgregado(codigo);
    }
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
          {camiones.map(camion => (
            <tr key={camion.patente}>
              <td className="border p-2">{camion.patente}</td>
              <td className="border p-2">{camion.descripcion}</td>
              <td className="border p-2">{camion.totalCisterna}</td>
              <td className="border p-2">{camion.code}</td>
              <td className="border p-2">
                {camionAgregado === camion.code ? (
                  <button className='py-1 px-2 mt-1 rounded text-white font-semibold transition-all bg-green-400 hover:bg-green-700' onClick={() => handleAgregar(camion.code)}>
                    Agregado
                  </button>
                ) : (
                  <button className='py-1 px-2 mt-1 rounded text-white font-semibold transition-all bg-green-400 hover:bg-green-700' onClick={() => handleAgregar(camion.code)}>
                    Agregar a orden
                  </button>
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