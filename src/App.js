import './App.css';
import { useState } from 'react';
import {BrowserRouter, Route,Routes } from 'react-router-dom';
//----------------------------------------------------------------
import RegistrosAdmin from './vistas/vistasAdmin/RegistrosAdmin';
import CrearUsuario from './vistas/vistasAdmin/CrearUsuario';
import PerfilAdmin from './vistas/vistasAdmin/PerfilAdmin';
import PublicIDMimascota from './vistas/PublicIDMimascota';
import CodigoQrAdmin from './vistas/vistasAdmin/CodigoQrAdmin';
import Usuarios from './vistas/vistasAdmin/Usuarios';
import Forbiden from './vistas/vistasAdmin/Forbiden';


//----------------------------------------------------------------
import Registros from './vistas/Registros';
import Login from './vistas/Login';
import Perfil from './vistas/Perfil';
import CodigoQr from './vistas/CodigoQr';
import ValidarRol from './controlador/Controlador';
import CrearMascota from './vistas/CrearMascota';


function App() {

  const [login,setLogin] = useState(false);
  const [global,setGlobal] = useState([]);
  
  return (

   <BrowserRouter>
    <div className="App">
    
      
    <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/login' element={<Login  />}/>
        <Route path='/publicIDMimascota/:id' element={<PublicIDMimascota  />}/>
        {/*administrador*/ }
        <Route path='/registrosAdmin' element={<RegistrosAdmin  />}/>
        <Route path='/perfilAdmin' element={<PerfilAdmin />}/>
        <Route path='/codigoqradmin' element={<CodigoQrAdmin />}/>
        <Route path='/crearusuarios' element={<CrearUsuario />}/>
        <Route path='/usuarios' element={<Usuarios />}/>
        <Route path='/forbiden' element={<Forbiden />}/>
        {/*administrador*/ }

        <Route path='/registros' element={<Registros  />}/>
        <Route path='/crearMascota' element={<CrearMascota  />}/>
        <Route path='/perfil' element={<Perfil />}/>
        <Route path='/codigo' element={<CodigoQr />}/>
        <Route path='/validarRol' element={<ValidarRol/>}/>
   </Routes> 

   
   </div>  

    </BrowserRouter>
    
  );
}

export default App;
