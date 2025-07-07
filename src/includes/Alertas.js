import Swal from 'sweetalert2';


export function Warning() {
   Swal.fire({
      title: 'Todos los campos son obligatorios',
      text: 'llene todos los campos',
      icon: 'warning'
   });
}

export function AlertaQR() {
   Swal.fire({
      title: 'Atencion',
      text: 'no tienes mascota para enlazar al QR, debes crear una primero',
      icon: 'warning'
   });
}
export function QRGenerado() {
   Swal.fire({
      title: 'Exitoso',
      text: 'codigo QR generado con exito',
      icon: 'success'
   });
}

export function Error() {
   Swal.fire({
      title: 'Ha Ocurrido Un Error Inesperado',
      text: 'compruebe todos los campos',
      icon: 'error'
   });
}

export function ErrorUsuario() {
   Swal.fire({
      title: 'Ha Ocurrido',
      text: 'correo o contraseña mal escritos',
      icon: 'error'
   });
}
export function ErrorQR() {
   Swal.fire({
      title: 'Alerta',
      text: 'Ingrese el  id que se encuentra bajo el codigo QR',
      icon: 'warning'
   });
}

export function Bienvenido(rol) {
   Swal.fire({
      title: 'Bienvenido',
      text:rol,
      icon: 'success'
   });
}

export function MascotaNoEncontrada() {
   Swal.fire({
      title: 'No encontrada',
      text: 'La mascota no se encuentra registrada en Meetme',
      icon: 'error'
   });
}
export function MascotaEncontrada() {
   Swal.fire({
      title: 'Mascota encontrada',
      text: 'La mascota se encuentra registrada en Meetme',
      icon: 'success'
   });
}
export function Success(values) {
   Swal.fire({
      title: "Exitoso",
      text: "se creo la mascota con exito en la base de datos",
      icon: "success",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Bienvenid@",
          text: values.nombre_mascota,
          imageUrl:values.foto_mascota,
          imageWidth:100,
          imageHeight:60,
          icon: "success"
        });
      }
    });
}

export function SuccessUpdate(values) {
   Swal.fire({
      title: "Exitoso",
      text: "Se actualizaron los datos correctamente",
      icon: "success",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          text: values.nombre_mascota,
          imageUrl:values.foto_mascota,
          imageWidth:100,
          imageHeight:60,
          icon: "success"
        });
      }
    });
}

export function Cargando() {
   Swal.fire({
      title: 'Cargando imagen',
      text: 'espere unos segundos mientras se carga la imagen de tu mascota',
      icon: 'warning'
   });
}

export function CargandoInfo() {
   Swal.fire({
      title: 'Cargando informacion',
      text: 'espere unos segundos mientras se carga la pagina',
      icon: 'warning'
   });
}

export function ErrorCargaImagen() {
   Swal.fire({
      title: "Error no se pudo cargar la imagen",
      text: "compruebe su conexion a internet o el formato de la imagen",
      icon: "error",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Reintentar"
     }).then((result) => {
      if (result.isConfirmed) {
         window.location.reload();
      }
    });
}
export function Cargada() {
   Swal.fire({
      title: 'Imagen cargada',
      text: 'se subio la imagen con exito',
      icon: 'success'
   });
}





