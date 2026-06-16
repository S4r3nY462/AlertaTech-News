const boton = document.getElementById('boton-oscuro');

// Aplicamos Flexbox y quitamos el fondo feo desde el inicio
boton.style.cssText = "background:none; border:none; padding:0; display:inline-flex; align-items:center; font-size:1.2rem; cursor:pointer;";

// Función para cambiar la apariencia del botón
function actualizarIcono() {
  const esOscuro = document.body.classList.contains('modo-oscuro');
  boton.innerHTML = esOscuro ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-fill"></i>';
  boton.style.color = esOscuro ? '#ffc107' : 'white';
  localStorage.setItem('modo-oscuro', esOscuro ? 'activo' : 'inactivo');
}

// 1. Al cargar la página, revisamos si ya estaba activo el modo oscuro
if (localStorage.getItem('modo-oscuro') === 'activo') {
  document.body.classList.add('modo-oscuro');
}
actualizarIcono();

// 2. Al hacer clic, alternamos el modo oscuro y actualizamos el icono
boton.addEventListener('click', () => {
  document.body.classList.toggle('modo-oscuro');
  actualizarIcono();
});
