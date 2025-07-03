import { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../estilos/Perfil.css';
import menu from '../includes/menu.png';
import HeaderUsuario from "./HeaderUsuario.js";
import HeaderAdmin from "./HeaderAdmin.js";
import MenuResponsiveAdmin from './MenuResponsiveAdmin.js'
import MenuResponsiveUsuario from './MenuResponsiveUsuario.js'
import { Warning, Error, Success, Cargando, Cargada, ErrorCargaImagen, SuccessUpdate } from '../includes/Alertas.js';

function Perfil() {


  const navigate = useNavigate();
  const [estilo, setEstilo] = useState(false); //para que no se muestre la hamburguesa en version escritorio//
  const [datos, setDatos] = useState([]);
  const [imagen, setImagen] = useState([]);
  const [imagenURL, setImagenURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [rol, setRol] = useState('');


  const token = localStorage.getItem('token');
  const id_usuario = localStorage.getItem('id_usuario');


  // para validar el rol del usuario //
  async function getRol() {

    const res = await fetch('http://localhost:4000/getrol',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'auth': token, 'id_usuario': id_usuario },
      }
    );
    if (!res.ok) {
      alert('debes iniciar sesion primero');
         return;
    } else {
      const response = await res.json();
      const rol = response.resultados.rol;


      if (rol === 'administrador') {
        navigate('/perfilAdmin');
        return;
      }

    }

  }
  getRol();

  // para validar si existe user en sesion //
  useEffect(() => {

    async function fetchData() {

      if (!token) {
        navigate('/')
        return;
      }

      try {
        const res = await fetch(`http://localhost:4000/buscar`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'auth': token, 'id_usuario': id_usuario }
          });

        if (!res.ok) {
          navigate(`/crear`)
        }
        const response = await res.json();
        console.log(response.resultados[0].nombres);
        setDatos(response.resultados[0]);

      }
      catch (error) {
        console.log(error)
      }
    }
    fetchData();

  }, []);
  //----------------------------------------//

  //para actualizar la foto //
  async function ActualizarImagen(e) {
    const filee = e.target.files;
    const DATA = new FormData();
    DATA.append('file', filee[0]);
    DATA.append('upload_preset', 'meetme');
    setImagen(DATA);
    setLoading(true);

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dhxxqo1gt/image/upload',
        {
          method: 'POST',
          body: DATA
        });
      const file = await response.json();
      const url = file.url;
      setImagenURL(url);
      setLoading(false);
      Cargada();
      datos.foto_mascota = url

    } catch (error) {
      setLoading(false);
      ErrorCargaImagen();
    }

  }
  //----------------------------------------------------//

  //capturar datos de los inputs //

  function handleChange(e) {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });

  }
  //---------------------------------------------------------//

  //para actualizar todos los datos //
  async function Update(e) {

    e.preventDefault();
    const res = await fetch('http://localhost:4000/actualizar',         //  https://meetme-production.up.railway.app/actualizar
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });
    if (!res.ok) {
      return alert('error al actualizar');
    } else {
      SuccessUpdate(datos);
    }
  }


  //fucion para mostrar el menu responsive//
  function menuResponsive() {
    setEstilo(!estilo);
  }


  //--------------------------------------------------------------------//
  return (
    <>
      {loading ? Cargando() : false}

      {datos.nombres ?
        <div className='div-padre'>
          <div className='item1-titulo-principal' onClick={menuResponsive}>
            <h2><img src={menu} className="icono-menu" />MEETME</h2>
          </div>

          {/*--------------------------------------------------------------------------------*/}
          <HeaderUsuario /> {/*el menu solo para version de escritorio*/}
          <div className={estilo ? 'menu-hamburgesa-activo' : 'menu-hamburgesa-oculto'} onClick={menuResponsive}>
            {<MenuResponsiveUsuario />}     {/*el menu solo para version de movil*/}
          </div>
          {/*--------------------------------------------------------------------------------*/}



          <div className="item3">
            <h3 className="titulo-datos-dueño-perfil">TUS DATOS REGISTRADOS</h3>
            <span className="titulos-div1"><h5>Nombres</h5>{datos.nombres}</span>
            <span className="titulos-div1"><h5>Apellidos</h5>{datos.apellidos}</span>
            <span className="titulos-div1"><h5>Ciudad</h5> {datos.ciudad}</span>
            <span className="titulos-div1"><h5>Direccion</h5>{datos.direccion}</span>
            <span className="titulos-div1"><h5>Telefono</h5>{datos.telefono}</span>
            <span className="titulos-div1"><h5>Nombre de la mascota</h5>{datos.nombre_mascota}</span>
            <span className="titulos-div1"><h5>Genero</h5>{datos.genero}</span>
            <span className="titulos-div1"><h5>Tipo de Animal</h5> {datos.tipo_animal}</span>
            <span className="titulos-div1"><h5>Raza</h5> {datos.raza}</span>
            <span className="titulos-div1"><h5>Edad</h5> {datos.edad}</span>
          </div>

          <form className="item4">
            <h3 id="titulo-datos-dueño-perfil">ACTUALIZA LOS DATOS DE TU PERFIL</h3>
            <div className="div-imagen"><img src={datos.foto_mascota} className="titulos-div2" id="img-mascota" /></div>
            <div className="div-inputs">
              <input className="titulos-div2" name="nombres" value={datos.nombres} onChange={handleChange} placeholder="Nombres" />
              <input className="titulos-div2" name="apellidos" value={datos.apellidos} onChange={handleChange} placeholder="Apellidos" />
              <input className="titulos-div2" name="ciudad" value={datos.ciudad} onChange={handleChange} placeholder="Ciudad" />
              <input className="titulos-div2" name="direccion" value={datos.direccion} onChange={handleChange} placeholder="Direccion" />
              <input type="number" className="titulos-div2" name="telefono" value={datos.telefono} onChange={handleChange} placeholder="Telefono" />
              <input className="titulos-div2" name="nombre_mascota" value={datos.nombre_mascota} onChange={handleChange} placeholder="Nombre de la mascota" />
              <input className="titulos-div2" name="genero" value={datos.genero} onChange={handleChange} placeholder="Genero" />
              <input className="titulos-div2" name="tipo_animal" value={datos.tipo_animal} onChange={handleChange} placeholder="Tipo animal" />
              <input className="titulos-div2" name="raza" value={datos.raza} onChange={handleChange} placeholder="Raza" />
              <input type="number" className="titulos-div2" name="edad" value={datos.edad} onChange={handleChange} placeholder="Edad" />
              <input type="file" accept="image/*" className="titulos-div2" id="input-imagen" onChange={ActualizarImagen} />
              <button type="button" onClick={Update} className="btn-actualizar">Actualizar</button>
            </div>
          </form>


        </div> : <div>
          <span>aun no tienes mascotas registradas </span>
          <a href="/crear"> registrar mascota</a>
        </div>}

    </>
  );
}

export default Perfil;