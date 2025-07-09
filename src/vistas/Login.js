import '../estilos/Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BuscarID from './BuscarID.js';
import { Warning, ErrorUsuario, Bienvenido } from '../includes/Alertas.js';
import ValidarRol from '../controlador/Controlador.js';
import logometme from '../includes/logo-meetme.png';


function Login() {               //inicia el componente//

   const navigate = new useNavigate();
   const [data, setData] = useState({});
   const [user, setUser] = useState({
      correo: "",
      clave: ""
   });

   function handleChange(e) {
      const { name, value } = e.target;
      setData({ [name]: value });
      setUser({ ...user, [name]: value });
   }

//----------------------------------------------------------------------------------------------------
   async function ingresar(e) {
      e.preventDefault();
      if (user.correo === '' || user.clave === '') {
         Warning();
         return;
      }

      const res = await fetch('http://localhost:4000/login',  //https://meetme-production.up.railway.app/login
         {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
         });

      if (!res.ok) {
         ErrorUsuario();
         return;

      } else {
         const response = await res.json();
         localStorage.setItem('token', response.token);
         localStorage.setItem('id_usuario', response.id_usuario);
         Bienvenido();

         ValidarRol(navigate); //controlador validar rol
      }

   }
   //------------------------------------------------------------------------------------------//
   return (
      <div className='login-padre'>
         <div className='login-box-1'>
            <h2 className='login-box-titulo'>Iniciar sesion</h2>
            <p className='login-box-parrafo'>Ingresa a Meetme</p>
            <input type='email' placeholder="Correo" name='correo' className='login-box-input' onChange={handleChange} />
            <input type='text' placeholder="Contraseña" name='clave' className='login-box-input' onChange={handleChange} />
            <button className='login-box-btn-ingresar' type='button' onClick={ingresar}>Ingresar</button>



            <div className="extra-links">
               <a href="#" className='login-box-olvidar-clave'>¿Olvidaste tu contraseña?</a>
               <a href="#" className='login-box-crear-cuenta'>Crear cuenta</a>
            </div>
         </div>

         <div className='login-box-2'>
            <h3 className='login-box-titulo-meetme'>Conoce diferentes mascotas, y ayudalas a encontrar su hogar</h3>
            <BuscarID />
           
            <div className='login-box-logo'>
               <img src={logometme} />
            </div>
         </div>

      </div>
   );
}

export default Login;