import {useState} from 'react';
import { Navigate } from 'react-router-dom';
import LoginError from './Error/LoginError.jsx'

const Login = () => {
  
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const[error, setError] = useState(false)

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }
      
    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    async function handleLogin() {
        event.preventDefault();
      
      
        try {
            console.log( JSON.stringify({ username, password }))
            const response = await fetch(`http://mugiwaras.mooo.com/api/auth/login?username=${username}&password=${password}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });
      
          if (response.ok) {
            console.log("OK");
            const token = await response.text();
            localStorage.setItem('token', token);
            setIsLoggedIn(true);
          } else {
            setError(true);
          }
        } catch (error) {
            console.log(error)
          // Manejar errores de la solicitud
        }
      }

      if(isLoggedIn){
        return <Navigate to="/home" />
      }

    
      return (
        <div>
          <h1 className="font-black text-3xl text-center ">Mugiwaras camiones y productos</h1>
          <form onSubmit={handleLogin} className="bg-white shadow-md rounded-lg py-10 px-5 mt-20 transition-all">
                {
                    error && <LoginError>Usuario O Contraseña Incorrecto</LoginError> 

                }
            <div className="mb-5">
              <label className="block text-gray-700 uppercase font-bold">Usuario:</label>
              <input type="text" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={username} onChange={handleUsernameChange} />
            </div>

            <div className="mb-5">
              <label className="block text-gray-700 uppercase font-bold">Contraseña:</label>
              <input type="password" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={password} onChange={handlePasswordChange} />
            </div>
            <button type="submit" onClick={handleLogin} 
            className="bg-indigo-600 p-3 w-full text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer transition-all mb-10">
            Iniciar sesión</button>
          </form>
        </div>
      );
}

export default Login