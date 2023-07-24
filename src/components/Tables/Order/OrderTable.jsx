import React, { useState, useEffect } from 'react';

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [filterEstado, setFilterEstado] = useState(0); // Estado del filtro (opción seleccionada)
  const estados = [0, 1, 2, 3]; // Opciones para el filtro de estado

  useEffect(() => {
    // Obtener el token JWT del localStorage (reemplaza 'NOMBRE_DEL_TOKEN' con el nombre correcto)
    const token = localStorage.getItem('token');

    // Realizar la solicitud a la API con el token JWT en el encabezado de autorización
    fetch('http://mugiwaras.mooo.com/api/orden/find-all', {
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
      .then(data => setOrders(data))
      .catch(error => console.error('Error al obtener los datos:', error));
  }, []);

  // Aplicar filtros a los datos
  const filteredOrders = orders.filter(order => {
    // Aplicar filtro de estado si está seleccionado
    if (order.estado !== filterEstado) {
      return false;
    }
    return true;
  });

  return (
    <div className="px-4 py-8">
      <h2 className="text-xl font-bold mb-4">Tabla de Productos</h2>
      <div className="mb-4">
        <label htmlFor="filtroEstado" className="mr-2">
          Filtro de Estado:
        </label>
        <select
          id="filtroEstado"
          value={filterEstado}
          onChange={e => {e.target.value === 0 ?  setFilterEstado(parseInt(0)) : setFilterEstado(parseInt(e.target.value))}}
          className="border px-2 py-1 rounded"
        >
          {estados.map(estado => (
            <option key={estado} value={estado}>
            {estado === 0 ? "Todos" : estado}
            </option>
            ))}
        </select>
      </div>
      <table className="w-full border">
        <thead>
          <tr>
            <th className="bg-gray-200 border p-2">Num</th>
            <th className="bg-gray-200 border p-2">Cliente</th>
            <th className="bg-gray-200 border p-2">Estado</th>
            <th className="bg-gray-200 border p-2">Preset</th>
            <th className="bg-gray-200 border p-2">Carga actual</th>
            <th className="bg-gray-200 border p-2">Camion</th>
            <th className="bg-gray-200 border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            (order.estado === filterEstado || filterEstado === 0) && (
                <tr key={order.numeroOrden}>
                  <td className="border p-2">{order.numeroOrden}</td>
                  <td className="border p-2">{order.cliente.razonSocial}</td>
                  <td className="border p-2">{order.estado}</td>
                  <td className="border p-2">{order.preset}</td>
                  <td className="border p-2">{((order.detalle[order.detalle.length - 1]?.masa || 0) / order.preset * 100).toFixed(2)}%</td>
                  <td className="border p-2">{order.camion.patente}</td>
                </tr>
              )
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
