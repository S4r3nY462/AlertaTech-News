document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));

    fetch("data/noticias.json")
        .then(response => response.json())
        .then(noticias => {

            const noticia = noticias.find(n => n.id === id);

            if (!noticia) {
                document.getElementById("detalle-noticia").innerHTML =
                    "<h2>Noticia no encontrada</h2>";
                return;
            }

            document.getElementById("detalle-noticia").innerHTML = `
                <span class="badge bg-primary">${noticia.categoria}</span>

                <h1 class="mt-3">${noticia.titulo}</h1>

                <p class="text-muted">${noticia.fecha}</p>
                
            <div class="mb-4">
                <img src="${noticia.imagen}" class="img-fluid rounded w-100" alt="${noticia.titulo}">
            </div>

                <hr>

                 ${noticia.descripcion.map(parrafo => `<p class="mb-4">${parrafo}</p>`).join("")}
            `;
        });

});