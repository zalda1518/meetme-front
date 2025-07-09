import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { QRCodeCanvas } from 'qrcode.react';
import '../../estilos/CodigoQr.css';
import menu from '../../includes/menu.png';
import HeaderAdmin from './HeaderAdmin.js';
import MenuResponsiveAdmin from './MenuResponsiveAdmin.js';
import { AlertaQR, QRGenerado } from '../../includes/Alertas.js';

function CodigoQrAdmin() {
  const navigate = new useNavigate();
  const [datos, setDatos] = useState([]);
  const [qrGenerado, setQrGenerado] = useState('');
  const [estilo, setEstilo] = useState(false); //para que no se muestre la hamburguesa en version escritorio//
  //-------------------------------------------------------------------------------------------//

  
  const token = localStorage.getItem('token');
  const id_usuario = localStorage.getItem('id_usuario');


  // para validar el rol del usuario //
  async function getRol() {
    const res = await fetch('http://localhost:4000/getrol',            //https://meetme-production.up.railway.app/getrol
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'auth': token, 'id_usuario': id_usuario },
      });

    if (!res.ok) {
      alert('debes iniciar sesion primero y debes ser administrador');
         return navigate('/forbiden');
    } else {
      const response = await res.json();
      const rol = response.resultados.rol;
      
      if (rol !== 'administrador') {
         alert('no eres admin')
         navigate('/codigo');
        return;
      }
    }
  }

  getRol();

  //para validar la sesion y buscar los datos //
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
  //----------------------------------------------//


  //- funcion generar qr---//
  function generarQr() {
    console.log(datos);
    if (!datos) {
      return AlertaQR();
    }
    const PID = datos.publicID;
    const valueCode = `http://localhost:4000/publicIDMimascota/${PID}`;     //https://meetmeio.netlify.app/publicIDMimascota/${PID}
    setQrGenerado(valueCode);
    QRGenerado();

  }

  //fucion para mostrar el menu responsive//
  function menuResponsive() {
    setEstilo(!estilo);
  }

  //-----------------------------------------------//
  return (
    <>
      <div className="div-padre-qr">
        <div className='titulo-principal-qr' onClick={menuResponsive} >
          <h2 className="h2-qr"><img src={menu} className="icono-menu" />MEETME</h2>
        </div>


        <HeaderAdmin />                              {/*el menu solo para version de escritorio*/}
        <div className={estilo ? 'menu-hamburgesa-activo' : 'menu-hamburgesa-oculto'} onClick={menuResponsive}>
          <MenuResponsiveAdmin />           {/*el menu solo para version de movil*/}
        </div>



        {qrGenerado ? <div className="div-qr">
          <QRCodeCanvas value={qrGenerado} size={256} className="qr" />
          <h3 className="titulo-qr">TU CODIGO QR</h3>

        </div> : <button onClick={generarQr} className="btn-generar-qr">Generar QR</button>}

      </div>
    </>
  );
}

export default CodigoQrAdmin;
