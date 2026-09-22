# 🌼💜 mi niña

Página interactiva romántica, pensada **sólo para celular**.

## Cómo cambiar los textos
Todo está en **`contenido.js`**: la portada, las canciones, las 4 preguntas,
el poema, la pregunta de Frida y los textos finales.

## Música (mp3, sin depender de Spotify)
Pon los 3 archivos en `musica/` — mira `musica/LEEME.md` para los nombres
exactos. El ícono de Spotify que aparece es solo un enlace decorativo.

## Fotos
Ya están puestas: `img/frida.png` (retrato de Frida Kahlo) e
`img/beso.webp` (la foto de ustedes). Si quieres cambiarlas, solo
reemplaza esos dos archivos con los mismos nombres.

## Cómo publicarla en Netlify

**Opción rápida (arrastrar y soltar, 30 segundos):**
1. Entra a https://app.netlify.com/drop
2. Arrastra **esta carpeta entera** a la página.
3. *Site configuration → Change site name* → pon el nombre que quieras
   → queda en `https://tu-nombre.netlify.app`.

**Opción conectada a GitHub (se actualiza sola con cada cambio):**
1. En Netlify: *Add new site → Import an existing project → GitHub*.
2. Elige el repo `flores-abigail`, rama `main`.
3. Deja "Build command" y "Publish directory" vacíos.
4. *Deploy site* → cambia el nombre del sitio como arriba.

## Archivos
| archivo | qué hace |
|---|---|
| `index.html` | la página |
| `contenido.js` | **todos los textos** |
| `estilos.css` | los colores y el diseño |
| `flores.js` | las flores dibujadas (SVG) |
| `app.js` | la lógica del juego |
| `img/` | las dos fotos |
| `musica/` | los 3 mp3 |
