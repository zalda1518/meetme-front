import '../estilos/MenuResponsive.css';


function MenuResponsiveAdmin({ id }) {
  function CerrarSesion() {
    localStorage.removeItem('sesion');
    localStorage.removeItem('login');
  }

  return (
    <div className='padre-menu-responsive' >
      <a href={`/crear/${id}`} className='links-responsive'>CREAR</a>
      <a href={`/registros/${id}`} className='links-responsive'>MI MASCOTA</a>
      <a href={`/perfil/${id}`} className='links-responsive'>PERFIL</a>
      <a href={`/codigo/${id}`} className='links-responsive'>CODIGO QR</a>
      <a href={`/usuarios/${id}`} className='links'>USUARIOS</a>
      <a href={`/crearusuarios/${id}`} className='links'>CREAR USUARIOS</a>
      <a href={`/administrar/${id}`} className='links'>MASCOTAS</a>
      <a href='/' className='links-responsive' onClick={CerrarSesion}>SALIR</a>
    </div>
  );
}

export default MenuResponsiveAdmin;


