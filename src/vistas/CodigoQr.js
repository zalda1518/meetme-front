import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { QRCodeCanvas } from 'qrcode.react';
import styles from "../estilos/CodigoQr.module.css";
import menu from '../includes/menu.png';
import HeaderUsuario from './HeaderUsuario.js';
import MenuResponsiveUsuario from './MenuResponsiveUsuario.js';
import { AlertaQR, QRGenerado } from '../includes/Alertas.js';

function CodigoQr() {
  const navigate = new useNavigate();
  const [datos, setDatos] = useState([]);
  const [qrGenerado, setQrGenerado] = useState('');
  const [estilo, setEstilo] = useState(false); //para que no se muestre la hamburguesa en version escritorio//
  const [urlQR, setUrlQr] = useState('');
  //-------------------------------------------------------------------------------------------//
  const token = localStorage.getItem('token');
  const id_usuario = localStorage.getItem('id_usuario');


  useEffect(() => {
    if (!token) {
      alert('debes iniciar sesion primero');
      navigate('/forbiden');
      return;
    }
  }, [navigate]);


  // para validar el rol del usuario //
  async function getRol() {
    const res = await fetch('https://meetme-back-production.up.railway.app/getrol',            //ttps://meetme-back-production.up.railway.app/getrol
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'auth': token, 'id_usuario': id_usuario },
      });

    if (!res.ok) {
      alert('debes iniciar sesion primero');
      return navigate('/forbiden');

    } else {
      const response = await res.json();
      const rol = response.resultados.rol;
      if (rol === 'administrador') {
        navigate('/codigoqradmin');
        return;
      }
    }
  }

  getRol();

  //para validar la sesion y buscar los datos //
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
        // console.log(response.resultados[0]);
        setDatos(response.resultados);

      }
      catch (error) {
        console.log(error)
      }
    }
    fetchData();

  }, []);
  //----------------------------------------------//


  //- funcion generar qr---//
  function generarQr() {
    console.log(datos);
    if (!datos) {
      return AlertaQR();
    }
    const PID = datos[0].publicID;
    const valueCode = `https://meetmeio-org.netlify.app/publicIDMimascota/${PID}`;     //https://meetme-org.netlify.app/publicIDMimascota/1650
    setQrGenerado(valueCode);
    QRGenerado();

  }

   /* cerrar animacion cuando la respuesta sea exitosa */
   if (datos.length) {
      document.getElementById('preloader').style.display = 'none';
   }
   /* cerrar animacion cuando la respuesta sea exitosa */

  //fucion para mostrar el menu responsive//
  function menuResponsive() {
    setEstilo(!estilo);
  }

  //-----------------------------------------------//
  return (
    <>
      {/*   <!-- Preloader --> */}
      <div id="preloader" className={styles['preloader']}>
        <div className={styles["spinner"]}></div>
        <h3> Cargando...</h3>
      </div>
      {/*   <!-- Preloader --> */}

      {datos.length >= 1 ?
        <div className={styles["div-padre-qr"]}>

          <div className={styles['titulo-principal-qr']} onClick={menuResponsive} >
            <h2 className={styles["h2-qr"]}>MEETME</h2>
            <img src={menu} className={styles["icono-menu"]} alt="not found" />
          </div>


          {/*--------------------------------------------------------------------------------*/}
          <HeaderUsuario /> {/*el menu solo para version de escritorio*/}
          <div className={estilo ? styles['menu-hamburgesa-activo'] : styles['menu-hamburgesa-oculto']} onClick={menuResponsive}>
            {<MenuResponsiveUsuario />}     {/*el menu solo para version de movil*/}
          </div>
          {/*--------------------------------------------------------------------------------*/}



          {qrGenerado ? <div className={styles["div-qr"]}>
            <QRCodeCanvas value={qrGenerado} size={256} className={styles["qr"]} />
            <h3 className={styles["titulo-qr"]}>TU CODIGO QR</h3>

          </div> : <button onClick={generarQr} className={styles["btn-generar-qr"]}>Generar QR</button>}

        </div> : <div>
          <span>aun no tienes mascotas registradas </span>
          <a href="/crearMascota"> registrar mascota</a>
        </div>}

    </>
  );
}

export default CodigoQr;
