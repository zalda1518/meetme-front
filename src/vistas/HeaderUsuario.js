import '../estilos/Header.css';


function HeaderUsuario() {
  

  function CerrarSesion() {
    localStorage.removeItem('sesion');
    localStorage.removeItem('login');
  }

  return (
    <div className='header-padre' >
      <a href={`/registros`} className='links'>MI MASCOTA</a>
      <a href={`/perfil`} className='links'>PERFIL</a>
      <a href={`/codigo/`} className='links'>CODIGO QR</a>
      <a href='/' className='links' onClick={CerrarSesion}>SALIR</a>
    </div>
  );
}

export default HeaderUsuario;

