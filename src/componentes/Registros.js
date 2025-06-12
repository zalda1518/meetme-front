import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../estilos/Registros.css';
import HeaderUsuario from "./HeaderUsuario";
import HeaderAdmin from "./HeaderAdmin";
// import Map from "./Map";
import menu from '../includes/menu.png';
import MenuResponsiveUsuario from "./MenuResponsiveUsuario";
import MenuResponsiveAdmin from "./MenuResponsiveAdmin";

function Registros() {
   const { id } = useParams();
   const [datos, setDatos] = useState([]);
   const [rol, setRol] = useState('');
   const [estilo, setEstilo] = useState(false); //para que no se muestre la hamburguesa en version escritorio//
   const navigate = useNavigate();


   //para validar la sesion y buscar datos del usuario en sesion //
   useEffect(() => {
      async function fetchData() {

         if (!localStorage.getItem('sesion')) {
            navigate('/');
            return;

         } else {
           
            const res = await fetch(`http://localhost:4000/buscar/${id}`)   //https://meetme-production.up.railway.app/buscar/${id};

            if (!res.ok) {
               alert('no hay datos del usuario en la base de datos');
               return;
            }
            const response = await res.json();
            setDatos(response.registro);
            validarRol();
         }
      }
      fetchData();
   }, [id]);

   // para validar el rol del usuario //
   async function validarRol() {
      const res = await fetch('http://localhost:4000/getrol',               //https://meetme-production.up.railway.app/getrol
         {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "id_usuario": id })
         });

      if (!res.ok) {
         return false;
      } else {
         const response = await res.json();
         setRol(response.resultados.rol);

      }
   }

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

               {/*aca inicia la validacion de roles*/}
               {rol === 'administrador' ? <HeaderAdmin id={id} /> : <HeaderUsuario id={id} />}                        {/*el menu solo para version de escritorio*/}
               <div className={estilo ? 'menu-hamburgesa-activo' : 'menu-hamburgesa-oculto'} onClick={menuResponsive}>
                  {rol === 'administrador' ? <MenuResponsiveAdmin id={id} /> : <MenuResponsiveUsuario id={id} />}     {/*el menu solo para version de movil*/}
               </div>
               {/*aca termina validacionde roles y adicional se pintan los componentes para el menu responsive*/}

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

                  {/* <div className="item5-registros">
                     <Map datos={datos} />
                  </div> */}
               </div>

            </div> : navigate(`/crear/${id}`)}

      </>
   );
}

export default Registros;