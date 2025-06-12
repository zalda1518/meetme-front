import './App.css';
import { useState } from 'react';
import {BrowserRouter, Route,Routes } from 'react-router-dom';
import Crear  from './componentes/Crear';
import  HeaderUsuario  from './componentes/HeaderUsuario';
import  HeaderAdmin  from './componentes/HeaderAdmin';
import Registros from './componentes/Registros';
import Login from './componentes/Login';
import CrearUsuario from './componentes/CrearUsuario';
import Perfil from './componentes/Perfil';
import CodigoQr from './componentes/CodigoQr';
import Administrar from './componentes/Administrar';
import PublicIDMimascota from './componentes/PublicIDMimascota';
import EditarUsuarios from './componentes/EditarUsuarios';
import Usuarios from './componentes/Usuarios';


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
        <Route path='/crear/:id' element={<Crear  />}/>
        <Route path='/registros/:id' element={<Registros  />}/>
        <Route path='/perfil/:id' element={<Perfil />}/>
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
