import { useEffect, useState } from 'react';
import '../../estilos/CrearUsuario.css';
import { useNavigate } from 'react-router-dom';
import { Warning, Error, Success } from '../../includes/Alertas';
import HeaderAdmin from './HeaderAdmin';
import MenuResponsiveAdmin from './MenuResponsiveAdmin';
import menu from '../../includes/menu.png';


function CrearUsuario() {

   const token = localStorage.getItem('token');
   const id_usuario = localStorage.getItem('id_usuario');

   const navigate = useNavigate();
   const [estilo, setEstilo] = useState(false); //para que no se muestre la hamburguesa en version escritorio//
   const [data, setData] = useState({});
   const [user, setUser] = useState({
      id_usuario: crypto.randomUUID(),
      correo: "",
      clave: "",
      rol: ""
   });

   //-----------------------------------------------------------------------------------------   
   //para validar el rol del usuario//

   async function getRol() {

      const res = await fetch('https://meetme-back-production.up.railway.app/getrol',
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
   //-----------------------------------------------------------------------------------
   function handleDatos(e) {

      const { name, value } = e.target;
      setData({ name: value });
      setUser({ ...user, [name]: value })
   }


   //---------------------------------------------------------------------------------------------
   async function enviarDatos(e) {



      e.preventDefault();
      if (user.correo === '' || user.clave === '' || user.rol === '') {
         return alert('campos vacios');
      }


      try {

         const res = await fetch('https://meetme-back-production.up.railway.app/crearUsuario',
            {
               method: 'POST',
               headers: { 'Content-Type': 'application/json','auth':token, 'id_usuario':id_usuario },
               body: JSON.stringify(user)
            });
         if (!res.ok) {
            return alert('no se pudo crear el nuevo usuario')

         }

         alert('usuario creado')
         console.log(user);

      } catch (error) {
         alert('error')
         return;
      }

   }


   //------------------------------------------------------------------------------------------------------
   function menuResponsive() {
      setEstilo(!estilo);
   }
   //--------------------------------------------------------------------------------------------//
   return (
      <div className='div-padre-crear-usuario'>
         <div className='titulo-principal-crear-usuario' onClick={menuResponsive}>
            <h2 className='h2-icono-crear-usuario'><img src={menu} className="icono-menu" />MEETME</h2>
         </div>

         {/*aca inicia la validacion de roles*/}
         {<HeaderAdmin />}                        {/*el menu solo para version de escritorio*/}
         <div className={estilo ? 'menu-hamburgesa-activo' : 'menu-hamburgesa-oculto'} onClick={menuResponsive}>
            {<MenuResponsiveAdmin />}     {/*el menu solo para version de movil*/}
         </div>
         {/*aca termina validacionde roles y adicional se pintan los componentes para el menu responsive*/}


         <div className='div-crear-usuario'>
            <input placeholder="correo" name='correo' className="input-crear-usuario" onChange={handleDatos} />
            <input placeholder="clave" name='clave' className="input-crear-usuario" onChange={handleDatos} />
            <select placeholder="rol" name='rol' className="input-crear-usuario" onChange={handleDatos}>
               <option >Selectionar Rol ---</option>
               <option value="administrador">Administrador</option>
               <option value="usuario">Usuario</option>
            </select>
            <button className='input-crear-usuario' type='button' onClick={enviarDatos}>Crear usuario</button>
         </div>
      </div>
   );
}

export default CrearUsuario;