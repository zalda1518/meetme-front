import '../estilos/Header.css';


function HeaderAdmin() {


  function CerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('id_usuario');
  }

  return (
    <div className='header-padre' >
      <a href={`/crear`} className='links'>CREAR MASCOTA</a>
      <a href={`/registros`} className='links'>MI MASCOTA</a>
      <a href={`/perfilAdmin`} className='links'>PERFIL</a>
      <a href={`/codigo`} className='links'>CODIGO QR</a>
      <a href={`/administrar`} className='links'>MASCOTAS</a>
      <a href={`/usuarios/`} className='links'>USUARIOS</a>
      <a href={`/crearusuarios`} className='links'>CREAR USUARIOS</a>
      <a href='/' className='links' onClick={CerrarSesion}>SALIR</a>
    </div>
  );
}

export default HeaderAdmin;


