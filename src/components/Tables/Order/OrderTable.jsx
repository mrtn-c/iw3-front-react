import React, { useState, useEffect } from 'react';

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [filterEstado, setFilterEstado] = useState(0); // Estado del filtro (opción seleccionada)
  const estados = [0, 1, 2, 3]; // Opciones para el filtro de estado
  const [alarmas, setAlarmas] = useState([]);
  const fetchData = () => {
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
      }).then(data => setOrders(data))
      .catch(error => console.error('Error al obtener los datos:', error)); 
    };

  // Llamar a fetchData al montar el componente y cada 5 minutos (300,000 milisegundos)
  useEffect(() => {
    fetchData(); // Obtener los datos al montar el componente
    const intervalId = setInterval(fetchData, 60000); // Actualizar cada 5 minutos

    // Limpiar el intervalo cuando el componente se desmonte para evitar fugas de memoria
    return () => clearInterval(intervalId);
  }, []);

  function handleAlarmaClick(idOrden) {
    const token = localStorage.getItem('token');
    // Realizar la solicitud a la API con el token JWT en el encabezado de autorización
    fetch('http://mugiwaras.mooo.com/api/orden/aceptar-alarma', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        NumeroOrden: idOrden, 
      }
    })
      .then(response => {
        if (!response.ok) {
          console.log(response)
          throw new Error('Error en la respuesta de la API');
        }
        fetchData();
        return response.json();
      })
      .catch(error => console.error('Error al obtener los datos:', error));

 
    };

  function handleConciliacion(numeroOrden){
    fetch('http://mugiwaras.mooo.com/api/orden/conciliacion', {
      headers: {
        Authorization: `Bearer ${token}`,
        NumeroOrden: numeroOrden, 
      }
    })
      .then(response => {
        if (!response.ok) {
          console.log(response)
          throw new Error('Error en la respuesta de la API');
        }
        
      })
      .catch(error => console.error('Error al obtener los datos:', error));

 
    };
  

  function tiempoTranscurrido(fecha) {
    // Obtener la fecha actual en formato Date
    const fechaActual = new Date();
  
    // Convertir la fecha del turno de carga en formato Date
    const fechaTurnoCarga = new Date(fecha);
  
    // Calcular la diferencia en milisegundos entre la fecha actual y la fecha del turno de carga
    const tiempoTranscurridoMilisegundos = fechaActual - fechaTurnoCarga;
  
    // Calcular el tiempo transcurrido en Minutos
    const tiempoTranscurridoMinutos = tiempoTranscurridoMilisegundos / (1000 * 60);

    return tiempoTranscurridoMinutos;
  }
  const tableStyle = {
    backgroundColor: '#ffffff', // Cambia este color por el que desees
  };

  
  return (
    <div className="px-4 py-8">
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
      <table className="w-full border" style={tableStyle}>
        <thead>
          <tr>
            <th className="bg-gray-200 border p-2">Num</th>
            <th className="bg-gray-200 border p-2">Cliente</th>
            <th className="bg-gray-200 border p-2">Estado</th>
            <th className="bg-gray-200 border p-2">Preset</th>
            <th className="bg-gray-200 border p-2">Carga actual</th>
            <th className="bg-gray-200 border p-2">Camion</th>
            <th className="bg-gray-200 border p-2">Tiempo Transcurrido</th>
            <th className="bg-gray-200 border p-2">ETA</th>
            <th className='bg-gray-200 border p-2'>Conciliacion</th>
            <th className="bg-gray-200 border p-2">Alarma</th>
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
                  
                  {order.estado === 2 ? (
                    <>
                      <td className="border p-2">{tiempoTranscurrido(order.fechaTurnoCarga).toFixed(0)} Minutos</td>
                      <td className="border p-2">{((order.preset - order.ultimaMasa) / (order.detalle[order.detalle.length - 1]?.caudal || 1)).toFixed(0)} min</td>
                    </>
                  ) : (
                    <>
                      <td className="border p-2"> - </td>
                      <td className="border p-2"> - </td>
                    </>
                  )}
                  {order.estado == 4 ? (<>
                    <td className="border p-2" button="button">VER</td>
                  </>):(<></>)}
                  {order.alarma ? (
                    <td>
                      <button className="py-2 px-4 rounded text-white font-semibold ml-2 transition-all bg-red-400 hover:bg-red-700" onClick={handleAlarmaClick(order.numeroOrden)} type="submit">Aceptar</button>
                    </td>
                  ):(<td> - </td>)}
                </tr>
              )
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;