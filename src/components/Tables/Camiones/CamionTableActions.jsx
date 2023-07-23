import React from 'react'

const CamionTableActions = () => {
    return (
        <div className="flex items-center justify-between mt-8">
        <div>
          <button className="py-2 px-4 rounded text-white font-semibold transition-all bg-green-400 hover:bg-green-700 ">
            Agregar
          </button>
          <button className="py-2 px-4 rounded text-white font-semibold ml-2 transition-all bg-red-400 hover:bg-red-700">
            Eliminar
          </button>
        </div>
        <h1 className=" mr-40 text-2xl font-semibold">Camiones</h1>
        <div>
          <button className="py-2 px-4 rounded text-white font-semibold ml-2 transition-all bg-blue-500 hover:bg-blue-600">
            Cambiar Estado
          </button>
        </div>
      </div>
      )
    }

export default CamionTableActions