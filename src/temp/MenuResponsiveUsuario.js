/* import '../estilos/MenuResponsive.css'; */


function MenuResponsiveUsuario() {
  
  function CerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('id_usuario');
  }

  return (
    <div className='padre-menu-responsive' >
      <a href={`/registros`} className='links-responsive'>MI MASCOTA</a>
      <a href={`/perfil`} className='links-responsive'>PERFIL</a>
      <a href={`/codigo`} className='links-responsive'>CODIGO QR</a>
      <a href='/' className='links-responsive' onClick={CerrarSesion}>SALIR</a>
    </div>
  );
}

export default MenuResponsiveUsuario;


