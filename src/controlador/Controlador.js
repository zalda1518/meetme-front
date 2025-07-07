

async function ValidarRol(navigate) {


  const token = localStorage.getItem('token');
  const id_usuario = localStorage.getItem('id_usuario');

  const res = await fetch('http://localhost:4000/getrol',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth': token, 'id_usuario': id_usuario },
    }
  );
  if (!res.ok) {
    alert('endpoint getrol, no responde');
  } else {
    const response = await res.json();
    const rol = response.resultados.rol;
    if (rol === 'administrador') {return navigate('/registrosAdmin') }
    if (rol === 'usuario') { return navigate('/registros')  }

  }

}









export default ValidarRol;