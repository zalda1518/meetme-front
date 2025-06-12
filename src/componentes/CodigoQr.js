import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { QRCodeCanvas } from 'qrcode.react';
import '../estilos/CodigoQr.css';
import menu from '../includes/menu.png';
import HeaderAdmin from './HeaderAdmin.js';
import HeaderUsuario from './HeaderUsuario.js';
import MenuResponsiveAdmin from './MenuResponsiveAdmin.js';
import MenuResponsiveUsuario from './MenuResponsiveUsuario.js';
import { AlertaQR, QRGenerado } from '../includes/Alertas.js';

function CodigoQr() {
   const navigate = new useNavigate();
   const { id } = useParams();
   const [datos, setDatos] = useState([]);
   const [qrGenerado, setQrGenerado] = useState('');
   const [estilo, setEstilo] = useState(false); //para que no se muestre la hamburguesa en version escritorio//
   const [rol, setRol] = useState('');
   const [urlQR, setUrlQr] = useState('');

   //fucion para mostrar el menu responsive//
   function menuResponsive() {
      setEstilo(!estilo);
   }


   //- funcion generar qr---//
   function generarQr() {
      console.log(datos[0]);
      if(!datos[0]){
         return AlertaQR();
      }
      const PID = datos[0].publicID;
      const valueCode = `http://localhost:4000/publicIDMimascota/${PID}`;     //https://meetmeio.netlify.app/publicIDMimascota/${PID}
      setQrGenerado(valueCode);
      QRGenerado();

   }

   //para validar la sesion y buscar los datos //
   useEffect(() => {
      if (!localStorage.getItem('sesion')) {
         navigate('/');
         return;
      }
      async function fetchData() {
         try {
            const res = await fetch(`http://localhost:4000/buscar/${id}`);
            if(!res.ok){
              return alert('error al hacer fetch ');
            }
            const response = await res.json();
            setDatos(response.registro);
            validarRol();
         } catch (error) {
            console.log(error);
         }
      }
   fetchData();
   }, [id]);
   //----------------------------------------------//
   // para validar el rol del usuario //
   async function validarRol() {
      const res = await fetch('http://localhost:4000/getrol',            //https://meetme-production.up.railway.app/getrol
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

   console.log(datos)

   //-----------------------------------------------//
   return (
      <>
         <div className="div-padre-qr">
            <div className='titulo-principal-qr' onClick={menuResponsive} >
               <h2 className="h2-qr"><img src={menu} className="icono-menu" />MEETME</h2>
            </div>

            {/*aca inicia la validacion de roles*/}
            {rol === 'administrador' ? <HeaderAdmin id={id} /> : <HeaderUsuario id={id} />}                              {/*el menu solo para version de escritorio*/}
            <div className={estilo ? 'menu-hamburgesa-activo' : 'menu-hamburgesa-oculto'} onClick={menuResponsive}>
               {rol === 'administrador' ? <MenuResponsiveAdmin id={id} /> : <MenuResponsiveUsuario id={id} />}           {/*el menu solo para version de movil*/}
            </div>
            {/*aca termina validacionde roles y adicional se pintan los componentes para el menu responsive o escritorio*/}


            {qrGenerado ? <div className="div-qr">
               <QRCodeCanvas value={qrGenerado} size={256} className="qr" />
               <h3 className="titulo-qr">TU CODIGO QR</h3>

            </div> : <button onClick={generarQr} className="btn-generar-qr">Generar QR</button>}

         </div>
      </>
   );
}

export default CodigoQr;
