import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorQR } from '../includes/Alertas.js';


function BuscarID() {

   const navigate = new useNavigate();
   const [buscarID, setBuscar] = useState({});
   const [data, setData] = useState({});

   function handleChange(e) {
      const { name, value } = e.target;
      setData({ name: value });
      setBuscar({ ...buscarID, [name]: value });
   }

   async function Buscar(e) {
      e.preventDefault();
      //se envia el public id por la url al componente publicIDMimascota para hacer fetch//
      if (!buscarID.buscarID) {
         ErrorQR();
         return;
      }
      navigate(`/publicIDMimascota/${buscarID.buscarID}`)
   }


   return (
      <div className="div-buscar-id">
         <input type="number" name="buscarID" placeholder="Ingresa el ID" className="input-buscar-id" onChange={handleChange} />
         <button className="btn-buscar-id" onClick={Buscar}>Buscar por ID</button>
      </div>
   );
}

export default BuscarID;
