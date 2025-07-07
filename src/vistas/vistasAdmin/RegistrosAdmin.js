import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../estilos/Registros.css';
import HeaderAdmin from "../vistasAdmin/HeaderAdmin";
import menu from '../../includes/menu.png';
import MenuResponsiveAdmin from "../vistasAdmin/MenuResponsiveAdmin";
//------------------------------------------------------------------//

function RegistrosAdmin() {
   const [datos, setDatos] = useState([]);
   const [estilo, setEstilo] = useState(false); //para que no se muestre la hamburguesa en version escritorio//
   const navigate = useNavigate();

   const token = localStorage.getItem('token');
   const id_usuario = localStorage.getItem('id_usuario');


   //para validar el rol del usuario//

   async function getRol() {

      const res = await fetch('http://localhost:4000/getrol',
         {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'auth': token, 'id_usuario': id_usuario },
         }
      );
      if (!res.ok) {
         alert('debes iniciar sesion primero y ser administrador');
         return navigate('/forbiden');
         
      } else {
         const response = await res.json();
         const rol = response.resultados.rol;


         if (rol !== 'administrador') {
            alert('no eres admin');
            navigate('/registros');
            return;

         }
      }
   }
   getRol();

   //para validar la sesion y buscar datos del usuario en sesion //
   useEffect(() => {
      async function fetchData() {

         if (!token) {
            navigate('/');
            return;

         } else {

            const res = await fetch('http://localhost:4000/registros',
               {
                  method: 'GET',
                  headers: { 'Content-Type': 'application/json', 'auth': token }
               });

            if (!res.ok) {
               alert('algo salio mal en el backend');
                return navigate('/forbiden');
               
            }
            const response = await res.json();
            console.log(response.resultados);
            setDatos(response.resultados);
         }
      }
      fetchData();

   }, []);




   //fucion para mostrar el menu responsive//
   function menuResponsive() {
      setEstilo(!estilo);
   }



   //-------------------------------------------------------------------------------------
   return (

      <>
         {datos.length >= 1 ?
            <div className='div-padre-registros'>
               <div className='item1-titulo-principal-registros' onClick={menuResponsive} >
                  <h2 className="h2-icono-registros"><img src={menu} className="icono-menu" />MEETME</h2>
               </div>

               <HeaderAdmin /> {/*el menu solo para version de escritorio*/}
               <div className={estilo ? 'menu-hamburgesa-activo' : 'menu-hamburgesa-oculto'} onClick={menuResponsive}>
                  {<MenuResponsiveAdmin />}     {/*el menu solo para version de movil*/}
               </div>
               {/*--------------------------------------------------------------------------------*/}

               <div className="item2-registros">
                  <div className="div-imagen-registros">
                     <img src={datos[0].foto_mascota} className="img-mascota-registros" />
                     <span className="titulos-dueño-registros" id="titulos-public-id"> {datos[0].nombre_mascota}</span>
                     <span className="titulos-dueño-registros" id="titulos-public-id">ID {datos[0].publicID}</span>
                  </div>

                  <div className="item2-hijo-registros">
                     <h3 className="titulo-datos-mascota-registros">DATOS DE LA MASCOTA</h3>
                     <span className="titulos-dueño-registros" id="titulos"><h5>Me llamo</h5>{datos[0].nombre_mascota}</span>
                     <span className="titulos-dueño-registros" id="titulos"><h5>Soy</h5>{datos[0].genero}</span>
                     <span className="titulos-dueño-registros" id="titulos"><h5>Mi Raza</h5>{datos[0].raza}</span>
                     <span className="titulos-dueño-registros" id="titulos"><h5>Mi Edad</h5>{datos[0].edad} años</span>
                     <h3 className="titulo-datos-dueño-registros">DATOS DEL DUEÑO</h3>
                     <span className="titulos-dueño-registros" id="titulos"><h5>Nombres</h5>{datos[0].nombres}</span>
                     <span className="titulos-dueño-registros" id="titulos"><h5>Apellidos</h5>{datos[0].apellidos}</span>
                     <span className="titulos-dueño-registros" id="titulos"><h5>Ciudad</h5>{datos[0].ciudad}</span>
                     <span className="titulos-dueño-registros" id="titulos"><h5>Direccion</h5>{datos[0].direccion}</span>
                     <span className="titulos-dueño-registros" id="titulos"><h5>Telefono</h5>{datos[0].telefono}</span>
                  </div>
               </div>

            </div> : <div>
               <span>aun no tienes mascotas registradas </span>
               <a href="/crear"> registrar mascota</a>
            </div>}

      </>

   );
}

export default RegistrosAdmin;