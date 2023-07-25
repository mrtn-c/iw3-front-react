import React, {useEffect, useState} from 'react'

const ChoferTable = () => {
    const [choferes, setChoferes] = useState([]);


    useEffect(() => {
      // Obtener el token JWT del localStorage (reemplaza 'NOMBRE_DEL_TOKEN' con el nombre correcto)
      const token = localStorage.getItem('token');
  
      // Realizar la solicitud a la API con el token JWT en el encabezado de autorización
      fetch('http://mugiwaras.mooo.com/api/chofer/find-all', {
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
        .then(data => setChoferes(data))
        .catch(error => console.error('Error al obtener los datos:', error));
    }, []);
  
    // useEffect(() => {
    //   const token = localStorage.getItem('token');
    //   const code = "pr2"
    //   // Realizar la solicitud a la API con el token JWT en el encabezado de autorización
    //   fetch(`http://mugiwaras.mooo.com/api/producto/buscar/${code}`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   })
  
  
    // }, []);
  
  
    return (
      <div className="px-4 py-8">
        <table className="w-full border">
          <thead>
            <tr>
              <th className="bg-gray-200 border p-2">DNI</th>
              <th className="bg-gray-200 border p-2">Nombre</th>
              <th className="bg-gray-200 border p-2">Apellido</th>
              <th className="bg-gray-200 border p-2">Codigo</th>
              <th className="bg-gray-200 border p-2"></th>
            </tr>
          </thead>
          <tbody>
            {choferes.map(chofer =>(
              <tr key={chofer.dni}>
                <td className="border p-2">{chofer.dni}</td>
                <td className="border p-2">{chofer.nombre}</td>
                <td className="border p-2">{chofer.apellido}</td>
                <td className="border p-2">{chofer.code}</td>
                <td className="border p-2">
                <button className=' py-1 px-2 mt-1 rounded text-white font-semibold transition-all bg-green-400 hover:bg-green-700'>Agregar a orden</button> {/**DAR LA POSIBILIDAD DE AGREGAR ACA CON LOCAL STORAGE. */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

export default ChoferTable