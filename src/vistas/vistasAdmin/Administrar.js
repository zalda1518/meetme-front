import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../../estilos/Administrar.css';
import HeaderUsuario from "../HeaderUsuario";
import HeaderAdmin from "../HeaderAdmin";
import Map from "../Map";
import menu from '../../includes/menu.png';
import MenuResponsiveUsuario from "../MenuResponsiveUsuario";
import MenuResponsiveAdmin from "../MenuResponsiveAdmin";

function Administrar() {
   const { id } = useParams();
   const [allDatos, setAllDatos] = useState([]);
   const [rol, setRol] = useState('');
   const [estilo, setEstilo] = useState(false); //para que no se muestre la hamburguesa en version escritorio//
   const navigate = useNavigate();


   //para validar la sesion //
   useEffect(() => {
      if (!localStorage.getItem('sesion')) {
         navigate('/');
         return;
      } else {
         fetchData()
         validarRol();
      }
   }, []);


   //para buscar los datos //
   async function fetchData() {

      try {
         const res = await fetch('http://localhost:4000/registros'); //https://meetme-production.up.railway.app/registros
         if (!res.ok) {
            return alert('consulta no Realizada');
         }
         const response = await res.json();
         setAllDatos(response.resultados)
         //  console.log(response.resultados);
      } catch (error) {
         console.log(error)
      }
   }








   if (allDatos.length >= 1) {
      console.log(allDatos.length)

   }

   // para validar el rol del usuario //
   async function validarRol() {
      const res = await fetch('http://localhost:4000/getrol',  //https://meetme-production.up.railway.app/getrol
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
   //--------------------------------------------------------//
   return (
      <>
         <div className='div-padre-administrar'>
            <div className='titulo-principal-administrar' onClick={menuResponsive} >
               <h2><img src={menu} className="icono-menu" />MEETME</h2>
            </div>

            {/*aca inicia la validacon de roles*/}
            {rol === 'administrador' ? <HeaderAdmin id={id} /> : <HeaderUsuario id={id} />}                              {/*el menu solo para version de escritorio*/}
            <div className={estilo ? 'menu-hamburgesa-activo' : 'menu-hamburgesa-oculto'} onClick={menuResponsive}>
               {rol === 'administrador' ? <MenuResponsiveAdmin id={id} /> : <MenuResponsiveUsuario id={id} />}           {/*el menu solo para version de movil*/}
            </div>
            {/*aca termina validacionde roles y adicional se pintan los componentes para el menu responsive*/}

            <div className="div-tabla-administrar">
               <table className="tabla-administrar">
                  <thead className="thead-administrar">
                     <tr className="tr-administrar">
                        <th className="th-administrar">ID MASCOTA</th>
                        <th className="th-administrar">PUBLIC ID</th>
                        <th className="th-administrar">NOMBRES</th>
                        <th className="th-administrar">APELLIDOS</th>
                        <th className="th-administrar">CIUDAD</th>
                        <th className="th-administrar">DIRECCION</th>
                        <th className="th-administrar">TELEFONO</th>
                        <th className="th-administrar">NOMBRE MASCOTA</th>
                        <th className="th-administrar">TIPO ANIMAL</th>
                        <th className="th-administrar">GENERO MASCOTA</th>
                        <th className="th-administrar">RAZA</th>
                        <th className="th-administrar">EDAD</th>
                        <th className="th-administrar">BORRAR</th>
                        <th className="th-administrar">EDITAR</th>
                     </tr>
                  </thead>
                  <tbody>
                     {allDatos ? allDatos.map((item) => (
                        <tr key={item.publicID}>
                           <td className="td-administrar">{item.id_mascota}</td>
                           <td className="td-administrar">{item.publicID}</td>
                           <td className="td-administrar">{item.nombres}</td>
                           <td className="td-administrar">{item.apellidos}</td>
                           <td className="td-administrar">{item.ciudad}</td>
                           <td className="td-administrar">{item.direccion}</td>
                           <td className="td-administrar">{item.telefono}</td>
                           <td className="td-administrar">{item.nombre_mascota}</td>
                           <td className="td-administrar">{item.tipo_animal}</td>
                           <td className="td-administrar">{item.genero}</td>
                           <td className="td-administrar">{item.raza}</td>
                           <td className="td-administrar">{item.edad}</td>
                           <td className="td-administrar"><a href={`/borrar/${item.id_mascota}`}>Borrar</a></td>
                           <td className="td-administrar"><a href={`/editar/${item.id_mascota}`}>Editar</a></td>
                        </tr>
                     )) : alert('no hay datos registrados')}
                  </tbody>
               </table>
               <div className="div-total-usuarios">
                  <span>Total Mascotas: </span>
                  <span>{allDatos.length}</span>
               </div>
            </div>


         </div>


      </>
   );
}
export default Administrar;