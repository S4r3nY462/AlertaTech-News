const RSS_URL = "https://unaaldia.hispasec.com/feed";
const API_URL = `https://corsproxy.io/?${encodeURIComponent(RSS_URL)}`;

async function actualizarNoticias() {
  try {
    const res = await fetch(API_URL);
    const text = await res.text();
    
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "text/xml");
    const items = [...xml.querySelectorAll("item")].slice(0, 6);

    items.forEach((item, i) => {
      const num = i + 1;
      const card = document.getElementById(`noticia-${num}`);
      if (!card) return;

      const titulo = item.querySelector("title")?.textContent;
      const desc = item.querySelector("description")?.textContent
        ?.replace(/<[^>]*>/g, "").slice(0, 120) + "...";
      const link = item.querySelector("link")?.textContent;
      const fecha = new Date(item.querySelector("pubDate")?.textContent)
        .toLocaleDateString("es-ES", { day:"2-digit", month:"short", year:"numeric" });

      card.querySelector("h3").textContent = titulo;
      card.querySelector(".noticia-categoria").textContent = "Ciberseguridad";
      card.querySelector("p").textContent = desc;
      card.querySelector(".noticia-meta").textContent = `📅 ${fecha}`;
      card.querySelector("a").href = link;
      card.querySelector(".noticia-fuente").textContent = "Fuente: Hispasec";
    });

  } catch (err) {
    console.error("Error al cargar noticias:", err);
  }
}

document.addEventListener("DOMContentLoaded", actualizarNoticias);