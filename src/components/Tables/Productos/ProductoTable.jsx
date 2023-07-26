import React, { useState, useEffect } from 'react';

const ProductoTable = () => {
  const [productos, setProductos] = useState([]);
  const [productoAgregado, setProductoAgregado] = useState('');

  const fetchProductosData = () => {
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
  };

  useEffect(() => {
    // Obtener los datos al montar el componente
    fetchProductosData();

    // Llamar a fetchProductosData cada 5 minutos (300,000 milisegundos)
    const intervalId = setInterval(fetchProductosData, 60000);

    // Limpiar el intervalo cuando el componente se desmonte para evitar fugas de memoria
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Actualizar el estado productoAgregado al montar el componente
    const codigoProductoAgregado = localStorage.getItem('producto');
    setProductoAgregado(codigoProductoAgregado);
  }, []);

  const handleAgregar = (codigo) => {
    // Si ya está agregado, eliminarlo del localStorage y el estado
    if (productoAgregado === codigo) {
      localStorage.removeItem('producto');
      setProductoAgregado(null);
    } else {
      // Si no está agregado, guardarlo en el localStorage y el estado
      localStorage.setItem('producto', codigo);
      setProductoAgregado(codigo);
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
            <th className="bg-gray-200 border p-2">ID</th>
            <th className="bg-gray-200 border p-2">Nombre</th>
            <th className="bg-gray-200 border p-2">Descripcion</th>
            <th className="bg-gray-200 border p-2">Codigo</th>
            <th className='bg-gray-200 border p-2'></th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <tr key={producto.id}>
              <td className="border p-2">{producto.id}</td>
              <td className="border p-2">{producto.nombre}</td>
              <td className="border p-2">{producto.descripcion}</td>
              <td className="border p-2">{producto.code}</td>
              <td className="border p-2">
                {productoAgregado === producto.code ? (
                  <button
                    className='py-1 px-2 mt-1 rounded text-white font-semibold transition-all bg-green-400 hover:bg-green-700'
                    onClick={() => handleAgregar(producto.code)}
                  >
                    Agregado
                  </button>
                ) : (
                  <button
                    className='py-1 px-2 mt-1 rounded text-white font-semibold transition-all bg-green-400 hover:bg-green-700'
                    onClick={() => handleAgregar(producto.code)}
                  >
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

export default ProductoTable;