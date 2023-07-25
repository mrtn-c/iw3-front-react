import React, { useState } from 'react';

const AgregarCamion = ({ onClose }) => {
  const [code, setCode] = useState('');
  const [patente, setPatente] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [datosCisterna, setDatosCisterna] = useState([
    { tamanio: 0 },
  ]);
  const [totalCisterna, setTotalCisterna] = useState(0);

  const handleAgregarCisterna = () => {
    if (datosCisterna.length < 3) {
      setDatosCisterna([...datosCisterna, { tamanio: 0 }]);
    }
  };

  const handleQuitarCisterna = (index) => {
    if (datosCisterna.length > 1) {
      const newDatosCisterna = datosCisterna.filter((_, i) => i !== index);
      setDatosCisterna(newDatosCisterna);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Obtener el token JWT del localStorage
    const token = localStorage.getItem('token');
    // Calcular totalCisterna en base a los tamanios ingresados en datosCisterna
    const tamanios = datosCisterna.map(cisterna => cisterna.tamanio);
    let total = 0;
    for(let i = 0; i<tamanios.length;i++){
        console.log(tamanios[i])
        total += parseInt(tamanios[i]);
    }
    console.log(total);
    setTotalCisterna(total);
    console.log(JSON.stringify({
        "patente": patente,
        "descripcion": descripcion,
        "datosCisterna": datosCisterna, // Enviar la lista de cisternas con sus tamanios
        "totalCisterna": total, // Enviar el totalCisterna calculado
        "code": code
    }))
    // Hacer una solicitud POST a la API para agregar un nuevo camión
    fetch('http://mugiwaras.mooo.com/api/camion', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "patente": patente,
        "descripcion": descripcion,
        "datosCisterna": datosCisterna, // Enviar la lista de cisternas con sus tamanios
        "totalCisterna": totalCisterna, // Enviar el totalCisterna calculado
        "code": code
      })
    }).then(response => {
      if (response.status === 201) {
        console.log("Camion " + patente + " agregado con éxito");
        // Limpia el formulario y cierra el formulario después de enviarlo.
        setCode('');
        setPatente('');
        setDescripcion('');
        setDatosCisterna([{ tamanio: 0 }]); // Reiniciar los tamanios de cisternas
        setTotalCisterna(0);
        onClose();
      } else {
        throw new Error();
      }
    }).catch(error => {
      console.error('Error al agregar el camión:', error);
    });
  };
  
    return (
      <div className="fixed top-0 left-0 h-screen w-screen bg-white opacity-80 flex items-center justify-center z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Agregar Camion</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="patente" className="block text-gray-700">Patente</label>
                <input
                type="text"
                id="patente"
                value={patente}
                onChange={(e) => setPatente(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
                />
            </div>
            <div className="mb-4">
              <label htmlFor="descripcion" className="block text-gray-700">Descripcion:</label>
              <input
                type="text"
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
            </div>
            {datosCisterna.map((cisterna, index) => (
        <div key={index} className="mb-4">
          <label htmlFor={`cisterna-${index}`} className="block text-gray-700">Cisterna {index + 1}:</label>
          <div className="flex">
            <input
              type="text"
              id={`cisterna-${index}`}
              value={cisterna.tamanio}
              onChange={(e) => {
                const newDatosCisterna = [...datosCisterna];
                newDatosCisterna[index].tamanio = e.target.value;
                setDatosCisterna(newDatosCisterna);
              }}
              className="border border-gray-300 rounded-md p-2 flex-grow mr-2"
            />
            {datosCisterna.length > 1 && (
              <button
                type="button"
                onClick={() => handleQuitarCisterna(index)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
              >
                Quitar
              </button>
            )}
          </div>
        </div>
      ))}
      {datosCisterna.length < 3 && (
        <button
          type="button"
          onClick={handleAgregarCisterna}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
        >
          Agregar Cisterna
        </button>
      )}
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
              <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default AgregarCamion