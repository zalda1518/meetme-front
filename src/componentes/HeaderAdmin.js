import '../estilos/Header.css';


function HeaderAdmin({ id }) {
  function CerrarSesion() {
    localStorage.removeItem('sesion');
    localStorage.removeItem('login');
  }

  return (
    <div className='header-padre' >
      <a href={`/crear/${id}`} className='links'>CREAR MASCOTA</a>
      <a href={`/registros/${id}`} className='links'>MI MASCOTA</a>
      <a href={`/perfil/${id}`} className='links'>PERFIL</a>
      <a href={`/codigo/${id}`} className='links'>CODIGO QR</a>
      <a href={`/administrar/${id}`} className='links'>MASCOTAS</a>
      <a href={`/usuarios/${id}`} className='links'>USUARIOS</a>
      <a href={`/crearusuarios/${id}`} className='links'>CREAR USUARIOS</a>
      <a href='/' className='links' onClick={CerrarSesion}>SALIR</a>
    </div>
  );
}

export default HeaderAdmin;


