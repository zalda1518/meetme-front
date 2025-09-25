import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../estilos/Perfil.module.css";
import menu from '../includes/menu.png';
import HeaderUsuario from "./HeaderUsuario.js";
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

  useEffect(() => {
    if (!token) {
      alert('debes iniciar sesion primero');
      navigate('/forbiden');
      return;
    }
  }, [token, navigate]);

  // para validar el rol del usuario //
  async function getRol() {

    const res = await fetch('https://meetme-back-production.up.railway.app/getrol', //https://meetme-back-production.up.railway.app/getrol
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

      try {
        const res = await fetch(`https://meetme-back-production.up.railway.app/buscar`,  //https://meetme-back-production.up.railway.app/buscar
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'auth': token, 'id_usuario': id_usuario }
          });

        if (!res.ok) {
          navigate(`/forbiden`)
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

  }, [navigate, token]);
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
    const res = await fetch('https://meetme-back-production.up.railway.app/actualizar',   //  https://meetme-back-production.up.railway.app/actualizar
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

  /* cerrar animacion cuando la respuesta sea exitosa */
  if (datos.nombres) {
    document.getElementById('preloader').style.display = 'none';
  }
  /* cerrar animacion cuando la respuesta sea exitosa */


  //fucion para mostrar el menu responsive//
  function menuResponsive() {
    setEstilo(!estilo);
  }


  //--------------------------------------------------------------------//
  return (
    <>
      {/*   <!-- Preloader --> */}
      <div id="preloader" className={styles['preloader']}>
        <div className={styles["spinner"]}></div>
        <h3> Cargando...</h3>
      </div>
      {/*   <!-- Preloader --> */}

      {loading ? Cargando() : false} {/* efecto cargando para subir la imagen */}

      {datos.nombres ?
        <div className={styles['div-padre-perfil']}>
          <div className={styles['item1-titulo-principal-perfil']} onClick={menuResponsive}>
            <h2 className={styles["h2-icono-registros"]}>MEETME</h2>
            <img src={menu} className={styles["icono-menu"]} alt="not found" />
          </div>

          {/*--------------------------------------------------------------------------------*/}
          <HeaderUsuario /> {/*el menu solo para version de escritorio*/}
          <div className={estilo ? styles['menu-hamburgesa-activo'] : styles['menu-hamburgesa-oculto']} onClick={menuResponsive}>
            {<MenuResponsiveUsuario />}     {/*el menu solo para version de movil*/}
          </div>
          {/*--------------------------------------------------------------------------------*/}



          <div className={styles["item2"]}>
            <h3 className="titulo-datos-dueño-perfil">Actualiza tus Datos</h3>
            <div className={styles["div-imagen-perfil"]}>
              <img src={datos.foto_mascota} className={styles["div-foto-perfil"]} id="img-mascota" alt="not found" />
            </div>
            <div className={styles["hijo-item2"]}>
              <input className={styles["titulos-perfil-input"]} name="nombres" value={datos.nombres} onChange={handleChange} placeholder="Nombres" />
              <input className={styles["titulos-perfil-input"]} name="apellidos" value={datos.apellidos} onChange={handleChange} placeholder="Apellidos" />
              <input className={styles["titulos-perfil-input"]} name="ciudad" value={datos.ciudad} onChange={handleChange} placeholder="Ciudad" />
              <input className={styles["titulos-perfil-input"]} name="direccion" value={datos.direccion} onChange={handleChange} placeholder="Direccion" />
              <input className={styles["titulos-perfil-input"]} type="number" name="telefono" value={datos.telefono} onChange={handleChange} placeholder="Telefono" />
              <input className={styles["titulos-perfil-input"]} name="nombre_mascota" value={datos.nombre_mascota} onChange={handleChange} placeholder="Nombre de la mascota" />
              <input className={styles["titulos-perfil-input"]} name="genero" value={datos.genero} onChange={handleChange} placeholder="Genero" />
              <input className={styles["titulos-perfil-input"]} name="tipo_animal" value={datos.tipo_animal} onChange={handleChange} placeholder="Tipo animal" />
              <input className={styles["titulos-perfil-input"]} name="raza" value={datos.raza} onChange={handleChange} placeholder="Raza" />
              <input className={styles["titulos-perfil-input"]} type="number" name="edad" value={datos.edad} onChange={handleChange} placeholder="Edad" />
              <input className={styles["titulos-perfil-input"]} type="file" accept="image/*" id="input-imagen" onChange={ActualizarImagen} />
              <button type="button" onClick={Update} className="btn-actualizar">Actualizar</button>
            </div>
          </div>

        </div> : <div>
          <span>aun no tienes mascotas registradas </span>
          <a href="/crearMascota"> registrar mascota</a>
        </div>}

    </>
  );
}

export default Perfil;