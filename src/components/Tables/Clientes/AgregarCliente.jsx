import React, { useState } from 'react';

const AgregarCliente = ({ onClose }) => {
  const [code, setCode] = useState('');
  const [contacto, setContacto] = useState(0);
  const [razonSocial, setrazonSocial] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Obtener el token JWT del localStorage
    const token = localStorage.getItem('token');
    // Hacer una solicitud POST a la API para agregar un nuevo producto
    fetch('http://mugiwaras.mooo.com/api/cliente', {
      method: 'POST', // Cambiar a POST
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' // Especificar el tipo de contenido JSON en el cuerpo
      },
      body: JSON.stringify({
        "razonSocial": razonSocial,
        "contacto": contacto,
        "code": code,
      })
    }).then(response => {
      if (response.status === 201) {
        console.log("Cliente " + razonSocial + " agregado con éxito");
        // Limpia el formulario y cierra el formulario después de enviarlo.
        setCode('');
        setContacto();
        setrazonSocial(0);
        onClose()
      } else {
        throw new Error();
      }
    }).catch(error => {
      console.error('Error al agregar el cliente:', error);
    });
  };

  const handleCancelarClick = () => {
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-white  flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Agregar Cliente</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nombre" className="block text-gray-700">Razon social:</label>
            <input
              type="text"
              id="razonSocial"
              value={razonSocial}
              onChange={(e) => setrazonSocial(e.target.value ? parseInt(e.target.value): e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contacto" className="block text-gray-700">Contacto:</label>
            <input
              type="text"
              id="contacto"
              value={contacto}
              onChange={(e) => setContacto(e.target.value ? parseInt(e.target.value): e.target.value)}
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

export default AgregarCliente;
