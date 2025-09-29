
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from '../estilos/PublicIDMimascota.module.css';
import Map from "../temp/Map.js";
import { MascotaNoEncontrada, MascotaEncontrada } from '../includes/Alertas.js';

function PublicIDMimascota() {
   const { id } = useParams();
   const [datos, setDatos] = useState([]);
   const navigate = useNavigate();


   //para buscar los datos al endponit por medio de get //

   useEffect(() => {
      async function fetchData() {

         try {
            const res = await fetch(`https://meetme-back-production.up.railway.app/public/${id}`);  //https://meetme-back-production.up.railway.app/public/${id}

            if (!res.ok) {
                MascotaNoEncontrada();
               return navigate('/');
            }
            const response = await res.json();
            setDatos(response.resultados)
            MascotaEncontrada();
         } catch (error) {
            console.log(error)
         }
      }
      fetchData();
   }, [navigate,id])

   //-------------------------------------------------------------------------------------
   return (
      <>
         {datos.length >= 1 ?
            <div className={styles['div-padre-mi-mascota']}>
               <div className={styles['item1-titulo-principal-mi-mascota']}>
                  <h2>MEETME</h2>
               </div>

               <div className={styles["item2-mi-mascota"]}>

                  <div className={styles["div-imagen-mi-mascota"]}>
                     <img src={datos[0].foto_mascota} className={styles["img-mascota-mi-mascota"]} alt="not found" />
                     <span className={styles["titulos-dueño-mi-mascota"]} id="titulos-public-id">{datos[0].nombre_mascota}</span>
                     <span className={styles["titulos-dueño-mi-mascota"]} id="titulos-public-id"><h5>ID</h5> {datos[0].publicID}</span>
                     <a href="/" className={styles["titulos-dueño-mi-mascota"]} id="titulos-public-id">Iniciar Sesion</a>
                  </div>

                  <div className={styles["item2-hijo-mi-mascota"]}>
                     <h3>DATOS DE LA MASCOTA</h3>
                     <h5 className={styles["titulos-dueño-mi-mascota"]} >Me llamo</h5>
                     <span className={styles["titulos-dueño-mi-mascota"]} id="titulos">{datos[0].nombre_mascota}</span>
                     <h5 className={styles["titulos-dueño-mi-mascota"]} >Soy</h5>
                     <span className={styles["titulos-dueño-mi-mascota"]} id="titulos"> {datos[0].genero}</span>
                     <h5 className={styles["titulos-dueño-mi-mascota"]} >Mi Raza es</h5>
                     <span className={styles["titulos-dueño-mi-mascota"]} id="titulos"> {datos[0].raza}</span>
                     <h5 className={styles["titulos-dueño-mi-mascota"]} >Mi Edad</h5>
                     <span className={styles["titulos-dueño-mi-mascota"]} id="titulos">{datos[0].edad} años</span>
                     <h3  >DATOS DEL DUEÑO</h3>
                     <h5 className={styles["titulos-dueño-mi-mascota"]}>Nombres</h5>
                     <span className={styles["titulos-dueño-mi-mascota"]} id="titulos"> {datos[0].nombres}</span>
                     <h5 className={styles["titulos-dueño-mi-mascota"]} >Apellidos</h5>
                     <span className={styles["titulos-dueño-mi-mascota"]} id="titulos"> {datos[0].apellidos}</span>
                     <h5 className={styles["titulos-dueño-mi-mascota"]} >Ciudad</h5>
                     <span className={styles["titulos-dueño-mi-mascota"]} id="titulos"> {datos[0].ciudad}</span>
                     <h5 className={styles["titulos-dueño-mi-mascota"]} >Telefono</h5>
                     <span className={styles["titulos-dueño-mi-mascota"]} id="titulos">{datos[0].telefono}</span>
                  </div>
                    
                  <div className={styles["item5-mi-mascota"]}>
                     <Map datos={datos} />
                  </div>
               </div>

            </div> : navigate(`/`)}

      </>
   );
}

export default PublicIDMimascota;