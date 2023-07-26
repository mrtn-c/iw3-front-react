import React, { useEffect, useState } from 'react';

const AgregarChofer = ({ onClose }) => {
  const [code, setCode] = useState('');
  const [dni, setDni] = useState(0);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Obtener el token JWT del localStorage
    const token = localStorage.getItem('token');
    // Hacer una solicitud POST a la API para agregar un nuevo chofer
    fetch('http://mugiwaras.mooo.com/api/chofer', {
      method: 'POST', // Cambiar a POST
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' // Especificar el tipo de contenido JSON en el cuerpo
      },
      body: JSON.stringify({
        "dni": dni,
        "nombre": nombre,
        "apellido": apellido,
        "code": code
      })
    }).then(response => {
      if (response.status === 201) {
        console.log("Chofer " + nombre + " " + apellido + " agregado con éxito");
        // Limpia el formulario y cierra el formulario después de enviarlo.
        setCode('');
        setDni(0);
        setNombre('');
        setApellido('');
        onClose();
      } else {
        throw new Error();
      }
    }).catch(error => {
      console.error('Error al agregar el chofer:', error);
    });
  };

  const handleCancelarClick = () => {
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-white opacity-100 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Agregar Chofer</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="dni" className="block text-gray-700">DNI:</label>
            <input
              type="text"
              id="dni"
              value={dni}
              onChange={(e) => setDni(e.target.value ? parseInt(e.target.value) : e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-gray-700">Nombre:</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="apellido" className="block text-gray-700">Apellido:</label>
            <input
              type="text"
              id="apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="codigo" className="block text-gray-700">Código:</label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={handleCancelarClick} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded mr-2">
              Cancelar
            </button>
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgregarChofer;
