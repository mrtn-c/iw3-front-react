import {useState, useEffect} from 'react'

const CamionTable = () => {
    const [camiones, setCamiones] = useState([]);


    useEffect(() => {
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
                <button className=' py-1 px-2 mt-1 rounded text-white font-semibold transition-all bg-green-400 hover:bg-green-700'>Agregar a orden</button> {/**DAR LA POSIBILIDAD DE AGREGAR ACA CON LOCAL STORAGE. */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
export default CamionTable