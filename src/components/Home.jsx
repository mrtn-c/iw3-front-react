import React from 'react';
import { useState } from 'react';
import TabsButtons from './TabsButtons';
import OrderTableActions from './Tables/Order/OrderTableActions';
import CamionTableActions from './Tables/Camiones/CamionTableActions';
import ChoferTableActions from './Tables/Chofer/ChoferTableActions';
import ClienteTableActions from './Tables/Clientes/ClienteTableActions';
import ProductoTableActions from './Tables/Productos/ProductoTableActions';

const Home = () => {
  
  const [selectedButton, setSelectedButton] = useState(1);

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };
  
  const divStyle = {
    backgroundColor: '#f2f2f2', // Cambia este color por el que desees
    padding: '20px', // Añade un poco de espacio alrededor del contenido
  };
  return (
    <div >
    <TabsButtons 
    selectedButton={selectedButton}
    setSelectedButton={setSelectedButton}
    />

    {selectedButton === 1 && <OrderTableActions />}
    {selectedButton === 2 && <CamionTableActions />}
    {selectedButton === 3 && <ChoferTableActions />}
    {selectedButton === 4 && <ClienteTableActions />}
    {selectedButton === 5 && <ProductoTableActions />}

    </div>
  );
};

export default Home;
