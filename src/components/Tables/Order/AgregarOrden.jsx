import React, { useState, useEffect } from 'react';

const AgregarOrden = ({ onClose, lastId }) => {
  // Obtener los valores del almacenamiento local para los campos que no se pueden modificar
  const [camion, setCamion] = useState(localStorage.getItem('camion'));
  const [producto, setProducto] = useState(localStorage.getItem('producto'));
  const [cliente, setCliente] = useState(localStorage.getItem('cliente'));
  const [chofer, setChofer] = useState(localStorage.getItem('chofer'));
  const [numeroOrden, setNumeroOrden] = useState(0);
  const [preset, setPreset] = useState('');

  const [fechaTurnoCarga, setFechaTurnoCarga] = useState('');

  useEffect(() => {
    // Código para obtener los valores del almacenamiento local para los campos iniciales que no se pueden modificar
    // ...

  }, []); // El arreglo vacío [] como segundo argumento asegura que el efecto solo se ejecute una vez al montar el componente

  useEffect(() => {
    // Aquí el código que se ejecutará cada vez que lastId cambie
    console.log('lastId cambió:', lastId);
  }, [lastId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Obtener el token JWT del localStorage
    const token = localStorage.getItem('token');
    // Hacer una solicitud POST a la API para agregar una nueva orden

    const fechaTurnoCargaDate = new Date(fechaTurnoCarga);

    console.log(JSON.stringify({
        "numeroOrden": numeroOrden,
        "camion": camion,
        "chofer": chofer,
        "cliente": cliente,
        "producto": producto,
        "preset": preset,
        "fechaTurnoCarga": fechaTurnoCargaDate.toISOString()
      }))
    fetch('http://mugiwaras.mooo.com/api/orden/b2b', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "numeroOrden": numeroOrden,
        "camion": camion,
        "chofer": chofer,
        "cliente": cliente,
        "producto": producto,
        "preset": preset,
        "fechaTurnoCarga": fechaTurnoCargaDate.toISOString()
      })
    }).then(response => {
      if (response.status === 201) {
        console.log("Orden agregada con éxito");
        // Limpia el formulario y cierra el formulario después de enviarlo.

        localStorage.removeItem('camion');
        localStorage.removeItem('producto');
        localStorage.removeItem('cliente');
        localStorage.removeItem('chofer');


        setCamion('');
        setProducto('');
        setCliente('');
        setChofer('');
        setNumeroOrden(0);
        setPreset('');
        setFechaTurnoCarga('');
        onClose();
      } else {
        throw new Error();
      }
    }).catch(error => {
      console.error('Error al agregar la orden:', error);
    });
  };

  const handleCancelarClick = () => {
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-white flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Agregar Orden</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="orden" className="block text-gray-700">
              Número de Orden:
            </label>
            <input
              type="number"
              id="orden"
              value={numeroOrden}
              onChange={(e) => setNumeroOrden(parseInt(e.target.value))}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="preset" className="block text-gray-700">
              Preset:
            </label>
            <input
              type="number"
              id="preset"
              value={preset}
              onChange={(e) => setPreset(parseInt(e.target.value))}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fechaTurnoCarga" className="block text-gray-700">
              Fecha de Turno de Carga:
            </label>
            <input
              type="date"
              id="fechaTurnoCarga"
              value={fechaTurnoCarga}
              onChange={(e) => setFechaTurnoCarga(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCancelarClick}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded mr-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgregarOrden;

