import styles from "../estilos/MenuResponsive.module.css";



function MenuResponsiveUsuario() {
  
  function CerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('id_usuario');
  }

  return (
    <div className={styles['padre-menu-responsive']} >
      <a href={`/registros`} className={styles['links-responsive']}>MI MASCOTA</a>
      <a href={`/perfil`} className={styles['links-responsive']}>PERFIL</a>
      <a href={`/codigo`} className={styles['links-responsive']}>CODIGO QR</a>
      <a href='/' className={styles['links-responsive']} onClick={CerrarSesion}>SALIR</a>
    </div>
  );
}

export default MenuResponsiveUsuario;


