import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../estilos/Registros.module.css";
import HeaderUsuario from "./HeaderUsuario.js";
import menu from '../includes/menu.png';
import MenuResponsiveUsuario from "./MenuResponsiveUsuario";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

//------------------------------------------------------------------//

function Registros() {
   const [datos, setDatos] = useState([]);
   const [estilo, setEstilo] = useState(false); //para que no se muestre la hamburguesa en version escritorio//
   const [location, setLocation] = useState(null)
   const navigate = useNavigate();
   const token = localStorage.getItem('token');
   const id_usuario = localStorage.getItem('id_usuario');

   /* mostrar ubicacion */



   /* mostrar ubicacion */

   //para validar el rol del usuario//

   useEffect(() => {
      if (!token) {
         alert('debes iniciar sesion primero');
         navigate('/forbiden');
         return;
      }
   }, [token, navigate]);

   async function getRol() {


      const res = await fetch('https://meetme-back-production.up.railway.app/getrol',  //https://meetme-back-production.up.railway.app/getrol
         {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'auth': token, 'id_usuario': id_usuario },
         }
      );
      if (!res.ok) {
         alert('debes iniciar sesion primero');
         navigate('/forbiden');
         return;
      } else {
         const response = await res.json();
         const rol = response.resultados.rol;


         if (rol === 'administrador') {
            navigate('/registrosadmin');
            return;
         }
      }
   }
   getRol();


   //para validar la sesion y buscar datos del usuario en sesion //
   useEffect(() => {
      async function fetchData() {

         const res = await fetch('https://meetme-back-production.up.railway.app/registros', //https://meetme-back-production.up.railway.app/registros
            {
               method: 'GET',
               headers: { 'Content-Type': 'application/json', 'auth': token }
            });

         if (!res.ok) {
            alert('algo salio mal en el backend');
            navigate('/forbiden');
            return;
         }
         const response = await res.json();
         setDatos(response.resultados);

         console.log(datos)

      }
      fetchData();

   }, [token, navigate]);

   /* cerrar animacion cuando la respuesta sea exitosa */
   if (datos.length) {
      document.getElementById('preloader').style.display = 'none';
   }
   /* cerrar animacion cuando la respuesta sea exitosa */



   //fucion para mostrar el menu responsive//
   function menuResponsive() {
      setEstilo(!estilo);

   }



   //-------------------------------------------------------------------------------------
   return (

      <>
         {/*   <!-- Preloader --> */}
         <div id="preloader" className={styles['preloader']}>
            <div className={styles["spinner"]}></div>
            <h3> Cargando...</h3>
         </div>
         {/*   <!-- Preloader --> */}

         {datos.length >= 1 ?
            <div className={styles['div-padre-registros']}>
               <div className={styles['item1-titulo-principal-registros']} onClick={menuResponsive} >
                  <h2 className={styles["h2-icono-registros"]}>MEETME</h2>
                  <img src={menu} className={styles["icono-menu"]} alt="not found" />
               </div>

               {/*--------------------------------------------------------------------------------*/}
               <HeaderUsuario /> {/*el menu solo para version de escritorio*/}
               <div className={estilo ? styles['menu-hamburgesa-activo'] : styles['menu-hamburgesa-oculto']} onClick={menuResponsive}>
                  {<MenuResponsiveUsuario />}     {/*el menu solo para version de movil*/}
               </div>
               {/*--------------------------------------------------------------------------------*/}

               <div className={styles["item2-registros"]}>
                  <div className={styles["div-imagen-registros"]}>
                     <div className={styles["div-foto-perfil"]}>
                        <img src={datos[0].foto_mascota} className={styles["img-mascota-registros"]} alt="foto de perfil" />
                     </div>
                     <span id="titulos-public-id" className={styles['titulos-public-id']}> {datos[0].nombre_mascota}</span>
                     <span id="titulos-public-id" className={styles['titulos-public-id']}>ID {datos[0].publicID}</span>
                  </div>

                  <div className={styles["item2-hijo-registros"]}>
                     <div>
                        <h3 className={styles["titulo-datos-mascota-registros"]}>DATOS DE LA MASCOTA</h3>
                        <h5 className={styles["titulos-dueño-registros"]}>Me llamo</h5>
                        <span className={styles["titulos-dueño-registros"]} id="titulos">{datos[0].nombre_mascota}</span>
                        <h5 className={styles["titulos-dueño-registros"]}>Soy</h5>
                        <span className={styles["titulos-dueño-registros"]} id="titulos">{datos[0].genero}</span>
                        <h5 className={styles["titulos-dueño-registros"]}>Mi Raza</h5>
                        <span className={styles["titulos-dueño-registros"]} id="titulos">{datos[0].raza}</span>
                        <h5 className={styles["titulos-dueño-registros"]}>Mi Edad</h5>
                        <span className={styles["titulos-dueño-registros"]} id="titulos">{datos[0].edad} años</span>
                     </div>
                     <div>
                        <h3 className={styles["titulo-datos-mascota-registros"]}>DATOS DEL DUEÑO</h3>
                        <h5 className={styles["titulos-dueño-registros"]}>Nombres</h5>
                        <span className={styles["titulos-dueño-registros"]} id="titulos">{datos[0].nombres}</span>
                        <h5 className={styles["titulos-dueño-registros"]}>Apellidos</h5>
                        <span className={styles["titulos-dueño-registros"]} id="titulos">{datos[0].apellidos}</span>
                        <h5 className={styles["titulos-dueño-registros"]}>Ciudad</h5>
                        <span className={styles["titulos-dueño-registros"]} id="titulos">{datos[0].ciudad}</span>
                        <h5 className={styles["titulos-dueño-registros"]}>Telefono</h5>
                        <span className={styles["titulos-dueño-registros"]} id="titulos">{datos[0].telefono}</span>
                     </div>
                  </div>
               </div>

            </div> : <div>
               <h3>aun no tienes mascotas registradas </h3>
               <a href="/crearMascota"> registrar mascota</a>
            </div>}

      </>

   );
}

export default Registros;