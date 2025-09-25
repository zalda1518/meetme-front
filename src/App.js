import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//----------------------------------------------------------------
/* import RegistrosAdmin from './vistas/vistasAdmin/RegistrosAdmin';
import CrearUsuario from './vistas/vistasAdmin/CrearUsuario';
import PerfilAdmin from './vistas/vistasAdmin/PerfilAdmin';
import PublicIDMimascota from './vistas/PublicIDMimascota';
import CodigoQrAdmin from './vistas/vistasAdmin/CodigoQrAdmin';
import Usuarios from './vistas/vistasAdmin/Usuarios';
import Forbiden from './vistas/vistasAdmin/Forbiden'; */


//----------------------------------------------------------------
import Registros from './vistas/Registros';
import Login from './vistas/Login';
import RecuperarClave from './vistas/RecuperarClave';
 import Perfil from './vistas/Perfil';
 import CodigoQr from './vistas/CodigoQr';
/* 
import ValidarRol from './controlador/Controlador';
import CrearMascota from './vistas/CrearMascota'; */


function App() {

  return (

    <BrowserRouter>
      <div className="App">


        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          {/* <Route path='/publicIDMimascota/:id' element={<PublicIDMimascota  />}/> */}
          {/*administrador*/}
          {/* <Route path='/registrosAdmin' element={<RegistrosAdmin  />}/>
        <Route path='/perfilAdmin' element={<PerfilAdmin />}/>
        <Route path='/codigoqradmin' element={<CodigoQrAdmin />}/>
        <Route path='/crearusuarios' element={<CrearUsuario />}/>
        <Route path='/usuarios' element={<Usuarios />}/>
        <Route path='/forbiden' element={<Forbiden />}/> */}
          {/*administrador*/}

          <Route path='/registros' element={<Registros />} />
          <Route path='/recuperarclave' element={<RecuperarClave />} />
           <Route path='/perfil' element={<Perfil />}/>
           <Route path='/codigo' element={<CodigoQr />}/>
         {/*  
          <Route path='/validarRol' element={<ValidarRol/>}/>
          <Route path='/crearMascota' element={<CrearMascota  />}/>
           */}
        </Routes>


      </div>

    </BrowserRouter>

  );
}

export default App;
