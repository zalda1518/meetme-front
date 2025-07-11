
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../estilos/PublicIDMimascota.css';
import Map from "./Map.js";
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
            <div className='div-padre-mi-mascota'>
               <div className='item1-titulo-principal-mi-mascota'>
                  <h2>MEETME</h2>
               </div>

               <div className="item2-mi-mascota">

                  <div className="div-imagen-mi-mascota">
                     <img src={datos[0].foto_mascota} className="img-mascota-mi-mascota" alt="not found" />
                     <span className="titulos-dueño-mi-mascota" id="titulos-public-id">{datos[0].nombre_mascota}</span>
                     <span className="titulos-dueño-mi-mascota" id="titulos-public-id"><h5>ID</h5> {datos[0].publicID}</span>
                     <a href="/" className="titulos-dueño-mi-mascota" id="titulos-public-id">Iniciar Sesion</a>
                  </div>

                  <div className="item2-hijo-mi-mascota">
                     <h3>DATOS DE LA MASCOTA</h3>
                     <span className="titulos-dueño-mi-mascota" id="titulos"><h5>Me llamo</h5>{datos[0].nombre_mascota}</span>
                     <span className="titulos-dueño-mi-mascota" id="titulos"><h5>Soy</h5> {datos[0].genero}</span>
                     <span className="titulos-dueño-mi-mascota" id="titulos"><h5>Mi Raza es</h5> {datos[0].raza}</span>
                     <span className="titulos-dueño-mi-mascota" id="titulos"><h5>Mi Edad</h5>{datos[0].edad} años</span>
                     <h3>DATOS DEL DUEÑO</h3>
                     <span className="titulos-dueño-mi-mascota" id="titulos"><h5>Nombres</h5> {datos[0].nombres}</span>
                     <span className="titulos-dueño-mi-mascota" id="titulos"><h5>Apellidos</h5> {datos[0].apellidos}</span>
                     <span className="titulos-dueño-mi-mascota" id="titulos"><h5>Ciudad</h5> {datos[0].ciudad}</span>
                     <span className="titulos-dueño-mi-mascota" id="titulos"><h5>Telefono</h5>{datos[0].telefono}</span>
                  </div>
                    
                  <div className="item5-mi-mascota">
                     <Map datos={datos} />
                  </div>
               </div>

            </div> : navigate(`/`)}

      </>
   );
}

export default PublicIDMimascota;