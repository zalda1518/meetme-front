import '../estilos/Header.css';


function HeaderUsuario({ id }) {
  function CerrarSesion() {
    localStorage.removeItem('sesion');
    localStorage.removeItem('login');
  }

  return (
    <div className='header-padre' >
      <a href={`/registros/${id}`} className='links'>MI MASCOTA</a>
      <a href={`/perfil/${id}`} className='links'>PERFIL</a>
      <a href={`/codigo/${id}`} className='links'>CODIGO QR</a>
      <a href='/' className='links' onClick={CerrarSesion}>SALIR</a>
    </div>
  );
}

export default HeaderUsuario;

