import React, { useEffect, useState } from 'react'
import Login from './Login';
import Register from './Register';

const LoginRegister = () => {
  
  const [register, setRegister] = useState(false);

  useEffect(() => {
    console.log(register);
  }, [register])
  
  
  return (
    <>
      {register ? 
      <Register
      setRegister={setRegister}
      register={register}
      /> 
      : 
      <Login
      setRegister={setRegister}
      register={register}
      />
      }
    </>
  )
}

export default LoginRegister