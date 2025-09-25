import styles from '../estilos/RecuperarClave.module.css';
import logometme from '../includes/logo-meetme.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



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

   async function recuperar(e) {
      e.preventDefault();
      if (!user.correo) {
         alert('Escribe el correo para recuperar la clave')
         return;
      }

      const res = await fetch('http://localhost:4000/recuperarclave',
         {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(user)
         }
      );
      if(!res.ok){
         alert('Correo invalido')
         return;
      } else {
         alert('Se ha enviado el enlace de reuperacion al correo, recuerde mirar en SPAM o correo no deseado')
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
            <h3 className={styles['login-box-titulo-meetme']}>Conoce diferentes mascotas, y ayudalas a encontrar su hogar</h3>
            <div className={styles['login-box-logo']}>
               <img src={logometme} />
            </div>
         </div>

      </div>
   );
}

export default RecuperarClave;