const RSS_URL = "https://es.mittechnologyreview.com/feed/";
const API_URL = `https://corsproxy.io/?${encodeURIComponent(RSS_URL)}`;

async function actualizarNoticiasIA() {
  try {
    const res = await fetch(API_URL);
    const text = await res.text();

    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "text/xml");
    const items = [...xml.querySelectorAll("item")].slice(0, 6);

    items.forEach((item, i) => {
      const num = i + 1;
      const card = document.getElementById(`ia-${num}`);
      if (!card) return;

      const fecha = new Date(item.querySelector("pubDate")?.textContent)
        .toLocaleDateString("es-ES", {
          day: "2-digit", month: "short", year: "numeric"
        });

      const desc = item.querySelector("description")?.textContent
        ?.replace(/<[^>]*>/g, "").slice(0, 120) + "...";

      card.querySelector("h3").textContent = item.querySelector("title")?.textContent;
      card.querySelector("p").textContent = desc;
      card.querySelector(".noticia-categoria").textContent = "Inteligencia Artificial";
      card.querySelector(".noticia-meta").textContent = `📅 ${fecha}`;
      card.querySelector("a").href = item.querySelector("link")?.textContent;
      card.querySelector(".noticia-fuente").textContent = "Fuente: MIT Technology Review en español";
    });

  } catch (err) {
    console.error("Error al cargar noticias IA:", err);
  }
}

document.addEventListener("DOMContentLoaded", actualizarNoticiasIA);
setInterval(actualizarNoticiasIA, 30 * 60 * 1000);