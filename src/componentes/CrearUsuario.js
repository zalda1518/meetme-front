import '../estilos/CrearUsuario.css';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Warning, Error, Success } from '../includes/Alertas';
import HeaderAdmin from './HeaderAdmin';
import HeaderUsuario from './HeaderUsuario';
import MenuResponsiveAdmin from './MenuResponsiveAdmin';
import MenuResponsiveUsuario from './MenuResponsiveUsuario';
import menu from '../includes/menu.png';
import { useEffect, useState } from 'react';

function CrearUsuario() {

   const { id } = useParams();
   const [rol, setRol] = useState('');
   const [estilo, setEstilo] = useState(false); //para que no se muestre la hamburguesa en version escritorio//
   const [data, setData] = useState({});
   const [user, setUser] = useState({
      id_usuario: crypto.randomUUID(),
      correo: "",
      clave: "",
      rol: ""
   });

   //-----------------------------------------------------------------------------------------   
   useEffect(() => {
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
      validarRol();


   }, [])
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
        
      const res = await fetch('http://localhost:4000/crearUsuario',   //'https://meetme-production.up.railway.app/crearUsuario'
         {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
         });
      if (!res.ok) {
         return alert('no se pudo crear el nuevo usuario')
      }
          alert('usuario creado');
          window.location.reload();
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
         {rol === 'administrador' ? <HeaderAdmin id={id} /> : <HeaderUsuario id={id} />}                        {/*el menu solo para version de escritorio*/}
         <div className={estilo ? 'menu-hamburgesa-activo' : 'menu-hamburgesa-oculto'} onClick={menuResponsive}>
            {rol === 'administrador' ? <MenuResponsiveAdmin id={id} /> : <MenuResponsiveUsuario id={id} />}     {/*el menu solo para version de movil*/}
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