import { data } from 'autoprefixer';
import React, { useState } from 'react';

const AgregarProducto = ({ onClose }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [codigo, setCodigo] = useState('');
  const [id, setId] = useState(0);


  const handleSubmit = (event) => {
    event.preventDefault();
    // Obtener el token JWT del localStorage
    const token = localStorage.getItem('token');
    setId(id + 1);
    // Hacer una solicitud POST a la API para agregar un nuevo producto
    fetch('http://mugiwaras.mooo.com/api/producto', {
      method: 'POST', // Cambiar a POST
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' // Especificar el tipo de contenido JSON en el cuerpo
      },
      body: JSON.stringify({
        "id": id,
        "nombre": nombre,
        "descripcion": descripcion,
        "code": codigo
      })
    }).then(response => {
      if (response.status === 201) {
        console.log("Producto " + nombre + " agregado con éxito");
        // Limpia el formulario y cierra el formulario después de enviarlo.
        setNombre('');
        setDescripcion('');
        setCodigo('');
        onClose();
      } else {
        throw new Error();
      }
    }).catch(error => {
      console.error('Error al agregar el producto:', error);
    });
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-white opacity-80 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Agregar Producto</h2>
        <form onSubmit={handleSubmit}>
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
            <label htmlFor="descripcion" className="block text-gray-700">Descripción:</label>
            <input
              type="text"
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="codigo" className="block text-gray-700">Código:</label>
            <input
              type="text"
              id="codigo"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgregarProducto;

