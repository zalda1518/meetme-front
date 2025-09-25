import styles from "../estilos/HeaderUsuario.module.css";
import huella from "../includes/huella.png";
import perfil from "../includes/perfil.png";
import qr from "../includes/qr.png";
import salir from "../includes/salir.png";





function HeaderUsuario() {


  function CerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('id_usuario');
  }

  return (
    <div className={styles['header-padre']} >

      <a href={`/registros`} className={styles['links']}>
        <img src={huella} />
        <span>Mi Mascota</span>
      </a>

      <a href={`/perfil`} className={styles['links']}>
      <img src={perfil} />
       <span>Perfil</span> 
      </a>
      <a href={`/codigo`} className={styles['links']}>
      <img src={qr} />
       <span>Codigo QR</span> 
      </a>
      <a href='/' className={styles['links']} onClick={CerrarSesion}><img src={salir} />Salir</a>
    </div>
  );
}

export default HeaderUsuario;

