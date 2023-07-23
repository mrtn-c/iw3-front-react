import { useState } from "react";
import LoginRegisterError from "../Error/LoginRegisterError";
import bcrypt from 'bcryptjs'


//TODO: no anda muy bien, hashea a veces. Desde el back a veces acepta devuelve 201 pero no lo crea nunca al usuario.

const Register = ({setRegister, register}) => {
    const [username, setUsername] = useState('');
    const [unhashedPassword, setUnhashedPassword] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const[error, setError] = useState(false)

    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }
      
    function handleUnhashedPasswordChange(event) {
        
        setUnhashedPassword(event.target.value);
        console.log(password)
    }

    function handleEmailChange(event){
        setEmail(event.target.value);
    }

    function alreadyRegistered(event){
      setRegister(false);
    }

    async function handleRegister(event) {
        event.preventDefault();

        if([username, unhashedPassword, email].includes('')){
            console.log("falta un campo...")
            setError(true);
            return;
        }
      
      
        try {
            const accountNonExpired = 1;
            const accountNonLocked = 1;
            const credentialsNonExpired = 1;
            const enabled = 1;
            try{
              setPassword(bcrypt.hashSync(unhashedPassword, 10));
            } catch (error){
              console.log(error)
            }
            
            console.log(typeof password)
            console.log(password)
            console.log( JSON.stringify({ username, password, email }))
            const response = await fetch(`http://mugiwaras.mooo.com/api/auth/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ accountNonExpired, accountNonLocked, credentialsNonExpired, enabled, email, username, password }),
          });
      
          if (response.status == 201) {
            console.log(response.status);
            setRegister(false);
          } else {
            console.log(JSON.stringify(response));
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
          <form onSubmit={handleRegister} className="bg-white shadow-md rounded-lg py-10 px-5 mt-20 transition-all">
                {
                    error && <LoginRegisterError>Complete todos los datos</LoginRegisterError> 

                }
            <div className="mb-5">
              <label className="block text-gray-700 uppercase font-bold">Email:</label>
              <input type="email" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={email} onChange={handleEmailChange} />
            </div>
            <div className="mb-5">
              <label className="block text-gray-700 uppercase font-bold">Usuario:</label>
              <input type="text" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={username} onChange={handleUsernameChange} />
            </div>

            <div className="mb-5">
              <label className="block text-gray-700 uppercase font-bold">Contraseña:</label>
              <input type="password" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={unhashedPassword} onChange={handleUnhashedPasswordChange} />
            </div>
            <button type="submit" onClick={handleRegister} 
            className="bg-blue-600 p-3 w-full text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer transition-all mb-5">
            Registrarse</button>
            <button type="button" onClick={alreadyRegistered} 
            className="bg-green-400 p-3 w-full text-white uppercase font-bold hover:bg-green-800 cursor-pointer transition-all mb-5">
            ¿Ya tenes un usuario?</button>
          </form>
        </div>
      );
}

export default Register