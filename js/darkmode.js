const boton = document.getElementById('boton-oscuro');

// Aplicamos Flexbox y quitamos el fondo feo desde el CSS para que el botón se vea bien tanto en modo claro como oscuro
boton.style.cssText = "background:none; border:none; padding:0; display:inline-flex; align-items:center; font-size:1.2rem; cursor:pointer;";

// Función para cambiar la apariencia del botón
function actualizarIcono() {
  const esOscuro = document.body.classList.contains('modo-oscuro');
  boton.innerHTML = esOscuro ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-fill"></i>';
  boton.style.color = esOscuro ? '#ffc107' : 'white';
  localStorage.setItem('modo-oscuro', esOscuro ? 'activo' : 'inactivo');
}

//  cargar la página
if (localStorage.getItem('modo-oscuro') === 'activo') {
  document.body.classList.add('modo-oscuro');
}
actualizarIcono();

// 2.  actualiza el icono
boton.addEventListener('click', () => {
  document.body.classList.toggle('modo-oscuro');
  actualizarIcono();
});
