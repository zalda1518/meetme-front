import styles from '../estilos/RecuperarClave.module.css';
import logometme from '../includes/logo-meetme.png';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ClaveVacia, ClaveNoCoincide, ErrorActualizarClave, ExitosoActualizarClave } from '../includes/Alertas';



function ResetPassword() {

   //1. se captura el token de la url
   const { token } = useParams();
   const navigate = useNavigate();

   const [data, setData] = useState({});
   const [clave, setClave] = useState({
      clave: "",
      confirmacion_clave: "",
   });

   //2. se capturan los inputs con la clave
   function handleChange(e) {
      const { name, value } = e.target;
      setData({ [name]: value });
      setClave({ ...clave, [name]: value });
   }

   //3. se ejecuta la funcion para  hacer fetch al backend
   async function reestablecer(e) {
      e.preventDefault();

      //4. para validar que no esten vacios los inputs
      if (!clave.clave || !clave.confirmacion_clave) {
         ClaveVacia();
         return 
      }

      //5. para validar que coincidan las contraseñas 
      if (clave.clave !== clave.confirmacion_clave) {
         ClaveNoCoincide();
         return 
         
      }

      //6. se hace fetch al backend
      const res = await fetch('https://meetme-back-production.up.railway.app/reestablecerClave',    // fetch al backend //
         {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'auth': token },
            body: JSON.stringify(clave)
         }
      );

      if (!res.ok) {
         ErrorActualizarClave();
         return;
      } else {
         ExitosoActualizarClave();
         navigate('/')
      }
   }


   /* ----------------------------------------- */
   return (
      <div className={styles['login-padre']}>
         <div className={styles['login-box-1']}>
            <h2 className={styles['login-box-titulo']}>Restablecer Clave</h2>
            <input type='text' placeholder="Clave" name='clave' className={styles['login-box-input']} onChange={handleChange} />
            <input type='text' placeholder="Confirme clave" name='confirmacion_clave' className={styles['login-box-input']} onChange={handleChange} />
            <button className={styles['login-box-btn-ingresar']} type='button' onClick={reestablecer} >Reestablecer</button> <br></br>
         </div>

         <div className={styles['login-box-2']}>
            <div className={styles['login-box-logo']}>
               <img src={logometme} />
            </div>
         </div>

      </div>
   );
}

export default ResetPassword;