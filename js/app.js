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
                        <div class="card h-100 p-4">
                            <span class="badge bg-primary mb-2">${noticia.categoria}</span>
                            <small class="text-muted mb-2">${noticia.fecha}</small>
                            <h3>${noticia.titulo}</h3>
                            <p>${noticia.resumen}</p>
                            <a href="detalle.html?id=${noticia.id}" class="btn btn-outline-primary btn-sm">Leer más</a>
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
