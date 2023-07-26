import React, { useState, useEffect } from 'react';

const ProductoTable = () => {
  const [productos, setProductos] = useState([]);


  useEffect(() => {
    // Obtener el token JWT del localStorage (reemplaza 'NOMBRE_DEL_TOKEN' con el nombre correcto)
    const token = localStorage.getItem('token');

    // Realizar la solicitud a la API con el token JWT en el encabezado de autorización
    fetch('http://mugiwaras.mooo.com/api/producto/find-all', {
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
      .then(data => setProductos(data))
      .catch(error => console.error('Error al obtener los datos:', error));
  }, []);

  const handleAgregar = (codigo) => {
    localStorage.setItem('producto' , codigo);
  }


  return (
    <div className="px-4 py-8">
      <table className="w-full border">
        <thead>
          <tr>
            <th className="bg-gray-200 border p-2">ID</th>
            <th className="bg-gray-200 border p-2">Nombre</th>
            <th className="bg-gray-200 border p-2">Descripcion</th>
            <th className="bg-gray-200 border p-2">Codigo</th>
            <th className='bg-gray-200 border p-2'></th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto =>(
            <tr key={producto.id}>
              <td className="border p-2">{producto.id}</td>
              <td className="border p-2">{producto.nombre}</td>
              <td className="border p-2">{producto.descripcion}</td>
              <td className="border p-2">{producto.code}</td>
              {localStorage.getItem('producto') === producto.code ? (
              <td className="border p-2">
                <button className='py-1 px-2 mt-1 rounded text-white font-semibold transition-all bg-green-400 hover:bg-green-700'
                onClick={() => localStorage.removeItem('producto')}>
                    Agregado
                  </button>
                </td>
                ):(
                <td className="border p-2">
                  <button
                    className='py-1 px-2 mt-1 rounded text-white font-semibold transition-all bg-green-400 hover:bg-green-700'
                    onClick={() => handleAgregar(producto.code)}>
                    Agregar a orden
                  </button> 
              </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductoTable;