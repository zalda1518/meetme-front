import '../../estilos/MenuResponsive.css';


function MenuResponsiveAdmin() {
  function CerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('id_usuario');
  }

  return (
    <div className='padre-menu-responsive' >
     {/*  <a href={`/crear`} className='links-responsive'>CREAR</a> */}
      <a href={`/registros`} className='links-responsive'>MI MASCOTA</a>
      <a href={`/perfil`} className='links-responsive'>PERFIL</a>
      <a href={`/codigo`} className='links-responsive'>CODIGO QR</a>
      <a href={`/crearusuarios`} className='links'>CREAR USUARIOS</a>
      <a href={`/usuarios`} className='links'>USUARIOS</a> 
      
      {/* <a href={`/administrar`} className='links'>MASCOTAS</a>  */}
      <a href='/' className='links-responsive' onClick={CerrarSesion}>SALIR</a>
    </div>
  );
}

export default MenuResponsiveAdmin;


