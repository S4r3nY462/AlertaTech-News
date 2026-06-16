document.addEventListener("DOMContentLoaded", () => {
    const newsContainer = document.getElementById("news-container");

    if (!newsContainer) return;

    fetch("data/noticias.json")
        .then(response => response.json())
        .then(noticias => {
            newsContainer.innerHTML = "";

            noticias.forEach(noticia => {
                newsContainer.innerHTML += `
                    <article class="col-12 col-md-6 col-lg-4">
        <!-- Tarjeta contenedora con tamaño fijo y posición relativa -->
        <div class="card h-100 text-white border-0" 
             style="min-height: 420px; position: relative; overflow: hidden; border-radius: 12px; background-color: #1a1a1a !important;">
            
            <!-- Capa interna que contiene ÚNICAMENTE la imagen de fondo de esta caja -->
            <div style="position: absolute; 
                        top: 0; left: 0; width: 100%; height: 100%; 
                        background-image: linear-gradient(to top, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.1) 100%), url('${noticia.imagen || 'img/default.jpg'}'); 
                        background-size: cover; 
                        background-position: center; 
                        z-index: 1;">
            </div>
            
            <!-- Contenedor del texto flotando por encima de la imagen (gracias al z-index) -->
            <div class="card-body d-flex flex-column justify-content-end p-4" 
                 style="position: relative; z-index: 2; background: transparent !important; background-color: transparent !important;">
                 
                <span class="badge bg-primary mb-2 align-self-start">${noticia.categoria}</span>
                <small class="text-light opacity-75 mb-2">${noticia.fecha}</small>
                <h3 style="background: transparent !important; background-color: transparent !important;">
    ${noticia.titulo}
</h3>

<p style="background: transparent !important; background-color: transparent !important;">
    ${noticia.resumen}
</p>
                <a href="detalle.html?id=${noticia.id}" class="btn btn-outline-light btn-sm w-100 mt-2">Leer más</a>
            </div>
        </div>
    </article>
        
                `;
            });
        })
        .catch(error => {
            console.error("Error al cargar noticias:", error);
            newsContainer.innerHTML = "<p>No se pudieron cargar las noticias.</p>";
        });
});
