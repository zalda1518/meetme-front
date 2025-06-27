import '../estilos/MenuResponsive.css';


function MenuResponsiveUsuario({ id }) {
  function CerrarSesion() {
    localStorage.removeItem('sesion');
    localStorage.removeItem('login');
  }

  return (
    <div className='padre-menu-responsive' >
      <a href={`/registros/${id}`} className='links-responsive'>MI MASCOTA</a>
      <a href={`/perfil/${id}`} className='links-responsive'>PERFIL</a>
      <a href={`/codigo/${id}`} className='links-responsive'>CODIGO QR</a>
      <a href='/' className='links-responsive' onClick={CerrarSesion}>SALIR</a>
    </div>
  );
}

export default MenuResponsiveUsuario;


