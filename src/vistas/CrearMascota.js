import '../estilos/Crear.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Warning, Error, Success, Cargando, Cargada, ErrorCargaImagen } from '../includes/Alertas.js';
import HeaderUsuario from '../vistas/HeaderUsuario.js';
import MenuResponsiveUsuario from '../vistas/MenuResponsiveUsuario.js';
import menu from '../includes/menu.png';




function CrearMascota() {

   const { id } = useParams();
   const navigate = useNavigate();
   const [rol, setRol] = useState('');
   const [imagenURL, setImagenURL] = useState('');
   const [loading, setLoading] = useState(false);
   const [imagen, setImagen] = useState([]);
   const [data, setData] = useState({});
   const [estilo, setEstilo] = useState(false); //para que no se muestre la hamburguesa en version escritorio//

   const token = localStorage.getItem('token');
   const id_usuario = localStorage.getItem('id_usuario');

   // para validar si existe user en sesion //

   //--------------------------------------------//
   



   // para validar el rol del usuario //
   async function getRol() {
       
      if(!token){
         alert('debes iniciar sesion primero');
         navigate('/forbiden'); 
         return;
      }

      const res = await fetch('https://meetme-back-production.up.railway.app/getrol',      //https://meetme-back-production.up.railway.app/getrol
         {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'auth': token, 'id_usuario': id_usuario },
         }
      );
      if (!res.ok) {
         alert('debes iniciar sesion primero');
         return navigate('/forbiden');
      } else {
         const response = await res.json();
         const rol = response.resultados.rol;


         /* if (rol === 'administrador') {
            navigate('/registrosadmin');
            return;
         } */
      }
   }
   getRol();
   //-----------------------------------------//

   //para crear los valores en un objeto //
   const [values, setValues] = useState({
      id_mascota: id,
      publicID: Math.floor(Math.random() * (10000 - 1)),
      nombres: "",
      apellidos: "",
      dueño_mascota: "",
      ciudad: "",
      direccion: "",
      telefono: "",
      nombre_mascota: "",
      genero: "",
      tipo_animal: "",
      raza: "",
      edad: "",
      foto_mascota: null
   });
   //---------------------------------------//

   //para cargar la imagen en cloudinary
   async function handleImagen(e) {

      const filee = e.target.files;
      const DATA = new FormData();
      DATA.append('file', filee[0]);
      DATA.append('upload_preset', 'meetme');   //hace referencia a la carpeta de cloudinary para subir imagenes

      setImagen(DATA);
      setLoading(true);

      try {
         const response = await fetch('https://api.cloudinary.com/v1_1/dhxxqo1gt/image/upload', {
            method: 'POST',
            body: DATA
         });

         const file = await response.json();
         const url = file.url
         setImagenURL(url);
         setLoading(false);
         Cargada();
         values.foto_mascota = url;
         console.log(values);

      } catch (error) {
         console.log(error);
         setLoading(false);
         ErrorCargaImagen();
      }
   }
   //------------------------------------------//

   //para capturar los inputs values//
   function handleDatos(e) {
      const { name, value } = e.target;
      setData({ [name]: value });
      setValues({ ...values, [name]: value });
   }

   //-----------------------------------------------------//

   //para enviar la logica al back //
   function enviarDatos(e) {
      e.preventDefault();
      if (values.nombres === "" || values.apellidos === "" || values.dueño_mascota === "" || values.ciudad === '' || values.direccion === "" || values.telefono === "" ||
         values.nombre_mascota === '' || values.genero === "" || values.tipo_animal === "" || values.raza === "" || values.edad === "" || values.foto_mascota === null) {
         Warning();
         console.log(values);
      } else {


         fetch('https://meetme-back-production.up.railway.app/crear',   //https://meetme-back-production.up.railway.app/crear'
            {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(values),
            }).then(response => {
               if (!response.ok) {
                  Error();
               } else {
                  Success(values);
                  navigate(`/registros/${id}`);
               }
            });
      }
   }

   function menuResponsive() {
      setEstilo(!estilo);
   }
   //---------------------------------------------------------//
return;
   //inicia el renderizado jsx//
   return (

      <>
         {loading ? Cargando() : (false)}  {/* alerta para cuando este cargando la imagen */}

         <form className='form-padre-crear'>
            <div className='titulo-principal-crear' onClick={menuResponsive}>
               <h2 className='h2-icono-crear'><img src={menu} className="icono-menu" />MEETME</h2>
            </div>

            {/*aca inicia la validacon de roles*/}
            {<HeaderUsuario />}                              {/*el menu solo para version de escritorio*/}
            <div className={estilo ? 'menu-hamburgesa-activo' : 'menu-hamburgesa-oculto'} onClick={menuResponsive}>
               {<MenuResponsiveUsuario />}           {/*el menu solo para version de movil*/}
            </div>
            {/*aca termina validacionde roles y adicional se pintan los componentes para el menu responsive*/}

            <div className='form-datos-dueño'>
               <h3 className='titulo-datos-dueño-crear'>DATOS DEL DUEÑO</h3>
               <input type="text" placeholder='Nombres' name='nombres' className='datos-dueño' onChange={handleDatos} />
               <input type="text" placeholder='Apellidos' name='apellidos' className='datos-dueño' onChange={handleDatos} />
               <input type="text" placeholder='Dueño de la Mascota' name='dueño_mascota' className='datos-dueño' onChange={handleDatos} />
               <input type="text" placeholder='ciudad' name='ciudad' className='datos-dueño' onChange={handleDatos} />
               <input type="text" placeholder='Direccion' name='direccion' className='datos-dueño' onChange={handleDatos} />
               <input type="number" placeholder='Telefono' name='telefono' className='datos-dueño' onChange={handleDatos} />
            </div>

            <div className='form-datos-mascota'>
               <h3 className='titulo-datos-mascota-crear'>DATOS DE LA MASCOTA</h3>
               <input type="text" placeholder='Nombre de la Mascota' name='nombre_mascota' className='datos-mascota' onChange={handleDatos} />
               <input type="text" placeholder='Genero' name='genero' className='datos-mascota' onChange={handleDatos} />
               <input type="text" placeholder='Tipo de animal' name='tipo_animal' className='datos-mascota' onChange={handleDatos} />
               <input type="text" placeholder='Raza' name='raza' className='datos-mascota' onChange={handleDatos} />
               <input type="number" placeholder='Edad en años' name='edad' className='datos-mascota' onChange={handleDatos} />
               <h3 className='titulo-foto-mascota'>Adjunte la Foto de la mascota</h3>
               <input type="file" accept='image/*' name='foto_mascota' className='input-foto-mascota' onChange={handleImagen} />
               <button className='boton-crear' onClick={enviarDatos} type='button'>Crear</button>
            </div>
         </form>

      </>

   );

}
export default CrearMascota;