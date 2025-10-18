import styles from '../estilos/RecuperarClave.module.css';
import logometme from '../includes/logo-meetme.png';
import { useState } from 'react';
import {antesDeFetch, CorreoEnviado, CorreoNoRegistrado, CorreoVacio} from '../includes/Alertas.js';



function RecuperarClave() {

   const [data, setData] = useState({});
   const [user, setUser] = useState({
      correo: ""
   });

   function handleChange(e) {
      const { name, value } = e.target;
      setData({ [name]: value });
      setUser({ ...user, [name]: value });
   }

   //1. se ejecuta funcion para hacer fetch al backend
   async function recuperar(e) {
      e.preventDefault();

      //2.  se valida campo vacio
      if (!user.correo) {
         CorreoVacio();
         return;
      }
    //3.  se hace fetch 

      antesDeFetch();
      const res = await fetch('https://meetme-back-production.up.railway.app/recuperarclave ',      // https://meetme-back-production.up.railway.app/recuperarclave //
         {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
         }
      );

      if (!res.ok) {
         CorreoNoRegistrado();
         return;
      } else {
         CorreoEnviado();
      }
   }


   /* ----------------------------------------- */
   return (
      <div className={styles['login-padre']}>
         <div className={styles['login-box-1']}>
            <h2 className={styles['login-box-titulo']}>Recuperacion De Contraseña</h2>
            <p className={styles['login-box-parrafo']}>Ingresa el correo asociaciado</p>
            <input type='email' placeholder="Correo" name='correo' className={styles['login-box-input']} onChange={handleChange} />
            <button className={styles['login-box-btn-ingresar']} type='button' onClick={recuperar} >Recuperar</button> <br></br>
            <a href="/" className={styles['login-box-olvidar-clave']}>Iniciar Sesion</a>
         </div>

         <div className={styles['login-box-2']}>
            <div className={styles['login-box-logo']}>
               <img src={logometme} />
            </div>
         </div>

      </div>
   );
}

export default RecuperarClave;