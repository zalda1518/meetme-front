import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderAdmin from './HeaderAdmin';
import HeaderUsuario from './HeaderUsuario';
import MenuResponsiveAdmin from './MenuResponsiveAdmin';
import MenuResponsiveUsuario from './MenuResponsiveUsuario';
import '../estilos/Usuarios.css';
import menu from '../includes/menu.png';



function Usuarios() {
   const navigate = useNavigate();
   const { id } = useParams();
   const [datos, setDatos] = useState([]);
   const [rol, setRol] = useState('');
   const [estilo, setEstilo] = useState(false); //para que no se muestre la hamburguesa en version escritorio//

//------------------------------------------------------------------------------------------------------------

   //para validar la sesion y buscar datos del usuario en sesion //
   useEffect(() => {
      async function fetchData() {

         if (!localStorage.getItem('sesion')) {
            navigate('/');
            return;
         } else {
            const res = await fetch(`http://localhost:4000/usuarios`);   //https://meetme-production.up.railway.app/buscar/${id}
            if (!res.ok) {
               alert('no hay datos del usuario en la base de datos');
               return;
            }
            const response = await res.json();
            setDatos(response.registros);
            console.log(response.registros);
            validarRol();
         }
      }
      fetchData();
   }, [id]);

   //------------------------------------------------------------------------------
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

   //----------------------------------------------------------------------------------

  //fucion para mostrar el menu responsive//
  function menuResponsive() {
   setEstilo(!estilo);
}

   //-------------------------------------------------------------------------------------------//
   return (

      <>
         <div className='div-padre-usuarios'>
            <div className='titulo-principal-usuarios' onClick={menuResponsive} >
               <h2><img src={menu} className="icono-menu" />MEETME</h2>
            </div>

            {/*aca inicia la validacion de roles*/}
            {rol === 'administrador' ? <HeaderAdmin id={id} /> : <HeaderUsuario id={id} />}                        {/*el menu solo para version de escritorio*/}
               <div className={estilo ? 'menu-hamburgesa-activo' : 'menu-hamburgesa-oculto'} onClick={menuResponsive}>
                  {rol === 'administrador' ? <MenuResponsiveAdmin id={id} /> : <MenuResponsiveUsuario id={id} />}     {/*el menu solo para version de movil*/}
               </div>
               {/*aca termina validacionde roles y adicional se pintan los componentes para el menu responsive*/}

            <div className="div-tabla-usuarios">
               <table className="tabla-usuarios">
                  <thead className="thead-usuarios">
                     <tr className="tr-usuarios">
                        <th className="th-usuarios">ID USUARIO</th>
                        <th className="th-usuarios">CORREO</th>
                        <th className="th-usuarios">ROL</th>
                        <th className="th-usuarios"></th>
                        <th className="th-usuarios"></th>
                     </tr>
                  </thead>
                  <tbody>
                     {datos ? datos.map((item) => (
                        <tr key={item.id}>
                           <td className="td-usuarios">{item.id_usuario}</td>
                           <td className="td-usuarios">{item.correo}</td>
                           <td className="td-usuarios">{item.rol}</td>
                           <td className="td-usuarios"><a href={`/borrar/${item.id_mascota}`}>Borrar</a></td>
                           <td className="td-usuarios"><a href={`/editar/${item.id_mascota}`}>Editar</a></td>
                        </tr>
                     )) : alert('no hay datos registrados')}
                  </tbody>
               </table>

               <div className="div-total-usuarios">
                  <span>Total usuarios: </span>
                  <span>{datos.length}</span>
               </div>
            </div>



         </div>


      </>



      /* 

         <div className="div-padre-usuarioss">

            <div className='titulo-principal-usuarios' onClick={menuResponsive} >
               <h2 className="h2-icono-usuarios"><img src={menu} className="icono-menu" />MEETME</h2>
            </div>
            
             <HeaderAdmin id={id} /> 

            <div className="div-total-usuarioss">Total usuarios
               <h5>{datos.length}</h5>
            </div>
             
             <div className="otro-div">
                  <h5>otro div</h5>
             </div>
            
               <table className="tabla-usuarios">
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th>ID_USUARIO</th>
                        <th>CORREO</th>
                     </tr>
                  </thead>
                  <tbody>
                     {datos ? datos.map((item) => (
                        <tr key={item.id}>
                           <td>{item.id}</td>
                           <td>{item.id_usuario}</td>
                           <td>{item.correo}</td>
                           <td><a href={`/borrar/${item.id_mascota}`}>Borrar</a></td>
                           <td><a href={`/editar/${item.id_mascota}`}>Editar</a></td>
                        </tr>
                     )) : alert('no hay datos registrados')}
                  </tbody>
               </table> 
            
         </div> */

   )


}

export default Usuarios;


