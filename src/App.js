import './App.css';
import { useState } from 'react';
import {BrowserRouter, Route,Routes } from 'react-router-dom';
import Crear  from './vistas/Crear';
import Registros from './vistas/Registros';
import RegistrosAdmin from './vistas/vistasAdmin/RegistrosAdmin';
import Login from './vistas/Login';
import CrearUsuario from './vistas/CrearUsuario';
import Perfil from './vistas/Perfil';
import PerfilAdmin from './vistas/vistasAdmin/PerfilAdmin';
import CodigoQr from './vistas/CodigoQr';
import Administrar from './vistas/Administrar';
import PublicIDMimascota from './vistas/PublicIDMimascota';
import EditarUsuarios from './vistas/EditarUsuarios';
import Usuarios from './vistas/Usuarios';


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
        <Route path='/crear' element={<Crear  />}/>
        <Route path='/registros' element={<Registros  />}/>
        <Route path='/registrosAdmin' element={<RegistrosAdmin  />}/>
        <Route path='/perfil' element={<Perfil />}/>
        <Route path='/perfilAdmin' element={<PerfilAdmin />}/>
        <Route path='/usuarios/:id' element={<Usuarios />}/>
        <Route path='/administrar/:id' element={<Administrar />}/>
        <Route path='/crearusuarios/:id' element={<CrearUsuario />}/>
        <Route path='/editar/:id' element={<EditarUsuarios />}/>
        <Route path='/codigo/:id' element={<CodigoQr />}/>
   </Routes> 

   
   </div>  

    </BrowserRouter>
    
  );
}

export default App;
