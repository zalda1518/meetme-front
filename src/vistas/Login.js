import '../estilos/Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  BuscarID  from './BuscarID.js';
import { Warning, ErrorUsuario, Bienvenido } from '../includes/Alertas.js';


function Login() {               //inicia el componente//

   const navigate = new useNavigate();
   const [data, setData] = useState({});
   const [user, setUser] = useState({
      correo: "",
      clave: ""
   });

   function handleChange(e) {
      const { name, value } = e.target;
      setData({ name: value });
      setUser({ ...user, [name]: value });
   }

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
        //  console.log(response);
          Bienvenido();
        
         localStorage.setItem('token', response.token);
         localStorage.setItem('id_usuario', response.id_usuario);
         navigate('/registros');
      }

   }
   return (
      <div className='login-padre'>
         <div className='div-padre-login'>
            <h3 className='titulo-iniciar-sesion-login'>Iniciar sesion</h3>
            <input type='email' placeholder="Correo" name='correo'  className='login-input' onChange={handleChange} />
            <input type='text' placeholder="Contraseña" name='clave' className='login-input' onChange={handleChange} />
            <button className='btn-ingresar-login' type='button' onClick={ingresar}>Ingresar</button>
         </div>
         <div className='div-imagen-login'>
            <img className='img-logo-login' src='https://res.cloudinary.com/dhxxqo1gt/image/upload/v1743382114/Meetme_Logo_xowgmd.png' alt='not-found' />
            <h3 className='titulo-meetme-login'>Conoce diferentes mascotas, y ayudalas a encontrar su hogar</h3>
            <BuscarID />
         </div>
         
      </div>
   );
}

export default Login;