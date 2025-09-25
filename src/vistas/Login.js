import styles from '../estilos/Login.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BuscarID from './BuscarID.js';
import { Warning, ErrorUsuario, Bienvenido } from '../includes/Alertas.js';
import ValidarRol from '../controlador/Controlador.js';
import logometme from '../includes/logo-meetme.png';
import show from '../includes/mostrar-password.png';


function Login() {               //inicia el componente//

   const navigate = new useNavigate();
   const[isPass, setIsPass] = useState(true);
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

      const res = await fetch('https://meetme-back-production.up.railway.app/login', //  https://meetme-back-production.up.railway.app/login
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
   /* mostrar contraseña */



   /* mostrar contraseña */
   //------------------------------------------------------------------------------------------//
   return (
      <div className={styles['login-padre']}>
         <div className={styles['login-box-1']}>
            <h2 className={styles['login-box-titulo']}>Iniciar sesion</h2>
            <p className={styles['login-box-parrafo']}>Ingresa a Meetme</p>

            <input type='email' placeholder="Correo" name='correo' className={styles['login-box-input']} onChange={handleChange} />

            <div className={styles['div-input-password']} >
               <input type={isPass ? 'password' : 'text'} placeholder="Contraseña" name='clave' className={styles['login-box-input-password']} onChange={handleChange} />
               <button>
                  <img src={show} className={styles['show']} onClick={()=> setIsPass(!isPass)} />
               </button>
            </div>


            <button className={styles['login-box-btn-ingresar']} type='button' onClick={ingresar}>Ingresar</button>



            <div className={styles["extra-links"]}>
               <a href="recuperarclave" className={styles['login-box-olvidar-clave']}>¿Olvidaste tu contraseña?</a>
               {/* <a href="#" className={styles['login-box-crear-cuenta']}>Crear cuenta</a> */}
            </div>
         </div>

         <div className={styles['login-box-2']}>
            <h3 className={styles['login-box-titulo-meetme']}>Conoce diferentes mascotas, y ayudalas a encontrar su hogar</h3>
            <BuscarID />

            <div className={styles['login-box-logo']}>
               <img src={logometme} />
            </div>
         </div>

      </div>
   );
}

export default Login;